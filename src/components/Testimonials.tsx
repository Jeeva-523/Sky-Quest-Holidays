"use client";

import React from "react";
import { Star, MessageSquareQuote, CheckCircle2 } from "lucide-react";
import { INITIAL_FEEDBACK } from "@/lib/data";

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 bg-slate-950 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Star className="w-3.5 h-3.5 fill-amber-400" />
            <span>Traveler Stories</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            Loved by Hundreds of Happy Travelers
          </h2>
          <p className="text-slate-400 text-sm">
            Read honest reviews from families, couples, and college groups who journeyed with us.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {INITIAL_FEEDBACK.map((rev) => (
            <div
              key={rev.id}
              className="flex flex-col justify-between p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-sky-500/40 transition-all hover:-translate-y-1 group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-amber-400 gap-1">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] font-semibold text-slate-400 px-2 py-0.5 rounded bg-slate-800">
                    Verified Trip
                  </span>
                </div>

                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6 italic">
                  &ldquo;{rev.comment}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white">{rev.name}</h4>
                  <p className="text-[11px] text-slate-400">{rev.location}</p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-semibold text-sky-400 bg-sky-950/60 border border-sky-800/60 px-2 py-1 rounded-md">
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
