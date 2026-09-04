"use client";

import React, { useState, useEffect } from "react";
import { COMPANY_INFO } from "@/lib/data";
import { fetchHeroSettings, DEFAULT_HERO_BG, HeroSettings, subscribeToSiteMedia } from "@/lib/firebaseServices";

export default function Hero() {
  const [heroSettings, setHeroSettings] = useState<HeroSettings>({
    bgImage: DEFAULT_HERO_BG,
    badgeText: "100% CUSTOMIZED & SAFE TOUR PACKAGES",
    title: "Explore the World with Sky Quest Holidays",
    subtitle: "From the misty tea hills of Munnar to the pristine beaches of Bali & thrilling College IV trips, create memories that last forever."
  });

  useEffect(() => {
    const loadHero = () => {
      fetchHeroSettings().then((settings) => {
        if (settings && settings.bgImage) {
          setHeroSettings(settings);
        }
      });
    };
    loadHero();

    // Real-time Firestore listener for live updates across all devices
    const unsubscribe = subscribeToSiteMedia((settings) => {
      if (settings && settings.bgImage) {
        setHeroSettings(settings);
      }
    });

    const handleLocalUpdate = (e: any) => {
      if (e.detail && e.detail.bgImage) {
        setHeroSettings((prev) => ({ ...prev, ...e.detail }));
      }
    };

    window.addEventListener("site_media_updated", handleLocalUpdate);
    return () => {
      unsubscribe();
      window.removeEventListener("site_media_updated", handleLocalUpdate);
    };
  }, []);

  return (
    <section className="relative pt-36 pb-16 overflow-hidden min-h-[520px] flex items-center justify-center">
      {/* Dynamic Background Image */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-all duration-700"
        style={{
          backgroundImage: `url('${heroSettings.bgImage || DEFAULT_HERO_BG}')`,
        }}
      />

      {/* Elegant Light Wash Overlay so text is super crisp */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-white/80 via-white/85 to-slate-50/95" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Top Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-100/90 border border-sky-200/90 text-sky-800 text-xs font-bold uppercase tracking-wider mb-6 shadow-sm backdrop-blur-xs">
          <span>✨</span>
          <span>{heroSettings.badgeText || "100% CUSTOMIZED & SAFE TOUR PACKAGES"}</span>
        </div>

        {/* Title */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-slate-900 tracking-tight leading-[1.15] mb-6 max-w-5xl mx-auto drop-shadow-xs">
          Explore the World with{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-sky-500 to-blue-700">
            Sky Quest Holidays
          </span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-3xl mx-auto text-base sm:text-xl text-slate-700 font-medium leading-relaxed mb-12 drop-shadow-xs">
          {heroSettings.subtitle || "From the misty tea hills of Munnar to the pristine beaches of Bali & thrilling College IV trips, create memories that last forever."}
        </p>

        {/* Feature Counters Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto text-left">
          <div className="p-5 rounded-2xl bg-white/95 backdrop-blur-sm border border-slate-200/80 shadow-sm">
            <p className="text-3xl font-black text-sky-600">8+ Years</p>
            <p className="text-xs font-semibold text-slate-500 mt-1">Industry Experience</p>
          </div>
          <div className="p-5 rounded-2xl bg-white/95 backdrop-blur-sm border border-slate-200/80 shadow-sm">
            <p className="text-3xl font-black text-amber-500">500+</p>
            <p className="text-xs font-semibold text-slate-500 mt-1">Happy Customers</p>
          </div>
          <div className="p-5 rounded-2xl bg-white/95 backdrop-blur-sm border border-slate-200/80 shadow-sm">
            <p className="text-3xl font-black text-emerald-600">Govt. Regd</p>
            <p className="text-xs font-semibold text-slate-500 mt-1">{COMPANY_INFO.govtRegNumber}</p>
          </div>
          <div className="p-5 rounded-2xl bg-white/95 backdrop-blur-sm border border-slate-200/80 shadow-sm">
            <p className="text-3xl font-black text-purple-600">24/7</p>
            <p className="text-xs font-semibold text-slate-500 mt-1">On-Trip Manager Support</p>
          </div>
        </div>
      </div>
    </section>
  );
}
