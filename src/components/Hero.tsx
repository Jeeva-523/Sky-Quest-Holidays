"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, Compass, ShieldCheck } from "lucide-react";
import { COMPANY_INFO } from "@/lib/data";

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 bg-gradient-to-b from-sky-50 via-white to-slate-50 overflow-hidden">
      {/* Background Decorative Shapes */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-sky-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-amber-100/50 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Top Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-100/80 border border-sky-200 text-sky-800 text-xs font-bold uppercase tracking-wider mb-6 shadow-sm">
          <span>✨</span>
          <span>100% Customized & Safe Tour Packages</span>
        </div>

        {/* Title */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-slate-900 tracking-tight leading-tight mb-6 max-w-4xl mx-auto">
          Explore the World with{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-blue-700">
            Sky Quest Holidays
          </span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-3xl mx-auto text-base sm:text-lg text-slate-600 font-normal leading-relaxed mb-10">
          From the misty tea hills of Munnar to the pristine beaches of Bali & thrilling College IV trips, create memories that last forever.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link
            href="/#packages"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-500 hover:to-blue-600 text-white font-bold text-sm sm:text-base shadow-lg glow-btn flex items-center justify-center gap-2 transition-all"
          >
            <span>✨ Explore Packages</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href="/quotation"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white hover:bg-slate-50 text-slate-800 border-2 border-slate-200 font-bold text-sm sm:text-base shadow-sm flex items-center justify-center gap-2 transition-all"
          >
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Generate Quotation PDF</span>
          </Link>
        </div>

        {/* Floating Feature Pills */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
          <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
            <p className="text-2xl font-black text-sky-600">8+ Years</p>
            <p className="text-xs font-semibold text-slate-500 mt-0.5">Industry Experience</p>
          </div>
          <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
            <p className="text-2xl font-black text-amber-500">500+</p>
            <p className="text-xs font-semibold text-slate-500 mt-0.5">Happy Customers</p>
          </div>
          <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
            <p className="text-2xl font-black text-emerald-600">Govt. Regd</p>
            <p className="text-xs font-semibold text-slate-500 mt-0.5">{COMPANY_INFO.govtRegNumber}</p>
          </div>
          <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
            <p className="text-2xl font-black text-purple-600">24/7</p>
            <p className="text-xs font-semibold text-slate-500 mt-0.5">On-Trip Manager Support</p>
          </div>
        </div>
      </div>
    </section>
  );
}
