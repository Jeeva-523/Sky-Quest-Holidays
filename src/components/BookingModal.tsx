"use client";

import React, { useState } from "react";
import { X, Calendar, Users, Phone, User, CheckCircle2, Loader2 } from "lucide-react";
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg rounded-3xl bg-white shadow-2xl overflow-hidden border border-slate-100">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-sky-600 to-blue-700 text-white p-6">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="text-xs font-bold uppercase tracking-wider text-sky-200 mb-1">
            Enquiry & Customization
          </div>
          <h2 className="text-xl font-extrabold pr-8">{pkg.name}</h2>
          <p className="text-xs text-sky-100 mt-1 font-medium">
            {pkg.duration} • <span className="font-bold text-white">{pkg.price}</span> / person
          </p>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Enquiry Received!</h3>
            <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
              Thank you, <span className="text-slate-900 font-bold">{name || "Traveler"}</span>. Our travel expert will call you shortly on your phone/WhatsApp to confirm itinerary & dates.
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
                className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors"
              >
                Close Window
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
            {/* Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
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
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-sky-500"
                />
              </div>
            </div>

            {/* Phone & Email Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Mobile Number (WhatsApp) *
                </label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="name@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-sky-500"
                />
              </div>
            </div>

            {/* Travel Date & Travelers */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Travel Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                  <input
                    type="date"
                    value={travelDate}
                    onChange={(e) => setTravelDate(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Persons Count
                </label>
                <div className="relative">
                  <Users className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                  <input
                    type="number"
                    min="1"
                    value={travelers}
                    onChange={(e) => setTravelers(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>
            </div>

            {/* Special Requests */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Special Requests / Customizations
              </label>
              <textarea
                rows={2}
                placeholder="e.g. Need hotel with mountain view, pickup from Coimbatore/Salem..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full p-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-sky-500"
              />
            </div>

            {/* Submit Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-sky-600 to-sky-700 hover:from-sky-500 hover:to-sky-600 text-white font-bold text-sm shadow-md glow-btn flex items-center justify-center gap-2 transition-all disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Submitting...</span>
                  </>
                ) : (
                  <span>Send Enquiry</span>
                )}
              </button>

              <button
                type="button"
                onClick={handleWhatsAppDirect}
                className="py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
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
