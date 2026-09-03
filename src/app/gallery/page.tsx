"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Camera, ArrowLeft } from "lucide-react";
import { INITIAL_GALLERY } from "@/lib/data";
import { fetchGalleryItems } from "@/lib/firebaseServices";
import { GalleryItem } from "@/lib/types";

export default function GalleryPage() {
  const [gallery, setGallery] = useState<GalleryItem[]>(INITIAL_GALLERY);

  useEffect(() => {
    fetchGalleryItems().then((items) => {
      if (items && items.length > 0) setGallery(items);
    });
  }, []);

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

          <div className="border-b border-slate-800 pb-8">
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
        </div>

        {/* Gallery Grid - Pure Photos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {gallery.map((item) => (
            <div
              key={item.id}
              className="relative h-80 rounded-2xl overflow-hidden group bg-slate-900 border border-slate-800 shadow-lg"
            >
              <img
                src={item.image}
                alt={item.title || "Travel photo"}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
