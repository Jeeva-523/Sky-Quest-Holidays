"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "How do I book a tour package with Sky Quest Holidays?",
      a: "You can click 'Book Now' on any package to submit your enquiry, or call/WhatsApp us directly at +91 73387 10611. We will customize the dates, vehicle, and hotel options, then share an official PDF quotation for your confirmation."
    },
    {
      q: "Can we customize the places to visit and hotel categories?",
      a: "Yes, 100%! All our tour itineraries are flexible. You can add extra sightseeing spots, change hotel tiers (Standard 3-Star, Deluxe 4-Star, Luxury Resort, Private Pool Villa), or alter pickup and drop locations."
    },
    {
      q: "Are the private cab, fuel, driver allowances, and toll charges included?",
      a: "Yes! All quoted prices include your dedicated private AC/Non-AC vehicle, fuel, driver beta (allowance), toll gates, and parking charges with zero hidden fees."
    },
    {
      q: "What is the advance payment policy?",
      a: "To confirm hotel reservations and cab allocation, a token advance of 25% to 30% is required. The balance can be conveniently paid upon your arrival or during the tour."
    },
    {
      q: "Do you arrange college IV (Industrial Visits) & large corporate group tours?",
      a: "Yes! We specialize in college group tours and corporate retreats with luxury 50-seater AC pushback buses, DJ nights, campfires, buffet catering, and verified faculty accommodations."
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
    </section>
  );
}
