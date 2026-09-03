"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Phone, Compass, MapPin, Shield, Menu, X, Sparkles, User } from "lucide-react";
import { COMPANY_INFO } from "@/lib/data";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-slate-900/90 backdrop-blur-md shadow-lg border-b border-slate-800/80 py-3"
          : "bg-gradient-to-b from-slate-950/90 via-slate-900/40 to-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-600 to-sky-400 flex items-center justify-center shadow-glow group-hover:scale-105 transition-transform">
            <Compass className="w-6 h-6 text-white animate-spin-slow" />
          </div>
          <div>
            <div className="text-xl font-extrabold tracking-tight">
              <span className="text-sky-400">SKY</span>
              <span className="text-white">QUEST</span>
            </div>
            <p className="text-[10px] tracking-widest text-sky-200/80 uppercase font-semibold">
              Holidays & Tours
            </p>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/#packages"
            className="text-sm font-medium text-slate-200 hover:text-sky-400 transition-colors"
          >
            Tour Packages
          </Link>
          <Link
            href="/#about"
            className="text-sm font-medium text-slate-200 hover:text-sky-400 transition-colors"
          >
            About Us
          </Link>
          <Link
            href="/gallery"
            className="text-sm font-medium text-slate-200 hover:text-sky-400 transition-colors"
          >
            Gallery
          </Link>
          <Link
            href="/#testimonials"
            className="text-sm font-medium text-slate-200 hover:text-sky-400 transition-colors"
          >
            Reviews
          </Link>
          <Link
            href="/#contact"
            className="text-sm font-medium text-slate-200 hover:text-sky-400 transition-colors"
          >
            Contact
          </Link>
          <Link
            href="/quotation"
            className="text-xs font-semibold text-amber-300 bg-amber-500/10 border border-amber-500/30 px-3 py-1.5 rounded-full hover:bg-amber-500/20 transition-all flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Quotation PDF
          </Link>
        </nav>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href={`tel:${COMPANY_INFO.phone}`}
            className="flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-sky-400">
              <Phone className="w-4 h-4" />
            </div>
            <span>{COMPANY_INFO.phone}</span>
          </a>

          <Link
            href="/admin"
            className="text-xs font-semibold text-slate-300 hover:text-sky-400 p-2 rounded-lg bg-slate-800/50 border border-slate-700 flex items-center gap-1.5"
            title="Admin Portal"
          >
            <User className="w-4 h-4" />
            <span>Admin</span>
          </Link>

          <Link
            href="/#contact"
            className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-sky-500 to-blue-600 rounded-lg hover:from-sky-400 hover:to-blue-500 shadow-md hover:shadow-glow transition-all"
          >
            Book Tour
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg bg-slate-800 text-slate-200 hover:text-white"
          aria-label="Toggle Navigation"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-900 border-b border-slate-800 px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top duration-200">
          <Link
            href="/#packages"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-slate-200 hover:bg-slate-800"
          >
            Tour Packages
          </Link>
          <Link
            href="/#about"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-slate-200 hover:bg-slate-800"
          >
            About Us
          </Link>
          <Link
            href="/gallery"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-slate-200 hover:bg-slate-800"
          >
            Gallery
          </Link>
          <Link
            href="/#testimonials"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-slate-200 hover:bg-slate-800"
          >
            Reviews
          </Link>
          <Link
            href="/quotation"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-semibold text-amber-300 hover:bg-amber-950/30"
          >
            ✨ Create Official Quotation PDF
          </Link>
          <Link
            href="/admin"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:bg-slate-800"
          >
            🔒 Admin Portal
          </Link>
          <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
            <a
              href={`tel:${COMPANY_INFO.phone}`}
              className="flex items-center justify-center gap-2 py-2.5 rounded-lg bg-slate-800 text-sky-400 font-semibold text-sm"
            >
              <Phone className="w-4 h-4" /> Call {COMPANY_INFO.phone}
            </a>
            <Link
              href="/#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 rounded-lg bg-sky-500 text-white font-bold text-sm shadow-md"
            >
              Book Now
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
