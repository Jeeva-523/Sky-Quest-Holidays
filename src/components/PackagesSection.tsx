"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Sparkles, RefreshCw } from "lucide-react";
import { TourPackage } from "@/lib/types";
import { fetchAllPackages } from "@/lib/firebaseServices";
import PackageCard from "./PackageCard";
import BookingModal from "./BookingModal";

export default function PackagesSection() {
  const [packages, setPackages] = useState<TourPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activePackageForBooking, setActivePackageForBooking] = useState<TourPackage | null>(null);

  useEffect(() => {
    loadPackagesData();
  }, []);

  const loadPackagesData = async () => {
    setLoading(true);
    try {
      const data = await fetchAllPackages();
      setPackages(data);
    } catch (error) {
      console.error("Error loading packages:", error);
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: "all", label: "✨ All Destinations" },
    { id: "tamilnadu", label: "🛕 Tamil Nadu" },
    { id: "kerala", label: "🌴 Kerala" },
    { id: "karnataka", label: "🌄 Karnataka" },
    { id: "honeymoon", label: "❤️ Honeymoon" },
    { id: "college", label: "🎓 College IV" },
    { id: "international", label: "✈️ International" }
  ];

  const filteredPackages = packages.filter((pkg) => {
    const matchesCategory =
      selectedCategory === "all" ||
      pkg.category?.toLowerCase() === selectedCategory.toLowerCase() ||
      pkg.state?.toLowerCase().includes(selectedCategory.toLowerCase());

    const matchesSearch =
      searchQuery.trim() === "" ||
      pkg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pkg.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pkg.desc.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <section id="packages" className="py-20 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
              Our Tour Packages
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              From stays and transport to local sightseeing, we&apos;ve got your entire trip sorted.
            </p>
          </div>

          <Link
            href="/#contact"
            className="self-start md:self-auto px-6 py-3 rounded-xl bg-gradient-to-r from-sky-600 to-sky-700 hover:from-sky-500 hover:to-sky-600 text-white font-bold text-xs uppercase tracking-wider shadow-md glow-btn transition-all"
          >
            Enquire Now
          </Link>
        </div>

        {/* Search Bar & Filter Tabs */}
        <div className="mb-10 space-y-4">
          <div className="max-w-md relative">
            <Search className="absolute left-4 top-3.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search destination (Munnar, Ooty, Goa, Coorg...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-sky-500 shadow-sm"
            />
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {tabs.map((tab) => {
              const active = selectedCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedCategory(tab.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                    active
                      ? "bg-sky-600 text-white shadow-md"
                      : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Packages Grid */}
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center gap-3">
            <RefreshCw className="w-8 h-8 text-sky-600 animate-spin" />
            <p className="text-xs text-slate-500">Loading tour packages...</p>
          </div>
        ) : filteredPackages.length === 0 ? (
          <div className="py-16 text-center bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
            <p className="text-lg font-bold text-slate-800 mb-1">Choose Your Destination</p>
            <p className="text-xs text-slate-500 mb-4">
              Select Kerala, Karnataka or Tamil Nadu above to explore our curated packages.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("all");
                setSearchQuery("");
              }}
              className="px-4 py-2 rounded-xl bg-sky-600 text-white text-xs font-bold"
            >
              Reset Filter
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPackages.map((pkg) => (
              <PackageCard
                key={pkg.id}
                pkg={pkg}
                onBook={(selected) => setActivePackageForBooking(selected)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Booking Enquiry Modal */}
      <BookingModal
        pkg={activePackageForBooking}
        isOpen={Boolean(activePackageForBooking)}
        onClose={() => setActivePackageForBooking(null)}
      />
    </section>
  );
}
