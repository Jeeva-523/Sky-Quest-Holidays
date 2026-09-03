"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Printer, Download, Sparkles, Plus, Trash2, CheckCircle2, Compass, Shield } from "lucide-react";
import { COMPANY_INFO, INITIAL_PACKAGES } from "@/lib/data";

export default function QuotationPage() {
  const [clientName, setClientName] = useState("Mr. Ramesh Kumar");
  const [clientPhone, setClientPhone] = useState("+91 98765 43210");
  const [clientEmail, setClientEmail] = useState("client@gmail.com");
  const [destination, setDestination] = useState("Munnar & Alleppey Luxury Holiday");
  const [duration, setDuration] = useState("3 Days / 2 Nights");
  const [travelDates, setTravelDates] = useState("15 Oct 2026 – 17 Oct 2026");
  const [numAdults, setNumAdults] = useState("2 Adults");
  const [cabType, setCabType] = useState("Dedicated AC Swift Dzire / Etios (Private)");
  const [hotelType, setHotelType] = useState("3-Star Deluxe Valley View Resort + 1 Night Houseboat");
  const [packagePrice, setPackagePrice] = useState("14,999");
  const [discount, setDiscount] = useState("1,500");
  const [quoteNumber, setQuoteNumber] = useState(`SQH-${Math.floor(1000 + Math.random() * 9000)}`);
  const [dateOfQuote] = useState(new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }));

  const [itineraryDays, setItineraryDays] = useState([
    {
      day: "Day 1",
      title: "Arrival in Cochin & Scenic Drive to Munnar",
      desc: "Warm welcome at Cochin airport/station. Enjoy scenic drive past Valara & Cheeyappara waterfalls, spice plantations, and check-in to tea valley resort."
    },
    {
      day: "Day 2",
      title: "Munnar Full Day Tea Hills & Sightseeing",
      desc: "Explore Eravikulam National Park (Nilgiri Tahr), Mattupetty Dam, Echo Point, Photo Point, and Kundala Lake. Evening tea museum visit."
    },
    {
      day: "Day 3",
      title: "Alleppey Houseboat Cruise & Departure",
      desc: "Drive to Alleppey backwaters. Board private luxury houseboat with welcome drink & traditional Kerala lunch. Evening departure drop at Cochin."
    }
  ]);

  const [inclusions, setInclusions] = useState([
    "2 Nights Deluxe Accommodation (1N Resort + 1N Houseboat)",
    "Daily Breakfast & All Meals on Houseboat (Lunch, Dinner, Tea & Snacks)",
    "Private Dedicated AC Sedan Vehicle for entire tour & transfers",
    "All Toll Gates, Parking fees, Fuel charges & Driver Beta included",
    "24/7 Dedicated Trip Support Executive"
  ]);

  const [exclusions, setExclusions] = useState([
    "Entry tickets to monuments, amusement parks & boating fees",
    "Personal expenses like laundry, room service & shopping",
    "Any flights or train tickets"
  ]);

  const handlePrint = () => {
    window.print();
  };

  const calculateFinalTotal = () => {
    const p = parseFloat(packagePrice.replace(/[^0-9.]/g, "")) || 0;
    const d = parseFloat(discount.replace(/[^0-9.]/g, "")) || 0;
    return Math.max(0, p - d).toLocaleString("en-IN");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Controls Bar (Hidden in Print) */}
        <div className="print:hidden mb-8 p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-sky-400 flex items-center gap-1.5 text-xs font-semibold"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Site</span>
            </Link>
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Tour Quotation & Itinerary Studio</span>
              </h2>
              <p className="text-xs text-slate-400">
                Edit client details below or print/save as high-quality PDF.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <button
              onClick={handlePrint}
              className="flex-1 md:flex-initial px-6 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold text-xs shadow-glow flex items-center justify-center gap-2 transition-all"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Export PDF</span>
            </button>
          </div>
        </div>

        {/* Printable Quotation Paper (A4 Style) */}
        <div className="bg-white text-slate-900 rounded-3xl p-8 sm:p-12 shadow-2xl border border-slate-200 print:border-none print:shadow-none print:p-0 print:rounded-none max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between border-b-2 border-slate-900/10 pb-8 mb-8 gap-6">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-slate-950 flex items-center justify-center text-sky-400 shadow-md">
                <Compass className="w-7 h-7" />
              </div>
              <div>
                <h1 className="text-2xl font-black tracking-tight text-slate-950">
                  <span className="text-sky-600">SKY</span>QUEST HOLIDAYS
                </h1>
                <p className="text-[11px] font-bold tracking-widest text-slate-500 uppercase">
                  Explore Beyond Horizons
                </p>
                <p className="text-[11px] text-slate-600 mt-1">
                  Govt. Regd: {COMPANY_INFO.govtRegNumber} • Namakkal, TN
                </p>
              </div>
            </div>

            <div className="text-left sm:text-right">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-black bg-sky-100 text-sky-800 uppercase tracking-wider mb-1">
                Official Tour Quotation
              </span>
              <p className="text-sm font-black text-slate-900">Quote #{quoteNumber}</p>
              <p className="text-xs text-slate-500">Date: {dateOfQuote}</p>
              <p className="text-xs font-semibold text-sky-700">{COMPANY_INFO.phone}</p>
            </div>
          </div>

          {/* Client & Tour Meta Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-6 rounded-2xl bg-slate-50 border border-slate-200/80 mb-8 text-xs">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Quotation Prepared For</p>
              <h3 className="text-base font-extrabold text-slate-900">{clientName}</h3>
              <p className="text-slate-600 mt-0.5">{clientPhone} • {clientEmail}</p>
              <p className="text-slate-600 mt-0.5">Travelers: <span className="font-semibold text-slate-900">{numAdults}</span></p>
            </div>

            <div className="sm:text-right">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Trip Overview</p>
              <h3 className="text-base font-extrabold text-sky-700">{destination}</h3>
              <p className="text-slate-600 mt-0.5 font-semibold">{duration} • {travelDates}</p>
              <p className="text-slate-600 mt-0.5">Cab: {cabType}</p>
            </div>
          </div>

          {/* Detailed Day-wise Itinerary */}
          <div className="mb-8">
            <h3 className="text-base font-black text-slate-900 border-b border-slate-200 pb-2 mb-4 flex items-center gap-2">
              <span>🗓️ Day-wise Tour Plan</span>
            </h3>

            <div className="space-y-4">
              {itineraryDays.map((item, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-50/80 border border-slate-200/60">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 rounded text-[11px] font-black bg-sky-600 text-white">
                      {item.day}
                    </span>
                    <h4 className="text-xs font-bold text-slate-900">{item.title}</h4>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed pl-1">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Inclusions & Exclusions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8 text-xs">
            <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200">
              <h4 className="font-bold text-emerald-900 mb-3 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Package Inclusions</span>
              </h4>
              <ul className="space-y-2">
                {inclusions.map((inc, i) => (
                  <li key={i} className="flex items-start gap-2 text-slate-700">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>{inc}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-rose-50/60 border border-rose-200">
              <h4 className="font-bold text-rose-900 mb-3 flex items-center gap-1.5">
                <span className="text-rose-600 font-bold">✕</span>
                <span>Package Exclusions</span>
              </h4>
              <ul className="space-y-2">
                {exclusions.map((exc, i) => (
                  <li key={i} className="flex items-start gap-2 text-slate-700">
                    <span className="text-rose-500 font-bold">•</span>
                    <span>{exc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Pricing Summary */}
          <div className="p-6 rounded-2xl bg-slate-950 text-white flex flex-col sm:flex-row items-center justify-between gap-6 mb-8">
            <div>
              <p className="text-xs text-slate-400">Total Net Package Cost</p>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-3xl font-black text-sky-400">₹{calculateFinalTotal()}</span>
                <span className="text-xs text-slate-400">(All Taxes & Cab Included)</span>
              </div>
              <p className="text-[11px] text-amber-300 mt-1">
                ✨ Special Promo Discount Applied: ₹{discount}
              </p>
            </div>

            <div className="text-left sm:text-right text-xs text-slate-300 space-y-1">
              <p>Advance Required to Confirm: <strong className="text-white">30%</strong></p>
              <p>GPay / PhonePe / Bank Transfer Accepted</p>
              <p className="text-sky-300 font-semibold">{COMPANY_INFO.phone}</p>
            </div>
          </div>

          {/* Footer Note */}
          <div className="text-center text-[11px] text-slate-500 border-t border-slate-200 pt-4">
            <p>Thank you for choosing Sky Quest Holidays! We guarantee the most comfortable & memorable journey.</p>
            <p className="font-semibold text-slate-700 mt-1">skyquestholidays@gmail.com • +91 73387 10611</p>
          </div>
        </div>
      </div>
    </div>
  );
}
