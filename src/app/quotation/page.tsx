"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Printer,
  Plus,
  Trash2,
  CheckCircle2,
  Eye,
  Layers,
  Utensils,
  FileText,
  History,
  Building,
  Settings,
  Bus,
  Save,
  ExternalLink
} from "lucide-react";

import {
  fetchSharedQuotations,
  saveSharedQuotation,
  deleteSharedQuotation
} from "@/lib/firebaseServices";

interface DayItinerary {
  dayNum: number;
  title: string;
  subtitle?: string;
  destination: string;
  mealPlan: string;
  transport: string;
  spotsText: string;
}

interface QuotationHistoryItem {
  id: string;
  clientName: string;
  locationText: string;
  refNo: string;
  destination: string;
  paxText: string;
  rate: string;
  savedAt: string;
  fullData: any;
}

const HISTORY_STORAGE_KEY = "skyquest_quotations_history_list_v1";
const SAVED_DATA_KEY = "skyquest_quotation_saved_data";
const SEQ_STORAGE_KEY = "skyquest_quotation_seq_no";

function getNextQuotationSeq(history: QuotationHistoryItem[] = []): number {
  let highest = 750;
  if (typeof window !== "undefined") {
    try {
      const stored = localStorage.getItem(SEQ_STORAGE_KEY);
      if (stored) {
        const val = parseInt(stored, 10);
        if (!isNaN(val) && val >= 750) highest = val;
      }
    } catch (e) { }
  }

  history.forEach((item) => {
    if (item.refNo) {
      const match = item.refNo.match(/SKY-(\d+)/i);
      if (match && match[1]) {
        const num = parseInt(match[1], 10);
        if (!isNaN(num) && num >= highest) {
          highest = num + 1;
        }
      }
    }
  });

  return highest;
}

function formatRefNo(seq: number): string {
  const year = new Date().getFullYear();
  return `SQH/QT/${year}/SKY-${seq}`;
}

export default function QuotationExactPDFPage() {
  const [activeTab, setActiveTab] = useState<"client" | "itinerary" | "food" | "terms" | "history">("client");

  // Client Details State (Auto starts from SKY-750)
  const [locationText, setLocationText] = useState("Erode, Tamil Nadu");
  const [refNo, setRefNo] = useState("SQH/QT/2026/SKY-750");
  const [destination, setDestination] = useState("Thiruvananthapuram & Varkala & Vagamon");
  const [durationText, setDurationText] = useState("3 Days / 2 Nights");
  const [paxText, setPaxText] = useState("16 Students + 2 Staff (Complementary)");
  const [datesText, setDatesText] = useState("Sept 9 – Sept 12, 2026");
  const [tourType, setTourType] = useState("Industrial Visit & Nature Expedition");
  const [quoteDate, setQuoteDate] = useState("September 2026");
  const [validity, setValidity] = useState("15 Days from issuance");
  const [preparedBy, setPreparedBy] = useState("SkyQuest Tour Operations Wing");

  // Pricing & Meal State
  const [foodOption, setFoodOption] = useState("ALL TIME FOOD INCLUDED");
  const [rate, setRate] = useState("₹6,000 /-");
  const [ratePaxBasis, setRatePaxBasis] = useState("Based on 16 Pax");

  // Days Itinerary State
  const [daysData, setDaysData] = useState<DayItinerary[]>([
    {
      dayNum: 1,
      title: "DAY 01: ARRIVAL, INDUSTRIAL VISITS",
      subtitle: "Experiencing Thiruvananthapuram Industry",
      destination: "Thiruvananthapuram Expedition",
      mealPlan: "ALL TIME FOOD INCLUDED",
      transport: "16-Seater Luxury Bus",
      spotsText: "Mrng check in Hotel and Refresh only\nBreakfast\nPadmanabhaswamy Temple\nLunch\nAazhimala Shiva Temple\nKovalam Beach\nShopping\nLulu Mall\nDinner"
    },
    {
      dayNum: 2,
      title: "DAY 02: Varkala",
      subtitle: "Culture, Shopping, Mountain Drive & Night Walk",
      destination: "Varkala Highlands",
      mealPlan: "ALL TIME FOOD INCLUDED",
      transport: "16-Seater Luxury Bus",
      spotsText: "Mrng check out room and travel to Varkala\nBreakfast\nKappil Beach\nMangrove Island Boating\nLunch\nVarkala Beach\nVarkala Cliff\nDinner"
    },
    {
      dayNum: 3,
      title: "DAY 03: Local Sightseeing & Activities",
      subtitle: "Hill Retreat, Pine Forest & Offroad Safari",
      destination: "Vagamon",
      mealPlan: "WITH FOOD",
      transport: "16-Seater Luxury Bus",
      spotsText: "Morning check-out from hotel, travel to Vagamon\nBreakfast\nPine Forest\nLunch\nJeep Safari\nVazhikadavu Forest\nOrkidarium\nTunnal Waterfalls\nIdukki Back Side View Point\nSuicide Point\nShopping\nDJ Campfire\nDinner\nReturn to College with a bag full of memories"
    }
  ]);

  // Contact State
  const [phone, setPhone] = useState("7338710611 / 6381825934");
  const [email, setEmail] = useState("skyquestholidays@gmail.com");
  const [web, setWeb] = useState("sky-quest-holidays.web.app");
  const [insta, setInsta] = useState("@skyquest_holidays");

  // History State
  const [historyList, setHistoryList] = useState<QuotationHistoryItem[]>([]);
  const [historySearch, setHistorySearch] = useState("");
  const [saveSuccessMsg, setSaveSuccessMsg] = useState("");
  const [previewMode, setPreviewMode] = useState(false);

  useEffect(() => {
    loadSavedData();
    loadHistory();

    // Multi-admin cross-device sync: poll every 10 seconds
    const interval = setInterval(() => {
      loadHistory();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const loadSavedData = () => {
    if (typeof window === "undefined") return;
    try {
      const raw = localStorage.getItem(SAVED_DATA_KEY);
      if (raw) {
        const data = JSON.parse(raw);
        if (data.locationText) setLocationText(data.locationText);
        if (data.refNo && !data.refNo.includes("SKY-120")) {
          setRefNo(data.refNo);
        } else {
          setRefNo(formatRefNo(750));
        }
        if (data.destination) setDestination(data.destination);
        if (data.durationText) setDurationText(data.durationText);
        if (data.paxText) setPaxText(data.paxText);
        if (data.datesText) setDatesText(data.datesText);
        if (data.tourType) setTourType(data.tourType);
        if (data.quoteDate) setQuoteDate(data.quoteDate);
        if (data.validity) setValidity(data.validity);
        if (data.preparedBy) setPreparedBy(data.preparedBy);
        if (data.foodOption) setFoodOption(data.foodOption);
        if (data.rate) setRate(data.rate);
        if (data.ratePaxBasis) setRatePaxBasis(data.ratePaxBasis);
        if (data.phone) setPhone(data.phone);
        if (data.email) setEmail(data.email);
        if (data.web) setWeb(data.web);
        if (data.insta) setInsta(data.insta);
        if (data.daysData && Array.isArray(data.daysData) && data.daysData.length > 0) {
          setDaysData(data.daysData);
        }
      } else {
        setRefNo(formatRefNo(750));
      }
    } catch (e) { }
  };

  const loadHistory = async () => {
    try {
      const { quotations, nextSeq } = await fetchSharedQuotations();
      if (Array.isArray(quotations)) {
        setHistoryList(quotations);
        if (typeof window !== "undefined") {
          localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(quotations));
        }
      }
      if (typeof nextSeq === "number" && nextSeq >= 750) {
        if (typeof window !== "undefined") {
          localStorage.setItem(SEQ_STORAGE_KEY, String(nextSeq));
        }
      }
    } catch (e) {
      if (typeof window === "undefined") return;
      try {
        const raw = localStorage.getItem(HISTORY_STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed)) setHistoryList(parsed);
        }
      } catch (err) { }
    }
  };

  const getCurrentFormData = () => ({
    locationText,
    refNo,
    destination,
    durationText,
    paxText,
    datesText,
    tourType,
    quoteDate,
    validity,
    preparedBy,
    foodOption,
    rate,
    ratePaxBasis,
    phone,
    email,
    web,
    insta,
    daysData
  });

  const handleSaveQuotation = async () => {
    const currentData = getCurrentFormData();
    try {
      localStorage.setItem(SAVED_DATA_KEY, JSON.stringify(currentData));
    } catch (e) { }

    const list = [...historyList];
    const refKey = (refNo || "").trim().toLowerCase();
    const existingIdx = list.findIndex(
      (it) => (it.refNo || "").trim().toLowerCase() === refKey && refKey.length > 0
    );

    const historyItem: QuotationHistoryItem = {
      id: refNo.trim() || `QT-${Date.now()}`,
      clientName: locationText || "Untitled Client",
      locationText,
      refNo,
      destination,
      paxText,
      rate,
      savedAt: new Date().toISOString(),
      fullData: currentData
    };

    let isUpdated = false;
    if (existingIdx >= 0) {
      list[existingIdx] = historyItem;
      isUpdated = true;
    } else {
      list.unshift(historyItem);
    }

    try {
      localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(list));
      setHistoryList(list);
    } catch (e) { }

    // Calculate next sequence number (e.g. 750 -> 751)
    let nextNum = 750;
    const match = refNo.match(/SKY-(\d+)/i);
    if (match && match[1]) {
      const parsed = parseInt(match[1], 10);
      if (!isNaN(parsed)) nextNum = parsed + 1;
    } else {
      nextNum = getNextQuotationSeq(list);
    }

    try {
      localStorage.setItem(SEQ_STORAGE_KEY, String(nextNum + 1));
    } catch (e) { }

    // Sync across all admins via shared server & Firestore database
    await saveSharedQuotation(historyItem, nextNum + 1);

    const nextRefNo = formatRefNo(nextNum);
    const savedRef = refNo;

    // Reset Form Fields for New Quotation
    setLocationText("");
    setRefNo(nextRefNo);
    setDestination("");
    setDurationText("3 Days / 2 Nights");
    setPaxText("");
    setDatesText("");
    setTourType("Industrial Visit & Nature Expedition");
    setQuoteDate(new Date().toLocaleString("en-US", { month: "long", year: "numeric" }));
    setValidity("15 Days from issuance");
    setPreparedBy("SkyQuest Tour Operations Wing");
    setFoodOption("ALL TIME FOOD INCLUDED");
    setRate("₹6,000 /-");
    setRatePaxBasis("Based on Pax");
    setDaysData([
      {
        dayNum: 1,
        title: "DAY 01: Arrival & Sightseeing",
        subtitle: "Day 01 Expedition",
        destination: "",
        mealPlan: "ALL TIME FOOD INCLUDED",
        transport: "16-Seater Luxury Bus",
        spotsText: "Morning Arrival & Refreshment\nBreakfast\nSightseeing Spot 01\nLunch\nSightseeing Spot 02\nDinner"
      }
    ]);

    setActiveTab("client");

    setSaveSuccessMsg(`✅ Saved ${savedRef} for all admins! Cleared & Ready for New Quotation (${nextRefNo})`);
    setTimeout(() => setSaveSuccessMsg(""), 4500);
  };

  const handleLoadFromHistory = (item: QuotationHistoryItem) => {
    if (!item.fullData) return;
    const d = item.fullData;
    if (d.locationText) setLocationText(d.locationText);
    if (d.refNo) setRefNo(d.refNo);
    if (d.destination) setDestination(d.destination);
    if (d.durationText) setDurationText(d.durationText);
    if (d.paxText) setPaxText(d.paxText);
    if (d.datesText) setDatesText(d.datesText);
    if (d.tourType) setTourType(d.tourType);
    if (d.quoteDate) setQuoteDate(d.quoteDate);
    if (d.validity) setValidity(d.validity);
    if (d.preparedBy) setPreparedBy(d.preparedBy);
    if (d.foodOption) setFoodOption(d.foodOption);
    if (d.rate) setRate(d.rate);
    if (d.ratePaxBasis) setRatePaxBasis(d.ratePaxBasis);
    if (d.phone) setPhone(d.phone);
    if (d.email) setEmail(d.email);
    if (d.web) setWeb(d.web);
    if (d.insta) setInsta(d.insta);
    if (d.daysData && Array.isArray(d.daysData)) {
      setDaysData(d.daysData);
    }
    setActiveTab("client");
  };

  const handleDeleteHistory = async (id: string) => {
    if (confirm("Are you sure you want to delete this quotation from history?")) {
      const updated = historyList.filter((it) => it.id !== id && it.refNo !== id);
      setHistoryList(updated);
      try {
        localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(updated));
      } catch (e) { }
      await deleteSharedQuotation(id);
    }
  };

  const handleClearAllHistory = async () => {
    if (confirm("Are you sure you want to clear all quotation history?")) {
      setHistoryList([]);
      try {
        localStorage.removeItem(HISTORY_STORAGE_KEY);
      } catch (e) { }
      try {
        await fetch("/api/quotations?clearAll=true", { method: "DELETE" });
      } catch (e) { }
    }
  };

  const handleAddDay = () => {
    const newNum = daysData.length + 1;
    setDaysData([
      ...daysData,
      {
        dayNum: newNum,
        title: `DAY 0${newNum}: Sightseeing & Activities`,
        subtitle: `Day 0${newNum} Exploration`,
        destination: `Destination ${newNum}`,
        mealPlan: "WITH FOOD",
        transport: "16-Seater Luxury Bus",
        spotsText: "Breakfast\nMorning Sightseeing Tour\nLunch\nShopping & Scenic Viewpoint\nDinner"
      }
    ]);
  };

  const handleDeleteDay = (idx: number) => {
    if (daysData.length <= 1) return;
    const updated = daysData.filter((_, i) => i !== idx).map((d, i) => ({ ...d, dayNum: i + 1 }));
    setDaysData(updated);
  };

  const handleUpdateDay = (idx: number, field: keyof DayItinerary, val: any) => {
    const updated = [...daysData];
    updated[idx] = { ...updated[idx], [field]: val };
    setDaysData(updated);
  };

  const handleNewQuotation = () => {
    const nextSeq = getNextQuotationSeq(historyList);
    const formatted = formatRefNo(nextSeq);
    setLocationText("Erode, Tamil Nadu");
    setRefNo(formatted);
    setDestination("Thiruvananthapuram & Varkala & Vagamon");
    setDurationText("3 Days / 2 Nights");
    setPaxText("16 Students + 2 Staff (Complementary)");
    setDatesText("Sept 9 – Sept 12, 2026");
    setTourType("Industrial Visit & Nature Expedition");
    setQuoteDate("September 2026");
    setValidity("15 Days from issuance");
    setPreparedBy("SkyQuest Tour Operations Wing");
    setFoodOption("ALL TIME FOOD INCLUDED");
    setRate("₹6,000 /-");
    setRatePaxBasis("Based on 16 Pax");
    try {
      localStorage.setItem(SEQ_STORAGE_KEY, String(nextSeq + 1));
    } catch (e) { }
    setActiveTab("client");
    setSaveSuccessMsg(`New Quotation Started (${formatted})`);
    setTimeout(() => setSaveSuccessMsg(""), 3000);
  };

  const handleOpenPdfPreviewInNewTab = () => {
    const currentData = getCurrentFormData();
    try {
      localStorage.setItem(SAVED_DATA_KEY, JSON.stringify(currentData));
    } catch (e) { }
    window.open("/quotation-print/index.html", "_blank");
  };

  const handlePrint = () => {
    window.print();
  };

  // Split spots exceeding 15 items per page to prevent page overflow
  const SPOTS_PER_PAGE = 15;

  const renderedDayPages = daysData.flatMap((day, dIdx) => {
    const allSpots = day.spotsText.split("\n").filter((l) => l.trim().length > 0);
    if (allSpots.length === 0) {
      return [{
        dayIndex: dIdx,
        dayNum: dIdx + 1,
        destination: day.destination,
        title: day.title,
        subtitle: day.subtitle || day.destination,
        mealPlan: day.mealPlan,
        transport: day.transport,
        spots: [],
        startSpotIndex: 0,
        partIndex: 1,
        totalParts: 1
      }];
    }

    const chunks: string[][] = [];
    for (let i = 0; i < allSpots.length; i += SPOTS_PER_PAGE) {
      chunks.push(allSpots.slice(i, i + SPOTS_PER_PAGE));
    }

    return chunks.map((chunk, cIdx) => ({
      dayIndex: dIdx,
      dayNum: dIdx + 1,
      destination: day.destination,
      title: day.title,
      subtitle: day.subtitle || day.destination,
      mealPlan: day.mealPlan,
      transport: day.transport,
      spots: chunk,
      startSpotIndex: cIdx * SPOTS_PER_PAGE,
      partIndex: cIdx + 1,
      totalParts: chunks.length
    }));
  });

  // Calculate dynamic pages structure
  // Page 1: Cover Page
  // Page 2..N: Paginated Itinerary Pages (Max 15 spots per page)
  // Page N+1: Investment & Specs
  // Page N+2: Terms & Authorization
  const totalPages = renderedDayPages.length + 3;

  const spotColors = [
    { border: "border-l-emerald-500", bg: "bg-emerald-50/70", star: "text-emerald-600", pillBg: "bg-emerald-100 text-emerald-800" },
    { border: "border-l-teal-500", bg: "bg-teal-50/70", star: "text-teal-600", pillBg: "bg-teal-100 text-teal-800" },
    { border: "border-l-amber-500", bg: "bg-amber-50/70", star: "text-amber-600", pillBg: "bg-amber-100 text-amber-800" },
    { border: "border-l-rose-400", bg: "bg-rose-50/70", star: "text-rose-600", pillBg: "bg-rose-100 text-rose-800" },
    { border: "border-l-sky-500", bg: "bg-sky-50/70", star: "text-sky-600", pillBg: "bg-sky-100 text-sky-800" },
    { border: "border-l-indigo-500", bg: "bg-indigo-50/70", star: "text-indigo-600", pillBg: "bg-indigo-100 text-indigo-800" },
    { border: "border-l-purple-500", bg: "bg-purple-50/70", star: "text-purple-600", pillBg: "bg-purple-100 text-purple-800" }
  ];

  return (
    <div className="min-h-screen bg-slate-950 print:bg-white text-slate-100 print:text-slate-900 font-sans flex flex-col antialiased">
      {/* 1. TOP EXECUTIVE APP BAR */}
      <header className="print:hidden sticky top-0 z-50 bg-[#060b14]/92 backdrop-blur-xl border-b border-slate-800/80 px-4 lg:px-6 py-2.5 shadow-xl shadow-black/30 flex items-center justify-between gap-3 min-h-[64px]">
        {/* Brand & Page Status Left */}
        <div className="flex items-center gap-3.5 flex-shrink-0">
          <Link href="/" className="flex items-center gap-2.5 group">
            <img
              src="/images/logo.png"
              alt="SkyQuest Logo"
              className="h-9 w-auto object-contain transition-transform group-hover:scale-105"
            />
            <div className="flex flex-col justify-center">
              <div className="flex items-baseline gap-1.5 leading-none">
                <span className="text-xl font-serif-brand font-black italic tracking-tight text-white leading-none">
                  <span className="text-sky-400">Sky</span> Quest
                </span>
                <span className="text-xs font-serif-brand font-bold italic tracking-normal text-slate-200 leading-none">
                  Holidays
                </span>
              </div>
              <span className="text-[7.5px] font-bold tracking-widest text-slate-400 uppercase mt-0.5">
                Explore Beyond Horizons
              </span>
            </div>
            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-amber-400/10 text-amber-400 border border-amber-400/20 uppercase tracking-wider leading-none">
              Studio
            </span>
          </Link>

          <div className="hidden sm:block h-5 w-px bg-slate-800" />

          {/* Live Page Count Badge */}
          <div className="hidden lg:flex items-center gap-2 px-2.5 py-1 rounded-full bg-slate-900/80 border border-slate-800 text-slate-300 text-[11px] font-semibold">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>{totalPages} PDF Pages</span>
          </div>
        </div>

        {/* Center Pill Segmented Tabs */}
        <div className="hidden md:flex items-center p-1 rounded-xl bg-slate-900/90 border border-slate-800 shadow-inner gap-0.5">
          {[
            { id: "client", label: "Client & Cover", icon: Building },
            { id: "itinerary", label: "Itinerary", count: daysData.length, icon: Layers },
            { id: "food", label: "Pricing & Specs", icon: Utensils },
            { id: "terms", label: "Terms & Auth", icon: FileText },
            { id: "history", label: "History", count: historyList.length, icon: History }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`relative px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 flex items-center gap-1.5 whitespace-nowrap ${isActive
                    ? "bg-sky-500 text-white font-semibold shadow-md shadow-sky-500/25"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
                  }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? "text-white" : "text-slate-400"}`} />
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span
                    className={`ml-0.5 px-1.5 py-0.5 text-[10px] font-bold rounded-full leading-none transition-colors ${isActive
                        ? "bg-white/25 text-white"
                        : "bg-slate-800 text-slate-400"
                      }`}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={handleNewQuotation}
            className="h-8 px-2.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700/60 font-medium text-xs transition-all flex items-center gap-1.5 shadow-sm"
            title="Create New Quotation"
          >
            <Plus className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">New</span>
          </button>

          <Link
            href="/admin"
            className="h-8 px-2.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white border border-slate-700/60 text-xs font-medium flex items-center gap-1 transition-colors shadow-sm"
            title="Back to Admin Dashboard"
          >
            <Settings className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Admin</span>
          </Link>

          <div className="hidden sm:block h-5 w-px bg-slate-800 mx-0.5" />

          <button
            onClick={handleSaveQuotation}
            className="h-8 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs shadow-md shadow-emerald-950/40 transition-all flex items-center gap-1.5 active:scale-95"
            title="Save Quotation"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Save</span>
          </button>

          <button
            onClick={handleOpenPdfPreviewInNewTab}
            className="h-8 px-3 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs shadow-md shadow-sky-950/40 transition-all flex items-center gap-1.5 active:scale-95"
            title="Open Exact PDF Document in New Dedicated Tab"
          >
            <Eye className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Preview PDF</span>
            <ExternalLink className="w-3 h-3 text-sky-200" />
          </button>

          <button
            onClick={handlePrint}
            className="h-8 px-3 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs shadow-md shadow-amber-950/30 transition-all flex items-center gap-1.5 active:scale-95"
            title="Print or Save as PDF"
          >
            <Printer className="w-3.5 h-3.5 text-slate-950" />
            <span>Print PDF</span>
          </button>
        </div>
      </header>

      {/* Mobile Sub-Navigation for Tabs */}
      <div className="print:hidden flex md:hidden bg-slate-900/95 border-b border-slate-800 px-3 py-2 overflow-x-auto gap-1.5 scrollbar-none">
        {[
          { id: "client", label: "Client & Cover", icon: Building },
          { id: "itinerary", label: "Itinerary", count: daysData.length, icon: Layers },
          { id: "food", label: "Pricing & Specs", icon: Utensils },
          { id: "terms", label: "Terms & Auth", icon: FileText },
          { id: "history", label: "History", count: historyList.length, icon: History }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap flex items-center gap-1.5 transition-colors ${isActive
                  ? "bg-sky-500 text-white font-semibold"
                  : "text-slate-400 hover:text-white bg-slate-800/50"
                }`}
            >
              <Icon className="w-3 h-3" />
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className="text-[10px] opacity-75">({tab.count})</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Save Success Banner */}
      {saveSuccessMsg && (
        <div className="print:hidden bg-emerald-500 text-white text-center py-1.5 text-xs font-bold shadow-md">
          ✅ {saveSuccessMsg}
        </div>
      )}

      {/* 2. FORM STUDIO PANEL */}
      {!previewMode && (
        <main className="print:hidden max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex-1">
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
            {/* TAB 1: CLIENT & HEADER */}
            {activeTab === "client" && (
              <div className="space-y-6">
                {/* Auto Reference Number Banner */}
                <div className="flex items-center justify-between px-4 py-3 rounded-2xl bg-gradient-to-r from-sky-950/60 to-slate-900/60 border border-sky-800/40 text-xs">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400/50 animate-pulse" />
                    <span className="text-slate-400 font-semibold uppercase tracking-wider text-[10.5px]">
                      Quotation Ref No (Auto):
                    </span>
                    <span className="font-mono font-black text-sky-400 text-sm bg-sky-950 px-2.5 py-0.5 rounded-lg border border-sky-800/60 tracking-wider">
                      {refNo}
                    </span>
                  </div>
                  <span className="text-[10.5px] text-slate-400 font-medium hidden sm:inline-block">
                    ⚡ Automatically assigned & incremented
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs">
                  <div>
                    <label className="block text-slate-300 font-bold uppercase mb-1.5">
                      📍 Pickup / Drop Location
                    </label>
                    <input
                      type="text"
                      value={locationText}
                      onChange={(e) => setLocationText(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white font-medium focus:border-sky-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-bold uppercase mb-1.5">
                      📍 Destinations Covered
                    </label>
                    <input
                      type="text"
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white font-medium focus:border-sky-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-bold uppercase mb-1.5">
                      ⏱️ Duration / Stay
                    </label>
                    <input
                      type="text"
                      value={durationText}
                      onChange={(e) => setDurationText(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white font-medium focus:border-sky-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-bold uppercase mb-1.5">
                      👥 Group Strength (Pax Count)
                    </label>
                    <input
                      type="text"
                      value={paxText}
                      onChange={(e) => setPaxText(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white font-medium focus:border-sky-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-bold uppercase mb-1.5">
                      📅 Travel Dates Range
                    </label>
                    <input
                      type="text"
                      value={datesText}
                      onChange={(e) => setDatesText(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white font-medium focus:border-sky-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-bold uppercase mb-1.5">
                      📌 Tour Type / Expedition Theme
                    </label>
                    <input
                      type="text"
                      value={tourType}
                      onChange={(e) => setTourType(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white font-medium focus:border-sky-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-bold uppercase mb-1.5">
                      📅 Quotation Date (Month)
                    </label>
                    <select
                      value={quoteDate}
                      onChange={(e) => setQuoteDate(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white font-medium focus:border-sky-500 focus:outline-none"
                    >
                      <option value="September 2026">September 2026</option>
                      <option value="October 2026">October 2026</option>
                      <option value="November 2026">November 2026</option>
                      <option value="December 2026">December 2026</option>
                      <option value="January 2027">January 2027</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-bold uppercase mb-1.5">
                      ⌛ Quotation Validity
                    </label>
                    <input
                      type="text"
                      value={validity}
                      onChange={(e) => setValidity(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white font-medium focus:border-sky-500 focus:outline-none"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-slate-300 font-bold uppercase mb-1.5">
                      ✍️ Prepared By (Team / Wing)
                    </label>
                    <input
                      type="text"
                      value={preparedBy}
                      onChange={(e) => setPreparedBy(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white font-medium focus:border-sky-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: DAILY ITINERARY PAGES */}
            {activeTab === "itinerary" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div>
                    <h3 className="text-base font-bold text-white">Dedicated Day Pages (1 Day = 1 Page)</h3>
                    <p className="text-xs text-slate-400">Total {daysData.length} Day Pages will be printed sequentially matching Quotation_SkyQuest.pdf layout</p>
                  </div>
                  <button
                    onClick={handleAddDay}
                    className="px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-bold text-xs flex items-center gap-1.5 shadow-md"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Day Page</span>
                  </button>
                </div>

                <div className="space-y-6">
                  {daysData.map((day, idx) => (
                    <div key={idx} className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4 text-xs">
                      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                        <span className="font-black text-sky-400 text-sm">
                          📄 PAGE {idx + 2}: DAY 0${idx + 1} DEDICATED ITINERARY
                        </span>
                        {daysData.length > 1 && (
                          <button
                            onClick={() => handleDeleteDay(idx)}
                            className="px-3 py-1 rounded-lg bg-rose-950/60 text-rose-300 hover:bg-rose-900 flex items-center gap-1 font-semibold"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Delete</span>
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-slate-400 font-semibold mb-1">Day Title (e.g. DAY 01: ARRIVAL, INDUSTRIAL VISITS)</label>
                          <input
                            type="text"
                            value={day.title}
                            onChange={(e) => handleUpdateDay(idx, "title", e.target.value)}
                            className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                          />
                        </div>

                        <div>
                          <label className="block text-slate-400 font-semibold mb-1">Subtitle / Focus (e.g. Experiencing Thiruvananthapuram Industry)</label>
                          <input
                            type="text"
                            value={day.subtitle}
                            onChange={(e) => handleUpdateDay(idx, "subtitle", e.target.value)}
                            className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                          />
                        </div>

                        <div>
                          <label className="block text-slate-400 font-semibold mb-1">Destination Name (Header Top Pill)</label>
                          <input
                            type="text"
                            value={day.destination}
                            onChange={(e) => handleUpdateDay(idx, "destination", e.target.value)}
                            className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                          />
                        </div>

                        <div>
                          <label className="block text-slate-400 font-semibold mb-1">Day Meal Plan (e.g. ALL TIME FOOD INCLUDED / WITH FOOD)</label>
                          <input
                            type="text"
                            value={day.mealPlan}
                            onChange={(e) => handleUpdateDay(idx, "mealPlan", e.target.value)}
                            className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block text-slate-400 font-semibold mb-1">Transport Vehicle (e.g. 16-Seater Luxury Bus)</label>
                          <input
                            type="text"
                            value={day.transport}
                            onChange={(e) => handleUpdateDay(idx, "transport", e.target.value)}
                            className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block text-slate-400 font-semibold mb-1">
                            Spots & Activities List (One spot per line • Up to 15 spots per page)
                          </label>
                          <textarea
                            rows={8}
                            value={day.spotsText}
                            onChange={(e) => handleUpdateDay(idx, "spotsText", e.target.value)}
                            className="w-full p-3 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono leading-relaxed"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: PRICING & FOOD */}
            {activeTab === "food" && (
              <div className="space-y-6 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <div>
                    <label className="block text-slate-300 font-bold uppercase mb-1.5">
                      🍽️ Selected Meal Plan Option
                    </label>
                    <input
                      type="text"
                      value={foodOption}
                      onChange={(e) => setFoodOption(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white font-bold focus:border-sky-500 focus:outline-none text-emerald-400"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-bold uppercase mb-1.5">
                      💰 Package Investment Rate
                    </label>
                    <input
                      type="text"
                      value={rate}
                      onChange={(e) => setRate(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white font-black text-base focus:border-sky-500 focus:outline-none text-sky-400"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-bold uppercase mb-1.5">
                      📋 Based On Pax Subtext
                    </label>
                    <input
                      type="text"
                      value={ratePaxBasis}
                      onChange={(e) => setRatePaxBasis(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white font-medium focus:border-sky-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: TERMS & CONTACT */}
            {activeTab === "terms" && (
              <div className="space-y-5 text-xs">
                <div>
                  <label className="block text-slate-300 font-bold uppercase mb-1.5">📞 Phone / WhatsApp</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold uppercase mb-1.5">✉️ Official Email</label>
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold uppercase mb-1.5">🌐 Official Website</label>
                  <input
                    type="text"
                    value={web}
                    onChange={(e) => setWeb(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold uppercase mb-1.5">📲 Instagram Handle</label>
                  <input
                    type="text"
                    value={insta}
                    onChange={(e) => setInsta(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none"
                  />
                </div>
              </div>
            )}

            {/* TAB 5: SAVED QUOTATION HISTORY */}
            {activeTab === "history" && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                  <div className="relative flex-1 max-w-md">
                    <input
                      type="text"
                      placeholder="Search ref no or location..."
                      value={historySearch}
                      onChange={(e) => setHistorySearch(e.target.value)}
                      className="w-full pl-4 pr-4 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:outline-none focus:border-sky-500"
                    />
                  </div>
                  {historyList.length > 0 && (
                    <button
                      onClick={handleClearAllHistory}
                      className="px-3 py-2 rounded-xl bg-rose-950/60 text-rose-300 hover:bg-rose-900 text-xs font-semibold"
                    >
                      Clear All History
                    </button>
                  )}
                </div>

                {historyList.length === 0 ? (
                  <div className="text-center py-12 text-slate-400 text-xs bg-slate-950 rounded-2xl border border-slate-800">
                    No quotations found in history. Click &ldquo;Save&rdquo; to store quotes here.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {historyList.map((item) => (
                      <div
                        key={item.id}
                        className="p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-sky-500/60 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                      >
                        <div>
                          <h4 className="font-bold text-white text-sm">📍 {item.clientName}</h4>
                          <div className="flex flex-wrap gap-2 text-[11px] text-slate-400 mt-1">
                            <span className="px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 font-mono font-bold">
                              🔖 {item.refNo}
                            </span>
                            <span>📍 {item.destination}</span>
                            <span>👥 {item.paxText}</span>
                            <span className="text-amber-400 font-bold">💰 {item.rate}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              handleLoadFromHistory(item);
                              try {
                                localStorage.setItem(SAVED_DATA_KEY, JSON.stringify(item.fullData));
                              } catch (e) { }
                              window.open("/quotation-print/index.html", "_blank");
                            }}
                            className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold shadow-sm flex items-center gap-1 border border-slate-700"
                            title="Open this Quotation in New Dedicated Page"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>View ↗</span>
                          </button>
                          <button
                            onClick={() => handleLoadFromHistory(item)}
                            className="px-3 py-1.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-white text-xs font-bold shadow-sm"
                          >
                            ✏️ Edit
                          </button>
                          <button
                            onClick={() => handleDeleteHistory(item.id)}
                            className="p-1.5 rounded-lg bg-rose-950/60 text-rose-300 hover:bg-rose-900"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </main>
      )}

      {/* 3. EXACT PIXEL-PERFECT PDF DOCUMENT OUTPUT (Matches Quotation_SkyQuest.pdf) */}
      <div className={`${previewMode ? "block" : "hidden print:block"} py-8 px-4 flex justify-center bg-slate-900 print:bg-white print:p-0 print:m-0 print:w-full`}>
        <div className="max-w-[210mm] w-full space-y-10 print:space-y-0 text-slate-900 print:max-w-none print:w-[210mm]">

          {/* ================= PAGE 1: COVER & CLIENT DETAILS ================= */}
          <div className="bg-white rounded-2xl p-[12mm] shadow-2xl print:shadow-none print:rounded-none print:p-[12mm] min-h-[296mm] max-h-[296mm] print:h-[296mm] print:min-h-0 print:max-h-[296mm] flex flex-col justify-between print:break-after-page relative border border-slate-200 print:border-none overflow-hidden">
            {/* Subtle Travel Icons Watermark Background Pattern */}
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.03] bg-repeat z-0 print:hidden"
              style={{
                backgroundImage: `url('/images/travel-icons-bg.png')`,
                backgroundSize: "320px 320px"
              }}
            />

            {/* Center SkyQuest Logo Watermark */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
              <img
                src="/images/quotation-center-logo.png"
                alt="SkyQuest Holidays"
                className="w-[520px] max-w-[85%] h-auto object-contain opacity-[0.24] print:opacity-[0.22] select-none pointer-events-none"
              />
            </div>

            {/* Outer Elegant Frame with Gold Corners */}
            <div className="absolute inset-4 border border-amber-600/30 rounded-xl pointer-events-none z-10" />

            <div className="space-y-4 relative z-10">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-200 pb-1.5">
                <div className="flex items-center gap-3">
                  <img
                    src="/images/logo.png"
                    alt="SkyQuest Logo"
                    className="h-14 w-auto object-contain"
                  />
                  <div className="flex flex-col justify-center">
                    <div className="flex items-baseline gap-2 leading-none">
                      <span className="font-serif-brand font-black italic text-3xl tracking-tight text-slate-900 leading-none">
                        <span className="text-[#0284c7]">Sky</span> Quest
                      </span>
                      <span className="font-serif-brand font-bold italic text-lg tracking-normal text-slate-800 leading-none">
                        Holidays
                      </span>
                    </div>
                    <span className="text-[8px] font-bold tracking-[2.2px] text-[#e67e22] uppercase mt-1 leading-none">
                      EXPLORE BEYOND HORIZONS
                    </span>
                  </div>
                </div>
                <div className="border border-slate-300 rounded-full px-4 py-1 text-right bg-slate-50/80">
                  <span className="text-[10px] font-black text-slate-800 tracking-wider uppercase block">
                    OFFICIAL TOUR QUOTATION
                  </span>
                  {refNo && refNo.trim() && (
                    <span className="text-[9px] font-mono text-slate-600 block">
                      Ref: {refNo}
                    </span>
                  )}
                </div>
              </div>

              {/* Main Hero Banner: Pickup / Location */}
              {(locationText?.trim() || durationText?.trim() || tourType?.trim() || destination?.trim()) && (
                <div className="rounded-xl bg-[#0c1a30] text-white p-4 shadow-sm border border-slate-800">
                  {locationText?.trim() && (
                    <>
                      <div className="inline-block px-2.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[8.5px] font-black uppercase tracking-wider mb-1.5">
                        📍 PICKUP / DROP LOCATION
                      </div>
                      <h2 className="text-xl font-black tracking-tight text-white">{locationText}</h2>
                    </>
                  )}
                  {(durationText?.trim() || tourType?.trim() || destination?.trim()) && (
                    <p className={`text-[10px] text-slate-300 font-medium ${locationText?.trim() ? "mt-1" : ""}`}>
                      {[durationText?.trim(), tourType?.trim()].filter(Boolean).join(" ")}
                      {destination?.trim() ? `${(durationText?.trim() || tourType?.trim()) ? " — " : ""}${destination.trim()}` : ""}
                    </p>
                  )}
                </div>
              )}

              {/* 2-Column Grid: Client Details + Quotation Metadata (Only non-empty rows/cards) */}
              {(() => {
                const hasLoc = Boolean(locationText && locationText.trim());
                const hasPax = Boolean(paxText && paxText.trim());
                const hasFood = Boolean(foodOption && foodOption.trim());
                const hasClientDetails = hasLoc || hasPax || hasFood;

                const hasQuoteDate = Boolean(quoteDate && quoteDate.trim());
                const hasDates = Boolean(datesText && datesText.trim());
                const hasValidity = Boolean(validity && validity.trim());
                const hasPreparedBy = Boolean(preparedBy && preparedBy.trim());
                const hasMetadata = hasQuoteDate || hasDates || hasValidity || hasPreparedBy;

                if (!hasClientDetails && !hasMetadata) return null;

                return (
                  <div className={`grid ${hasClientDetails && hasMetadata ? "grid-cols-2" : "grid-cols-1"} gap-4`}>
                    {/* Client Details */}
                    {hasClientDetails && (
                      <div className="border border-slate-200 rounded-xl p-3.5 bg-slate-50/50 space-y-1.5 text-[10px]">
                        <div className="flex items-center gap-1.5 border-b border-slate-200 pb-1.5 mb-2">
                          <span className="text-xs">👤</span>
                          <h3 className="font-black text-slate-800 uppercase tracking-wide text-[10.5px]">Client Details</h3>
                        </div>
                        {hasLoc && (
                          <div><span className="text-slate-500">Pickup/Drop Location:</span> <span className="font-bold text-slate-900">{locationText}</span></div>
                        )}
                        {hasPax && (
                          <div><span className="text-slate-500">Group Strength:</span> <span className="font-bold text-slate-900">{paxText}</span></div>
                        )}
                        {hasFood && (
                          <div className="flex items-center gap-1.5 pt-1">
                            <span className="text-slate-500">Meal Plan:</span>
                            <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-extrabold text-[9px]">
                              {foodOption}
                            </span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Quotation Metadata */}
                    {hasMetadata && (
                      <div className="border border-slate-200 rounded-xl p-3.5 bg-slate-50/50 space-y-1.5 text-[10px]">
                        <div className="flex items-center gap-1.5 border-b border-slate-200 pb-1.5 mb-2">
                          <span className="text-xs">📋</span>
                          <h3 className="font-black text-slate-800 uppercase tracking-wide text-[10.5px]">Quotation Metadata</h3>
                        </div>
                        {hasQuoteDate && (
                          <div><span className="text-slate-500">Quotation Date:</span> <span className="font-bold text-slate-900">{quoteDate}</span></div>
                        )}
                        {hasDates && (
                          <div><span className="text-slate-500">Travel Dates:</span> <span className="font-bold text-slate-900">{datesText}</span></div>
                        )}
                        {hasValidity && (
                          <div><span className="text-slate-500">Validity:</span> <span className="font-bold text-slate-900">{validity}</span></div>
                        )}
                        {hasPreparedBy && (
                          <div><span className="text-slate-500">Prepared By:</span> <span className="font-bold text-slate-900">{preparedBy}</span></div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })()}

              {/* About SkyQuest Holidays Box */}
              <div className="border border-sky-200 bg-sky-50/30 rounded-xl p-3.5 text-[10px] space-y-1">
                <div className="flex items-center gap-1.5 border-b border-sky-200/60 pb-1.5 mb-1.5">
                  <span className="text-xs">🌐</span>
                  <h3 className="font-black text-sky-900 uppercase tracking-wide text-[10.5px]">About SkyQuest Holidays</h3>
                </div>
                <p className="text-slate-700 leading-relaxed">
                  At SkyQuest Holidays, we believe travel is more than just moving from one destination to another—it&apos;s about crafting stories, inspiring minds, and building lifelong bonds. We specialize in designing bespoke, safe, and exhilarating travel experiences for educational institutions, corporate groups, and private travelers across South India and international destinations.
                </p>
              </div>

              {/* Our Specialized Tour Categories */}
              <div className="border border-slate-200 rounded-xl p-3.5 bg-white space-y-3">
                <div className="flex items-center gap-1.5 border-b border-slate-200 pb-1.5">
                  <span className="text-xs text-amber-500">⭐</span>
                  <h3 className="font-black text-slate-800 uppercase tracking-wide text-[10.5px]">Our Specialized Tour Categories</h3>
                </div>
                <div className="grid grid-cols-2 gap-3 text-[9.5px]">
                  <div className="border-l-2 border-sky-500 pl-2.5">
                    <span className="font-black text-slate-900 block">🎓 Student & Industrial Visits</span>
                    <span className="text-slate-600">Curriculum-aligned industrial exposures combined with team bonding.</span>
                  </div>
                  <div className="border-l-2 border-emerald-500 pl-2.5">
                    <span className="font-black text-slate-900 block">🏕️ Adventure & Nature Safaris</span>
                    <span className="text-slate-600">Trekking, off-road 4x4 jeep safaris, campfires, and waterfalls.</span>
                  </div>
                  <div className="border-l-2 border-amber-500 pl-2.5">
                    <span className="font-black text-slate-900 block">🤝 Alumni & Corporate Retreats</span>
                    <span className="text-slate-600">Resort stays, live DJ harbor cruises, and group logistics.</span>
                  </div>
                  <div className="border-l-2 border-rose-500 pl-2.5">
                    <span className="font-black text-slate-900 block">✨ Tailor-Made Custom Packages</span>
                    <span className="text-slate-600">Flexible itineraries designed strictly according to client budget.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-slate-200 pt-2 flex justify-between items-center text-[8.5px] text-slate-500 relative z-10">
              <span className="font-bold">SKYQUEST HOLIDAYS • Official Tour Quotation</span>
              <span className="italic">Elevating Educational & Luxury Group Travel</span>
              <span className="px-2 py-0.5 rounded bg-slate-100 font-bold text-slate-700">Page 1 of {totalPages}</span>
            </div>
          </div>

          {/* ================= PAGES 2..N: DEDICATED DAY ITINERARY PAGES ================= */}
          {renderedDayPages.map((dayPage, pIdx) => {
            const pageNum = pIdx + 2;
            const isMultiPart = dayPage.totalParts > 1;
            const headerTag = isMultiPart
              ? `DAY 0${dayPage.dayNum} DEDICATED ITINERARY (PART ${dayPage.partIndex}/${dayPage.totalParts})`
              : `DAY 0${dayPage.dayNum} DEDICATED ITINERARY`;
            const badgeTag = isMultiPart
              ? `DAY 0${dayPage.dayNum} (PART ${dayPage.partIndex})`
              : `FULL DAY 0${dayPage.dayNum}`;

            return (
              <div
                key={pIdx}
                className="bg-white rounded-2xl p-[12mm] shadow-2xl print:shadow-none print:rounded-none print:p-[12mm] min-h-[296mm] max-h-[296mm] print:h-[296mm] print:min-h-0 print:max-h-[296mm] flex flex-col justify-between print:break-after-page relative border border-slate-200 print:border-none overflow-hidden"
              >
                {/* Subtle Travel Icons Watermark Background Pattern */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-[0.03] bg-repeat z-0 print:hidden"
                  style={{
                    backgroundImage: `url('/images/travel-icons-bg.png')`,
                    backgroundSize: "320px 320px"
                  }}
                />

                {/* Center SkyQuest Logo Watermark */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                  <img
                    src="/images/quotation-center-logo.png"
                    alt="SkyQuest Holidays"
                    className="w-[520px] max-w-[85%] h-auto object-contain opacity-[0.24] print:opacity-[0.22] select-none pointer-events-none"
                  />
                </div>

                {/* Outer Elegant Frame */}
                <div className="absolute inset-4 border border-amber-600/30 rounded-xl pointer-events-none z-10" />

                <div className="flex-1 flex flex-col justify-between relative z-10 h-full">
                  {/* Top Header & Day Metadata */}
                  <div className="space-y-2.5">
                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-slate-200 pb-1.5">
                      <div className="flex items-center gap-3">
                        <img
                          src="/images/logo.png"
                          alt="SkyQuest Logo"
                          className="h-14 w-auto object-contain"
                        />
                        <div className="flex flex-col justify-center">
                          <div className="flex items-baseline gap-2 leading-none">
                            <span className="font-serif-brand font-black italic text-2xl tracking-tight text-slate-900 leading-none">
                              <span className="text-[#0284c7]">Sky</span> Quest
                            </span>
                            <span className="font-serif-brand font-bold italic text-base tracking-normal text-slate-800 leading-none">
                              Holidays
                            </span>
                          </div>
                          <span className="text-[7.5px] font-bold tracking-[2.2px] text-[#e67e22] uppercase mt-1 leading-none">
                            EXPLORE BEYOND HORIZONS
                          </span>
                        </div>
                      </div>
                      <div className="border border-slate-300 rounded-full px-4 py-1 text-right bg-slate-50/80">
                        <span className="text-[10px] font-black text-slate-800 tracking-wider uppercase block">
                          {headerTag}
                        </span>
                        <span className="text-[8.5px] text-slate-600 block">
                          Destination: {dayPage.destination}
                        </span>
                      </div>
                    </div>

                    {/* 5-Column Meta Strip (Exact match with PDF) */}
                    <div className="rounded-xl bg-[#0c1a30] text-white p-2.5 grid grid-cols-5 gap-2 text-center text-[8.5px] border border-slate-800 shadow-sm">
                      <div className="border-r border-slate-700 pr-1">
                        <span className="text-slate-400 font-bold block text-[7.5px] uppercase">DESTINATION</span>
                        <span className="font-extrabold text-white text-[9.5px] block truncate">{dayPage.destination}</span>
                      </div>
                      <div className="border-r border-slate-700 pr-1">
                        <span className="text-slate-400 font-bold block text-[7.5px] uppercase">DAY COVERED</span>
                        <span className="font-extrabold text-white text-[9.5px] block">Day 0{dayPage.dayNum}</span>
                      </div>
                      <div className="border-r border-slate-700 pr-1">
                        <span className="text-slate-400 font-bold block text-[7.5px] uppercase">GROUP PAX</span>
                        <span className="font-extrabold text-white text-[9px] block truncate">{paxText}</span>
                      </div>
                      <div className="border-r border-slate-700 pr-1">
                        <span className="text-slate-400 font-bold block text-[7.5px] uppercase">MEAL PLAN</span>
                        <span className="font-extrabold text-emerald-400 text-[8.5px] block truncate">{dayPage.mealPlan}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 font-bold block text-[7.5px] uppercase">TRANSPORT</span>
                        <span className="font-extrabold text-white text-[8.5px] block truncate">{dayPage.transport}</span>
                      </div>
                    </div>

                    {/* Day Hero Title Strip */}
                    <div className="rounded-xl bg-[#0c1a30] text-white p-2.5 flex items-center justify-between border border-slate-800">
                      <div>
                        <h2 className="text-sm font-black text-white">{dayPage.title}</h2>
                        <p className="text-[9px] text-slate-300 mt-0.5">{dayPage.subtitle}</p>
                      </div>
                      <span className="px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[9px] font-black uppercase">
                        {badgeTag}
                      </span>
                    </div>
                  </div>

                  {/* Spots Timeline Cards (1..15 per page) - Elegantly distributed to suit up to 15 spots per page */}
                  <div
                    className={`flex-1 flex flex-col ${
                      dayPage.spots.length >= 8 ? "justify-between" : "justify-start space-y-3"
                    } my-2.5 min-h-0`}
                  >
                    {dayPage.spots.map((spot, sIdx) => {
                      const absoluteSpotIndex = dayPage.startSpotIndex + sIdx;
                      const colorStyle = spotColors[absoluteSpotIndex % spotColors.length];
                      return (
                        <div
                          key={sIdx}
                          className={`rounded-xl border border-slate-200 border-l-4 ${colorStyle.border} ${colorStyle.bg} px-3.5 ${
                            dayPage.spots.length >= 14
                              ? "py-1.5"
                              : dayPage.spots.length >= 10
                              ? "py-2"
                              : "py-2.5"
                          } flex items-center justify-between transition-all`}
                        >
                          <div className="flex items-center gap-3">
                            <span className={`px-2.5 py-0.5 rounded font-black text-[10.5px] uppercase tracking-wider ${colorStyle.pillBg}`}>
                              SPOT {String(absoluteSpotIndex + 1).padStart(2, "0")}
                            </span>
                            <span className={`text-sm ${colorStyle.star}`}>✳</span>
                            <span className="font-black text-slate-950 text-[15px] tracking-tight leading-snug">{spot}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Footer */}
                  <div className="border-t border-slate-200 pt-2 flex justify-between items-center text-[8.5px] text-slate-500">
                    <span className="font-bold">SKYQUEST HOLIDAYS • Day 0{dayPage.dayNum} Detailed Itinerary</span>
                    <span className="italic">{dayPage.destination}</span>
                    <span className="px-2 py-0.5 rounded bg-slate-100 font-bold text-slate-700">Page {pageNum} of {totalPages}</span>
                  </div>
                </div>
              </div>
            );
          })}

          {/* ================= PAGE N+1: INVESTMENT & SPECIFICATIONS ================= */}
          <div className="bg-white rounded-2xl p-[12mm] shadow-2xl print:shadow-none print:rounded-none print:p-[12mm] min-h-[296mm] max-h-[296mm] print:h-[296mm] print:min-h-0 print:max-h-[296mm] flex flex-col justify-between print:break-after-page relative border border-slate-200 print:border-none overflow-hidden">
            {/* Subtle Travel Icons Watermark Background Pattern */}
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.03] bg-repeat z-0 print:hidden"
              style={{
                backgroundImage: `url('/images/travel-icons-bg.png')`,
                backgroundSize: "320px 320px"
              }}
            />

            {/* Center SkyQuest Logo Watermark */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
              <img
                src="/images/quotation-center-logo.png"
                alt="SkyQuest Holidays"
                className="w-[520px] max-w-[85%] h-auto object-contain opacity-[0.24] print:opacity-[0.22] select-none pointer-events-none"
              />
            </div>

            {/* Outer Frame */}
            <div className="absolute inset-4 border border-amber-600/30 rounded-xl pointer-events-none z-10" />

            <div className="space-y-4 relative z-10">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-200 pb-1.5">
                <div className="flex items-center gap-3">
                  <img
                    src="/images/logo.png"
                    alt="SkyQuest Logo"
                    className="h-14 w-auto object-contain"
                  />
                  <div className="flex flex-col justify-center">
                    <div className="flex items-baseline gap-2 leading-none">
                      <span className="font-serif-brand font-black italic text-2xl tracking-tight text-slate-900 leading-none">
                        <span className="text-[#0284c7]">Sky</span> Quest
                      </span>
                      <span className="font-serif-brand font-bold italic text-base tracking-normal text-slate-800 leading-none">
                        Holidays
                      </span>
                    </div>
                    <span className="text-[7.5px] font-bold tracking-[2.2px] text-[#e67e22] uppercase mt-1 leading-none">
                      EXPLORE BEYOND HORIZONS
                    </span>
                  </div>
                </div>
                <div className="border border-slate-300 rounded-full px-4 py-1 text-right bg-slate-50/80">
                  <span className="text-[10px] font-black text-slate-800 tracking-wider uppercase block">
                    INVESTMENT & SPECIFICATIONS
                  </span>
                  <span className="text-[8.5px] text-slate-600 block">
                    Package Pricing & Specifications
                  </span>
                </div>
              </div>

              {/* Package Investment Rate Hero Box */}
              <div className="rounded-xl bg-[#0c1a30] text-white p-4 flex items-center justify-between border border-slate-800 shadow-sm">
                <div>
                  <span className="text-xs font-black uppercase tracking-wider block text-amber-400">
                    PACKAGE INVESTMENT RATE
                  </span>
                  <span className="text-[10px] text-slate-300 block mt-0.5">{ratePaxBasis}</span>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-black text-white">{rate}</span>
                  <span className="text-[9.5px] text-slate-300 block">Per Head (All Inclusive)</span>
                </div>
              </div>

              {/* Selected Meal Plan Option Box */}
              <div className="border border-slate-200 rounded-xl p-3 bg-slate-50/60 space-y-1.5">
                <span className="text-[9px] font-black uppercase text-slate-600 tracking-wide block">
                  📂 SELECTED MEAL PLAN OPTION
                </span>
                <span className="inline-block px-3 py-1 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800 font-black text-[10px]">
                  {foodOption}
                </span>
              </div>

              {/* Inclusions & Exclusions Grid */}
              <div className="grid grid-cols-2 gap-3 text-[9px]">
                {/* Inclusions */}
                <div className="border border-emerald-200 bg-emerald-50/20 rounded-xl p-3 space-y-1.5">
                  <h4 className="font-black text-emerald-800 text-[10px] flex items-center gap-1 border-b border-emerald-200 pb-1">
                    <span>✔</span> PACKAGE INCLUSIONS
                  </h4>
                  <ul className="space-y-1 text-slate-700">
                    <li><strong className="text-slate-900">✔ Transportation:</strong> 52-Seater Luxury Non-A/C Bus with full DJ lightings, sound & push-back seating.</li>
                    <li><strong className="text-slate-900">✔ Tolls & Permits:</strong> All Interstate Taxes, Toll Gates, and Vehicle Parking fees included.</li>
                    <li><strong className="text-slate-900">✔ Accommodations:</strong> Deluxe Room Stay @ Kochi Hotel & Vagamon Resort.</li>
                    <li><strong className="text-slate-900">✔ Special Experience:</strong> Off-road 4x4 Jeep Safari (7 sightseeing points).</li>
                    <li><strong className="text-slate-900">✔ Harbor Cruise:</strong> Marine Drive Sunset Boat Cruise with Live DJ Music.</li>
                    <li><strong className="text-slate-900">✔ Campfire:</strong> Cozy night campfire with music system in Vagamon.</li>
                    <li><strong className="text-slate-900">✔ Meal Plan:</strong> Daily Food Plan (Breakfast, Lunch & Dinner Included).</li>
                    <li><strong className="text-slate-900">✔ Entry Tickets:</strong> Sightseeing entry passes specified in itinerary.</li>
                    <li><strong className="text-slate-900">✔ Faculty Compliments:</strong> 2 Staff members completely complimentary.</li>
                  </ul>
                </div>

                {/* Exclusions */}
                <div className="border border-rose-200 bg-rose-50/20 rounded-xl p-3 space-y-1.5">
                  <h4 className="font-black text-rose-800 text-[10px] flex items-center gap-1 border-b border-rose-200 pb-1">
                    <span>✖</span> PACKAGE EXCLUSIONS
                  </h4>
                  <ul className="space-y-1 text-slate-700">
                    <li><strong className="text-slate-900">✖ Industrial Entry Fees:</strong> Self entry pass fees for industrial companies (if charged).</li>
                    <li><strong className="text-slate-900">✖ Personal Expenses:</strong> Shopping, laundry, telephone calls, and personal tips.</li>
                    <li><strong className="text-slate-900">✖ Unscheduled Tours:</strong> Any transport or sightseeing beyond scheduled itinerary.</li>
                    <li><strong className="text-slate-900">✖ Insurance:</strong> Personal medical insurance or loss of personal valuables.</li>
                  </ul>
                </div>
              </div>

              {/* Vehicle & Safety Specifications Card */}
              <div className="border border-slate-200 rounded-xl p-3 bg-white space-y-2 text-[9px]">
                <h4 className="font-black text-slate-900 text-[10px] border-b border-slate-200 pb-1">
                  🚌 VEHICLE & SAFETY SPECIFICATIONS
                </h4>
                <div className="grid grid-cols-2 gap-3 text-slate-700">
                  <div>
                    <div><strong>Coach Configuration:</strong> 52-Seater High-Deck Luxury Coach</div>
                    <div><strong>Audio/Visual:</strong> Party DJ Lighting, Sound System & LED Screen</div>
                    <div><strong>Seating:</strong> Ergonomic Push-back seats with high back support</div>
                  </div>
                  <div>
                    <div><strong>Safety Protocols:</strong> Speed Governor, First-Aid Kit, Spare Wheel</div>
                    <div><strong>Driver Credentials:</strong> Experienced hill-certified drivers</div>
                    <div><strong>Sanitization:</strong> Disinfected interior prior to boarding</div>
                  </div>
                </div>
              </div>

              {/* Liability & Vehicle Damage Clause Box */}
              <div className="border border-slate-200 rounded-xl p-3 bg-slate-50/60 text-[8.5px] space-y-1 relative">
                <span className="font-black text-slate-900 block uppercase">
                  LIABILITY & VEHICLE DAMAGE CLAUSE:
                </span>
                <p className="text-slate-600 leading-relaxed">
                  • <strong>Coach Upkeep:</strong> Any physical damage caused to the coach interior, lighting fixtures, sound equipment, or window glasses due to participant negligence or misconduct will be charged directly to the responsible individual or group organizer.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  • <strong>Personal Belongings:</strong> Participants are advised to take care of their personal baggage, cash, and electronic items. SkyQuest Holidays shall not be held liable for accidental loss, theft, or damage during the tour.
                </p>
                {/* Stamp Watermark */}
                <div className="absolute right-4 bottom-2 border border-slate-400 rounded-full px-3 py-1 text-slate-400 font-mono text-[8px] uppercase rotate-[-6deg] opacity-60">
                  SKYQUEST APPROVED
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-slate-200 pt-2 flex justify-between items-center text-[8.5px] text-slate-500 relative z-10">
              <span className="font-bold">SKYQUEST HOLIDAYS • Package Rate & Terms</span>
              <span className="italic">Transparent Pricing • Zero Hidden Costs</span>
              <span className="px-2 py-0.5 rounded bg-slate-100 font-bold text-slate-700">Page {totalPages - 1} of {totalPages}</span>
            </div>
          </div>

          {/* ================= PAGE N+2: TERMS & AUTHORIZATION ================= */}
          <div className="bg-white rounded-2xl p-[12mm] shadow-2xl print:shadow-none print:rounded-none print:p-[12mm] min-h-[296mm] max-h-[296mm] print:h-[296mm] print:min-h-0 print:max-h-[296mm] flex flex-col justify-between relative border border-slate-200 print:border-none overflow-hidden">
            {/* Subtle Travel Icons Watermark Background Pattern */}
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.03] bg-repeat z-0 print:hidden"
              style={{
                backgroundImage: `url('/images/travel-icons-bg.png')`,
                backgroundSize: "320px 320px"
              }}
            />

            {/* Center SkyQuest Logo Watermark */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
              <img
                src="/images/quotation-center-logo.png"
                alt="SkyQuest Holidays"
                className="w-[520px] max-w-[85%] h-auto object-contain opacity-[0.24] print:opacity-[0.22] select-none pointer-events-none"
              />
            </div>

            {/* Outer Frame */}
            <div className="absolute inset-4 border border-amber-600/30 rounded-xl pointer-events-none z-10" />

            <div className="space-y-5 relative z-10">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-200 pb-1.5">
                <div className="flex items-center gap-3">
                  <img
                    src="/images/logo.png"
                    alt="SkyQuest Logo"
                    className="h-14 w-auto object-contain"
                  />
                  <div className="flex flex-col justify-center">
                    <div className="flex items-baseline gap-2 leading-none">
                      <span className="font-serif-brand font-black italic text-2xl tracking-tight text-slate-900 leading-none">
                        <span className="text-[#0284c7]">Sky</span> Quest
                      </span>
                      <span className="font-serif-brand font-bold italic text-base tracking-normal text-slate-800 leading-none">
                        Holidays
                      </span>
                    </div>
                    <span className="text-[7.5px] font-bold tracking-[2.2px] text-[#e67e22] uppercase mt-1 leading-none">
                      EXPLORE BEYOND HORIZONS
                    </span>
                  </div>
                </div>
                <div className="border border-slate-300 rounded-full px-4 py-1 text-right bg-slate-50/80">
                  <span className="text-[10px] font-black text-slate-800 tracking-wider uppercase block">
                    TERMS & AUTHORIZATION
                  </span>
                  <span className="text-[8.5px] text-slate-600 block">
                    Official Acceptance Document
                  </span>
                </div>
              </div>

              {/* Cancellation & Refund Policy */}
              <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/50 space-y-2 text-[9.5px]">
                <h3 className="font-black text-slate-900 text-[10.5px] uppercase border-b border-slate-200 pb-1.5 flex items-center gap-1.5">
                  <span>📋</span> CANCELLATION & REFUND POLICY
                </h3>
                <p className="text-slate-600">
                  We kindly request all institution representatives and group coordinators to carefully review the tour confirmation terms prior to making advance deposits:
                </p>
                <ul className="space-y-1.5 text-slate-700 list-disc pl-4 leading-relaxed">
                  <li><strong>Advance Deposit Non-Refundability:</strong> Any advance amount paid towards tour confirmation is non-refundable under normal circumstances.</li>
                  <li><strong>Resource Reservation:</strong> Advance funds are immediately utilized to lock transport coaches, hotel room blocks, cruise slots, and permits.</li>
                  <li><strong>Booking Transferability:</strong> Individual participant seats can be transferred to an eligible student or faculty substitute.</li>
                  <li><strong>Organizer Cancellation Safeguard:</strong> In the rare event of tour cancellation by SkyQuest Holidays, full advance refund will be processed.</li>
                </ul>
              </div>

              {/* Dual Signatures Box */}
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="border border-slate-200 rounded-xl p-4 text-center bg-white space-y-8">
                  <span className="text-[9.5px] font-black text-slate-800 uppercase block">
                    PREPARED BY (SKYQUEST HOLIDAYS)
                  </span>
                  <div className="border-t border-slate-300 pt-2">
                    <span className="text-[8.5px] text-slate-500 block">Authorized Signature & Tour Operators Seal</span>
                  </div>
                </div>

                <div className="border border-slate-200 rounded-xl p-4 text-center bg-white space-y-8">
                  <span className="text-[9.5px] font-black text-slate-800 uppercase block">
                    ACCEPTED BY ({locationText})
                  </span>
                  <div className="border-t border-slate-300 pt-2">
                    <span className="text-[8.5px] text-slate-500 block">HOD / Staff Coordinator Signature & Date</span>
                  </div>
                </div>
              </div>

              {/* Connect with SkyQuest Holidays Bottom Banner */}
              <div className="rounded-xl bg-[#0c1a30] text-white p-4 shadow-sm border border-slate-800 space-y-2">
                <h4 className="font-black text-amber-400 text-xs tracking-wide uppercase">
                  CONNECT WITH SKYQUEST HOLIDAYS
                </h4>
                <div className="grid grid-cols-2 gap-2 text-[9.5px] text-slate-200">
                  <div>📞 Phone / WhatsApp: <span className="font-bold text-white">{phone}</span></div>
                  <div>📧 Email: <span className="font-bold text-white">{email}</span></div>
                  <div>🌐 Website: <span className="font-bold text-white">{web}</span></div>
                  <div>📲 Instagram: <span className="font-bold text-white">{insta}</span></div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-slate-200 pt-2 flex justify-between items-center text-[8.5px] text-slate-500 relative z-10">
              <span className="font-bold">SKYQUEST HOLIDAYS • Contact & Authorization</span>
              <span className="italic">Thank You For Choosing SkyQuest Holidays</span>
              <span className="px-2 py-0.5 rounded bg-slate-100 font-bold text-slate-700">Page {totalPages} of {totalPages}</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
