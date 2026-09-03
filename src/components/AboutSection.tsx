"use client";

import React, { useState, useEffect } from "react";
import { fetchSiteMediaSettings, DEFAULT_ABOUT_IMG } from "@/lib/firebaseServices";

export default function AboutSection() {
  const [aboutImage, setAboutImage] = useState(DEFAULT_ABOUT_IMG);

  useEffect(() => {
    const loadMedia = () => {
      fetchSiteMediaSettings().then((settings) => {
        if (settings && settings.aboutImage) {
          setAboutImage(settings.aboutImage);
        }
      });
    };
    loadMedia();
    window.addEventListener("site_media_updated", loadMedia);
    return () => window.removeEventListener("site_media_updated", loadMedia);
  }, []);

  return (
    <section id="about" className="py-20 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Large Single Image */}
          <div className="relative">
            <div className="relative h-[440px] w-full rounded-3xl overflow-hidden shadow-xl border border-slate-200">
              <img
                src={aboutImage || DEFAULT_ABOUT_IMG}
                alt="Sky Quest Holidays Destination"
                className="w-full h-full object-cover transition-all duration-500 hover:scale-102"
              />
            </div>

            {/* Floating Experience Badge */}
            <div className="absolute -bottom-6 -right-6 bg-slate-900 text-white p-5 rounded-2xl shadow-xl border border-slate-800 max-w-xs">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-sky-500 text-white flex items-center justify-center font-bold text-lg">
                  🏆
                </div>
                <div>
                  <h4 className="text-sm font-black text-white">8+ Years Experience</h4>
                  <p className="text-[11px] text-sky-400 font-semibold">Government Certified Agency</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div>
            <div className="inline-block px-4 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-bold uppercase tracking-wider mb-4">
              About Sky Quest Holidays
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-6">
              Passionate Travel Experts Based in Tamil Nadu
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
              Founded with the vision to make holidays smooth, exciting, and accessible to everyone, <strong className="text-slate-900">Sky Quest Holidays</strong> has grown into one of South India&apos;s most dependable tour operators.
            </p>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-8">
              Whether you are looking for a romantic honeymoon escape in misty Munnar, an adventurous college industrial visit in Goa, a devotional pilgrimage to Rameshwaram, or group tours across Kerala & Karnataka, our dedicated team handles transport, deluxe accommodations, and on-ground logistics with utmost care.
            </p>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-100">
              <div>
                <p className="text-2xl font-black text-sky-600">8+ Years</p>
                <p className="text-xs text-slate-500 font-medium">Experience</p>
              </div>
              <div>
                <p className="text-2xl font-black text-amber-500">500+</p>
                <p className="text-xs text-slate-500 font-medium">Happy Trips</p>
              </div>
              <div>
                <p className="text-2xl font-black text-emerald-600">100%</p>
                <p className="text-xs text-slate-500 font-medium">Safe & Certified</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
