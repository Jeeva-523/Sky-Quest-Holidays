"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Compass, Phone, Mail, MapPin, Heart, Shield } from "lucide-react";
import { COMPANY_INFO } from "@/lib/data";

export default function Footer() {
  const pathname = usePathname();

  // Hide footer completely inside Admin dashboard, Studio, and Admin Login
  if (
    pathname?.startsWith("/admin") ||
    pathname?.startsWith("/quotation") ||
    pathname?.startsWith("/skyAdmin")
  ) {
    return null;
  }

  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Col 1: Brand Info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3.5 group">
              <img
                src="/images/logo.png"
                alt="Sky Quest Logo"
                width={50}
                height={50}
                style={{ width: "auto", height: "48px", objectFit: "contain" }}
                className="transition-transform duration-300 group-hover:scale-105"
              />
              <div className="flex flex-col">
                <div className="font-audiowide text-[20px] tracking-wide leading-none text-white">
                  <span className="text-sky-400">SKY</span>
                  <span className="text-white">QUEST</span>
                </div>
                <span className="text-[10px] tracking-[0.25em] text-slate-400 font-bold uppercase mt-1">
                  — HOLIDAYS —
                </span>
              </div>
            </Link>

            <p className="text-slate-400 leading-relaxed text-xs">
              Premier tour operator specializing in bespoke South India holiday packages, luxury honeymoons, college industrial visits, and international tours.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-slate-300">
              <Shield className="w-3.5 h-3.5 text-sky-400" />
              <span>Regd: {COMPANY_INFO.govtRegNumber}</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/#packages" className="hover:text-sky-400 transition-colors">
                  Popular Tour Packages
                </Link>
              </li>
              <li>
                <Link href="/#about" className="hover:text-sky-400 transition-colors">
                  About Sky Quest
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-sky-400 transition-colors">
                  Photo & Video Gallery
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="hover:text-sky-400 transition-colors">
                  Contact Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Popular Destinations */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Destinations</h4>
            <ul className="space-y-2">
              <li>Munnar & Alleppey Houseboat (Kerala)</li>
              <li>Ooty & Kodaikanal Hills (Tamil Nadu)</li>
              <li>Coorg & Chikmagalur Coffee Valleys (Karnataka)</li>
              <li>Goa Beach & College Group IV</li>
              <li>Rameshwaram & Kanyakumari Pilgrimage</li>
              <li>Thailand & Malaysia International Tours</li>
            </ul>
          </div>

          {/* Col 4: Contact Us */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Direct Reach</h4>
            <p className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-sky-400 flex-shrink-0" />
              <a href={`tel:${COMPANY_INFO.phone}`} className="hover:text-white transition-colors">
                {COMPANY_INFO.phone}
              </a>
            </p>
            <p className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <a href={`mailto:${COMPANY_INFO.email}`} className="hover:text-white transition-colors">
                {COMPANY_INFO.email}
              </a>
            </p>
            <p className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <span>{COMPANY_INFO.address}</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
