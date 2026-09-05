"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone, Menu, X, Camera, ArrowRight } from "lucide-react";
import { COMPANY_INFO } from "@/lib/data";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Do not render website navbar on studio, admin or skyAdmin pages to prevent clash
  if (
    pathname?.startsWith("/admin") ||
    pathname?.startsWith("/quotation") ||
    pathname?.startsWith("/skyAdmin")
  ) {
    return null;
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-2xl border-b border-slate-200/80 shadow-[0_4px_25px_rgba(0,0,0,0.05)] py-3"
          : "bg-white/70 backdrop-blur-xl border-b border-white/40 shadow-sm py-3.5 sm:py-4"
      }`}
    >
      {/* Top Ambient Highlight Line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sky-400/30 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo & Lockup */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative flex-shrink-0">
            <div className="absolute -inset-1 rounded-full bg-sky-500/25 blur-md group-hover:bg-sky-400/40 transition-all" />
            <img
              src="/images/logo.png"
              alt="Sky Quest Logo"
              width={54}
              height={54}
              style={{
                width: "auto",
                height: scrolled ? "42px" : "48px",
                objectFit: "contain"
              }}
              className="relative transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          <div className="flex flex-col">
            <div className="font-audiowide text-[20px] sm:text-[23px] tracking-wider leading-none text-slate-800 drop-shadow-sm flex items-center gap-1.5">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-blue-500 to-sky-600">
                SKY
              </span>
              <span>QUEST</span>
            </div>
            <div className="flex items-center gap-1.5 mt-1">
              <span className="text-[9px] sm:text-[10px] tracking-[0.25em] text-slate-500 font-extrabold uppercase leading-none">
                HOLIDAYS
              </span>
              <span className="w-1 h-1 rounded-full bg-amber-500 inline-block" />
              <span className="text-[8px] tracking-wider text-amber-600 font-bold uppercase hidden sm:inline-block leading-none">
                EXPLORE
              </span>
            </div>
          </div>
        </Link>

        {/* Full-width Sleek Center Navigation */}
        <nav className="hidden lg:flex items-center gap-1.5">
          <Link
            href="/"
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all duration-200 ${
              pathname === "/"
                ? "bg-sky-50 text-sky-600 border border-sky-100 shadow-sm"
                : "text-slate-600 hover:text-sky-600 hover:bg-slate-50"
            }`}
          >
            Home
          </Link>

          <Link
            href="/#packages"
            className="px-4 py-2 rounded-xl text-sm font-bold text-slate-600 hover:text-sky-600 hover:bg-slate-50 transition-all duration-200"
          >
            🌴 Destinations
          </Link>

          <Link
            href="/gallery"
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold transition-all duration-200 ${
              pathname === "/gallery"
                ? "bg-sky-50 text-sky-600 border border-sky-100 shadow-sm"
                : "text-slate-600 hover:text-sky-600 hover:bg-slate-50"
            }`}
          >
            <Camera className="w-4 h-4 text-sky-500" />
            <span>Gallery</span>
          </Link>

          <Link
            href="/#about"
            className="px-4 py-2 rounded-xl text-sm font-bold text-slate-600 hover:text-sky-600 hover:bg-slate-50 transition-all duration-200"
          >
            About
          </Link>

          <Link
            href="/#contact"
            className="px-4 py-2 rounded-xl text-sm font-bold text-slate-600 hover:text-sky-600 hover:bg-slate-50 transition-all duration-200"
          >
            Contact
          </Link>
        </nav>

        {/* Right Action Pod */}
        <div className="hidden md:flex items-center gap-3">
          {/* Live 24/7 Phone Widget */}
          <a
            href={`tel:${COMPANY_INFO.phone}`}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-slate-200 shadow-sm text-xs font-bold text-slate-700 hover:text-sky-600 hover:border-sky-200 hover:bg-sky-50 transition-all duration-300 group"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <Phone className="w-3.5 h-3.5 text-sky-500 group-hover:rotate-12 transition-transform" />
            <span className="font-mono text-xs">{COMPANY_INFO.phone}</span>
          </a>

          {/* Shimmering CTA Button */}
          <Link
            href="/#contact"
            className="relative group overflow-hidden px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider text-white bg-gradient-to-r from-sky-500 via-blue-600 to-sky-500 bg-[length:200%_auto] hover:bg-right shadow-[0_0_20px_rgba(14,165,233,0.4)] hover:shadow-[0_0_30px_rgba(14,165,233,0.7)] active:scale-95 transition-all duration-300 flex items-center gap-1.5"
          >
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
            <span>Enquire Now</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Mobile Right Quick Action & Hamburger */}
        <div className="flex items-center gap-2 lg:hidden">
          <a
            href={`tel:${COMPANY_INFO.phone}`}
            className="p-2.5 rounded-xl bg-white border border-slate-200 text-sky-600 hover:bg-sky-50 transition-all shadow-sm"
            title="Call Us"
          >
            <Phone className="w-4 h-4" />
          </a>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-xl bg-white text-slate-800 border border-slate-200 hover:bg-slate-50 transition-colors cursor-pointer shadow-sm"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-sky-600" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white/95 backdrop-blur-xl px-4 pt-3 pb-5 space-y-2 mt-3 animate-fade-in shadow-xl rounded-b-2xl">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold text-sky-700 bg-sky-50 border border-sky-100"
          >
            <span>🏠 Home</span>
            <span className="text-xs text-sky-600">Main</span>
          </Link>

          <Link
            href="/#packages"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold text-slate-600 hover:text-sky-700 hover:bg-slate-50"
          >
            <span>🌴 Tour Destinations</span>
            <span className="text-xs text-slate-400">Explore</span>
          </Link>

          <Link
            href="/gallery"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold text-slate-600 hover:text-sky-700 hover:bg-slate-50"
          >
            <span>📸 Photo Gallery</span>
            <span className="text-xs text-slate-400">Moments</span>
          </Link>

          <Link
            href="/#about"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold text-slate-600 hover:text-sky-700 hover:bg-slate-50"
          >
            <span>ℹ️ About Sky Quest</span>
            <span className="text-xs text-slate-400">Why Us</span>
          </Link>

          <Link
            href="/#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold text-slate-600 hover:text-sky-700 hover:bg-slate-50"
          >
            <span>📩 Contact Us</span>
            <span className="text-xs text-slate-400">Reach Out</span>
          </Link>

          <div className="pt-2 flex flex-col gap-2">
            <a
              href={`tel:${COMPANY_INFO.phone}`}
              className="w-full text-center py-3 rounded-xl bg-white border border-slate-200 text-sky-600 font-bold text-sm flex items-center justify-center gap-2 shadow-sm"
            >
              <Phone className="w-4 h-4" />
              <span>Call {COMPANY_INFO.phone}</span>
            </a>

            <Link
              href="/#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-3 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 text-white font-black text-xs uppercase tracking-wider shadow-md"
            >
              Enquire Now
            </Link>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer mt-1"
            >
              <X className="w-4 h-4 text-rose-500" />
              <span>Close Menu</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
