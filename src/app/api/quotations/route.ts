import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const QUOTATIONS_FILE = path.join(DATA_DIR, "quotations.json");

function ensureDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function readQuotationsFromFile(): any[] {
  ensureDir();
  if (!fs.existsSync(QUOTATIONS_FILE)) {
    return [];
  }
  try {
    const raw = fs.readFileSync(QUOTATIONS_FILE, "utf-8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.error("[API /api/quotations] Read error:", err);
    return [];
  }
}

function writeQuotationsToFile(list: any[]): void {
  ensureDir();
  fs.writeFileSync(QUOTATIONS_FILE, JSON.stringify(list, null, 2), "utf-8");
}

function calculateNextSeq(list: any[]): number {
  let highest = 750;
  list.forEach((item) => {
    const ref = item.refNo || item.id || "";
    const match = ref.match(/SKY-(\d+)/i);
    if (match && match[1]) {
      const num = parseInt(match[1], 10);
      if (!isNaN(num) && num >= highest) {
        highest = num + 1;
      }
    }
  });
  return highest;
}

export async function GET() {
  try {
    const quotations = readQuotationsFromFile();
    const nextSeq = calculateNextSeq(quotations);
    return NextResponse.json({
      success: true,
      quotations,
      nextSeq,
      syncedAt: new Date().toISOString()
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Failed to read quotations" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    let currentList = readQuotationsFromFile();

    if (Array.isArray(body.quotations)) {
      currentList = body.quotations;
    } else if (body.quotation && typeof body.quotation === "object") {
      const item = body.quotation;
      const refKey = (item.refNo || item.id || "").trim().toLowerCase();
      const existingIdx = currentList.findIndex(
        (it: any) =>
          (it.refNo || it.id || "").trim().toLowerCase() === refKey && refKey.length > 0
      );

      if (existingIdx >= 0) {
        currentList[existingIdx] = { ...currentList[existingIdx], ...item };
      } else {
        currentList.unshift(item);
      }
    }

    writeQuotationsToFile(currentList);
    const nextSeq = body.nextSeq && body.nextSeq >= 750 ? body.nextSeq : calculateNextSeq(currentList);

    return NextResponse.json({
      success: true,
      quotations: currentList,
      nextSeq,
      syncedAt: new Date().toISOString()
    });
  } catch (err: any) {
    console.error("[API /api/quotations POST] Error:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Failed to save quotation" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const clearAll = searchParams.get("clearAll") === "true";
    const id = searchParams.get("id") || "";

    if (clearAll) {
      writeQuotationsToFile([]);
      return NextResponse.json({ success: true, quotations: [], nextSeq: 750 });
    }

    if (!id) {
      return NextResponse.json({ success: false, error: "Missing id parameter" }, { status: 400 });
    }

    const currentList = readQuotationsFromFile();
    const cleanId = id.trim().toLowerCase();
    const filtered = currentList.filter((it: any) => {
      const itId = (it.id || "").trim().toLowerCase();
      const itRef = (it.refNo || "").trim().toLowerCase();
      const itSafe = itId.replace(/[\/\s]/g, "_");
      const targetSafe = cleanId.replace(/[\/\s]/g, "_");
      return itId !== cleanId && itRef !== cleanId && itSafe !== targetSafe;
    });

    writeQuotationsToFile(filtered);
    const nextSeq = calculateNextSeq(filtered);

    return NextResponse.json({
      success: true,
      quotations: filtered,
      nextSeq
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Failed to delete quotation" },
      { status: 500 }
    );
  }
}
