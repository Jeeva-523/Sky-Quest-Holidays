"use client";

import React from "react";
import { Star } from "lucide-react";
import { INITIAL_FEEDBACK } from "@/lib/data";

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-block px-4 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-wider mb-3">
            ⭐ Traveler Stories
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Loved by Hundreds of Happy Travelers
          </h2>
          <p className="text-slate-600 text-sm">
            Read honest reviews from families, couples, and college groups who journeyed with us.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {INITIAL_FEEDBACK.map((rev) => (
            <div
              key={rev.id}
              className="flex flex-col justify-between p-6 rounded-2xl bg-slate-50 border border-slate-200/80 shadow-sm card-hover transition-all group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-amber-500 gap-1">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-500" />
                    ))}
                  </div>
                  <span className="text-[11px] font-bold text-slate-500 px-2 py-0.5 rounded bg-white border border-slate-200">
                    Verified Trip
                  </span>
                </div>

                <p className="text-slate-700 text-xs sm:text-sm leading-relaxed mb-6 italic">
                  &ldquo;{rev.comment}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{rev.name}</h4>
                  <p className="text-[11px] text-slate-500 font-medium">{rev.location}</p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-bold text-sky-700 bg-sky-100 px-2 py-1 rounded-md">
                    {rev.tour}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
