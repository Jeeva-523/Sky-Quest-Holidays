import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get("content-type") || "";
    const uploadsDir = path.join(process.cwd(), "public", "uploads");

    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      const file = formData.get("file") as File | null;
      const folder = (formData.get("folder") as string) || "general";

      if (!file) {
        return NextResponse.json({ error: "No file provided" }, { status: 400 });
      }

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Determine extension
      let ext = "jpg";
      const originalName = file.name || "";
      if (originalName.includes(".")) {
        ext = originalName.split(".").pop()?.toLowerCase() || "jpg";
      } else if (file.type.includes("png")) {
        ext = "png";
      } else if (file.type.includes("webp")) {
        ext = "webp";
      }

      const cleanFolder = folder.replace(/[^a-zA-Z0-9_-]/g, "");
      const fileName = `${cleanFolder}_${Date.now()}_${Math.random().toString(36).substring(2, 8)}.${ext}`;
      const filePath = path.join(uploadsDir, fileName);

      await fs.promises.writeFile(filePath, buffer);
      const publicUrl = `/uploads/${fileName}`;

      return NextResponse.json({
        success: true,
        url: publicUrl,
        fileName
      });
    }

    // Support JSON base64 dataUrl upload
    const body = await req.json().catch(() => ({}));
    if (body.dataUrl && typeof body.dataUrl === "string") {
      const matches = body.dataUrl.match(/^data:image\/([a-zA-Z+]+);base64,(.+)$/);
      if (matches) {
        const ext = matches[1] === "jpeg" ? "jpg" : matches[1];
        const buffer = Buffer.from(matches[2], "base64");
        const folder = (body.folder || "general").replace(/[^a-zA-Z0-9_-]/g, "");
        const fileName = `${folder}_${Date.now()}_${Math.random().toString(36).substring(2, 8)}.${ext}`;
        const filePath = path.join(uploadsDir, fileName);

        await fs.promises.writeFile(filePath, buffer);
        const publicUrl = `/uploads/${fileName}`;

        return NextResponse.json({
          success: true,
          url: publicUrl,
          fileName
        });
      }
    }

    return NextResponse.json({ error: "Unsupported request format" }, { status: 400 });
  } catch (error: any) {
    console.error("[API /upload] Error:", error);
    return NextResponse.json({ error: error.message || "Upload failed" }, { status: 500 });
  }
}
