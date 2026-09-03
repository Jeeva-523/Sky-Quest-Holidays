"use client";

import React, { useState, useEffect } from "react";
import { CheckCircle2 } from "lucide-react";
import { fetchSiteMediaSettings, DEFAULT_WHY_CHOOSE_IMG } from "@/lib/firebaseServices";

export default function WhyChooseUs() {
  const [whyChooseImage, setWhyChooseImage] = useState(DEFAULT_WHY_CHOOSE_IMG);

  useEffect(() => {
    const loadMedia = () => {
      fetchSiteMediaSettings().then((settings) => {
        if (settings && settings.whyChooseImage) {
          setWhyChooseImage(settings.whyChooseImage);
        }
      });
    };
    loadMedia();
    window.addEventListener("site_media_updated", loadMedia);
    return () => window.removeEventListener("site_media_updated", loadMedia);
  }, []);

  const points = [
    {
      title: "Direct Local Network",
      desc: "No middlemen fees. We own direct contracts with premier 3-star and 4-star resorts, houseboats, and verified luxury cabs."
    },
    {
      title: "100% Tailored Itineraries",
      desc: "Travel at your own pace. Whether it's early sunrise treks, candlelight dinners, or flexible rest stops, we customize every hour."
    },
    {
      title: "Dedicated Trip Coordinators",
      desc: "A personal trip coordinator tracks your flight/train arrival and coordinates with the driver 24/7 until you return home safely."
    },
    {
      title: "Best Rate Guarantee",
      desc: "Transparent quotes with clear GST bills, driver allowances, toll fees, and zero hidden checkout charges."
    }
  ];

  return (
    <section className="py-20 bg-slate-50 border-t border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Text */}
          <div>
            <div className="inline-block px-4 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-bold uppercase tracking-wider mb-4">
              The Sky Quest Advantage
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-6">
              Why Hundreds of Travelers Choose Sky Quest Holidays
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-8">
              We believe a holiday shouldn&apos;t just be a hotel booking; it should be a memorable lifetime story without stress, rush, or surprise expenses.
            </p>

            <div className="space-y-4">
              {points.map((p, idx) => (
                <div key={idx} className="flex items-start gap-4 p-4 rounded-xl bg-white border border-slate-200/80 shadow-sm">
                  <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 mb-1">{p.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Visual Image & Stats Card */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-200">
              <img
                src={whyChooseImage || DEFAULT_WHY_CHOOSE_IMG}
                alt="Travelers enjoying tour with Sky Quest"
                className="w-full h-[440px] object-cover transition-all duration-500"
              />
            </div>

            {/* Floating Trust Card */}
            <div className="absolute -bottom-6 -left-6 bg-white border border-slate-200 p-6 rounded-2xl shadow-xl max-w-xs">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center font-bold text-base">
                  ⭐
                </div>
                <div>
                  <h4 className="text-sm font-black text-slate-900">4.9 / 5.0 Rating</h4>
                  <p className="text-[11px] text-slate-500 font-semibold">500+ Happy Reviews</p>
                </div>
              </div>
              <p className="text-xs text-slate-600 italic">
                &ldquo;Exceptional hospitality, on-time cab pickup and genuine care for families.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
