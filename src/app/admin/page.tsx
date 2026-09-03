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
  LogOut,
  Plus,
  Trash2,
  Edit,
  ExternalLink,
  Search,
  Upload,
  CheckCircle2,
  Phone,
  Loader2,
  Sparkles,
  Info,
  Camera,
  Menu,
  X,
  Settings,
  Sliders,
  Copy,
  Check
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
  uploadTourImage,
  fetchSiteMediaSettings,
  saveSiteMediaSettings,
  fetchCloudinarySettings,
  saveCloudinarySettings,
  uploadToCloudinary,
  fetchGalleryItems,
  saveGalleryItem,
  deleteGalleryItem,
  DEFAULT_HERO_BG,
  DEFAULT_WHY_CHOOSE_IMG,
  DEFAULT_ABOUT_IMG
} from "@/lib/firebaseServices";
import { TourPackage, EnquiryLead, Booking, GalleryItem } from "@/lib/types";

export default function AdminPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"overview" | "packages" | "gallery" | "leads" | "bookings" | "media" | "settings">("overview");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Cloudinary Settings State
  const [cloudinaryCloudName, setCloudinaryCloudName] = useState("dciyanu4f");
  const [cloudinaryUploadPreset, setCloudinaryUploadPreset] = useState("skyquest_uploads");
  const [cloudinaryApiKey, setCloudinaryApiKey] = useState("");
  const [cloudinaryFolder, setCloudinaryFolder] = useState("skyquest");
  const [cloudinaryEnabled, setCloudinaryEnabled] = useState(true);
  const [cloudinarySaveSuccess, setCloudinarySaveSuccess] = useState(false);
  const [cloudinaryTestLoading, setCloudinaryTestLoading] = useState(false);
  const [cloudinaryTestResult, setCloudinaryTestResult] = useState<{ success: boolean; url?: string; error?: string } | null>(null);
  const [copiedCloudinaryUrl, setCopiedCloudinaryUrl] = useState(false);

  // Data States
  const [packages, setPackages] = useState<TourPackage[]>([]);
  const [enquiries, setEnquiries] = useState<EnquiryLead[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  // Captured Moments & Stories Gallery State
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
  const [editingGalleryId, setEditingGalleryId] = useState<string | null>(null);
  const [galleryTitle, setGalleryTitle] = useState("");
  const [galleryLocation, setGalleryLocation] = useState("");
  const [galleryCategory, setGalleryCategory] = useState("Moments");
  const [galleryImage, setGalleryImage] = useState("");
  const [uploadingGalleryImage, setUploadingGalleryImage] = useState(false);

  // Admin Packages Search & Filter
  const [adminPkgSearch, setAdminPkgSearch] = useState("");
  const [adminPkgCat, setAdminPkgCat] = useState("all");

  // Site Media Settings State
  const [heroBg, setHeroBg] = useState(DEFAULT_HERO_BG);
  const [heroBadge, setHeroBadge] = useState("100% CUSTOMIZED & SAFE TOUR PACKAGES");
  const [heroSubtitle, setHeroSubtitle] = useState("From the misty tea hills of Munnar to the pristine beaches of Bali & thrilling College IV trips, create memories that last forever.");
  const [whyChooseImg, setWhyChooseImg] = useState(DEFAULT_WHY_CHOOSE_IMG);
  const [aboutImg, setAboutImg] = useState(DEFAULT_ABOUT_IMG);
  
  const [uploadingHeroImage, setUploadingHeroImage] = useState(false);
  const [uploadingWhyChooseImage, setUploadingWhyChooseImage] = useState(false);
  const [uploadingAboutImage, setUploadingAboutImage] = useState(false);
  const [mediaSaveSuccess, setMediaSaveSuccess] = useState(false);
  const [mediaSaving, setMediaSaving] = useState(false);

  // Toast Notification State
  const [toast, setToast] = useState<{
    show: boolean;
    title: string;
    message: string;
    type: "success" | "error";
  }>({
    show: false,
    title: "Photo Upload",
    message: "Photo uploaded & saved to live website successfully!",
    type: "success"
  });

  const showToast = (title = "Photo Upload", message = "Photo uploaded successfully!", type: "success" | "error" = "success") => {
    setToast({ show: true, title, message, type });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, show: false }));
    }, 4000);
  };

  // New Package Modal / Form
  const [isPackageModalOpen, setIsPackageModalOpen] = useState(false);
  const [editingPackageId, setEditingPackageId] = useState<string | null>(null);
  const [packageName, setPackageName] = useState("");
  const [packageCategory, setPackageCategory] = useState("kerala");
  const [packageState, setPackageState] = useState("🌴 Kerala");
  const [packageDuration, setPackageDuration] = useState("2D | 1N");
  const [packageLocation, setPackageLocation] = useState("Munnar, Kerala");
  const [packageDesc, setPackageDesc] = useState("");
  const [packageImage, setPackageImage] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    if (!isAdminLoggedIn()) {
      router.push("/skyAdmin");
      return;
    }
    loadAllAdminData();
  }, [router]);

  const loadAllAdminData = async () => {
    setLoading(true);
    try {
      const [pkgs, leads, bks, media, cSettings, galItems] = await Promise.all([
        fetchAllPackages(),
        fetchEnquiries(),
        fetchBookings(),
        fetchSiteMediaSettings(),
        fetchCloudinarySettings(),
        fetchGalleryItems()
      ]);
      setPackages(pkgs);
      setEnquiries(leads);
      setBookings(bks);
      setGalleryItems(galItems);
      if (media) {
        setHeroBg(media.bgImage || DEFAULT_HERO_BG);
        setHeroBadge(media.badgeText || "100% CUSTOMIZED & SAFE TOUR PACKAGES");
        setHeroSubtitle(media.subtitle || "");
        setWhyChooseImg(media.whyChooseImage || DEFAULT_WHY_CHOOSE_IMG);
        setAboutImg(media.aboutImage || DEFAULT_ABOUT_IMG);
      }
      if (cSettings) {
        setCloudinaryCloudName(cSettings.cloudName || "dciyanu4f");
        setCloudinaryUploadPreset(cSettings.uploadPreset || "skyquest_uploads");
        setCloudinaryApiKey(cSettings.apiKey || "");
        setCloudinaryFolder(cSettings.folder || "skyquest");
        setCloudinaryEnabled(cSettings.enabled !== false);
      }
    } catch (err) {
      console.error("Error loading admin data:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await adminLogout();
    router.push("/skyAdmin");
  };

  // Cloudinary Settings Handlers
  const handleSaveCloudinarySettings = async (e: React.FormEvent) => {
    e.preventDefault();
    await saveCloudinarySettings({
      cloudName: cloudinaryCloudName,
      uploadPreset: cloudinaryUploadPreset,
      apiKey: cloudinaryApiKey,
      folder: cloudinaryFolder,
      enabled: cloudinaryEnabled
    });
    setCloudinarySaveSuccess(true);
    setTimeout(() => setCloudinarySaveSuccess(false), 3500);
  };

  const handleTestCloudinaryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setCloudinaryTestLoading(true);
    setCloudinaryTestResult(null);
    try {
      await saveCloudinarySettings({
        cloudName: cloudinaryCloudName,
        uploadPreset: cloudinaryUploadPreset,
        apiKey: cloudinaryApiKey,
        folder: cloudinaryFolder,
        enabled: true
      });
      const url = await uploadToCloudinary(file, cloudinaryFolder || "test-uploads");
      setCloudinaryTestResult({ success: true, url });
    } catch (err: any) {
      setCloudinaryTestResult({ success: false, error: err.message || "Cloudinary upload test failed" });
    } finally {
      setCloudinaryTestLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    if (typeof navigator !== "undefined") {
      navigator.clipboard.writeText(text);
      setCopiedCloudinaryUrl(true);
      setTimeout(() => setCopiedCloudinaryUrl(false), 2000);
    }
  };

  // Hero Background Upload to Firebase Storage
  const handleHeroImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingHeroImage(true);
    try {
      const downloadUrl = await uploadTourImage(file, "hero-banners");
      setHeroBg(downloadUrl);
      showToast("Photo Upload", "Hero wallpaper photo uploaded successfully!", "success");
    } catch (error) {
      showToast("Photo Upload Failed", "Error uploading image to Firebase Storage", "error");
    } finally {
      setUploadingHeroImage(false);
    }
  };

  // Why Choose Us Image Upload to Firebase Storage
  const handleWhyChooseImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingWhyChooseImage(true);
    try {
      const downloadUrl = await uploadTourImage(file, "why-choose");
      setWhyChooseImg(downloadUrl);
      showToast("Photo Upload", "Why Choose Us photo uploaded successfully!", "success");
    } catch (error) {
      showToast("Photo Upload Failed", "Error uploading image to Firebase Storage", "error");
    } finally {
      setUploadingWhyChooseImage(false);
    }
  };

  // About Section Photo Upload
  const handleAboutImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingAboutImage(true);
    try {
      const downloadUrl = await uploadTourImage(file, "about-feature");
      setAboutImg(downloadUrl);
      showToast("Photo Upload", "About section photo uploaded successfully!", "success");
    } catch (error) {
      showToast("Photo Upload Failed", "Error uploading image to Firebase Storage", "error");
    } finally {
      setUploadingAboutImage(false);
    }
  };

  // Save Media Settings
  const handleSaveMediaSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setMediaSaving(true);
    try {
      await saveSiteMediaSettings({
        bgImage: heroBg,
        badgeText: heroBadge,
        subtitle: heroSubtitle,
        whyChooseImage: whyChooseImg,
        aboutImage: aboutImg
      });
      setMediaSaveSuccess(true);
      setTimeout(() => setMediaSaveSuccess(false), 3000);
      showToast("Photo Upload", "Photo uploaded and saved to live website successfully!", "success");
    } catch (err) {
      console.error("Error saving media settings:", err);
      showToast("Photo Upload Failed", "Failed to save photos to live website", "error");
    } finally {
      setMediaSaving(false);
    }
  };

  // Image Upload to Firebase Storage for Package
  const handleImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const downloadUrl = await uploadTourImage(file, "tour-packages");
      setPackageImage(downloadUrl);
      showToast("Photo Upload", "Tour package photo uploaded successfully!", "success");
    } catch (error) {
      showToast("Photo Upload Failed", "Error uploading image to Firebase Storage", "error");
    } finally {
      setUploadingImage(false);
    }
  };

  // Package Save / Update
  const handleSavePackage = async (e: React.FormEvent) => {
    e.preventDefault();

    let stateTag = "🌴 Kerala";
    if (packageCategory === "tamilnadu") stateTag = "🛕 Tamil Nadu";
    if (packageCategory === "karnataka") stateTag = "🌄 Karnataka";

    const payload: Omit<TourPackage, "id"> & { id?: string } = {
      name: packageName,
      title: `${packageName} Tour`,
      state: stateTag,
      category: packageCategory,
      price: "",
      duration: packageDuration,
      location: packageLocation,
      desc: packageDesc || `${packageName} customized tour package.`,
      image: packageImage || "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=800&q=80",
      placesToVisit: [packageLocation],
      inclusions: ["3-Star Resort Stay", "Sightseeing Cab"],
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
    setPackageState(pkg.state || "🌴 Kerala");
    setPackageDuration(pkg.duration || "2D | 1N");
    setPackageLocation(pkg.location || "");
    setPackageDesc(pkg.desc || "");
    setPackageImage(pkg.image);
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
    setPackageState("🌴 Kerala");
    setPackageDuration("2D | 1N");
    setPackageLocation("Munnar, Kerala");
    setPackageDesc("");
    setPackageImage("");
  };

  // Captured Moments & Gallery Handlers
  const handleOpenAddGallery = () => {
    setEditingGalleryId(null);
    setGalleryTitle("");
    setGalleryLocation("");
    setGalleryCategory("Moments");
    setGalleryImage("");
    setIsGalleryModalOpen(true);
  };

  const handleEditGalleryClick = (item: GalleryItem) => {
    setEditingGalleryId(item.id);
    setGalleryTitle(item.title || "");
    setGalleryLocation(item.location || "");
    setGalleryCategory(item.category || "Moments");
    setGalleryImage(item.image);
    setIsGalleryModalOpen(true);
  };

  const handleGalleryImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingGalleryImage(true);
    try {
      const downloadUrl = await uploadTourImage(file, "gallery");
      setGalleryImage(downloadUrl);
      showToast("Photo Upload", "Gallery photo uploaded successfully!", "success");
    } catch (error) {
      showToast("Photo Upload Failed", "Error uploading image to Firebase Storage", "error");
    } finally {
      setUploadingGalleryImage(false);
    }
  };

  const handleSaveGalleryItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!galleryImage) {
      alert("Please upload or provide an image URL for the photo.");
      return;
    }

    const payload: Omit<GalleryItem, "id"> & { id?: string } = {
      title: galleryTitle || "Travel Moment",
      location: galleryLocation || "India",
      category: galleryCategory || "Moments",
      image: galleryImage,
      featured: true
    };

    if (editingGalleryId) {
      payload.id = editingGalleryId;
    }

    await saveGalleryItem(payload);
    setIsGalleryModalOpen(false);
    showToast("Photo Upload", "Captured Moments photo saved to live website!", "success");
    await loadAllAdminData();
  };

  const handleDeleteGalleryClick = async (id: string) => {
    if (confirm("Are you sure you want to delete this photo from Captured Moments?")) {
      await deleteGalleryItem(id);
      showToast("Photo Removed", "Photo removed from gallery", "info" as any);
      await loadAllAdminData();
    }
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

  // Filter packages for admin view
  const filteredAdminPackages = packages.filter((pkg) => {
    const matchesCat = adminPkgCat === "all" || pkg.category?.toLowerCase() === adminPkgCat.toLowerCase();
    const matchesSearch =
      adminPkgSearch.trim() === "" ||
      pkg.name.toLowerCase().includes(adminPkgSearch.toLowerCase()) ||
      pkg.location.toLowerCase().includes(adminPkgSearch.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row relative">
      {/* Photo Upload Toast Notification */}
      {toast.show && (
        <div
          role="status"
          aria-live="polite"
          className="fixed top-5 right-4 left-4 sm:left-auto sm:right-6 z-[100] flex items-center gap-3.5 px-5 py-4 rounded-2xl bg-slate-900/95 border border-emerald-500/50 text-white shadow-[0_10px_35px_rgba(16,185,129,0.3)] backdrop-blur-xl transition-all duration-300 animate-in fade-in slide-in-from-top-3 max-w-sm"
        >
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 border ${
              toast.type === "error"
                ? "bg-rose-500/20 text-rose-400 border-rose-500/30"
                : "bg-emerald-500/20 text-emerald-400 border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.3)]"
            }`}
          >
            {toast.type === "error" ? (
              <X className="w-5 h-5" />
            ) : (
              <CheckCircle2 className="w-5 h-5" />
            )}
          </div>
          <div className="flex-1 min-w-0 pr-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-wider text-emerald-400">
                {toast.title}
              </span>
              <span
                className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                  toast.type === "error"
                    ? "bg-rose-500/20 text-rose-300"
                    : "bg-emerald-500/20 text-emerald-300"
                }`}
              >
                {toast.type === "error" ? "Error" : "Success"}
              </span>
            </div>
            <p className="text-xs text-slate-200 mt-0.5 font-medium truncate sm:whitespace-normal">
              {toast.message}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setToast((prev) => ({ ...prev, show: false }))}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors flex-shrink-0"
            aria-label="Dismiss toast"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
      {/* Mobile Top Header (Visible on Mobile Only) */}
      <header className="md:hidden sticky top-0 z-40 bg-slate-900/95 backdrop-blur-xl border-b border-slate-800 px-4 py-3 flex items-center justify-between shadow-lg">
        <Link href="/" className="flex items-center gap-2.5">
          <img
            src="/images/logo.png"
            alt="Sky Quest Logo"
            className="w-auto h-7 object-contain"
          />
          <div>
            <div className="text-sm font-black tracking-tight text-white leading-none">
              <span className="text-sky-400">SKY</span>QUEST
            </div>
            <p className="text-[8px] tracking-wider text-amber-400 uppercase font-bold leading-none mt-0.5">
              Admin Portal
            </p>
          </div>
        </Link>

        <div className="flex items-center gap-2">
          <Link
            href="/quotation"
            className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs flex items-center gap-1 font-bold"
            title="Quotation Studio"
          >
            <Sparkles className="w-3.5 h-3.5" />
          </Link>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-xl bg-slate-800 text-slate-200 border border-slate-700 hover:bg-slate-700 transition-colors"
            aria-label="Toggle Mobile Menu"
          >
            {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* Mobile Horizontal Sub-Navigation Tab Bar (Instant Switch on Mobile) */}
      <div className="md:hidden sticky top-[53px] z-30 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 px-3 py-2 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
        {[
          { id: "overview", label: "Overview", icon: LayoutDashboard },
          { id: "packages", label: `Packages (${packages.length})`, icon: Package },
          { id: "gallery", label: `Moments (${galleryItems.length})`, icon: Camera },
          { id: "media", label: "Media", icon: ImageIcon },
          { id: "leads", label: `Leads (${enquiries.length})`, icon: Users },
          { id: "bookings", label: `Bookings (${bookings.length})`, icon: CalendarCheck },
          { id: "settings", label: "Settings", icon: Settings }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id as any);
                setIsMobileMenuOpen(false);
              }}
              className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                isActive
                  ? "bg-sky-500 text-white shadow-glow"
                  : "bg-slate-900 text-slate-400 border border-slate-800"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
        <Link
          href="/quotation"
          className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all bg-amber-500/15 text-amber-300 border border-amber-500/30 hover:bg-amber-500/25"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Quotation</span>
        </Link>
      </div>

      {/* Mobile Slide-Over Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black/70 backdrop-blur-sm animate-fade-in" onClick={() => setIsMobileMenuOpen(false)}>
          <div
            className="absolute top-0 right-0 w-4/5 max-w-xs h-full bg-slate-900 border-l border-slate-800 p-6 flex flex-col justify-between overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2.5">
                  <img src="/images/logo.png" alt="Logo" className="h-7 w-auto object-contain" />
                  <span className="font-bold text-white text-sm">Menu Navigation</span>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-1.5">
                {[
                  { id: "overview", label: "Overview & Stats", icon: LayoutDashboard },
                  { id: "packages", label: `Tour Packages (${packages.length})`, icon: Package },
                  { id: "gallery", label: `Captured Moments (${galleryItems.length})`, icon: Camera },
                  { id: "media", label: "Site Media & Banners", icon: ImageIcon },
                  { id: "leads", label: `Customer Leads (${enquiries.length})`, icon: Users },
                  { id: "bookings", label: `Trip Bookings (${bookings.length})`, icon: CalendarCheck },
                  { id: "settings", label: "Cloudinary Settings", icon: Settings }
                ].map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => {
                        setActiveTab(tab.id as any);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all text-left ${
                        isActive
                          ? "bg-sky-500 text-white shadow-glow"
                          : "text-slate-400 hover:bg-slate-800 hover:text-white"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}

                {/* Quotation Option in Mobile Slide Bar */}
                <Link
                  href="/quotation"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold transition-all text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30"
                >
                  <div className="flex items-center gap-3">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>Quotation</span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-semibold uppercase tracking-wider">
                    Studio
                  </span>
                </Link>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-800 space-y-2">
              <Link
                href="/quotation"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-amber-500/15 text-amber-300 border border-amber-500/30 text-xs font-bold hover:bg-amber-500/25 transition-all"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Quotation (Studio)</span>
              </Link>

              <Link
                href="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-medium"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>View Main Website</span>
              </Link>

              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-rose-950/40 text-rose-300 border border-rose-800/40 text-xs font-medium"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Sidebar (Hidden on Mobile) */}
      <aside className="hidden md:flex md:w-64 bg-slate-900 border-r border-slate-800 p-6 flex-col justify-between flex-shrink-0 min-h-screen sticky top-0 h-screen overflow-y-auto">
        <div>
          {/* Brand */}
          <Link href="/" className="flex items-center gap-3 mb-8 group">
            <img
              src="/images/logo.png"
              alt="Sky Quest Logo"
              width={42}
              height={42}
              style={{ width: "auto", height: "40px", objectFit: "contain" }}
              className="transition-transform group-hover:scale-105"
            />
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
              <span>Tour Packages & Images ({packages.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("gallery")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                activeTab === "gallery"
                  ? "bg-sky-500 text-white shadow-glow"
                  : "text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              <Camera className="w-4 h-4" />
              <span>Captured Moments ({galleryItems.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("media")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                activeTab === "media"
                  ? "bg-sky-500 text-white shadow-glow"
                  : "text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              <ImageIcon className="w-4 h-4" />
              <span>Site Media & Banners</span>
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

            <button
              onClick={() => setActiveTab("settings")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                activeTab === "settings"
                  ? "bg-sky-500 text-white shadow-glow"
                  : "text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>Settings (Cloudinary)</span>
            </button>

            {/* Quotation in Sidebar Navigation */}
            <Link
              href="/quotation"
              className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold transition-all text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 shadow-sm group"
            >
              <div className="flex items-center gap-3">
                <Sparkles className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                <span>Quotation</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-semibold uppercase tracking-wider">
                Studio
              </span>
            </Link>
          </nav>
        </div>

        {/* Footer Actions */}
        <div className="pt-6 border-t border-slate-800 space-y-2 mt-6">
          <Link
            href="/quotation"
            className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/30 text-xs font-bold transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Quotation (Studio)</span>
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
      <main className="flex-1 p-4 sm:p-6 md:p-10 overflow-y-auto">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 border-b border-slate-800 pb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white capitalize">
              {activeTab === "overview" && "Dashboard Overview"}
              {activeTab === "packages" && "Tour Packages & Image Studio"}
              {activeTab === "gallery" && "Captured Moments & Gallery Studio"}
              {activeTab === "media" && "Site Media & Images Studio"}
              {activeTab === "leads" && "Customer Leads & Enquiries"}
              {activeTab === "bookings" && "Booking Reservations"}
              {activeTab === "settings" && "Cloudinary Settings"}
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

          {activeTab === "gallery" && (
            <button
              onClick={handleOpenAddGallery}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 hover:from-amber-400 hover:to-orange-400 text-white font-bold text-xs shadow-glow flex items-center gap-2 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Gallery Photo</span>
            </button>
          )}
        </div>

        {/* TAB 2: PACKAGES MANAGER & IMAGE STUDIO */}
        {activeTab === "packages" && (
          <div className="space-y-6">
            {/* Search and Category Filter Toolbar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900 border border-slate-800">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search package name (e.g. Munnar, Ooty, Coorg...)"
                  value={adminPkgSearch}
                  onChange={(e) => setAdminPkgSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:outline-none focus:border-sky-500"
                />
              </div>

              <div className="flex items-center gap-2">
                {[
                  { id: "all", label: "All" },
                  { id: "tamilnadu", label: "🛕 Tamil Nadu" },
                  { id: "kerala", label: "🌴 Kerala" },
                  { id: "karnataka", label: "🌄 Karnataka" }
                ].map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setAdminPkgCat(c.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      adminPkgCat === c.id
                        ? "bg-sky-500 text-white"
                        : "bg-slate-800 text-slate-400 hover:text-white"
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Packages Grid with Edit / Photo Change Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAdminPackages.map((pkg) => (
                <div
                  key={pkg.id}
                  className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden flex flex-col justify-between shadow-lg group"
                >
                  <div className="relative h-48 bg-slate-800 overflow-hidden">
                    <img
                      src={pkg.image}
                      alt={pkg.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/30" />

                    {/* Quick Change Photo Button */}
                    <button
                      onClick={() => handleEditPackageClick(pkg)}
                      className="absolute bottom-3 left-3 px-3 py-1.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-white text-xs font-bold flex items-center gap-1.5 shadow-md transition-all"
                    >
                      <Camera className="w-3.5 h-3.5" />
                      <span>Change Photo</span>
                    </button>

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
                      {pkg.state || "🌴 Kerala"}
                    </span>
                    <h3 className="text-base font-bold text-white mt-1 mb-2 line-clamp-1">
                      {pkg.name}
                    </h3>
                    <div className="flex items-center justify-between text-xs pt-3 border-t border-slate-800">
                      <span className="font-semibold text-slate-300">📅 {pkg.duration}</span>
                      <span className="text-slate-400">{pkg.location}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB: CAPTURED MOMENTS & GALLERY STUDIO */}
        {activeTab === "gallery" && (
          <div className="space-y-6">
            {/* Gallery Info Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-900 border border-slate-800">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400">
                  <Camera className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Live Website "Captured Moments & Stories"</h3>
                  <p className="text-xs text-slate-400">
                    Photos uploaded here update the homepage gallery and the dedicated /gallery album page in real-time.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1.5 rounded-xl bg-slate-800 text-amber-300 text-xs font-bold border border-slate-700">
                  Total Photos: {galleryItems.length}
                </span>
                <Link
                  href="/gallery"
                  target="_blank"
                  className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-sky-400 text-xs font-semibold flex items-center gap-1.5 transition-colors border border-slate-700"
                >
                  <span>View Live Page</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Gallery Grid */}
            {galleryItems.length === 0 ? (
              <div className="p-16 text-center bg-slate-900 rounded-3xl border border-slate-800 space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center mx-auto text-slate-500">
                  <Camera className="w-6 h-6" />
                </div>
                <p className="text-slate-300 font-bold text-sm">No photos in Captured Moments yet.</p>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Click the "+ Add New Gallery Photo" button above to upload photos to Firebase Storage.
                </p>
                <button
                  onClick={handleOpenAddGallery}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-bold text-xs"
                >
                  + Upload First Photo
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {galleryItems.map((item) => (
                  <div
                    key={item.id}
                    className="group rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-lg flex flex-col justify-between hover:border-slate-700 transition-all"
                  >
                    <div className="relative h-52 bg-slate-950 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title || "Gallery Moment"}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />

                      {/* Action buttons on top */}
                      <div className="absolute top-3 right-3 flex items-center gap-1.5">
                        <button
                          onClick={() => handleEditGalleryClick(item)}
                          className="p-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-900 text-sky-400 shadow-md backdrop-blur-xs transition-colors"
                          title="Edit Photo Info"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteGalleryClick(item.id)}
                          className="p-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-900 text-rose-400 shadow-md backdrop-blur-xs transition-colors"
                          title="Delete Photo"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Location Badge bottom left */}
                      {item.location && (
                        <span className="absolute bottom-2.5 left-3 text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-900/90 text-amber-300 border border-slate-700/60 backdrop-blur-xs">
                          📍 {item.location}
                        </span>
                      )}
                    </div>

                    <div className="p-4 flex items-center justify-between gap-2">
                      <div className="min-w-0 flex-1">
                        <h4 className="text-xs font-bold text-white truncate">
                          {item.title || "Travel Moment"}
                        </h4>
                        <span className="text-[10px] text-slate-400 font-medium">
                          {item.category || "Captured Moment"}
                        </span>
                      </div>
                      <button
                        onClick={() => handleEditGalleryClick(item)}
                        className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-semibold flex-shrink-0 transition-colors"
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB: MEDIA & IMAGES STUDIO */}
        {activeTab === "media" && (
          <div className="max-w-4xl space-y-8">
            <form onSubmit={handleSaveMediaSettings} className="space-y-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-white">Homepage Photos & Media Control</h2>
                  <p className="text-xs text-slate-400">
                    Upload images to Firebase Storage or paste image URLs to update the live website.
                  </p>
                </div>
                {mediaSaveSuccess && (
                  <span className="px-4 py-1.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-xs font-bold flex items-center gap-1.5 shadow-md">
                    <CheckCircle2 className="w-4 h-4" /> All Changes Saved Live!
                  </span>
                )}
              </div>

              {/* CARD 1: HERO BACKGROUND */}
              <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
                <div className="flex items-center gap-2.5 border-b border-slate-800 pb-3">
                  <div className="p-2 rounded-xl bg-sky-500/20 text-sky-400">
                    <ImageIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">1. Hero Section Wallpaper Background</h3>
                    <p className="text-[11px] text-slate-400">The main banner at the top of the homepage</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                  <div className="space-y-3 text-xs">
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1.5">
                        Upload Hero Photo (Firebase Storage)
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleHeroImageUpload}
                        className="text-xs text-slate-400 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-sky-500 file:text-white hover:file:bg-sky-400 cursor-pointer"
                      />
                      {uploadingHeroImage && (
                        <span className="text-xs text-sky-400 flex items-center gap-1 mt-1 font-semibold">
                          <Loader2 className="w-3.5 h-3.5 animate-spin" /> Uploading to Storage...
                        </span>
                      )}
                    </div>

                    <div>
                      <label className="block text-slate-400 mb-1">Or direct Image URL:</label>
                      <input
                        type="text"
                        value={heroBg}
                        onChange={(e) => setHeroBg(e.target.value)}
                        className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white font-mono text-xs focus:outline-none focus:border-sky-500"
                      />
                    </div>
                  </div>

                  {/* Preview */}
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Live Preview:</p>
                    <div className="relative h-44 rounded-2xl overflow-hidden border border-slate-700 bg-slate-950 flex items-center justify-center p-4 text-center">
                      <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url('${heroBg}')` }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-white/75 via-white/85 to-slate-50/95" />
                      <div className="relative z-10">
                        <h4 className="text-sm font-black text-slate-900">
                          Explore the World with <span className="text-sky-600">Sky Quest Holidays</span>
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* CARD 2: WHY CHOOSE US IMAGE */}
              <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
                <div className="flex items-center gap-2.5 border-b border-slate-800 pb-3">
                  <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">2. &ldquo;Why Hundreds of Travelers Choose Us&rdquo; Photo</h3>
                    <p className="text-[11px] text-slate-400">Featured visual image in the Why Choose Us section</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                  <div className="space-y-3 text-xs">
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1.5">
                        Upload Section Photo (Firebase Storage)
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleWhyChooseImageUpload}
                        className="text-xs text-slate-400 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-amber-500 file:text-white hover:file:bg-amber-400 cursor-pointer"
                      />
                      {uploadingWhyChooseImage && (
                        <span className="text-xs text-amber-400 flex items-center gap-1 mt-1 font-semibold">
                          <Loader2 className="w-3.5 h-3.5 animate-spin" /> Uploading to Storage...
                        </span>
                      )}
                    </div>

                    <div>
                      <label className="block text-slate-400 mb-1">Or direct Image URL:</label>
                      <input
                        type="text"
                        value={whyChooseImg}
                        onChange={(e) => setWhyChooseImg(e.target.value)}
                        className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white font-mono text-xs focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>

                  {/* Preview */}
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Section Preview:</p>
                    <div className="relative h-44 rounded-2xl overflow-hidden border border-slate-700 bg-slate-950">
                      <img
                        src={whyChooseImg || DEFAULT_WHY_CHOOSE_IMG}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* CARD 3: ABOUT US FEATURED PHOTO */}
              <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
                <div className="flex items-center gap-2.5 border-b border-slate-800 pb-3">
                  <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
                    <Info className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">3. &ldquo;About Sky Quest Holidays&rdquo; Featured Photo</h3>
                    <p className="text-[11px] text-slate-400">The main prominent visual photo displayed in the About Us section</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                  <div className="space-y-3 text-xs">
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1.5">
                        Upload About Photo (Firebase Storage)
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleAboutImageUpload}
                        className="text-xs text-slate-400 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-emerald-500 file:text-white hover:file:bg-emerald-400 cursor-pointer"
                      />
                      {uploadingAboutImage && (
                        <span className="text-xs text-emerald-400 flex items-center gap-1 mt-1 font-semibold">
                          <Loader2 className="w-3.5 h-3.5 animate-spin" /> Uploading to Storage...
                        </span>
                      )}
                    </div>

                    <div>
                      <label className="block text-slate-400 mb-1">Or direct Image URL:</label>
                      <input
                        type="text"
                        value={aboutImg}
                        onChange={(e) => setAboutImg(e.target.value)}
                        className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white font-mono text-xs focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  </div>

                  {/* Preview */}
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">About Photo Preview:</p>
                    <div className="relative h-44 rounded-2xl overflow-hidden border border-slate-700 bg-slate-950">
                      <img
                        src={aboutImg || DEFAULT_ABOUT_IMG}
                        alt="About Us Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* SAVE ACTION */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={mediaSaving}
                  className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold text-xs shadow-glow transition-all flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                >
                  {mediaSaving ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Sparkles className="w-4 h-4" />
                  )}
                  <span>{mediaSaving ? "Saving Photo Upload..." : "Save All Media Photos to Live Website"}</span>
                </button>
              </div>
            </form>
          </div>
        )}

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

            {/* Quick Packages Access Card */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-4">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Package className="w-4 h-4 text-sky-400" />
                  <span>Tour Packages & Image Manager</span>
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Change photos, destination titles, and details for all {packages.length} tour packages in real-time.
                </p>
              </div>
              <button
                onClick={() => setActiveTab("packages")}
                className="px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-bold text-xs shadow-md"
              >
                Manage Packages & Photos →
              </button>
            </div>

            {/* Quick Gallery Access Card */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-4">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Camera className="w-4 h-4 text-amber-400" />
                  <span>Captured Moments & Stories Gallery</span>
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Upload, view, and manage photos displayed in the live homepage gallery and /gallery page ({galleryItems.length} photos).
                </p>
              </div>
              <button
                onClick={() => setActiveTab("gallery")}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md"
              >
                Manage Gallery Photos →
              </button>
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
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 6: SETTINGS (CLOUDINARY API & MEDIA UPLOAD)           */}
        {/* ========================================================= */}
        {activeTab === "settings" && (
          <div className="space-y-8 animate-fade-in max-w-4xl">
            {/* Header Banner */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
              <div>
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20">
                    <Sliders className="w-5 h-5" />
                  </div>
                  <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                    Cloudinary API & Media Settings
                  </h1>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Manage your Cloudinary account for high-speed CDN photo uploads across Tour Packages and Site Banners.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border ${
                  cloudinaryCloudName && cloudinaryUploadPreset
                    ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                    : "bg-amber-500/10 text-amber-400 border-amber-500/30"
                }`}>
                  <span className={`w-2 h-2 rounded-full ${
                    cloudinaryCloudName && cloudinaryUploadPreset ? "bg-emerald-400 animate-pulse" : "bg-amber-400"
                  }`} />
                  <span>{cloudinaryCloudName && cloudinaryUploadPreset ? "Cloudinary API Active" : "Config Required"}</span>
                </span>
              </div>
            </div>

            {cloudinarySaveSuccess && (
              <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-2 animate-in fade-in">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Cloudinary Settings saved successfully to Firestore & local storage!</span>
              </div>
            )}

            {/* Cloudinary Configuration Form */}
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-sm font-black uppercase tracking-wider text-white">
                    Cloudinary Credentials
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Images uploaded in Tour Packages or Media banners will directly upload to your Cloudinary storage.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-300">
                    <input
                      type="checkbox"
                      checked={cloudinaryEnabled}
                      onChange={(e) => setCloudinaryEnabled(e.target.checked)}
                      className="w-4 h-4 rounded text-sky-500 focus:ring-sky-500 focus:ring-offset-slate-900"
                    />
                    <span>Enable Cloudinary</span>
                  </label>
                </div>
              </div>

              <form onSubmit={handleSaveCloudinarySettings} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-300 font-bold mb-1.5">
                      Cloud Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. dciyanu4f"
                      value={cloudinaryCloudName}
                      onChange={(e) => setCloudinaryCloudName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white font-mono text-xs focus:border-sky-500 focus:outline-none"
                    />
                    <p className="text-[11px] text-slate-500 mt-1">
                      Found in your Cloudinary Dashboard under <strong>Cloud name</strong>.
                    </p>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-bold mb-1.5">
                      Upload Preset (Unsigned) *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. skyquest_uploads"
                      value={cloudinaryUploadPreset}
                      onChange={(e) => setCloudinaryUploadPreset(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white font-mono text-xs focus:border-sky-500 focus:outline-none"
                    />
                    <p className="text-[11px] text-slate-500 mt-1">
                      Created in Settings &gt; Upload &gt; Upload presets (Signing Mode: <strong>Unsigned</strong>).
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-300 font-bold mb-1.5">
                      Target Folder (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. skyquest"
                      value={cloudinaryFolder}
                      onChange={(e) => setCloudinaryFolder(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white font-mono text-xs focus:border-sky-500 focus:outline-none"
                    />
                    <p className="text-[11px] text-slate-500 mt-1">
                      All uploaded photos will be organized in this folder inside Cloudinary.
                    </p>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-bold mb-1.5">
                      API Key (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 849382910482918"
                      value={cloudinaryApiKey}
                      onChange={(e) => setCloudinaryApiKey(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white font-mono text-xs focus:border-sky-500 focus:outline-none"
                    />
                    <p className="text-[11px] text-slate-500 mt-1">
                      Optional reference for your Cloudinary account.
                    </p>
                  </div>
                </div>

                <div className="pt-3 flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all active:scale-95"
                  >
                    Save Cloudinary Settings
                  </button>
                </div>
              </form>
            </div>

            {/* Test Upload Sandbox */}
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-black uppercase tracking-wider text-white flex items-center gap-2">
                    <Camera className="w-4 h-4 text-sky-400" />
                    <span>Test Cloudinary Image Upload</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Upload an image file here to immediately test that your Cloudinary configuration works.
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-800/60 border border-slate-700/80 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleTestCloudinaryUpload}
                    disabled={cloudinaryTestLoading}
                    className="text-xs text-slate-300 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-sky-500 file:text-white hover:file:bg-sky-400 cursor-pointer disabled:opacity-50"
                  />
                  {cloudinaryTestLoading && (
                    <span className="text-xs text-sky-400 flex items-center gap-2 font-bold animate-pulse">
                      <Loader2 className="w-4 h-4 animate-spin" /> Uploading to Cloudinary API...
                    </span>
                  )}
                </div>

                {/* Upload Test Result */}
                {cloudinaryTestResult && (
                  <div className="pt-2">
                    {cloudinaryTestResult.success && cloudinaryTestResult.url ? (
                      <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/40 space-y-3">
                        <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Upload Successful! Image hosted on Cloudinary CDN:</span>
                        </div>

                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                          <img
                            src={cloudinaryTestResult.url}
                            alt="Uploaded preview"
                            className="w-20 h-20 object-cover rounded-xl border border-slate-700 flex-shrink-0"
                          />
                          <div className="flex-1 w-full min-w-0 space-y-1.5">
                            <input
                              type="text"
                              readOnly
                              value={cloudinaryTestResult.url}
                              className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 text-xs font-mono select-all"
                            />
                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() => copyToClipboard(cloudinaryTestResult.url!)}
                                className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-all"
                              >
                                {copiedCloudinaryUrl ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                                <span>{copiedCloudinaryUrl ? "Copied!" : "Copy URL"}</span>
                              </button>
                              <a
                                href={cloudinaryTestResult.url}
                                target="_blank"
                                rel="noreferrer"
                                className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-sky-400 text-xs font-semibold flex items-center gap-1.5 transition-all"
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                                <span>Open Image</span>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="p-4 rounded-xl bg-rose-950/50 border border-rose-500/40 text-rose-300 text-xs font-semibold">
                        ❌ Upload failed: {cloudinaryTestResult.error}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Quick 1-Minute Cloudinary Setup Guide */}
            <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800/80 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
                <Info className="w-4 h-4" />
                <span>Quick Cloudinary Setup Guide (1 Minute)</span>
              </h3>
              <ol className="list-decimal list-inside space-y-2 text-xs text-slate-300 leading-relaxed">
                <li>
                  Sign in or create a free account at{" "}
                  <a href="https://cloudinary.com" target="_blank" rel="noreferrer" className="text-sky-400 underline font-semibold">
                    cloudinary.com
                  </a>.
                </li>
                <li>
                  Copy your <strong>Cloud name</strong> from the Cloudinary dashboard header and paste it in the field above.
                </li>
                <li>
                  In Cloudinary, go to <strong>Settings (gear icon) &gt; Upload</strong>. Scroll down to <strong>Upload presets</strong>, click <strong>Add upload preset</strong>, set <em>Signing Mode</em> to <strong>Unsigned</strong>, enter a name (e.g. <code>skyquest_uploads</code>) and click Save.
                </li>
                <li>
                  Paste that name into <strong>Upload Preset</strong> above and click <strong>Save Cloudinary Settings</strong>.
                </li>
              </ol>
            </div>
          </div>
        )}
      </main>

      {/* Package Create/Edit Modal with Photo Upload & Preview */}
      {isPackageModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-2xl rounded-3xl bg-slate-900 border border-slate-700 p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-white mb-4">
              {editingPackageId ? "Edit Tour Package & Photo" : "Create New Tour Package"}
            </h2>

            <form onSubmit={handleSavePackage} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Destination Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Cochin – Munnar"
                    value={packageName}
                    onChange={(e) => setPackageName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white font-medium"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">State / Category</label>
                  <select
                    value={packageCategory}
                    onChange={(e) => setPackageCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white"
                  >
                    <option value="kerala">🌴 Kerala</option>
                    <option value="tamilnadu">🛕 Tamil Nadu</option>
                    <option value="karnataka">🌄 Karnataka</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Duration (e.g. 2D | 1N) *</label>
                  <input
                    type="text"
                    required
                    placeholder="2D | 1N"
                    value={packageDuration}
                    onChange={(e) => setPackageDuration(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white"
                  />
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
              </div>

              {/* Image Upload to Firebase Storage with Live Preview */}
              <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-3">
                <label className="block text-slate-200 font-bold">
                  📸 Tour Package Image (Firebase Storage Upload or URL)
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageFileChange}
                    className="text-xs text-slate-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-sky-500 file:text-white hover:file:bg-sky-400 cursor-pointer"
                  />
                  {uploadingImage && (
                    <span className="text-xs text-sky-400 flex items-center gap-1 font-semibold">
                      <Loader2 className="w-3.5 h-3.5 animate-spin" /> Uploading to Storage...
                    </span>
                  )}
                </div>
                
                <div>
                  <label className="block text-slate-400 mb-1">Or direct Image URL:</label>
                  <input
                    type="text"
                    placeholder="https://images.unsplash.com/..."
                    value={packageImage}
                    onChange={(e) => setPackageImage(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono text-xs"
                  />
                </div>

                {packageImage && (
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase block mb-1">Image Preview:</span>
                    <div className="h-36 w-full rounded-xl overflow-hidden border border-slate-700 bg-slate-950">
                      <img src={packageImage} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  </div>
                )}
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
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold shadow-md"
                >
                  {editingPackageId ? "Update & Save to Firestore" : "Save New Package"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* GALLERY PHOTO MODAL */}
      {isGalleryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-lg rounded-3xl bg-slate-900 border border-slate-700 p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-5">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
                  <Camera className="w-4 h-4" />
                </div>
                <h2 className="text-base font-bold text-white">
                  {editingGalleryId ? "Edit Captured Moment Photo" : "Upload New Gallery Photo"}
                </h2>
              </div>
              <button
                onClick={() => setIsGalleryModalOpen(false)}
                className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveGalleryItem} className="space-y-4 text-xs">
              {/* Image upload box */}
              <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-3">
                <label className="block text-slate-200 font-bold">
                  📸 Photo (Firebase Storage Upload or URL) *
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleGalleryImageFileChange}
                    className="text-xs text-slate-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-amber-500 file:text-slate-950 hover:file:bg-amber-400 cursor-pointer"
                  />
                  {uploadingGalleryImage && (
                    <span className="text-xs text-amber-400 flex items-center gap-1 font-semibold">
                      <Loader2 className="w-3.5 h-3.5 animate-spin" /> Uploading to Storage...
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Or direct Image URL:</label>
                  <input
                    type="text"
                    placeholder="https://images.unsplash.com/... or data:image/..."
                    value={galleryImage}
                    onChange={(e) => setGalleryImage(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono text-xs focus:outline-none focus:border-amber-500"
                  />
                </div>

                {galleryImage && (
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase block mb-1">Photo Preview:</span>
                    <div className="h-44 w-full rounded-xl overflow-hidden border border-slate-700 bg-slate-950">
                      <img src={galleryImage} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Photo Title / Story (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Munnar Tea Hills College Group"
                  value={galleryTitle}
                  onChange={(e) => setGalleryTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Location Tag</label>
                  <input
                    type="text"
                    placeholder="e.g. Munnar, Kerala"
                    value={galleryLocation}
                    onChange={(e) => setGalleryLocation(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Category / Tag</label>
                  <input
                    type="text"
                    placeholder="e.g. Nature, Kerala, IV Tour"
                    value={galleryCategory}
                    onChange={(e) => setGalleryCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white"
                  />
                </div>
              </div>

              <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsGalleryModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploadingGalleryImage || !galleryImage}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold shadow-md disabled:opacity-50 cursor-pointer"
                >
                  {editingGalleryId ? "Update Gallery Photo" : "Save Photo to Gallery"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
