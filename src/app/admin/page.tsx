"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  Package,
  Users,
  CalendarCheck,
  Image as ImageIcon,
  FileText,
  LogOut,
  Plus,
  Trash2,
  Edit,
  ExternalLink,
  Search,
  Upload,
  CheckCircle2,
  Clock,
  Phone,
  Mail,
  Loader2,
  Sparkles,
  Compass,
  AlertCircle
} from "lucide-react";
import {
  isAdminLoggedIn,
  adminLogout,
  fetchAllPackages,
  saveTourPackage,
  removeTourPackage,
  fetchEnquiries,
  updateEnquiryStatus,
  deleteEnquiry,
  fetchBookings,
  updateBookingStatus,
  uploadTourImage
} from "@/lib/firebaseServices";
import { TourPackage, EnquiryLead, Booking } from "@/lib/types";

export default function AdminPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"overview" | "packages" | "leads" | "bookings">("overview");

  // Data States
  const [packages, setPackages] = useState<TourPackage[]>([]);
  const [enquiries, setEnquiries] = useState<EnquiryLead[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  // New Package Modal / Form
  const [isPackageModalOpen, setIsPackageModalOpen] = useState(false);
  const [editingPackageId, setEditingPackageId] = useState<string | null>(null);
  const [packageName, setPackageName] = useState("");
  const [packageCategory, setPackageCategory] = useState("kerala");
  const [packageState, setPackageState] = useState("Kerala");
  const [packagePrice, setPackagePrice] = useState("₹4,999");
  const [packageOriginalPrice, setPackageOriginalPrice] = useState("₹6,999");
  const [packageDuration, setPackageDuration] = useState("2D | 1N");
  const [packageLocation, setPackageLocation] = useState("Munnar, Kerala");
  const [packageDesc, setPackageDesc] = useState("");
  const [packageImage, setPackageImage] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);
  const [packageInclusions, setPackageInclusions] = useState("3-Star Resort Stay, Daily Breakfast, Private Cab Sightseeing");

  useEffect(() => {
    if (!isAdminLoggedIn()) {
      router.push("/admin/login");
      return;
    }
    loadAllAdminData();
  }, [router]);

  const loadAllAdminData = async () => {
    setLoading(true);
    try {
      const [pkgs, leads, bks] = await Promise.all([
        fetchAllPackages(),
        fetchEnquiries(),
        fetchBookings()
      ]);
      setPackages(pkgs);
      setEnquiries(leads);
      setBookings(bks);
    } catch (err) {
      console.error("Error loading admin data:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await adminLogout();
    router.push("/admin/login");
  };

  // Image Upload to Firebase Storage
  const handleImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const downloadUrl = await uploadTourImage(file, "tour-packages");
      setPackageImage(downloadUrl);
    } catch (error) {
      alert("Error uploading image to Firebase Storage");
    } finally {
      setUploadingImage(false);
    }
  };

  // Package Save / Update
  const handleSavePackage = async (e: React.FormEvent) => {
    e.preventDefault();

    const inclusionsArr = packageInclusions.split(",").map((s) => s.trim()).filter(Boolean);

    const payload: Omit<TourPackage, "id"> & { id?: string } = {
      name: packageName,
      title: `${packageName} Tour`,
      state: packageState,
      category: packageCategory,
      price: packagePrice,
      originalPrice: packageOriginalPrice,
      duration: packageDuration,
      location: packageLocation,
      desc: packageDesc,
      image: packageImage || "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=800&q=80",
      placesToVisit: [packageLocation],
      inclusions: inclusionsArr,
      exclusions: ["Personal Expenses"],
    };

    if (editingPackageId) {
      payload.id = editingPackageId;
    }

    await saveTourPackage(payload);
    setIsPackageModalOpen(false);
    resetPackageForm();
    await loadAllAdminData();
  };

  const handleEditPackageClick = (pkg: TourPackage) => {
    setEditingPackageId(pkg.id);
    setPackageName(pkg.name);
    setPackageCategory(pkg.category || "kerala");
    setPackageState(pkg.state || "Kerala");
    setPackagePrice(pkg.price);
    setPackageOriginalPrice(pkg.originalPrice || "");
    setPackageDuration(pkg.duration);
    setPackageLocation(pkg.location);
    setPackageDesc(pkg.desc);
    setPackageImage(pkg.image);
    setPackageInclusions(pkg.inclusions ? pkg.inclusions.join(", ") : "");
    setIsPackageModalOpen(true);
  };

  const handleDeletePackageClick = async (id: string) => {
    if (confirm("Are you sure you want to delete this tour package?")) {
      await removeTourPackage(id);
      await loadAllAdminData();
    }
  };

  const resetPackageForm = () => {
    setEditingPackageId(null);
    setPackageName("");
    setPackageCategory("kerala");
    setPackageState("Kerala");
    setPackagePrice("₹4,999");
    setPackageOriginalPrice("₹6,999");
    setPackageDuration("2D | 1N");
    setPackageLocation("Munnar, Kerala");
    setPackageDesc("");
    setPackageImage("");
    setPackageInclusions("3-Star Resort Stay, Daily Breakfast, Private Cab");
  };

  // Enquiry status change
  const handleLeadStatusChange = async (id: string, newStatus: EnquiryLead["status"]) => {
    await updateEnquiryStatus(id, newStatus);
    await loadAllAdminData();
  };

  const handleDeleteLead = async (id: string) => {
    if (confirm("Delete this customer lead?")) {
      await deleteEnquiry(id);
      await loadAllAdminData();
    }
  };

  // Booking status change
  const handleBookingStatusChange = async (id: string, newStatus: Booking["status"]) => {
    await updateBookingStatus(id, newStatus);
    await loadAllAdminData();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-slate-900 border-b md:border-b-0 md:border-r border-slate-800 p-6 flex flex-col justify-between flex-shrink-0">
        <div>
          {/* Brand */}
          <Link href="/" className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 to-sky-400 flex items-center justify-center text-white shadow-glow">
              <Compass className="w-6 h-6" />
            </div>
            <div>
              <div className="text-lg font-black tracking-tight text-white">
                <span className="text-sky-400">SKY</span>QUEST
              </div>
              <p className="text-[10px] tracking-widest text-amber-400 uppercase font-bold">
                Admin Control
              </p>
            </div>
          </Link>

          {/* Nav Items */}
          <nav className="space-y-1.5">
            <button
              onClick={() => setActiveTab("overview")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                activeTab === "overview"
                  ? "bg-sky-500 text-white shadow-glow"
                  : "text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Overview & Stats</span>
            </button>

            <button
              onClick={() => setActiveTab("packages")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                activeTab === "packages"
                  ? "bg-sky-500 text-white shadow-glow"
                  : "text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              <Package className="w-4 h-4" />
              <span>Tour Packages ({packages.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("leads")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                activeTab === "leads"
                  ? "bg-sky-500 text-white shadow-glow"
                  : "text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Customer Leads ({enquiries.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("bookings")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                activeTab === "bookings"
                  ? "bg-sky-500 text-white shadow-glow"
                  : "text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              <CalendarCheck className="w-4 h-4" />
              <span>Trip Bookings ({bookings.length})</span>
            </button>
          </nav>
        </div>

        {/* Footer Actions */}
        <div className="pt-6 border-t border-slate-800 space-y-2 mt-6">
          <Link
            href="/quotation"
            className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold transition-all"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Generate Quotation</span>
          </Link>

          <Link
            href="/"
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-all"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>View Main Website</span>
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 border border-rose-800/40 text-xs font-medium transition-all"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Admin Area */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 border-b border-slate-800 pb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white capitalize">
              {activeTab === "overview" && "Dashboard Overview"}
              {activeTab === "packages" && "Tour Packages Manager"}
              {activeTab === "leads" && "Customer Leads & Enquiries"}
              {activeTab === "bookings" && "Booking Reservations"}
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Connected to Firebase Firestore & Storage • Real-time Sync
            </p>
          </div>

          {activeTab === "packages" && (
            <button
              onClick={() => {
                resetPackageForm();
                setIsPackageModalOpen(true);
              }}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold text-xs shadow-glow flex items-center gap-2 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Tour Package</span>
            </button>
          )}
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800">
                <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center mb-3">
                  <Package className="w-5 h-5" />
                </div>
                <p className="text-2xl font-black text-white">{packages.length}</p>
                <p className="text-xs text-slate-400 font-semibold mt-1">Active Tour Packages</p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-3">
                  <Users className="w-5 h-5" />
                </div>
                <p className="text-2xl font-black text-white">{enquiries.length}</p>
                <p className="text-xs text-slate-400 font-semibold mt-1">Customer Leads</p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3">
                  <CalendarCheck className="w-5 h-5" />
                </div>
                <p className="text-2xl font-black text-white">{bookings.length}</p>
                <p className="text-xs text-slate-400 font-semibold mt-1">Confirmed Bookings</p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800">
                <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center mb-3">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <p className="text-2xl font-black text-emerald-400">Online</p>
                <p className="text-xs text-slate-400 font-semibold mt-1">Firestore & Storage</p>
              </div>
            </div>

            {/* Recent Leads Preview */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-white">Recent Customer Inquiries</h3>
                <button
                  onClick={() => setActiveTab("leads")}
                  className="text-xs text-sky-400 hover:underline"
                >
                  View All Leads →
                </button>
              </div>

              {enquiries.length === 0 ? (
                <p className="text-xs text-slate-400 py-4">No inquiries yet.</p>
              ) : (
                <div className="space-y-3">
                  {enquiries.slice(0, 3).map((l) => (
                    <div
                      key={l.id}
                      className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-center justify-between gap-4"
                    >
                      <div>
                        <h4 className="text-xs font-bold text-white">{l.name}</h4>
                        <p className="text-[11px] text-sky-400">{l.packageName || "General Inquiry"}</p>
                        <p className="text-[10px] text-slate-400">{l.phone} • {l.email}</p>
                      </div>
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-sky-500/20 text-sky-300">
                        {l.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: PACKAGES MANAGER */}
        {activeTab === "packages" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {packages.map((pkg) => (
                <div
                  key={pkg.id}
                  className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden flex flex-col justify-between"
                >
                  <div className="relative h-44 bg-slate-800">
                    <img
                      src={pkg.image}
                      alt={pkg.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 right-3 flex gap-2">
                      <button
                        onClick={() => handleEditPackageClick(pkg)}
                        className="p-1.5 rounded-lg bg-slate-900/80 text-sky-400 hover:bg-slate-900 shadow-md"
                        title="Edit Package"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeletePackageClick(pkg.id)}
                        className="p-1.5 rounded-lg bg-slate-900/80 text-rose-400 hover:bg-slate-900 shadow-md"
                        title="Delete Package"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="p-5 flex-grow">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-sky-400">
                      {pkg.category} • {pkg.state}
                    </span>
                    <h3 className="text-base font-bold text-white mt-1 mb-2 line-clamp-1">
                      {pkg.name}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-2 mb-4">{pkg.desc}</p>
                    <div className="flex items-center justify-between text-xs pt-3 border-t border-slate-800">
                      <span className="font-extrabold text-sky-400 text-sm">{pkg.price}</span>
                      <span className="text-slate-400">{pkg.duration}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: CUSTOMER LEADS & ENQUIRIES */}
        {activeTab === "leads" && (
          <div className="space-y-4">
            {enquiries.length === 0 ? (
              <div className="p-12 text-center bg-slate-900 rounded-2xl border border-slate-800">
                <p className="text-slate-400 text-xs">No customer leads found.</p>
              </div>
            ) : (
              <div className="overflow-x-auto rounded-2xl bg-slate-900 border border-slate-800">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-800/80 text-slate-300 uppercase tracking-wider font-semibold">
                    <tr>
                      <th className="p-4">Customer</th>
                      <th className="p-4">Package</th>
                      <th className="p-4">Travel Date</th>
                      <th className="p-4">Message</th>
                      <th className="p-4">Status</th>
                      <th className="p-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-300">
                    {enquiries.map((lead) => (
                      <tr key={lead.id} className="hover:bg-slate-800/40">
                        <td className="p-4">
                          <p className="font-bold text-white">{lead.name}</p>
                          <p className="text-slate-400">{lead.phone}</p>
                          {lead.email && <p className="text-slate-500">{lead.email}</p>}
                        </td>
                        <td className="p-4 font-semibold text-sky-400">
                          {lead.packageName || "General Inquiry"}
                        </td>
                        <td className="p-4">{lead.travelDate || "Flexible"}</td>
                        <td className="p-4 max-w-xs truncate text-slate-400">
                          {lead.message || "—"}
                        </td>
                        <td className="p-4">
                          <select
                            value={lead.status}
                            onChange={(e) => handleLeadStatusChange(lead.id, e.target.value as any)}
                            className="px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700 text-xs font-semibold focus:outline-none"
                          >
                            <option value="new">New</option>
                            <option value="contacted">Contacted</option>
                            <option value="converted">Converted</option>
                            <option value="closed">Closed</option>
                          </select>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <a
                              href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, "")}`}
                              target="_blank"
                              rel="noreferrer"
                              className="p-1.5 rounded-lg bg-emerald-900/60 text-emerald-300 hover:bg-emerald-800"
                              title="Chat on WhatsApp"
                            >
                              💬
                            </a>
                            <button
                              onClick={() => handleDeleteLead(lead.id)}
                              className="p-1.5 rounded-lg bg-rose-950/60 text-rose-300 hover:bg-rose-900"
                              title="Delete Lead"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* TAB 4: BOOKINGS */}
        {activeTab === "bookings" && (
          <div className="space-y-4">
            {bookings.length === 0 ? (
              <div className="p-12 text-center bg-slate-900 rounded-2xl border border-slate-800">
                <p className="text-slate-400 text-xs">No active bookings found.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {bookings.map((b) => (
                  <div key={b.id} className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-slate-400">Booking ID: {b.id}</span>
                        <h3 className="text-base font-bold text-white">{b.customerName}</h3>
                      </div>
                      <select
                        value={b.status}
                        onChange={(e) => handleBookingStatusChange(b.id, e.target.value as any)}
                        className="px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700 text-xs font-semibold"
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>

                    <div className="text-xs text-slate-300 space-y-1">
                      <p><strong>Package:</strong> {b.packageName}</p>
                      <p><strong>Travel Date:</strong> {b.travelDate}</p>
                      <p><strong>Phone:</strong> {b.phone} | <strong>Email:</strong> {b.email}</p>
                      <p><strong>Total Amount:</strong> ₹{b.totalAmount}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Package Create/Edit Modal */}
      {isPackageModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-2xl rounded-3xl bg-slate-900 border border-slate-700 p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-white mb-4">
              {editingPackageId ? "Edit Tour Package" : "Create New Tour Package"}
            </h2>

            <form onSubmit={handleSavePackage} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Package Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Cochin – Munnar Tea Hills"
                    value={packageName}
                    onChange={(e) => setPackageName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Category</label>
                  <select
                    value={packageCategory}
                    onChange={(e) => setPackageCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white"
                  >
                    <option value="kerala">Kerala</option>
                    <option value="tamilnadu">Tamil Nadu</option>
                    <option value="karnataka">Karnataka</option>
                    <option value="honeymoon">Honeymoon Specials</option>
                    <option value="family">Family Vacations</option>
                    <option value="college">College IV & Groups</option>
                    <option value="international">International Tours</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Price (e.g. ₹4,999) *</label>
                  <input
                    type="text"
                    required
                    value={packagePrice}
                    onChange={(e) => setPackagePrice(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Original Price</label>
                  <input
                    type="text"
                    placeholder="₹6,999"
                    value={packageOriginalPrice}
                    onChange={(e) => setPackageOriginalPrice(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Duration *</label>
                  <input
                    type="text"
                    required
                    placeholder="2D | 1N"
                    value={packageDuration}
                    onChange={(e) => setPackageDuration(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Location Details</label>
                <input
                  type="text"
                  placeholder="Munnar, Kerala"
                  value={packageLocation}
                  onChange={(e) => setPackageLocation(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white"
                />
              </div>

              {/* Image Upload to Firebase Storage */}
              <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 space-y-2">
                <label className="block text-slate-300 font-semibold">
                  Tour Image (Firebase Storage Upload or URL)
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageFileChange}
                    className="text-xs text-slate-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-sky-500 file:text-white hover:file:bg-sky-400"
                  />
                  {uploadingImage && (
                    <span className="text-xs text-sky-400 flex items-center gap-1">
                      <Loader2 className="w-3 h-3 animate-spin" /> Uploading to Storage...
                    </span>
                  )}
                </div>
                <input
                  type="text"
                  placeholder="Or paste image URL (https://...)"
                  value={packageImage}
                  onChange={(e) => setPackageImage(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs mt-1"
                />
                {packageImage && (
                  <div className="mt-2 h-24 w-40 rounded-lg overflow-hidden border border-slate-700">
                    <img src={packageImage} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Package Description</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Description of the itinerary highlights..."
                  value={packageDesc}
                  onChange={(e) => setPackageDesc(e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Inclusions (Comma separated)</label>
                <input
                  type="text"
                  value={packageInclusions}
                  onChange={(e) => setPackageInclusions(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white"
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsPackageModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-bold shadow-md"
                >
                  {editingPackageId ? "Update Package" : "Save Package to Firestore"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
