"use client";

import React from "react";
import Link from "next/link";
import { Compass, Sparkles, MapPin, Calendar, ShieldCheck, ArrowRight, Star } from "lucide-react";
import { COMPANY_INFO } from "@/lib/data";

export default function Hero() {
  return (
    <div className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 overflow-hidden bg-slate-950">
      {/* Background Image with Gradient Overlay */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-30 transform scale-105 transition-transform duration-10000"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2000&q=80')",
        }}
      />
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-slate-950 via-slate-900/80 to-slate-950/90" />

      {/* Decorative Radial Lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-sky-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[250px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Top Pill Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-800/80 border border-slate-700/80 backdrop-blur-md mb-6 shadow-sm animate-fade-in">
          <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-semibold text-slate-300">
            Govt. Regd No. {COMPANY_INFO.govtRegNumber} • ⭐ {COMPANY_INFO.rating}/5 Rated
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-tight sm:leading-none mb-6">
          Unforgettable Journeys, <br />
          <span className="sky-gradient-text">Crafted Just For You.</span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-300 font-normal leading-relaxed mb-10">
          Discover handpicked tour packages across <span className="text-sky-400 font-semibold">Kerala</span>,{" "}
          <span className="text-amber-400 font-semibold">Tamil Nadu</span>,{" "}
          <span className="text-emerald-400 font-semibold">Karnataka</span>, Honeymoon Escapes & International Getaways at unbeatable transparent prices.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
          <Link
            href="/#packages"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold text-base shadow-glow flex items-center justify-center gap-3 group transition-all"
          >
            <Compass className="w-5 h-5 group-hover:rotate-45 transition-transform" />
            <span>Explore Tour Packages</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            href="/quotation"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-amber-300 border border-amber-500/40 font-semibold text-base backdrop-blur-md flex items-center justify-center gap-2 transition-all shadow-md"
          >
            <Sparkles className="w-5 h-5 text-amber-400" />
            <span>Instant Quotation PDF</span>
          </Link>
        </div>

        {/* Quick Highlights Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 backdrop-blur-sm">
            <p className="text-2xl font-extrabold text-sky-400">500+</p>
            <p className="text-xs text-slate-400 font-medium">Happy Travelers</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 backdrop-blur-sm">
            <p className="text-2xl font-extrabold text-amber-400">100%</p>
            <p className="text-xs text-slate-400 font-medium">Customized Plans</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 backdrop-blur-sm">
            <p className="text-2xl font-extrabold text-emerald-400">24/7</p>
            <p className="text-xs text-slate-400 font-medium">On-Trip Support</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 backdrop-blur-sm">
            <p className="text-2xl font-extrabold text-purple-400">Best Price</p>
            <p className="text-xs text-slate-400 font-medium">Direct Local Cab & Stay</p>
          </div>
        </div>
      </div>
    </div>
  );
}
