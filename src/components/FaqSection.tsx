"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import StructuredData from "./StructuredData";

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "What is the best travel agency in Namakkal?",
      a: "SKY QUEST HOLIDAYS is recognized as the best travel agency and top-rated tour operator in Namakkal, Tamil Nadu. With 8+ years of expertise, 4.9-star traveler rating, and government registration (TN/NKL/TOUR/2020/4891), we specialize in college tour packages, Kerala vacations, family trips, and corporate travel with sanitized private cabs and premium hotel accommodations."
    },
    {
      q: "Which travel agency in Namakkal provides college tour packages?",
      a: "SKY QUEST HOLIDAYS is the leading college tour operator in Tamil Nadu, based in Namakkal. We organize end-to-end college industrial visits (IV) and educational tours to Kerala, Goa, Munnar, Ooty, and Bangalore, featuring luxury 50-seater AC pushback buses, DJ nights, campfires, faculty rooms, and 24/7 on-tour coordinators."
    },
    {
      q: "Does SKY QUEST HOLIDAYS arrange Kerala tours from Namakkal?",
      a: "Yes, SKY QUEST HOLIDAYS offers direct Kerala tour packages from Namakkal, Salem, Erode, Trichy, and across Tamil Nadu. Our top packages include Cochin-Munnar hill station tours, Alleppey backwater houseboats, Vagamon adventure retreats, Thekkady wildlife safaris, and Wayanad nature trips with doorstep private cab pickup."
    },
    {
      q: "What destinations does SKY QUEST HOLIDAYS cover?",
      a: "We cover all premier South Indian and national destinations, including Munnar, Vagamon, Alleppey, Wayanad, Ooty, Kodaikanal, Goa, Coorg, Mysore, Chikmagalur, Dandeli, Hyderabad, Kanyakumari, and Rameswaram."
    },
    {
      q: "Does SKY QUEST HOLIDAYS arrange family and group tours?",
      a: "Yes! We design customized private family tour packages and large group tours for corporate outings and colleges. Packages feature private AC vehicles (Sedans, Ertiga, Innova Crysta, Tempo Traveller, or Luxury Buses), family-friendly resorts, child-safe itineraries, and transparent billing."
    },
    {
      q: "Can SKY QUEST HOLIDAYS arrange customized tour packages?",
      a: "Yes, 100%! All itineraries can be customized according to your travel dates, pickup city, preferred hotel tier (Standard 3-Star, Deluxe 4-Star, Luxury Resorts, or Private Villas), and specific sightseeing interests."
    },
    {
      q: "How do I book a tour package with Sky Quest Holidays?",
      a: "You can click 'Book Now' on any package to submit your enquiry, or call/WhatsApp us directly at +91 73387 10611. We will customize your itinerary and share an official PDF quotation for easy confirmation."
    },
    {
      q: "Are the private cab, fuel, driver allowances, and toll charges included?",
      a: "Yes! All quoted package prices include your dedicated private vehicle, fuel, driver beta (allowances), toll gates, and parking fees with zero hidden costs."
    }
  ];

  return (
    <section className="py-20 bg-slate-900 border-t border-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-bold uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-slate-800/60 border border-slate-700/60 overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
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
                  <div className="px-5 pb-5 pt-1 text-slate-300 text-xs sm:text-sm leading-relaxed border-t border-slate-800/60">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <StructuredData type="faq" faqs={faqs} />
    </section>
  );
}
