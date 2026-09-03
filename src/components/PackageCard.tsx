"use client";

import React from "react";
import { Clock, MapPin, CheckCircle2, ArrowRight } from "lucide-react";
import { TourPackage } from "@/lib/types";

interface PackageCardProps {
  pkg: TourPackage;
  onBook: (pkg: TourPackage) => void;
}

export default function PackageCard({ pkg, onBook }: PackageCardProps) {
  return (
    <div className="flex flex-col h-full rounded-2xl bg-white border border-slate-200/80 overflow-hidden shadow-sm card-hover transition-all duration-300 group">
      {/* Image Container */}
      <div className="relative h-56 w-full overflow-hidden bg-slate-100">
        <img
          src={pkg.image || "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=800&q=80"}
          alt={pkg.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-black/20" />

        {/* Badge & Duration */}
        <div className="absolute top-3 left-3 flex gap-2">
          {pkg.badge && (
            <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-sky-600 text-white shadow-md">
              {pkg.badge}
            </span>
          )}
        </div>
        <div className="absolute top-3 right-3">
          <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-white/90 backdrop-blur-md text-slate-800 shadow-sm flex items-center gap-1">
            <Clock className="w-3 h-3 text-sky-600" />
            {pkg.duration}
          </span>
        </div>

        {/* Location pill */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-xs font-bold text-white bg-slate-900/70 backdrop-blur-md px-2.5 py-1 rounded-lg">
          <MapPin className="w-3.5 h-3.5 text-sky-400" />
          <span>{pkg.location}</span>
        </div>
      </div>

      {/* Card Content */}
      <div className="flex flex-col flex-grow p-5 justify-between">
        <div>
          <h3 className="text-lg font-bold text-slate-900 mb-2 line-clamp-1 group-hover:text-sky-600 transition-colors">
            {pkg.name}
          </h3>
          <p className="text-xs text-slate-600 line-clamp-2 mb-4 leading-relaxed">
            {pkg.desc}
          </p>

          {/* Key Inclusions Preview */}
          {pkg.inclusions && pkg.inclusions.length > 0 && (
            <div className="space-y-1.5 mb-5">
              {pkg.inclusions.slice(0, 2).map((inc, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span className="truncate">{inc}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Pricing & CTA Buttons */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-slate-400 block font-semibold">Starting from</span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-black text-sky-600">{pkg.price}</span>
              {pkg.originalPrice && (
                <span className="text-xs line-through text-slate-400 font-medium">{pkg.originalPrice}</span>
              )}
            </div>
          </div>

          <button
            onClick={() => onBook(pkg)}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-sky-600 to-sky-700 hover:from-sky-500 hover:to-sky-600 text-white font-bold text-xs shadow-md glow-btn flex items-center gap-1.5 transition-all"
          >
            <span>Enquire Now</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
