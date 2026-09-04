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
  ExternalLink,
  Sparkles,
  Save,
  Clock,
  Calendar,
  MapPin,
  Users
} from "lucide-react";

import {
  fetchSharedQuotations,
  saveSharedQuotation,
  deleteSharedQuotation
} from "@/lib/firebaseServices";

export interface DayItinerary {
  dayNum: number;
  title: string;
  subtitle?: string;
  destination: string;
  mealPlan: string;
  transport: string;
  spotsText: string;
}

export interface QuotationHistoryItem {
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

interface QuotationStudioProps {
  embedded?: boolean;
}

export default function QuotationStudio({ embedded = false }: QuotationStudioProps) {
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

    if (existingIdx >= 0) {
      list[existingIdx] = historyItem;
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
    setSaveSuccessMsg(`Saved ${savedRef}! Cleared & Ready for New Quotation (${nextRefNo})`);
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
        for (const item of historyList) {
          await deleteSharedQuotation(item.id);
        }
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
    const currentData = getCurrentFormData();
    try {
      localStorage.setItem(SAVED_DATA_KEY, JSON.stringify(currentData));
    } catch (e) { }
    window.open("/quotation-print/index.html?print=true", "_blank");
  };

  const SPOTS_PER_PAGE = 15;
  const renderedDayPagesCount = daysData.reduce((acc, day) => {
    const spots = day.spotsText.split("\n").filter((l) => l.trim().length > 0);
    return acc + Math.max(1, Math.ceil(spots.length / SPOTS_PER_PAGE));
  }, 0);
  const totalPages = renderedDayPagesCount + 3;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* 1. TOP DEDICATED ACTION HEADER */}
      <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/95 to-slate-850 border border-slate-800 shadow-xl flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Left Lockup: Title & Live Badge */}
        <div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-inner">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
                <span>Quotation Studio</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-amber-400/10 text-amber-400 border border-amber-400/30 uppercase tracking-widest font-bold">
                  Official
                </span>
              </h2>
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 mt-1">
                <span className="px-2 py-0.5 rounded-md bg-sky-950/80 border border-sky-800/60 font-mono font-bold text-sky-300">
                  {refNo}
                </span>
                <span>•</span>
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse" />
                  {totalPages} PDF Pages Generated
                </span>
                <span>•</span>
                <span className="text-slate-400 hidden sm:inline">Real-time Cross-Admin Sync</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Actions: PROMINENT & HIGH-VISIBILITY BUTTONS */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={handleNewQuotation}
            className="px-3 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700/80 font-bold text-xs transition-all flex items-center gap-1.5 shadow-sm active:scale-95 cursor-pointer"
            title="Start New Quotation"
          >
            <Plus className="w-4 h-4 text-sky-400" />
            <span>New Quote</span>
          </button>

          <button
            onClick={handleSaveQuotation}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-lg shadow-emerald-950/50 transition-all flex items-center gap-2 active:scale-95 cursor-pointer"
            title="Save this Quotation and Sync"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-100" />
            <span>Save Quote</span>
          </button>

          <button
            onClick={handleOpenPdfPreviewInNewTab}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500 text-white font-bold text-xs shadow-lg shadow-sky-950/50 transition-all flex items-center gap-2 active:scale-95 cursor-pointer"
            title="Open Exact PDF Document in New Tab"
          >
            <Eye className="w-4 h-4 text-sky-100" />
            <span>Preview PDF</span>
            <ExternalLink className="w-3.5 h-3.5 text-sky-200" />
          </button>

          <button
            onClick={handlePrint}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs shadow-lg shadow-amber-950/40 transition-all flex items-center gap-2 active:scale-95 cursor-pointer"
            title="Print or Save as PDF"
          >
            <Printer className="w-4 h-4 text-slate-950" />
            <span>Print PDF</span>
          </button>
        </div>
      </div>

      {/* Save Success Alert Banner */}
      {saveSuccessMsg && (
        <div className="p-3.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-200 text-xs font-bold flex items-center gap-2 animate-fade-in shadow-md">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span>{saveSuccessMsg}</span>
        </div>
      )}

      {/* 2. TAB NAVIGATION BAR */}
      <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-slate-900 border border-slate-800 overflow-x-auto scrollbar-none shadow-sm">
        {[
          { id: "client", label: "Client & Cover", icon: Building },
          { id: "itinerary", label: "Itinerary Schedule", count: daysData.length, icon: Layers },
          { id: "food", label: "Pricing & Specs", icon: Utensils },
          { id: "terms", label: "Terms & Auth", icon: FileText },
          { id: "history", label: "History Archive", count: historyList.length, icon: History }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 min-w-[140px] px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer ${
                isActive
                  ? "bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-md shadow-sky-500/25"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-slate-400"}`} />
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span
                  className={`px-1.5 py-0.5 text-[10px] font-black rounded-full leading-none ${
                    isActive ? "bg-white/25 text-white" : "bg-slate-800 text-slate-300"
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* 3. MAIN FORM WORKSPACE */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
        {/* TAB 1: CLIENT & COVER */}
        {activeTab === "client" && (
          <div className="space-y-6 animate-fade-in">
            {/* Auto Reference Number Banner */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 py-3 rounded-2xl bg-gradient-to-r from-sky-950/60 via-slate-900 to-slate-900 border border-sky-800/40 text-xs">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400/50 animate-pulse" />
                <span className="text-slate-400 font-semibold uppercase tracking-wider text-[11px]">
                  Quotation Ref No (Auto):
                </span>
                <span className="font-mono font-black text-sky-300 text-sm bg-sky-950 px-3 py-1 rounded-lg border border-sky-800/60 tracking-wider">
                  {refNo}
                </span>
              </div>
              <span className="text-[11px] text-slate-400 font-medium">
                ⚡ Automatically assigned & incremented on Save
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs">
              <div>
                <label className="block text-slate-300 font-bold uppercase mb-1.5 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-rose-400" />
                  <span>Pickup / Drop Location</span>
                </label>
                <input
                  type="text"
                  value={locationText}
                  onChange={(e) => setLocationText(e.target.value)}
                  placeholder="e.g. Karur / Erode / Coimbatore"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white font-medium focus:border-sky-500 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold uppercase mb-1.5 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Destinations Covered</span>
                </label>
                <input
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="e.g. Thiruvananthapuram & Varkala & Vagamon"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white font-medium focus:border-sky-500 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold uppercase mb-1.5 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>Duration / Stay</span>
                </label>
                <input
                  type="text"
                  value={durationText}
                  onChange={(e) => setDurationText(e.target.value)}
                  placeholder="e.g. 3 Days / 2 Nights"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white font-medium focus:border-sky-500 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold uppercase mb-1.5 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-purple-400" />
                  <span>Group Strength (Pax Count)</span>
                </label>
                <input
                  type="text"
                  value={paxText}
                  onChange={(e) => setPaxText(e.target.value)}
                  placeholder="e.g. 16 Students + 2 Staff (Complementary)"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white font-medium focus:border-sky-500 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold uppercase mb-1.5 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-sky-400" />
                  <span>Travel Dates Range</span>
                </label>
                <input
                  type="text"
                  value={datesText}
                  onChange={(e) => setDatesText(e.target.value)}
                  placeholder="e.g. Sept 9 – Sept 12, 2026"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white font-medium focus:border-sky-500 focus:outline-none transition-colors"
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
                  placeholder="e.g. Industrial Visit & Nature Expedition"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white font-medium focus:border-sky-500 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold uppercase mb-1.5">
                  📅 Quotation Date (Month)
                </label>
                <select
                  value={quoteDate}
                  onChange={(e) => setQuoteDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white font-medium focus:border-sky-500 focus:outline-none transition-colors"
                >
                  <option value="January 2026">January 2026</option>
                  <option value="February 2026">February 2026</option>
                  <option value="March 2026">March 2026</option>
                  <option value="April 2026">April 2026</option>
                  <option value="May 2026">May 2026</option>
                  <option value="June 2026">June 2026</option>
                  <option value="July 2026">July 2026</option>
                  <option value="August 2026">August 2026</option>
                  <option value="September 2026">September 2026</option>
                  <option value="October 2026">October 2026</option>
                  <option value="November 2026">November 2026</option>
                  <option value="December 2026">December 2026</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-bold uppercase mb-1.5">
                  ⏳ Quotation Validity
                </label>
                <input
                  type="text"
                  value={validity}
                  onChange={(e) => setValidity(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white font-medium focus:border-sky-500 focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-bold uppercase mb-1.5">
                ✍️ Prepared By (Team / Wing)
              </label>
              <input
                type="text"
                value={preparedBy}
                onChange={(e) => setPreparedBy(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white font-medium focus:border-sky-500 focus:outline-none transition-colors"
              />
            </div>
          </div>
        )}

        {/* TAB 2: ITINERARY DAYS & SPOTS */}
        {activeTab === "itinerary" && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Layers className="w-4 h-4 text-sky-400" />
                  <span>Day-by-Day Itinerary Schedule ({daysData.length} Days)</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Enter 1 spot per line. If a day has more than 15 spots, it cleanly paginates to prevent overflow.
                </p>
              </div>
              <button
                onClick={handleAddDay}
                className="px-3.5 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-md active:scale-95 cursor-pointer self-start sm:self-auto"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Day</span>
              </button>
            </div>

            <div className="space-y-6">
              {daysData.map((day, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800/90 space-y-4 hover:border-slate-700 transition-colors shadow-inner"
                >
                  <div className="flex items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
                    <span className="px-3 py-1 rounded-lg bg-sky-500/15 text-sky-400 font-black text-xs border border-sky-500/30 uppercase tracking-wider">
                      Day {idx + 1}
                    </span>
                    {daysData.length > 1 && (
                      <button
                        onClick={() => handleDeleteDay(idx)}
                        className="p-1.5 rounded-lg bg-rose-950/40 text-rose-400 hover:bg-rose-900/60 hover:text-white border border-rose-800/40 text-xs transition-colors cursor-pointer"
                        title="Delete Day"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="block text-slate-400 font-semibold mb-1">
                        Header Title (e.g. DAY 01: ARRIVAL)
                      </label>
                      <input
                        type="text"
                        value={day.title}
                        onChange={(e) => handleUpdateDay(idx, "title", e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-sky-500 font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-400 font-semibold mb-1">
                        Subtitle / Highlights
                      </label>
                      <input
                        type="text"
                        value={day.subtitle || ""}
                        onChange={(e) => handleUpdateDay(idx, "subtitle", e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-sky-500 font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-400 font-semibold mb-1">
                        Destination Area
                      </label>
                      <input
                        type="text"
                        value={day.destination}
                        onChange={(e) => handleUpdateDay(idx, "destination", e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-sky-500 font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-400 font-semibold mb-1">
                        Transport Vehicle
                      </label>
                      <input
                        type="text"
                        value={day.transport}
                        onChange={(e) => handleUpdateDay(idx, "transport", e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-sky-500 font-medium"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-slate-400 font-semibold mb-1">
                        Meal Plan for this Day
                      </label>
                      <input
                        type="text"
                        value={day.mealPlan}
                        onChange={(e) => handleUpdateDay(idx, "mealPlan", e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-sky-500 font-medium"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-bold mb-1 text-xs uppercase flex items-center justify-between">
                      <span>📍 Sightseeing Spots (1 spot per line)</span>
                      <span className="text-[11px] text-slate-400 font-normal">
                        Total Spots: {day.spotsText.split("\n").filter((l) => l.trim().length > 0).length}
                      </span>
                    </label>
                    <textarea
                      rows={6}
                      value={day.spotsText}
                      onChange={(e) => handleUpdateDay(idx, "spotsText", e.target.value)}
                      placeholder="Breakfast&#10;Spot 1&#10;Lunch&#10;Spot 2&#10;Dinner"
                      className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 text-white font-mono text-xs focus:outline-none focus:border-sky-500 leading-relaxed"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: PRICING & SPECS */}
        {activeTab === "food" && (
          <div className="space-y-6 animate-fade-in text-xs">
            <h3 className="text-base font-bold text-white border-b border-slate-800 pb-3 flex items-center gap-2">
              <Utensils className="w-4 h-4 text-amber-400" />
              <span>Commercial Pricing & Investment Plan</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div>
                <label className="block text-slate-300 font-bold uppercase mb-1.5">
                  💰 Rate per Student / Pax
                </label>
                <input
                  type="text"
                  value={rate}
                  onChange={(e) => setRate(e.target.value)}
                  placeholder="e.g. ₹6,000 /-"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white font-bold text-sm focus:border-sky-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold uppercase mb-1.5">
                  👥 Rate Pax Basis
                </label>
                <input
                  type="text"
                  value={ratePaxBasis}
                  onChange={(e) => setRatePaxBasis(e.target.value)}
                  placeholder="e.g. Based on 16 Pax"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white focus:border-sky-500 focus:outline-none font-medium"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold uppercase mb-1.5">
                  🍽️ Meal Plan Category
                </label>
                <select
                  value={foodOption}
                  onChange={(e) => setFoodOption(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white font-medium focus:border-sky-500 focus:outline-none"
                >
                  <option value="ALL TIME FOOD INCLUDED">ALL TIME FOOD INCLUDED (Breakfast, Lunch & Dinner)</option>
                  <option value="WITH FOOD">WITH FOOD</option>
                  <option value="WITHOUT FOOD">WITHOUT FOOD</option>
                  <option value="BREAKFAST & DINNER ONLY">BREAKFAST & DINNER ONLY</option>
                </select>
              </div>
            </div>

            {/* Inclusions summary card */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block">
                ✔ Active Package Inclusions (9 Items Verified)
              </span>
              <ul className="text-slate-400 space-y-1 text-[11px] list-disc list-inside">
                <li>52-Seater Luxury Bus with DJ Lighting, Sound & Push-back Seats</li>
                <li>All Interstate Taxes, Toll Charges & Parking Fees</li>
                <li>Deluxe Room Hotel/Resort Stay</li>
                <li>Off-Road 4x4 Jeep Safari & Sunset Boat Cruise</li>
                <li>Campfire with Group Entertainment</li>
                <li>Complete Daily Meal Plan (Breakfast, Lunch & Dinner)</li>
                <li>2 Staff Members Completely Complimentary</li>
              </ul>
            </div>
          </div>
        )}

        {/* TAB 4: TERMS & AUTH */}
        {activeTab === "terms" && (
          <div className="space-y-6 animate-fade-in text-xs">
            <h3 className="text-base font-bold text-white border-b border-slate-800 pb-3 flex items-center gap-2">
              <FileText className="w-4 h-4 text-teal-400" />
              <span>Contact Channels & Authorization Specs</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-slate-300 font-bold uppercase mb-1.5">📞 Official Phone Numbers</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none font-medium"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold uppercase mb-1.5">✉️ Official Email Address</label>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none font-medium"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold uppercase mb-1.5">🌐 Official Website</label>
                <input
                  type="text"
                  value={web}
                  onChange={(e) => setWeb(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none font-medium"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold uppercase mb-1.5">📲 Instagram Handle</label>
                <input
                  type="text"
                  value={insta}
                  onChange={(e) => setInsta(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none font-medium"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: SAVED QUOTATION HISTORY */}
        {activeTab === "history" && (
          <div className="space-y-6 animate-fade-in text-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div className="relative flex-1 max-w-md">
                <input
                  type="text"
                  placeholder="Search ref no or location..."
                  value={historySearch}
                  onChange={(e) => setHistorySearch(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:outline-none focus:border-sky-500 font-medium"
                />
              </div>
              {historyList.length > 0 && (
                <button
                  onClick={handleClearAllHistory}
                  className="px-3.5 py-2 rounded-xl bg-rose-950/60 text-rose-300 hover:bg-rose-900 text-xs font-semibold cursor-pointer border border-rose-800/40"
                >
                  Clear All History
                </button>
              )}
            </div>

            {historyList.length === 0 ? (
              <div className="text-center py-12 text-slate-400 text-xs bg-slate-950 rounded-2xl border border-slate-800">
                No quotations found in history. Click &ldquo;Save Quote&rdquo; to store quotes here.
              </div>
            ) : (
              <div className="space-y-3">
                {historyList
                  .filter(
                    (it) =>
                      !historySearch ||
                      it.clientName?.toLowerCase().includes(historySearch.toLowerCase()) ||
                      it.refNo?.toLowerCase().includes(historySearch.toLowerCase()) ||
                      it.destination?.toLowerCase().includes(historySearch.toLowerCase())
                  )
                  .map((item) => (
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
                          onClick={() => handleLoadFromHistory(item)}
                          className="px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs transition-colors cursor-pointer"
                        >
                          Load Quote
                        </button>
                        <button
                          onClick={() => handleDeleteHistory(item.id)}
                          className="p-1.5 rounded-lg bg-rose-950/60 text-rose-300 hover:bg-rose-900 border border-rose-800/40 cursor-pointer"
                          title="Delete from History"
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

      {/* 4. BOTTOM DEDICATED ACTION BAR (ALWAYS ACCESSIBLE WITHOUT SCROLLING TO TOP) */}
      <div className="p-4 rounded-2xl bg-slate-900/95 border border-slate-800 flex flex-wrap items-center justify-between gap-3 shadow-xl">
        <div className="text-xs text-slate-400 flex items-center gap-2 font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>Ref No: <strong className="text-sky-400 font-mono">{refNo}</strong></span>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleSaveQuotation}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-md shadow-emerald-950/40 transition-all flex items-center gap-1.5 active:scale-95 cursor-pointer"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Save Quote</span>
          </button>

          <button
            onClick={handleOpenPdfPreviewInNewTab}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500 text-white font-bold text-xs shadow-md shadow-sky-950/40 transition-all flex items-center gap-1.5 active:scale-95 cursor-pointer"
          >
            <Eye className="w-4 h-4" />
            <span>Preview PDF</span>
            <ExternalLink className="w-3 h-3" />
          </button>

          <button
            onClick={handlePrint}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs shadow-md shadow-amber-950/40 transition-all flex items-center gap-1.5 active:scale-95 cursor-pointer"
          >
            <Printer className="w-4 h-4 text-slate-950" />
            <span>Print PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
}
