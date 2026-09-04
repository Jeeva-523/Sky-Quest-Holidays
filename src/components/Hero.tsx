"use client";

import React, { useState, useEffect, useMemo } from "react";
import { COMPANY_INFO, INITIAL_GALLERY } from "@/lib/data";
import {
  fetchHeroSettings,
  DEFAULT_HERO_BG,
  HeroSettings,
  subscribeToSiteMedia,
  fetchGalleryItems,
  subscribeToGalleryItems
} from "@/lib/firebaseServices";
import { GalleryItem } from "@/lib/types";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Hero() {
  const [heroSettings, setHeroSettings] = useState<HeroSettings>({
    bgImage: DEFAULT_HERO_BG,
    badgeText: "100% CUSTOMIZED & SAFE TOUR PACKAGES",
    title: "Explore the World with Sky Quest Holidays",
    subtitle: "From the misty tea hills of Munnar to the pristine beaches of Bali & thrilling College IV trips, create memories that last forever."
  });

  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(INITIAL_GALLERY);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    // 1. Load Hero Settings
    fetchHeroSettings().then((settings) => {
      if (settings && settings.bgImage) {
        setHeroSettings(settings);
      }
    });

    // 2. Load Real Traveler Moments Gallery
    fetchGalleryItems().then((items) => {
      if (items && items.length > 0) {
        setGalleryItems(items);
      }
    });

    // Real-time Firestore listener for live site media
    const unsubMedia = subscribeToSiteMedia((settings) => {
      if (settings && settings.bgImage) {
        setHeroSettings(settings);
      }
    });

    // Real-time Firestore listener for gallery items (Real Traveler Moments)
    const unsubGallery = subscribeToGalleryItems((items) => {
      if (items && items.length > 0) {
        setGalleryItems(items);
      }
    });

    // Local custom event listeners for instant intra-browser tab updates
    const handleMediaUpdate = (e: any) => {
      if (e.detail && e.detail.bgImage) {
        setHeroSettings((prev) => ({ ...prev, ...e.detail }));
      }
    };

    const handleGalleryUpdate = (e: any) => {
      if (e.detail && Array.isArray(e.detail) && e.detail.length > 0) {
        setGalleryItems(e.detail);
      }
    };

    window.addEventListener("site_media_updated", handleMediaUpdate);
    window.addEventListener("gallery_updated", handleGalleryUpdate);

    return () => {
      unsubMedia();
      unsubGallery();
      window.removeEventListener("site_media_updated", handleMediaUpdate);
      window.removeEventListener("gallery_updated", handleGalleryUpdate);
    };
  }, []);

  // Consolidate images: Real Traveler Moments + custom hero background
  const images = useMemo(() => {
    const list: string[] = [];

    // Real Traveler Moments images first!
    if (galleryItems && galleryItems.length > 0) {
      galleryItems.forEach((g) => {
        if (g.image && !list.includes(g.image)) {
          list.push(g.image);
        }
      });
    }

    // Include custom hero bgImage if set and unique
    if (heroSettings.bgImage && !list.includes(heroSettings.bgImage)) {
      list.unshift(heroSettings.bgImage);
    }

    if (list.length === 0) {
      list.push(DEFAULT_HERO_BG);
    }

    return list;
  }, [galleryItems, heroSettings.bgImage]);

  // Slideshow auto-rotation: Slow and graceful (every 12 seconds)
  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % images.length);
    }, 12000);
    return () => clearInterval(interval);
  }, [images.length]);

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <section className="relative pt-36 pb-20 overflow-hidden min-h-[580px] flex items-center justify-center bg-slate-950">
      {/* Background Images with slow, gentle cross-fade */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {images.map((imgUrl, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-[2000ms] ease-in-out transform ${
              idx === activeSlide
                ? "opacity-100 scale-100"
                : "opacity-0 scale-105 pointer-events-none"
            }`}
            style={{ backgroundImage: `url('${imgUrl}')` }}
          />
        ))}
      </div>

      {/* Cinematic Contrast Overlay: Sharp, rich colors for photos + ultra-crisp readable text */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-slate-950/75 via-slate-950/40 to-slate-950/90 pointer-events-none" />

      {/* Subtle bottom vignette that blends cleanly into following section */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center w-full">
        {/* Top Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-500/20 border border-sky-400/40 text-sky-300 text-xs font-bold uppercase tracking-wider backdrop-blur-md shadow-lg mb-6">
          <span>✨</span>
          <span>{heroSettings.badgeText || "100% CUSTOMIZED & SAFE TOUR PACKAGES"}</span>
        </div>

        {/* Title */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.15] mb-6 max-w-5xl mx-auto drop-shadow-lg">
          Explore the World with{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-sky-300 to-cyan-300 drop-shadow-sm">
            Sky Quest Holidays
          </span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-3xl mx-auto text-base sm:text-xl text-slate-200 font-medium leading-relaxed mb-12 drop-shadow-md">
          {heroSettings.subtitle || "From the misty tea hills of Munnar to the pristine beaches of Bali & thrilling College IV trips, create memories that last forever."}
        </p>

        {/* Feature Counters Grid - High-contrast Frosted Glass Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto text-left mb-6">
          <div className="p-5 rounded-2xl bg-slate-900/80 backdrop-blur-md border border-white/15 shadow-xl hover:border-sky-400/50 transition-colors">
            <p className="text-3xl font-black text-sky-400">8+ Years</p>
            <p className="text-xs font-semibold text-slate-300 mt-1">Industry Experience</p>
          </div>
          <div className="p-5 rounded-2xl bg-slate-900/80 backdrop-blur-md border border-white/15 shadow-xl hover:border-amber-400/50 transition-colors">
            <p className="text-3xl font-black text-amber-400">500+</p>
            <p className="text-xs font-semibold text-slate-300 mt-1">Happy Customers</p>
          </div>
          <div className="p-5 rounded-2xl bg-slate-900/80 backdrop-blur-md border border-white/15 shadow-xl hover:border-emerald-400/50 transition-colors">
            <p className="text-3xl font-black text-emerald-400">Govt. Regd</p>
            <p className="text-xs font-semibold text-slate-300 mt-1">{COMPANY_INFO.govtRegNumber}</p>
          </div>
          <div className="p-5 rounded-2xl bg-slate-900/80 backdrop-blur-md border border-white/15 shadow-xl hover:border-purple-400/50 transition-colors">
            <p className="text-3xl font-black text-purple-400">24/7</p>
            <p className="text-xs font-semibold text-slate-300 mt-1">On-Trip Manager Support</p>
          </div>
        </div>

        {/* Real Traveler Moments Slide Navigation (if multiple images) */}
        {images.length > 1 && (
          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              onClick={prevSlide}
              aria-label="Previous traveler photo"
              className="p-1.5 rounded-full bg-black/40 hover:bg-black/60 border border-white/20 text-white/80 hover:text-white transition-all backdrop-blur-sm cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-1.5">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveSlide(idx)}
                  aria-label={`Go to photo ${idx + 1}`}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    idx === activeSlide
                      ? "w-7 bg-sky-400 shadow-sm shadow-sky-400/50"
                      : "w-2 bg-white/40 hover:bg-white/70"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              aria-label="Next traveler photo"
              className="p-1.5 rounded-full bg-black/40 hover:bg-black/60 border border-white/20 text-white/80 hover:text-white transition-all backdrop-blur-sm cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
