"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Camera, ArrowRight } from "lucide-react";
import { INITIAL_GALLERY } from "@/lib/data";
import { fetchGalleryItems } from "@/lib/firebaseServices";
import { GalleryItem } from "@/lib/types";

export default function GallerySection() {
  const [gallery, setGallery] = useState<GalleryItem[]>(INITIAL_GALLERY);

  useEffect(() => {
    fetchGalleryItems().then((items) => {
      if (items && items.length > 0) setGallery(items);
    });
  }, []);
  return (
    <section id="gallery" className="py-20 bg-slate-900 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
              <Camera className="w-3.5 h-3.5" />
              <span>Real Traveler Moments</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Captured Moments & Stories
            </h2>
          </div>
        </div>

        {/* Gallery Grid - Pure Photos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {gallery.map((item) => (
            <div
              key={item.id}
              className="relative h-72 rounded-2xl overflow-hidden group bg-slate-950 border border-slate-800 shadow-md"
            >
              <img
                src={item.image}
                alt={item.title || "Travel moment"}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer"
                loading="lazy"
              />
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
