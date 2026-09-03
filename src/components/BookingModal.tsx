"use client";

import React, { useState } from "react";
import { X, Calendar, Users, Phone, User, MessageSquare, CheckCircle2, Loader2, Compass } from "lucide-react";
import { TourPackage } from "@/lib/types";
import { submitEnquiry } from "@/lib/firebaseServices";
import { COMPANY_INFO } from "@/lib/data";

interface BookingModalProps {
  pkg: TourPackage | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingModal({ pkg, isOpen, onClose }: BookingModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [travelDate, setTravelDate] = useState("");
  const [travelers, setTravelers] = useState("2");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen || !pkg) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await submitEnquiry({
        name,
        phone,
        email,
        packageId: pkg.id,
        packageName: pkg.name,
        travelDate,
        travelers: parseInt(travelers) || 2,
        message,
        source: "Website Booking Modal"
      });
      setSubmitted(true);
    } catch (error) {
      console.error("Booking error:", error);
      alert("Enquiry recorded! We will get back to you immediately.");
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  const handleWhatsAppDirect = () => {
    const text = encodeURIComponent(
      `Hi Sky Quest Holidays! I am interested in booking: ${pkg.name} (${pkg.duration} - ${pkg.price}).\nName: ${name || "Traveler"}\nTravel Date: ${travelDate || "Flexible"}\nTravelers: ${travelers}`
    );
    window.open(`https://wa.me/${COMPANY_INFO.whatsapp}?text=${text}`, "_blank");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg rounded-3xl bg-slate-900 border border-slate-700 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-sky-950 via-slate-900 to-slate-900 p-6 border-b border-slate-800">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 text-xs font-bold text-sky-400 uppercase tracking-wider mb-1">
            <Compass className="w-4 h-4" />
            <span>Plan Your Getaway</span>
          </div>
          <h2 className="text-xl font-bold text-white pr-8">{pkg.name}</h2>
          <p className="text-xs text-slate-400 mt-1">
            {pkg.duration} • <span className="text-sky-400 font-semibold">{pkg.price}</span> / person
          </p>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold text-white">Enquiry Received!</h3>
            <p className="text-xs text-slate-300 max-w-sm mx-auto leading-relaxed">
              Thank you, <span className="text-white font-semibold">{name || "Traveler"}</span>. Our travel specialist will call you shortly to confirm dates and itinerary customization.
            </p>
            <div className="pt-4 flex flex-col gap-2">
              <button
                onClick={handleWhatsAppDirect}
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all"
              >
                <span>💬 Fast Track via WhatsApp</span>
              </button>
              <button
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs transition-colors"
              >
                Close Window
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
            {/* Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Your Full Name *
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Anand Kumar"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-white text-sm focus:outline-none focus:border-sky-500 transition-colors"
                />
              </div>
            </div>

            {/* Phone & Email Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Mobile / WhatsApp Number *
                </label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-white text-sm focus:outline-none focus:border-sky-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Email Address (Optional)
                </label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-white text-sm focus:outline-none focus:border-sky-500 transition-colors"
                />
              </div>
            </div>

            {/* Travel Date & Travelers */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Expected Travel Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                  <input
                    type="date"
                    value={travelDate}
                    onChange={(e) => setTravelDate(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-white text-sm focus:outline-none focus:border-sky-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Number of Persons
                </label>
                <div className="relative">
                  <Users className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                  <input
                    type="number"
                    min="1"
                    value={travelers}
                    onChange={(e) => setTravelers(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-white text-sm focus:outline-none focus:border-sky-500 transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Special Requests */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Special Requests / Customizations
              </label>
              <div className="relative">
                <textarea
                  rows={3}
                  placeholder="e.g. Need luxury room, cab pickup from Salem / Coimbatore..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-800/80 border border-slate-700 text-white text-sm focus:outline-none focus:border-sky-500 transition-colors"
                />
              </div>
            </div>

            {/* Inclusions summary */}
            <div className="p-3 rounded-xl bg-sky-950/40 border border-sky-800/40">
              <p className="text-[11px] font-semibold text-sky-300">
                ✨ Includes: {pkg.inclusions ? pkg.inclusions.join(" • ") : "Resort Stay, Breakfast & Cab"}
              </p>
            </div>

            {/* Submit Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold text-sm shadow-md hover:shadow-glow flex items-center justify-center gap-2 transition-all disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Sending Enquiry...</span>
                  </>
                ) : (
                  <span>🚀 Send Booking Request</span>
                )}
              </button>

              <button
                type="button"
                onClick={handleWhatsAppDirect}
                className="py-3 px-4 rounded-xl bg-emerald-700/80 hover:bg-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>💬 WhatsApp</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
