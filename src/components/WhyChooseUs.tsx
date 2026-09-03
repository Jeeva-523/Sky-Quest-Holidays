import React from "react";
import { CheckCircle, Users, BadgePercent, MapPin, Sparkles, PhoneCall } from "lucide-react";

export default function WhyChooseUs() {
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
    <section className="py-20 bg-slate-950 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Text */}
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-bold uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>The Sky Quest Advantage</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-6">
              Why Hundreds of Travelers Choose Sky Quest Holidays
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
              We believe a holiday shouldn't just be a hotel booking; it should be a memorable lifetime story without stress, rush, or surprise expenses.
            </p>

            <div className="space-y-4">
              {points.map((p, idx) => (
                <div key={idx} className="flex items-start gap-4 p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                  <div className="w-8 h-8 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white mb-1">{p.title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Visual Image & Stats Card */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-700">
              <img
                src="https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1000&q=80"
                alt="Travelers enjoying hill station"
                className="w-full h-[450px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
            </div>

            {/* Floating Trust Card */}
            <div className="absolute -bottom-6 -left-6 bg-slate-900/95 backdrop-blur-md border border-slate-700 p-6 rounded-2xl shadow-xl max-w-xs">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-base">
                  ⭐
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-white">4.9 / 5.0 Rating</h4>
                  <p className="text-[11px] text-slate-400">Based on 500+ Google Reviews</p>
                </div>
              </div>
              <p className="text-xs text-slate-300 italic">
                &ldquo;Exceptional hospitality, on-time cab pickup and genuine care for families.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
