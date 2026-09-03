"use client";

import React, { useState, useEffect } from "react";
import { Search, Sparkles, Filter, RefreshCw } from "lucide-react";
import { TourPackage } from "@/lib/types";
import { CATEGORIES } from "@/lib/data";
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

  // Filter packages based on category & search term
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
    <section id="packages" className="py-20 bg-slate-950 relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-sky-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Curated Travel Itineraries</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Popular Tour Packages
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            From the serene tea hills of Munnar to the royal palaces of Mysore and tropical beaches of Thailand, choose your dream vacation.
          </p>
        </div>

        {/* Search Bar & Category Tabs */}
        <div className="mb-10 space-y-5">
          {/* Search Box */}
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-4 top-3.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search destination (Munnar, Ooty, Goa, Thailand...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-900 border border-slate-700/80 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-sky-500 shadow-inner transition-colors"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {CATEGORIES.map((cat) => {
              const active = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                    active
                      ? "bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-glow border border-sky-400"
                      : "bg-slate-900/80 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800"
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Packages Grid */}
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center gap-3">
            <RefreshCw className="w-8 h-8 text-sky-400 animate-spin" />
            <p className="text-xs text-slate-400">Loading tour packages...</p>
          </div>
        ) : filteredPackages.length === 0 ? (
          <div className="py-16 text-center bg-slate-900/50 rounded-2xl border border-slate-800 p-8">
            <p className="text-lg font-bold text-white mb-2">No packages match your search</p>
            <p className="text-xs text-slate-400 mb-6">
              Try changing your filter or search keywords.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("all");
                setSearchQuery("");
              }}
              className="px-4 py-2 rounded-xl bg-sky-500 text-white text-xs font-bold"
            >
              Reset Filters
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
