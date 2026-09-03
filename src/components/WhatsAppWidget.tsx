"use client";

import React, { useState } from "react";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";
import { COMPANY_INFO } from "@/lib/data";

export default function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [msg, setMsg] = useState("");

  const handleSend = () => {
    const defaultText = msg || "Hi Sky Quest Holidays! I would like to enquire about your tour packages.";
    window.open(`https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent(defaultText)}`, "_blank");
    setIsOpen(false);
    setMsg("");
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Popover Window */}
      {isOpen && (
        <div className="mb-3 w-80 rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl overflow-hidden animate-in slide-in-from-bottom-5 duration-200">
          <div className="bg-emerald-600 p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center font-bold text-lg">
                💬
              </div>
              <div>
                <h4 className="text-sm font-bold leading-tight">Sky Quest Support</h4>
                <p className="text-[11px] text-emerald-100 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
                  Online • Typically replies instantly
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg hover:bg-emerald-700 text-white/80 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-4 bg-slate-950/60 space-y-3">
            <div className="p-3 rounded-xl bg-slate-800/90 border border-slate-700/60 text-xs text-slate-200 leading-relaxed">
              👋 Vanakkam! Planning a tour to Kerala, Tamil Nadu, Karnataka or Abroad? Chat directly with our travel expert.
            </div>

            <div className="space-y-2">
              <input
                type="text"
                placeholder="Type your message..."
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                className="w-full px-3 py-2 text-xs rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500"
              />
              <button
                onClick={handleSend}
                className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Start WhatsApp Chat</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-gradient-to-tr from-emerald-600 to-green-500 hover:from-emerald-500 hover:to-green-400 text-white shadow-xl flex items-center justify-center hover:scale-110 transition-all group"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-7 h-7" />
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-slate-900" />
        </span>
      </button>
    </div>
  );
}
