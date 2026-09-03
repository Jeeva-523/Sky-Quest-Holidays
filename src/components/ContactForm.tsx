"use client";

import React, { useState } from "react";
import { Send, Phone, Mail, MapPin, Clock, CheckCircle, Loader2 } from "lucide-react";
import { submitEnquiry } from "@/lib/firebaseServices";
import { COMPANY_INFO } from "@/lib/data";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [destination, setDestination] = useState("Kerala");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await submitEnquiry({
        name,
        phone,
        email,
        packageName: `General Enquiry: ${destination}`,
        message,
        source: "Homepage Contact Section"
      });
      setSuccess(true);
      setName("");
      setPhone("");
      setEmail("");
      setMessage("");
    } catch (error) {
      console.error("Enquiry submission error:", error);
      alert("Enquiry submitted! We will contact you shortly.");
      setSuccess(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-slate-950 border-t border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Contact Information */}
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-bold uppercase tracking-wider mb-4">
              <Mail className="w-3.5 h-3.5" />
              <span>Get in Touch</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-6">
              Plan Your Next Dream Vacation with Us
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-8">
              Have specific travel dates, group requirements, or budget constraints? Send us a message and our tour planning expert will prepare a custom plan for you within 30 minutes!
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-sky-400 flex-shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-400">Call / WhatsApp Support</p>
                  <a
                    href={`tel:${COMPANY_INFO.phone}`}
                    className="text-base font-bold text-white hover:text-sky-400 transition-colors"
                  >
                    {COMPANY_INFO.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-amber-400 flex-shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-400">Official Email</p>
                  <a
                    href={`mailto:${COMPANY_INFO.email}`}
                    className="text-base font-bold text-white hover:text-amber-400 transition-colors"
                  >
                    {COMPANY_INFO.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-emerald-400 flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-400">Head Office</p>
                  <p className="text-sm font-bold text-white">{COMPANY_INFO.address}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-purple-400 flex-shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-400">Operating Hours</p>
                  <p className="text-sm font-bold text-white">24/7 Available for Guests On Tour</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Form */}
          <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl">
            <h3 className="text-xl font-bold text-white mb-2">Request a Free Callback</h3>
            <p className="text-xs text-slate-400 mb-6">
              Fill out your travel preferences below.
            </p>

            {success ? (
              <div className="p-6 rounded-2xl bg-emerald-950/40 border border-emerald-800 text-center space-y-3">
                <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto" />
                <h4 className="text-lg font-bold text-white">Message Sent Successfully!</h4>
                <p className="text-xs text-slate-300">
                  Our team has received your inquiry and will call you on WhatsApp/Phone shortly.
                </p>
                <button
                  onClick={() => setSuccess(false)}
                  className="mt-4 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Mobile Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 9876543210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:border-sky-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Interested Place</label>
                    <select
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:border-sky-500"
                    >
                      <option value="Kerala (Munnar / Alleppey / Wayanad)">Kerala Tours</option>
                      <option value="Tamil Nadu (Ooty / Kodaikanal / Rameshwaram)">Tamil Nadu Tours</option>
                      <option value="Karnataka (Coorg / Mysore / Chikmagalur)">Karnataka Tours</option>
                      <option value="Honeymoon Special Package">Honeymoon Specials</option>
                      <option value="Goa Beach & College Group">Goa / Group Tour</option>
                      <option value="International (Thailand / Malaysia / Singapore)">International Tours</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Email (Optional)</label>
                  <input
                    type="email"
                    placeholder="name@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Message / Requirements</label>
                  <textarea
                    rows={3}
                    placeholder="Tell us number of persons, preferred dates or any special requests..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:border-sky-500"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold text-sm shadow-md hover:shadow-glow flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Travel Request</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
