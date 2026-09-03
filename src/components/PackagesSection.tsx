"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { RefreshCw } from "lucide-react";
import { TourPackage } from "@/lib/types";
import { INITIAL_PACKAGES } from "@/lib/data";
import { fetchAllPackages } from "@/lib/firebaseServices";
import PackageCard from "./PackageCard";
import BookingModal from "./BookingModal";

export default function PackagesSection() {
  const [packages, setPackages] = useState<TourPackage[]>(INITIAL_PACKAGES);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("tamilnadu");
  const [activePackageForBooking, setActivePackageForBooking] = useState<TourPackage | null>(null);

  useEffect(() => {
    loadPackagesData();
  }, []);

  const loadPackagesData = async () => {
    try {
      const data = await fetchAllPackages();
      if (data && data.length > 0) {
        setPackages(data);
      }
    } catch (error) {
      console.error("Error loading packages:", error);
    }
  };

  const tabs = [
    { id: "tamilnadu", label: "🛕 Tamil Nadu" },
    { id: "kerala", label: "🌴 Kerala" },
    { id: "karnataka", label: "🌄 Karnataka" }
  ];

  const filteredPackages = packages.filter((pkg) => {
    return (
      pkg.category?.toLowerCase() === selectedCategory.toLowerCase() ||
      pkg.state?.toLowerCase().includes(selectedCategory.toLowerCase())
    );
  });

  return (
    <section id="packages" className="py-20 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
          <div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-2">
              Our Tour Packages
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              From stays and transport to local sightseeing, we&apos;ve got your entire trip sorted.
            </p>
          </div>

          <Link
            href="/quotation"
            className="self-start md:self-auto inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-extrabold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all"
          >
            <span>Enquire Now</span>
          </Link>
        </div>

        {/* State Filter Tabs */}
        <div className="flex items-center gap-3 overflow-x-auto pb-6 mb-4 scrollbar-none">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedCategory(tab.id)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all shadow-sm flex items-center gap-2 whitespace-nowrap ${
                selectedCategory === tab.id
                  ? "bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-sky-500/25"
                  : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Packages Grid */}
        {loading ? (
          <div className="py-20 text-center flex flex-col items-center justify-center">
            <RefreshCw className="w-8 h-8 text-sky-500 animate-spin mb-3" />
            <p className="text-xs text-slate-500 font-semibold">Loading tour packages...</p>
          </div>
        ) : filteredPackages.length === 0 ? (
          <div className="py-16 text-center bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
            <p className="text-slate-600 text-sm font-semibold">
              No tour packages found for this category.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredPackages.map((pkg) => (
              <PackageCard
                key={pkg.id}
                pkg={pkg}
                onBook={(p: TourPackage) => setActivePackageForBooking(p)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Booking Modal */}
      {activePackageForBooking && (
        <BookingModal
          pkg={activePackageForBooking}
          isOpen={!!activePackageForBooking}
          onClose={() => setActivePackageForBooking(null)}
        />
      )}
    </section>
  );
}
