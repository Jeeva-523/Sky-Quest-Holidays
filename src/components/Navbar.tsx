"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Phone, Menu, X, Sparkles, User } from "lucide-react";
import { COMPANY_INFO } from "@/lib/data";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 shadow-sm bg-white/95 backdrop-blur-md border-b border-slate-100">
      {/* Top Offer Banner */}
      <div className="bg-gradient-to-r from-sky-600 via-sky-700 to-slate-900 text-white py-1.5 px-4 text-xs font-medium">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="bg-rose-500 text-white font-black text-[10px] uppercase px-2 py-0.5 rounded-full">
              HOT OFFER
            </span>
            <span className="hidden sm:inline">Munnar, Ooty & Goa Summer Tours Starting @ ₹4,999!</span>
            <span className="sm:hidden">Summer Tours @ ₹4,999!</span>
          </div>
          <div className="flex items-center gap-4">
            <a href={`tel:${COMPANY_INFO.phone}`} className="hover:underline flex items-center gap-1 font-semibold">
              <span>📞 {COMPANY_INFO.phone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <img
            src="/images/logo.png"
            alt="Sky Quest Logo"
            className="w-10 h-10 object-contain group-hover:scale-105 transition-transform"
          />
          <div className="flex flex-col">
            <div className="text-xl font-black tracking-tight leading-none">
              <span className="text-sky-600">SKY</span>
              <span className="text-slate-900">QUEST</span>
            </div>
            <span className="text-[9px] tracking-[0.25em] text-slate-500 font-bold uppercase mt-0.5">
              — HOLIDAYS —
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-700">
          <Link href="/" className="text-sky-600 hover:text-sky-700 transition-colors">
            Home
          </Link>
          <Link href="/#packages" className="hover:text-sky-600 transition-colors">
            Destinations
          </Link>
          <Link href="/gallery" className="hover:text-sky-600 transition-colors">
            Gallery 📸
          </Link>
          <Link href="/#about" className="hover:text-sky-600 transition-colors">
            About
          </Link>
          <Link
            href="/quotation"
            className="text-xs font-bold text-amber-800 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full hover:bg-amber-100 transition-all flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Quotation PDF</span>
          </Link>
        </nav>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href={`tel:${COMPANY_INFO.phone}`}
            className="px-3.5 py-2 rounded-xl text-xs font-bold text-sky-700 bg-sky-50 border border-sky-200 hover:bg-sky-100 transition-all flex items-center gap-1.5"
          >
            <Phone className="w-3.5 h-3.5 text-sky-600" />
            <span>{COMPANY_INFO.phone}</span>
          </a>

          <Link
            href="/admin"
            className="p-2 rounded-xl text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-all"
            title="Admin Portal"
          >
            <User className="w-4 h-4" />
          </Link>

          <Link
            href="/#contact"
            className="px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-sky-600 to-sky-700 hover:from-sky-500 hover:to-sky-600 shadow-md glow-btn transition-all"
          >
            Enquire Now
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg bg-slate-100 text-slate-800"
          aria-label="Toggle Navigation"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-sm font-semibold text-slate-800 hover:bg-slate-50"
          >
            Home
          </Link>
          <Link
            href="/#packages"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-sm font-semibold text-slate-800 hover:bg-slate-50"
          >
            Destinations
          </Link>
          <Link
            href="/gallery"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-sm font-semibold text-slate-800 hover:bg-slate-50"
          >
            Gallery 📸
          </Link>
          <Link
            href="/#about"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-sm font-semibold text-slate-800 hover:bg-slate-50"
          >
            About
          </Link>
          <Link
            href="/quotation"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-sm font-bold text-amber-700 bg-amber-50"
          >
            ✨ Create Official Quotation PDF
          </Link>
          <Link
            href="/admin"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-sm font-semibold text-slate-600"
          >
            🔒 Admin Control Portal
          </Link>

          <div className="pt-2 flex flex-col gap-2">
            <a
              href={`tel:${COMPANY_INFO.phone}`}
              className="w-full text-center py-2.5 rounded-xl bg-sky-50 text-sky-700 font-bold text-xs"
            >
              📞 Call {COMPANY_INFO.phone}
            </a>
            <Link
              href="/#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 rounded-xl bg-sky-600 text-white font-bold text-xs shadow-md"
            >
              Enquire Now
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
