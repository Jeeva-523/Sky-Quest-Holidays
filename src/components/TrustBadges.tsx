import React from "react";
import { ShieldCheck, HeartHandshake, Award, Clock, Sparkles } from "lucide-react";

export default function TrustBadges() {
  const badges = [
    {
      icon: <ShieldCheck className="w-8 h-8 text-sky-400" />,
      title: "Govt. Approved & Regd",
      desc: "Officially registered travel operator with verified credentials & safety guarantee."
    },
    {
      icon: <Award className="w-8 h-8 text-amber-400" />,
      title: "Top Rated Service",
      desc: "Consistently rated 4.9/5 stars with 500+ happy family & college groups."
    },
    {
      icon: <HeartHandshake className="w-8 h-8 text-rose-400" />,
      title: "Zero Hidden Costs",
      desc: "Transparent inclusions for sightseeing, resort stays, and private cab transfers."
    },
    {
      icon: <Clock className="w-8 h-8 text-emerald-400" />,
      title: "24/7 Dedicated Driver & Support",
      desc: "Continuous live assistance and trained polite chauffeurs throughout your journey."
    }
  ];

  return (
    <section className="py-12 bg-slate-900 border-y border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {badges.map((b, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-slate-800/40 border border-slate-700/50 hover:border-sky-500/40 transition-all group hover:-translate-y-1"
            >
              <div className="w-14 h-14 rounded-xl bg-slate-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                {b.icon}
              </div>
              <h3 className="text-base font-bold text-white mb-2">{b.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
