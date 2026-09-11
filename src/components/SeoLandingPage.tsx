"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  MapPin,
  Calendar,
  Phone,
  CheckCircle2,
  Star,
  Shield,
  ArrowRight,
  ChevronRight,
  HelpCircle,
  ChevronDown,
  Sparkles,
  MessageCircle,
  Users,
  Compass,
  Bus,
  Clock,
  Car
} from "lucide-react";
import { TourPackage } from "@/lib/types";
import { COMPANY_INFO } from "@/lib/data";
import PackageCard from "./PackageCard";
import BookingModal from "./BookingModal";
import StructuredData from "./StructuredData";

export interface SeoFaq {
  q: string;
  a: string;
}

export interface SeoGuideSection {
  title: string;
  subtitle?: string;
  content: string;
  bullets?: string[];
}

export interface SeoLandingPageProps {
  slug: string;
  pageTitle: string;
  pageDescription: string;
  h1: string;
  badgeText: string;
  heroSubtitle: string;
  heroBackgroundImage?: string;
  packages: TourPackage[];
  guideSections: SeoGuideSection[];
  faqs: SeoFaq[];
  relatedLinks: { title: string; href: string }[];
  searchIntent: "Informational" | "Commercial" | "Transactional" | "Navigational";
  serviceType?: string;
}

export default function SeoLandingPage({
  slug,
  pageTitle,
  pageDescription,
  h1,
  badgeText,
  heroSubtitle,
  heroBackgroundImage = "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1920&q=80",
  packages,
  guideSections,
  faqs,
  relatedLinks,
  searchIntent,
  serviceType
}: SeoLandingPageProps) {
  const [activePackageForBooking, setActivePackageForBooking] = useState<TourPackage | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const pageUrl = `https://sky-quest-holidays.web.app/${slug}`;
  const breadcrumbs = [
    { name: "Home", url: "https://sky-quest-holidays.web.app/" },
    { name: "Tour Packages", url: "https://sky-quest-holidays.web.app/tour-packages" },
    { name: h1, url: pageUrl }
  ];

  return (
    <main className="min-h-screen bg-slate-900 text-slate-100 pt-20">
      {/* Structured Data / JSON-LD for SEO & AI */}
      <StructuredData
        type="page"
        pageTitle={pageTitle}
        pageDescription={pageDescription}
        pageUrl={pageUrl}
        breadcrumbs={breadcrumbs}
        faqs={faqs}
        serviceType={serviceType || h1}
      />

      {/* 1. Breadcrumbs Header */}
      <nav aria-label="Breadcrumb" className="bg-slate-950/80 border-b border-slate-800/80 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ol className="flex items-center flex-wrap gap-2 text-xs text-slate-400">
            <li>
              <Link href="/" className="hover:text-sky-400 transition-colors flex items-center gap-1">
                <span>Home</span>
              </Link>
            </li>
            <li>
              <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            </li>
            <li>
              <Link href="/tour-packages" className="hover:text-sky-400 transition-colors">
                Tour Packages
              </Link>
            </li>
            <li>
              <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            </li>
            <li className="text-sky-400 font-medium truncate max-w-[260px] sm:max-w-md">
              {h1}
            </li>
          </ol>
        </div>
      </nav>

      {/* 2. Hero Header */}
      <section className="relative py-16 sm:py-24 overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0 z-0">
          <img
            src={heroBackgroundImage}
            alt={`SKY QUEST HOLIDAYS - ${h1}`}
            className="w-full h-full object-cover opacity-20 filter blur-sm scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-900/90 to-slate-900" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs sm:text-sm font-bold tracking-wide uppercase mb-6 backdrop-blur-sm">
            <Sparkles className="w-4 h-4" />
            <span>{badgeText}</span>
          </div>

          {/* Primary H1 */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight mb-6 drop-shadow-sm">
            {h1}
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-8">
            {heroSubtitle}
          </p>

          {/* Trust Highlights */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-slate-300 mb-8 font-medium">
            <span className="inline-flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span>4.9★ Rated (500+ Reviews)</span>
            </span>
            <span className="inline-flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700">
              <Shield className="w-4 h-4 text-sky-400" />
              <span>Govt Regd: {COMPANY_INFO.govtRegNumber}</span>
            </span>
            <span className="inline-flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700">
              <MapPin className="w-4 h-4 text-emerald-400" />
              <span>Based in Namakkal, Tamil Nadu</span>
            </span>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href={`https://wa.me/917338710611?text=${encodeURIComponent(
                `Hello Sky Quest Holidays, I am interested in ${h1}. Please share packages and customized quotation.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 shadow-lg shadow-emerald-950/40 hover:scale-[1.02] transition-all text-sm sm:text-base"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Instant WhatsApp Quote</span>
            </a>

            <a
              href="tel:+917338710611"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-slate-600 shadow-md transition-all text-sm sm:text-base"
            >
              <Phone className="w-4 h-4 text-sky-400" />
              <span>Call +91 73387 10611</span>
            </a>
          </div>
        </div>
      </section>

      {/* 3. Featured Packages Grid */}
      {packages && packages.length > 0 && (
        <section className="py-16 bg-slate-950 border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
              <div>
                <span className="text-sky-400 text-xs font-bold uppercase tracking-wider block mb-2">
                  Handpicked Itineraries
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  Available Tour Packages & Fixed Itineraries
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 max-w-md">
                All packages include private sanitized cab, experienced driver, verified hotel stays, and 24/7 tour manager support.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {packages.map((pkg) => (
                <PackageCard
                  key={pkg.id}
                  pkg={pkg}
                  onBook={(p) => setActivePackageForBooking(p)}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 4. Comprehensive Travel Guide & Service Details (Rich SEO & AI Content) */}
      <section className="py-20 bg-slate-900 border-b border-slate-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {guideSections.map((section, idx) => (
            <article key={idx} className="bg-slate-800/40 rounded-3xl p-6 sm:p-10 border border-slate-700/60 shadow-lg">
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-4 flex items-center gap-3">
                <span className="w-2.5 h-7 rounded-full bg-sky-500 inline-block" />
                {section.title}
              </h2>
              {section.subtitle && (
                <h3 className="text-base sm:text-lg font-bold text-sky-400 mb-4">
                  {section.subtitle}
                </h3>
              )}
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed whitespace-pre-line mb-6">
                {section.content}
              </p>

              {section.bullets && section.bullets.length > 0 && (
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {section.bullets.map((b, bIdx) => (
                    <li
                      key={bIdx}
                      className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200 bg-slate-900/60 p-3 rounded-xl border border-slate-700/40"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              )}
            </article>
          ))}
        </div>
      </section>

      {/* 5. Why Choose SKY QUEST HOLIDAYS Namakkal */}
      <section className="py-16 bg-slate-950 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-sky-400 text-xs font-bold uppercase tracking-wider block mb-2">
              Our Value Guarantee
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Why Book With SKY QUEST HOLIDAYS?
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-3">
              We are a registered, professional tour operator based in Namakkal, Tamil Nadu, committed to transparent pricing and delightful vacations.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 text-center flex flex-col items-center">
              <div className="w-12 h-12 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center mb-4">
                <Car className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-white text-base mb-2">Doorstep Cab Pickup</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Dedicated private cabs (Sedans, Innova, Ertiga, Tempo) directly from Namakkal, Salem, Trichy, Erode, or any Tamil Nadu hub.
              </p>
            </div>

            <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 text-center flex flex-col items-center">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-4">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-white text-base mb-2">100% Transparent Billing</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Fuel, toll gates, parking, and driver allowances are fully included. Zero surprise charges on arrival.
              </p>
            </div>

            <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 text-center flex flex-col items-center">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-4">
                <Bus className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-white text-base mb-2">College & Group Experts</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                50-seater luxury pushback buses, DJ nights, campfires, verified safe faculty rooms, and 24/7 tour managers.
              </p>
            </div>

            <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 text-center flex flex-col items-center">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center mb-4">
                <Star className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-white text-base mb-2">Customized Itineraries</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Flexibility to choose hotel categories (3-Star, 4-Star, Luxury Resorts), sightseeing hours, and meal plans.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FAQ Accordion Section (AI & Search Snippet Optimized) */}
      <section className="py-20 bg-slate-900 border-b border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-bold uppercase tracking-wider mb-3">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Questions & Answers</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              Everything you need to know about booking this tour package with SKY QUEST HOLIDAYS.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-slate-800/70 border border-slate-700/60 overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 text-white font-bold text-sm sm:text-base hover:text-sky-400 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-sky-400 flex-shrink-0 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-slate-300 text-xs sm:text-sm leading-relaxed border-t border-slate-700/40">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. Internal Linking Box */}
      {relatedLinks && relatedLinks.length > 0 && (
        <section className="py-12 bg-slate-950 border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">
              Explore More Tour Packages & Travel Guides
            </h3>
            <div className="flex flex-wrap gap-2.5">
              {relatedLinks.map((link, idx) => (
                <Link
                  key={idx}
                  href={link.href}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 hover:text-sky-400 hover:border-sky-500/40 transition-colors"
                >
                  <span>{link.title}</span>
                  <ArrowRight className="w-3 h-3 text-sky-400" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 8. Bottom Direct Contact / Conversion CTA */}
      <section className="py-16 bg-gradient-to-br from-sky-950/60 via-slate-900 to-slate-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center bg-slate-800/80 border border-sky-500/20 p-8 sm:p-12 rounded-3xl shadow-2xl backdrop-blur-md">
          <h2 className="text-2xl sm:text-3xl font-black text-white mb-3">
            Plan Your Tour with SKY QUEST HOLIDAYS
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto mb-8">
            Contact our travel experts in Namakkal, Tamil Nadu for personalized itineraries, group discounts, and instant PDF quotations.
          </p>

          <div className="flex flex-wrap justify-center items-center gap-4">
            <a
              href="tel:+917338710611"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-white bg-sky-600 hover:bg-sky-500 shadow-lg shadow-sky-900/40 transition-all text-sm"
            >
              <Phone className="w-4 h-4" />
              <span>Call +91 73387 10611</span>
            </a>
            <a
              href={`https://wa.me/917338710611?text=${encodeURIComponent(
                `Hello Sky Quest Holidays, please share complete package details and pricing for ${h1}.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-white bg-emerald-600 hover:bg-emerald-500 shadow-lg shadow-emerald-900/40 transition-all text-sm"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Chat</span>
            </a>
          </div>

          <div className="mt-6 text-[11px] text-slate-400 flex items-center justify-center gap-2">
            <Shield className="w-3.5 h-3.5 text-sky-400" />
            <span>SKY QUEST HOLIDAYS • Namakkal, Tamil Nadu • Reg: {COMPANY_INFO.govtRegNumber}</span>
          </div>
        </div>
      </section>

      {/* Booking Modal Integration */}
      <BookingModal
        pkg={activePackageForBooking}
        isOpen={!!activePackageForBooking}
        onClose={() => setActivePackageForBooking(null)}
      />
    </main>
  );
}
