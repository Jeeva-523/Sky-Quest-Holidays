"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Camera, MapPin, ArrowLeft, Sparkles, Filter } from "lucide-react";
import { INITIAL_GALLERY } from "@/lib/data";

export default function GalleryPage() {
  const [selectedCat, setSelectedCat] = useState("All");

  const categories = ["All", "Kerala", "Tamil Nadu", "Goa", "International"];

  const filtered = INITIAL_GALLERY.filter((item) =>
    selectedCat === "All" ? true : item.category.toLowerCase() === selectedCat.toLowerCase()
  );

  return (
    <div className="min-h-screen bg-slate-950 pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link & Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-sky-400 hover:text-sky-300 transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-800 pb-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-bold uppercase tracking-wider mb-2">
                <Camera className="w-3.5 h-3.5" />
                <span>Travel Album</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                Sky Quest Travel Gallery
              </h1>
              <p className="text-slate-400 text-sm mt-2">
                Glimpses of genuine moments, misty mountain peaks, luxury houseboats, and happy smiles.
              </p>
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCat(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                    selectedCat === cat
                      ? "bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-glow"
                      : "bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="relative h-80 rounded-2xl overflow-hidden group bg-slate-900 border border-slate-800 shadow-lg"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-75 group-hover:opacity-90 transition-opacity" />

              <div className="absolute bottom-5 left-5 right-5">
                <div className="flex items-center gap-1.5 text-xs text-sky-400 font-semibold mb-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{item.location}</span>
                </div>
                <h3 className="text-lg font-bold text-white leading-tight">{item.title}</h3>
                <span className="inline-block mt-2 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-800 text-slate-300 border border-slate-700">
                  {item.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
