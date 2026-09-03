"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Camera, ArrowRight, MapPin } from "lucide-react";
import { INITIAL_GALLERY } from "@/lib/data";

export default function GallerySection() {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Kerala", "Tamil Nadu", "Goa", "International"];

  const filteredItems = INITIAL_GALLERY.filter((item) =>
    activeCategory === "All" ? true : item.category.toLowerCase() === activeCategory.toLowerCase()
  );

  return (
    <section id="gallery" className="py-20 bg-slate-900 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
              <Camera className="w-3.5 h-3.5" />
              <span>Real Traveler Moments</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Captured Moments & Stories
            </h2>
          </div>

          {/* Filter tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  activeCategory === cat
                    ? "bg-sky-500 text-white shadow-md"
                    : "bg-slate-800 text-slate-300 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="relative h-72 rounded-2xl overflow-hidden group bg-slate-950 border border-slate-800"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

              <div className="absolute bottom-4 left-4 right-4 transform translate-y-1 group-hover:translate-y-0 transition-transform">
                <div className="flex items-center gap-1.5 text-xs text-sky-400 font-semibold mb-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{item.location}</span>
                </div>
                <h3 className="text-base font-bold text-white leading-snug">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs border border-slate-700 transition-all shadow-md"
          >
            <span>View Full Photo & Video Gallery</span>
            <ArrowRight className="w-4 h-4 text-sky-400" />
          </Link>
        </div>
      </div>
    </section>
  );
}
