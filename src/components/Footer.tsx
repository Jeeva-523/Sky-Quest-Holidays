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

          {/* Col 2: Services & Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Services & Tours</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/tour-operators" className="hover:text-sky-400 transition-colors">
                  Tour Operators South India
                </Link>
              </li>
              <li>
                <Link href="/tour-operators-tamil-nadu" className="hover:text-sky-400 transition-colors">
                  Tour Operators Tamil Nadu
                </Link>
              </li>
              <li>
                <Link href="/educational-tours" className="hover:text-sky-400 transition-colors">
                  Educational Tours & Field Trips
                </Link>
              </li>
              <li>
                <Link href="/industrial-visit-packages" className="hover:text-sky-400 transition-colors">
                  Industrial Visit Packages (IV)
                </Link>
              </li>
              <li>
                <Link href="/college-tour-packages" className="hover:text-sky-400 transition-colors">
                  College Tour Packages
                </Link>
              </li>
              <li>
                <Link href="/group-tour-packages" className="hover:text-sky-400 transition-colors">
                  Group Tour Packages
                </Link>
              </li>
              <li>
                <Link href="/customized-tour-packages" className="hover:text-sky-400 transition-colors">
                  Customized Tour Packages
                </Link>
              </li>
              <li>
                <Link href="/tour-packages" className="hover:text-sky-400 transition-colors">
                  All Tour Packages
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Popular Destinations */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Top Destinations</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/kerala-tour-packages" className="hover:text-sky-400 transition-colors">
                  Kerala Tour Packages
                </Link>
              </li>
              <li>
                <Link href="/munnar-tour-packages" className="hover:text-sky-400 transition-colors">
                  Munnar Tour Packages
                </Link>
              </li>
              <li>
                <Link href="/vagamon-tour-packages" className="hover:text-sky-400 transition-colors">
                  Vagamon Tour Packages
                </Link>
              </li>
              <li>
                <Link href="/ooty-tour-packages" className="hover:text-sky-400 transition-colors">
                  Ooty Tour Packages
                </Link>
              </li>
              <li className="text-slate-500">Goa Beach & College Tours</li>
              <li className="text-slate-500">Kodaikanal & Coorg Packages</li>
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

        {/* SEO Internal Links Strip */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 text-[11px] text-slate-500 leading-relaxed">
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 text-center">
            <span className="text-slate-400 font-semibold">Popular Searches:</span>
            <Link href="/tour-operators" className="hover:text-sky-400 transition-colors">
              Tour Operators
            </Link>
            <span>•</span>
            <Link href="/tour-operators-tamil-nadu" className="hover:text-sky-400 transition-colors">
              Tour Operators in Tamil Nadu
            </Link>
            <span>•</span>
            <Link href="/educational-tours" className="hover:text-sky-400 transition-colors">
              Educational Tours
            </Link>
            <span>•</span>
            <Link href="/educational-tour-packages" className="hover:text-sky-400 transition-colors">
              Educational Tour Packages
            </Link>
            <span>•</span>
            <Link href="/industrial-visit-packages" className="hover:text-sky-400 transition-colors">
              Industrial Visit Packages
            </Link>
            <span>•</span>
            <Link href="/industrial-visit-organizers" className="hover:text-sky-400 transition-colors">
              Industrial Visit Organizers
            </Link>
            <span>•</span>
            <Link href="/iv-packages" className="hover:text-sky-400 transition-colors">
              College IV Packages
            </Link>
            <span>•</span>
            <Link href="/college-tour-packages" className="hover:text-sky-400 transition-colors">
              College Tour Packages
            </Link>
            <span>•</span>
            <Link href="/college-excursion-packages" className="hover:text-sky-400 transition-colors">
              College Excursion Packages
            </Link>
            <span>•</span>
            <Link href="/student-tour-packages" className="hover:text-sky-400 transition-colors">
              Student Tour Packages
            </Link>
            <span>•</span>
            <Link href="/group-tour-packages" className="hover:text-sky-400 transition-colors">
              Group Tour Packages
            </Link>
            <span>•</span>
            <Link href="/customized-tour-packages" className="hover:text-sky-400 transition-colors">
              Customized Tour Packages
            </Link>
            <span>•</span>
            <Link href="/namakkal-travel-agency" className="hover:text-sky-400 transition-colors">
              Best Travel Agency in Namakkal
            </Link>
            <span>•</span>
            <Link href="/kerala-tour-packages" className="hover:text-sky-400 transition-colors">
              Kerala Tour Packages
            </Link>
            <span>•</span>
            <Link href="/munnar-tour-packages" className="hover:text-sky-400 transition-colors">
              Munnar Tour Packages
            </Link>
            <span>•</span>
            <Link href="/vagamon-tour-packages" className="hover:text-sky-400 transition-colors">
              Vagamon Tour Packages
            </Link>
            <span>•</span>
            <Link href="/ooty-tour-packages" className="hover:text-sky-400 transition-colors">
              Ooty Tour Packages
            </Link>
            <span>•</span>
            <Link href="/family-tour-packages" className="hover:text-sky-400 transition-colors">
              Family Tour Packages
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
