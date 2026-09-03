import React from "react";

export default function TrustBadges() {
  const badges = [
    {
      icon: "🏆",
      title: "8+ Years Experience",
      desc: "Over 8 years of excellence in domestic, international & IV trips."
    },
    {
      icon: "👨‍👩‍👧‍👦",
      title: "500+ Happy Customers",
      desc: "500+ Satisfied family travelers, couples & student groups."
    },
    {
      icon: "🛡️",
      title: "Govt Registered & Certified",
      desc: "Government safety certification & verified registration credentials."
    },
    {
      icon: "📞",
      title: "24/7 On-Trip Manager",
      desc: "Dedicated tour manager & emergency assistance throughout your trip."
    }
  ];

  return (
    <section className="py-12 bg-white border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {badges.map((b, idx) => (
            <div
              key={idx}
              className="flex items-start gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-200/60 hover:border-sky-300 hover:shadow-sm transition-all"
            >
              <div className="text-3xl flex-shrink-0">{b.icon}</div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 mb-1">{b.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
