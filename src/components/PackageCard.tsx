"use client";

import React from "react";
import { TourPackage } from "@/lib/types";

interface PackageCardProps {
  pkg: TourPackage;
  onBook: (pkg: TourPackage) => void;
}

export default function PackageCard({ pkg, onBook }: PackageCardProps) {
  // Format destination title with subtle separator styling if dash exists
  const hasSeparator = pkg.name.includes("–") || pkg.name.includes("-");
  const parts = hasSeparator ? pkg.name.split(/–|-/) : [pkg.name];

  return (
    <div
      onClick={() => onBook(pkg)}
      className="group flex flex-col rounded-2xl bg-white border border-slate-200/90 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 cursor-pointer"
      data-cat={pkg.category}
    >
      {/* 1. Image Container */}
      <div className="relative h-52 w-full overflow-hidden bg-slate-100">
        <img
          src={pkg.image || "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=800&q=80"}
          alt={pkg.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-black/10" />
      </div>

      {/* 2. Package Body */}
      <div className="flex flex-col flex-grow p-5 justify-between">
        <div>
          {/* Destination Title */}
          <h3 className="text-lg font-bold text-slate-900 group-hover:text-sky-600 transition-colors line-clamp-1 mb-3">
            {parts.length > 1 ? (
              <>
                <span>{parts[0].trim()}</span>{" "}
                <span className="text-sky-500 font-normal">–</span>{" "}
                <span>{parts[1].trim()}</span>
              </>
            ) : (
              pkg.name
            )}
          </h3>

          {/* Meta Info (State + Duration) */}
          <div className="flex items-center gap-3 text-xs font-semibold text-slate-500 mb-5">
            <span className="inline-flex items-center gap-1 bg-slate-100 px-2.5 py-1 rounded-lg text-slate-700">
              {pkg.state || "🌴 Kerala"}
            </span>
            {pkg.duration && (
              <span className="inline-flex items-center gap-1 bg-sky-50 px-2.5 py-1 rounded-lg text-sky-700">
                📅 {pkg.duration}
              </span>
            )}
          </div>
        </div>

        {/* Enquire Now Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onBook(pkg);
          }}
          className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold text-xs uppercase tracking-wider shadow-sm transition-all text-center"
        >
          Enquire Now
        </button>
      </div>
    </div>
  );
}
