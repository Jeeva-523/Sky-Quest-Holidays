import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { INITIAL_PACKAGES, INITIAL_GALLERY } from "@/lib/data";

const DATA_DIR = path.join(process.cwd(), "data");
const UPLOADS_DIR = path.join(process.cwd(), "public", "uploads");

const PACKAGES_FILE = path.join(DATA_DIR, "packages.json");
const GALLERY_FILE = path.join(DATA_DIR, "gallery.json");
const MEDIA_FILE = path.join(DATA_DIR, "media.json");

function ensureDirs() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// Convert any base64 data URLs into real files in public/uploads
function convertBase64ToFile(str?: string, prefix = "img"): string {
  if (!str || typeof str !== "string" || !str.startsWith("data:image/")) {
    return str || "";
  }
  try {
    const matches = str.match(/^data:image\/([a-zA-Z+]+);base64,(.+)$/);
    if (!matches) return str;

    const ext = matches[1] === "jpeg" ? "jpg" : matches[1];
    const buffer = Buffer.from(matches[2], "base64");
    const fileName = `${prefix}_${Date.now()}_${Math.random().toString(36).substring(2, 7)}.${ext}`;
    const filePath = path.join(UPLOADS_DIR, fileName);
    fs.writeFileSync(filePath, buffer);
    return `/uploads/${fileName}`;
  } catch (err) {
    console.error("[convertBase64ToFile] Error converting base64:", err);
    return str;
  }
}

export async function GET() {
  try {
    ensureDirs();

    let packages = INITIAL_PACKAGES;
    if (fs.existsSync(PACKAGES_FILE)) {
      try {
        const raw = fs.readFileSync(PACKAGES_FILE, "utf-8");
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) packages = parsed;
      } catch (e) {}
    }

    let gallery = INITIAL_GALLERY;
    if (fs.existsSync(GALLERY_FILE)) {
      try {
        const raw = fs.readFileSync(GALLERY_FILE, "utf-8");
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) gallery = parsed;
      } catch (e) {}
    }

    let media = null;
    if (fs.existsSync(MEDIA_FILE)) {
      try {
        const raw = fs.readFileSync(MEDIA_FILE, "utf-8");
        media = JSON.parse(raw);
      } catch (e) {}
    }

    return NextResponse.json({
      success: true,
      packages,
      gallery,
      media,
      syncedAt: new Date().toISOString()
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Sync read failed" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    ensureDirs();
    const body = await req.json();
    let updatedPackages = null;
    let updatedGallery = null;
    let updatedMedia = null;

    // 1. Process Packages
    if (Array.isArray(body.packages)) {
      const sanitized = body.packages.map((pkg: any) => {
        const cleanImage = convertBase64ToFile(pkg.image, "pkg");
        return {
          ...pkg,
          image: cleanImage
        };
      });
      fs.writeFileSync(PACKAGES_FILE, JSON.stringify(sanitized, null, 2), "utf-8");
      updatedPackages = sanitized;
    }

    // 2. Process Gallery
    if (Array.isArray(body.gallery)) {
      const sanitized = body.gallery.map((item: any) => {
        const cleanImage = convertBase64ToFile(item.image, "gallery");
        return {
          ...item,
          image: cleanImage
        };
      });
      fs.writeFileSync(GALLERY_FILE, JSON.stringify(sanitized, null, 2), "utf-8");
      updatedGallery = sanitized;
    }

    // 3. Process Media
    if (body.media && typeof body.media === "object") {
      const sanitizedMedia = {
        ...body.media,
        bgImage: convertBase64ToFile(body.media.bgImage, "hero_bg"),
        whyChooseImage: convertBase64ToFile(body.media.whyChooseImage, "why_choose"),
        aboutImage: convertBase64ToFile(body.media.aboutImage, "about"),
        aboutImage1: convertBase64ToFile(body.media.aboutImage1, "about1"),
        aboutImage2: convertBase64ToFile(body.media.aboutImage2, "about2"),
        aboutImage3: convertBase64ToFile(body.media.aboutImage3, "about3"),
        aboutImage4: convertBase64ToFile(body.media.aboutImage4, "about4"),
        updatedAt: new Date().toISOString()
      };
      fs.writeFileSync(MEDIA_FILE, JSON.stringify(sanitizedMedia, null, 2), "utf-8");
      updatedMedia = sanitizedMedia;
    }

    return NextResponse.json({
      success: true,
      packages: updatedPackages,
      gallery: updatedGallery,
      media: updatedMedia,
      syncedAt: new Date().toISOString()
    });
  } catch (err: any) {
    console.error("[API /sync POST] Error:", err);
    return NextResponse.json({ error: err.message || "Sync save failed" }, { status: 500 });
  }
}
