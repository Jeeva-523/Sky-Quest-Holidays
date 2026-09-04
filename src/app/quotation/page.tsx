"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Settings } from "lucide-react";
import QuotationStudio from "@/components/QuotationStudio";

export default function QuotationExactPDFPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Top Navigation Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <Link
            href="/admin"
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 text-xs font-bold transition-all shadow-sm"
          >
            <ArrowLeft className="w-4 h-4 text-sky-400" />
            <span>Back to Admin Dashboard</span>
          </Link>

          <Link href="/" className="flex items-center gap-2">
            <img src="/images/logo.png" alt="Logo" className="h-7 w-auto object-contain" />
            <span className="font-bold text-white text-sm">SKYQUEST HOLIDAYS</span>
          </Link>
        </div>

        {/* Native Quotation Studio */}
        <QuotationStudio embedded={false} />
      </div>
    </div>
  );
}
