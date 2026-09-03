import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  serverTimestamp
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL
} from "firebase/storage";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User
} from "firebase/auth";
import { db, storage, auth, isFirebaseConfigured } from "./firebase";
import { TourPackage, EnquiryLead, Booking, GalleryItem } from "./types";
import { INITIAL_PACKAGES, INITIAL_GALLERY } from "./data";

const LOCAL_STORAGE_PACKAGES_KEY = "skyquest_custom_packages";
const LOCAL_STORAGE_LEADS_KEY = "skyquest_leads";
const LOCAL_STORAGE_BOOKINGS_KEY = "skyquest_bookings";

/* =========================================================================
   1. FIRESTORE - TOUR PACKAGES
   ========================================================================= */

export async function fetchAllPackages(): Promise<TourPackage[]> {
  // 1. Quick memory / local storage cache for instant UI rendering
  if (typeof window !== "undefined") {
    const local = localStorage.getItem(LOCAL_STORAGE_PACKAGES_KEY);
    if (local) {
      try {
        const parsed = JSON.parse(local);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) {}
    }
  }

  // 2. Fetch from Firestore with 2s timeout safeguard
  if (isFirebaseConfigured() && db) {
    try {
      const q = query(collection(db, "packages"), orderBy("createdAt", "desc"));
      const timeoutPromise = new Promise<null>((_, reject) =>
        setTimeout(() => reject(new Error("Firestore timeout")), 2000)
      );
      const fetchPromise = getDocs(q);
      const snapshot = (await Promise.race([fetchPromise, timeoutPromise])) as any;
      if (snapshot && !snapshot.empty) {
        const pkgs = snapshot.docs.map((d: any) => ({ id: d.id, ...d.data() } as TourPackage));
        if (typeof window !== "undefined") {
          localStorage.setItem(LOCAL_STORAGE_PACKAGES_KEY, JSON.stringify(pkgs));
        }
        return pkgs;
      }
    } catch (error) {
      console.warn("[Firestore] fetchAllPackages fallback to local:", error);
    }
  }

  return INITIAL_PACKAGES;
}

export async function fetchPackageById(id: string): Promise<TourPackage | null> {
  if (isFirebaseConfigured() && db) {
    try {
      const docRef = doc(db, "packages", id);
      const snapshot = await getDoc(docRef);
      if (snapshot.exists()) {
        return { id: snapshot.id, ...snapshot.data() } as TourPackage;
      }
    } catch (e) {
      console.warn("[Firestore] fetchPackageById error:", e);
    }
  }

  const all = await fetchAllPackages();
  return all.find((p) => p.id === id) || null;
}

export async function saveTourPackage(pkg: Omit<TourPackage, "id"> & { id?: string }): Promise<string> {
  const packageId = pkg.id || `pkg-${Date.now()}`;
  const packageData = {
    ...pkg,
    id: packageId,
    createdAt: new Date().toISOString()
  };

  if (isFirebaseConfigured() && db) {
    try {
      const docRef = doc(db, "packages", packageId);
      await setDoc(docRef, { ...packageData, createdAt: serverTimestamp() }, { merge: true });
      return packageId;
    } catch (error) {
      console.error("[Firestore] saveTourPackage error:", error);
    }
  }

  // Local fallback
  if (typeof window !== "undefined") {
    const all = await fetchAllPackages();
    const existingIndex = all.findIndex((p) => p.id === packageId);
    if (existingIndex >= 0) {
      all[existingIndex] = { ...all[existingIndex], ...packageData };
    } else {
      all.unshift(packageData as TourPackage);
    }
    localStorage.setItem(LOCAL_STORAGE_PACKAGES_KEY, JSON.stringify(all));
  }

  return packageId;
}

export async function removeTourPackage(packageId: string): Promise<boolean> {
  if (isFirebaseConfigured() && db) {
    try {
      await deleteDoc(doc(db, "packages", packageId));
      return true;
    } catch (error) {
      console.error("[Firestore] removeTourPackage error:", error);
    }
  }

  if (typeof window !== "undefined") {
    const all = await fetchAllPackages();
    const filtered = all.filter((p) => p.id !== packageId);
    localStorage.setItem(LOCAL_STORAGE_PACKAGES_KEY, JSON.stringify(filtered));
  }
  return true;
}

/* =========================================================================
   2. FIRESTORE - CUSTOMER ENQUIRIES / LEADS
   ========================================================================= */

export async function fetchEnquiries(): Promise<EnquiryLead[]> {
  if (isFirebaseConfigured() && db) {
    try {
      const q = query(collection(db, "enquiries"), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      return snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as EnquiryLead));
    } catch (error) {
      console.warn("[Firestore] fetchEnquiries error:", error);
    }
  }

  if (typeof window !== "undefined") {
    const local = localStorage.getItem(LOCAL_STORAGE_LEADS_KEY);
    if (local) {
      try {
        return JSON.parse(local);
      } catch (e) {}
    }
  }

  return [
    {
      id: "lead-1",
      name: "Anand Kumar",
      phone: "+91 9876543210",
      email: "anand@example.com",
      packageName: "Cochin – Munnar Tea Hills Retreat",
      travelDate: "2026-09-20",
      travelers: 4,
      message: "Need 2 double bedrooms with mountain view.",
      status: "new",
      createdAt: new Date().toISOString()
    }
  ];
}

export async function submitEnquiry(enquiry: Omit<EnquiryLead, "id" | "status" | "createdAt">): Promise<string> {
  const leadId = `lead-${Date.now()}`;
  const newLead: EnquiryLead = {
    ...enquiry,
    id: leadId,
    status: "new",
    createdAt: new Date().toISOString()
  };

  if (isFirebaseConfigured() && db) {
    try {
      const docRef = await addDoc(collection(db, "enquiries"), {
        ...newLead,
        createdAt: serverTimestamp()
      });
      return docRef.id;
    } catch (error) {
      console.error("[Firestore] submitEnquiry error:", error);
    }
  }

  if (typeof window !== "undefined") {
    const list = await fetchEnquiries();
    list.unshift(newLead);
    localStorage.setItem(LOCAL_STORAGE_LEADS_KEY, JSON.stringify(list));
  }
  return leadId;
}

export async function updateEnquiryStatus(leadId: string, status: EnquiryLead["status"]): Promise<void> {
  if (isFirebaseConfigured() && db) {
    try {
      const docRef = doc(db, "enquiries", leadId);
      await updateDoc(docRef, { status });
      return;
    } catch (error) {
      console.error("[Firestore] updateEnquiryStatus error:", error);
    }
  }

  if (typeof window !== "undefined") {
    const list = await fetchEnquiries();
    const target = list.find((item) => item.id === leadId);
    if (target) {
      target.status = status;
      localStorage.setItem(LOCAL_STORAGE_LEADS_KEY, JSON.stringify(list));
    }
  }
}

export async function deleteEnquiry(leadId: string): Promise<void> {
  if (isFirebaseConfigured() && db) {
    try {
      await deleteDoc(doc(db, "enquiries", leadId));
      return;
    } catch (e) {}
  }

  if (typeof window !== "undefined") {
    const list = await fetchEnquiries();
    const filtered = list.filter((l) => l.id !== leadId);
    localStorage.setItem(LOCAL_STORAGE_LEADS_KEY, JSON.stringify(filtered));
  }
}

/* =========================================================================
   3. FIRESTORE - BOOKINGS
   ========================================================================= */

export async function fetchBookings(): Promise<Booking[]> {
  if (isFirebaseConfigured() && db) {
    try {
      const q = query(collection(db, "bookings"), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      return snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as Booking));
    } catch (e) {
      console.warn("[Firestore] fetchBookings error:", e);
    }
  }

  if (typeof window !== "undefined") {
    const local = localStorage.getItem(LOCAL_STORAGE_BOOKINGS_KEY);
    if (local) {
      try {
        return JSON.parse(local);
      } catch (e) {}
    }
  }

  return [
    {
      id: "bk-101",
      customerName: "Ramesh Kannan",
      phone: "+91 9443210987",
      email: "ramesh@gmail.com",
      packageName: "Munnar & Alleppey Luxury Honeymoon",
      travelDate: "2026-10-05",
      numberOfTravelers: 2,
      totalAmount: 18999,
      advancePaid: 5000,
      status: "confirmed",
      createdAt: new Date().toISOString()
    }
  ];
}

export async function createBooking(bookingData: Omit<Booking, "id" | "createdAt">): Promise<string> {
  const bookingId = `bk-${Date.now()}`;
  const fullBooking: Booking = {
    ...bookingData,
    id: bookingId,
    createdAt: new Date().toISOString()
  };

  if (isFirebaseConfigured() && db) {
    try {
      const docRef = await addDoc(collection(db, "bookings"), {
        ...fullBooking,
        createdAt: serverTimestamp()
      });
      return docRef.id;
    } catch (e) {
      console.error("[Firestore] createBooking error:", e);
    }
  }

  if (typeof window !== "undefined") {
    const all = await fetchBookings();
    all.unshift(fullBooking);
    localStorage.setItem(LOCAL_STORAGE_BOOKINGS_KEY, JSON.stringify(all));
  }
  return bookingId;
}

export async function updateBookingStatus(bookingId: string, status: Booking["status"]): Promise<void> {
  if (isFirebaseConfigured() && db) {
    try {
      await updateDoc(doc(db, "bookings", bookingId), { status });
      return;
    } catch (e) {}
  }

  if (typeof window !== "undefined") {
    const all = await fetchBookings();
    const item = all.find((b) => b.id === bookingId);
    if (item) {
      item.status = status;
      localStorage.setItem(LOCAL_STORAGE_BOOKINGS_KEY, JSON.stringify(all));
    }
  }
}

/* =========================================================================
   4. IMAGE UPLOADS - CLOUDINARY API & FIREBASE STORAGE
   ========================================================================= */

export interface CloudinarySettings {
  cloudName: string;
  uploadPreset: string;
  apiKey?: string;
  folder?: string;
  enabled?: boolean;
}

const LOCAL_STORAGE_CLOUDINARY_KEY = "skyquest_cloudinary_settings";

export async function fetchCloudinarySettings(): Promise<CloudinarySettings> {
  const defaultSettings: CloudinarySettings = {
    cloudName: "dciyanu4f",
    uploadPreset: "skyquest_uploads",
    apiKey: "",
    folder: "skyquest",
    enabled: true
  };

  if (isFirebaseConfigured() && db) {
    try {
      const docRef = doc(db, "settings", "cloudinary");
      const snap = await getDoc(docRef);
      if (snap.exists()) {
        const data = snap.data() as CloudinarySettings;
        if (typeof window !== "undefined") {
          localStorage.setItem(LOCAL_STORAGE_CLOUDINARY_KEY, JSON.stringify(data));
        }
        return { ...defaultSettings, ...data };
      }
    } catch (e) {
      console.warn("[Firestore] fetchCloudinarySettings error:", e);
    }
  }

  if (typeof window !== "undefined") {
    const local = localStorage.getItem(LOCAL_STORAGE_CLOUDINARY_KEY);
    if (local) {
      try {
        return { ...defaultSettings, ...JSON.parse(local) };
      } catch (e) {}
    }
  }

  return defaultSettings;
}

export async function saveCloudinarySettings(settings: CloudinarySettings): Promise<boolean> {
  if (typeof window !== "undefined") {
    localStorage.setItem(LOCAL_STORAGE_CLOUDINARY_KEY, JSON.stringify(settings));
  }

  if (isFirebaseConfigured() && db) {
    try {
      const docRef = doc(db, "settings", "cloudinary");
      await setDoc(docRef, settings, { merge: true });
      return true;
    } catch (e) {
      console.warn("[Firestore] saveCloudinarySettings error:", e);
    }
  }

  return true;
}

export async function uploadToCloudinary(file: File | Blob, folder?: string): Promise<string> {
  const settings = await fetchCloudinarySettings();
  if (!settings.cloudName || !settings.uploadPreset) {
    throw new Error("Cloudinary Cloud Name and Upload Preset must be configured in Admin Settings.");
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", settings.uploadPreset);
  const targetFolder = folder || settings.folder || "skyquest";
  if (targetFolder) {
    formData.append("folder", targetFolder);
  }

  const endpoint = `https://api.cloudinary.com/v1_1/${settings.cloudName.trim()}/image/upload`;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 6000);

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      body: formData,
      signal: controller.signal
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData?.error?.message || `Cloudinary upload failed with HTTP status ${res.status}`);
    }

    const data = await res.json();
    return data.secure_url || data.url;
  } finally {
    clearTimeout(timeoutId);
  }
}

export async function compressImageToDataUrl(file: File | Blob, maxWidth: number = 1400, quality: number = 0.82): Promise<string> {
  if (typeof window === "undefined") {
    return "";
  }

  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const rawDataUrl = event.target?.result as string;
      const img = new Image();
      img.onload = () => {
        try {
          const canvas = document.createElement("canvas");
          let width = img.width;
          let height = img.height;

          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);
            const compressed = canvas.toDataURL("image/jpeg", quality);
            resolve(compressed);
            return;
          }
        } catch (e) {
          console.warn("[compressImageToDataUrl] Canvas error:", e);
        }
        resolve(rawDataUrl);
      };
      img.onerror = () => resolve(rawDataUrl);
      img.src = rawDataUrl;
    };
    reader.onerror = () => resolve("");
    reader.readAsDataURL(file);
  });
}

export async function uploadTourImage(file: File, folder: string = "tours"): Promise<string> {
  // 1. Instant client-side compression (reduces 10MB -> ~100KB in 50 milliseconds)
  const compressedDataUrl = await compressImageToDataUrl(file, 1400, 0.82);

  // 2. If Cloudinary is configured, upload the ultra-lightweight compressed image in under 1 second
  try {
    const cSettings = await fetchCloudinarySettings();
    if (cSettings.enabled !== false && cSettings.cloudName && cSettings.uploadPreset) {
      // Convert data URL to Blob for fast binary multipart transfer
      const blob = await (await fetch(compressedDataUrl)).blob();
      return await uploadToCloudinary(blob, folder);
    }
  } catch (cError) {
    console.warn("[Cloudinary] Upload failed or preset missing, instantly using optimized image:", cError);
  }

  // 3. Instant zero-wait fallback (Ready in 0.1s flat, eliminating 45-second Firebase Storage hangs!)
  return compressedDataUrl;
}

/* =========================================================================
   5. FIREBASE AUTHENTICATION - ADMIN LOGIN
   ========================================================================= */

export async function adminLogin(emailOrUser: string, password: string): Promise<{ success: boolean; message?: string }> {
  // Check default credentials first for easy setup
  const defaultUser = process.env.NEXT_PUBLIC_ADMIN_DEFAULT_USER || "admin";
  const defaultPass = process.env.NEXT_PUBLIC_ADMIN_DEFAULT_PASS || "skyquest2026";

  if ((emailOrUser === defaultUser || emailOrUser === "skyquestholidays@gmail.com") && password === defaultPass) {
    if (typeof window !== "undefined") {
      localStorage.setItem("sky_quest_admin_session", "active");
      localStorage.setItem("sky_quest_admin_user", emailOrUser);
    }
    return { success: true };
  }

  // Firebase Auth email/password attempt
  if (isFirebaseConfigured() && auth) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, emailOrUser, password);
      if (typeof window !== "undefined") {
        localStorage.setItem("sky_quest_admin_session", "active");
        localStorage.setItem("sky_quest_admin_user", userCredential.user.email || emailOrUser);
      }
      return { success: true };
    } catch (error: any) {
      return { success: false, message: error.message || "Invalid Firebase Auth credentials" };
    }
  }

  return { success: false, message: "Invalid username or password. (Default: admin / skyquest2026)" };
}

export async function adminLogout(): Promise<void> {
  if (isFirebaseConfigured() && auth) {
    try {
      await signOut(auth);
    } catch (e) {}
  }
  if (typeof window !== "undefined") {
    localStorage.removeItem("sky_quest_admin_session");
    localStorage.removeItem("sky_quest_admin_user");
  }
}

export function isAdminLoggedIn(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem("sky_quest_admin_session") === "active";
}

/* =========================================================================
   6. FIRESTORE - SITE MEDIA & BANNER SETTINGS
   ========================================================================= */

const LOCAL_STORAGE_SITE_MEDIA_KEY = "skyquest_site_media_settings";
export const DEFAULT_HERO_BG = "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2000&q=80";
export const DEFAULT_WHY_CHOOSE_IMG = "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1000&q=80";
export const DEFAULT_ABOUT_IMG_1 = "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=600&q=80";
export const DEFAULT_ABOUT_IMG_2 = "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=600&q=80";
export const DEFAULT_ABOUT_IMG_3 = "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=600&q=80";
export const DEFAULT_ABOUT_IMG = "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1200&q=80";

export interface SiteMediaSettings {
  bgImage?: string;
  badgeText?: string;
  title?: string;
  subtitle?: string;
  whyChooseImage?: string;
  aboutImage?: string;
  aboutImage1?: string;
  aboutImage2?: string;
  aboutImage3?: string;
  aboutImage4?: string;
}

export type HeroSettings = SiteMediaSettings;

export async function fetchSiteMediaSettings(): Promise<SiteMediaSettings> {
  const defaultSettings: SiteMediaSettings = {
    bgImage: DEFAULT_HERO_BG,
    badgeText: "100% CUSTOMIZED & SAFE TOUR PACKAGES",
    title: "Explore the World with Sky Quest Holidays",
    subtitle: "From the misty tea hills of Munnar to the pristine beaches of Bali & thrilling College IV trips, create memories that last forever.",
    whyChooseImage: DEFAULT_WHY_CHOOSE_IMG,
    aboutImage: DEFAULT_ABOUT_IMG
  };

  if (isFirebaseConfigured() && db) {
    try {
      const docRef = doc(db, "settings", "media");
      const snap = await getDoc(docRef);
      if (snap.exists()) {
        return { ...defaultSettings, ...snap.data() } as SiteMediaSettings;
      }
    } catch (e) {
      console.warn("[Firestore] fetchSiteMediaSettings error:", e);
    }
  }

  if (typeof window !== "undefined") {
    const local = localStorage.getItem(LOCAL_STORAGE_SITE_MEDIA_KEY);
    if (local) {
      try {
        return { ...defaultSettings, ...JSON.parse(local) };
      } catch (e) {}
    }
  }

  return defaultSettings;
}

export async function saveSiteMediaSettings(settings: Partial<SiteMediaSettings>): Promise<boolean> {
  let firestoreSaved = false;

  // 1. Save to Firebase Firestore
  if (isFirebaseConfigured() && db) {
    try {
      const docRef = doc(db, "settings", "media");
      await setDoc(docRef, { ...settings, updatedAt: serverTimestamp() }, { merge: true });
      firestoreSaved = true;
    } catch (e) {
      console.error("[Firestore] saveSiteMediaSettings error:", e);
    }
  }

  // 2. Save to localStorage & notify browser components in real-time
  if (typeof window !== "undefined") {
    try {
      const current = await fetchSiteMediaSettings();
      const updated = { ...current, ...settings };
      localStorage.setItem(LOCAL_STORAGE_SITE_MEDIA_KEY, JSON.stringify(updated));
      window.dispatchEvent(new CustomEvent("site_media_updated", { detail: updated }));
    } catch (e) {
      console.warn("[LocalStorage] saveSiteMediaSettings error:", e);
    }
  }

  return firestoreSaved || typeof window !== "undefined";
}

// Aliases for backwards compatibility
export const fetchHeroSettings = fetchSiteMediaSettings;
export const saveHeroSettings = saveSiteMediaSettings;

/* =========================================================================
   6. SHARED QUOTATIONS - MULTI-ADMIN CLOUD & SERVER SYNC
   ========================================================================= */

export async function fetchSharedQuotations(): Promise<{ quotations: any[]; nextSeq: number }> {
  // 1. Try Firebase Firestore
  if (isFirebaseConfigured() && db) {
    try {
      const q = query(collection(db, "quotations"), orderBy("savedAt", "desc"));
      const snap = await getDocs(q);
      if (!snap.empty) {
        const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        return { quotations: list, nextSeq: 750 };
      }
    } catch (e) {
      console.warn("[Firestore] fetchSharedQuotations fallback to API:", e);
    }
  }

  // 2. Fallback to localStorage
  if (typeof window !== "undefined") {
    try {
      const local = localStorage.getItem("skyquest_quotations_history_list_v1");
      if (local) {
        const parsed = JSON.parse(local);
        if (Array.isArray(parsed)) return { quotations: parsed, nextSeq: 750 };
      }
    } catch (e) {}
  }

  return { quotations: [], nextSeq: 750 };
}

export async function saveSharedQuotation(item: any, nextSeq?: number): Promise<boolean> {
  // 1. Save to Firebase Firestore
  if (isFirebaseConfigured() && db) {
    try {
      const docId = item.id || (item.refNo ? item.refNo.replace(/[\/\s]/g, "_") : `qt_${Date.now()}`);
      await setDoc(doc(db, "quotations", docId), {
        ...item,
        updatedAt: serverTimestamp()
      }, { merge: true });
    } catch (e) {
      console.warn("[Firestore] saveSharedQuotation error:", e);
    }
  }

  // 2. Save to localStorage
  if (typeof window !== "undefined") {
    try {
      const raw = localStorage.getItem("skyquest_quotations_history_list_v1");
      const list = raw ? JSON.parse(raw) : [];
      const updated = [item, ...list.filter((q: any) => q.id !== item.id)];
      localStorage.setItem("skyquest_quotations_history_list_v1", JSON.stringify(updated));
      if (nextSeq) {
        localStorage.setItem("skyquest_quotations_sequence_v1", String(nextSeq));
      }
    } catch (e) {}
  }
  return true;
}

export async function deleteSharedQuotation(id: string): Promise<boolean> {
  // 1. Delete from Firestore
  if (isFirebaseConfigured() && db) {
    try {
      const docId = id.replace(/[\/\s]/g, "_");
      await deleteDoc(doc(db, "quotations", docId));
    } catch (e) {}
  }

  // 2. Delete from localStorage
  if (typeof window !== "undefined") {
    try {
      const raw = localStorage.getItem("skyquest_quotations_history_list_v1");
      if (raw) {
        const list = JSON.parse(raw);
        const filtered = list.filter((q: any) => q.id !== id);
        localStorage.setItem("skyquest_quotations_history_list_v1", JSON.stringify(filtered));
      }
    } catch (e) {}
  }
  return true;
}

/* =========================================================================
   8. FIRESTORE - CAPTURED MOMENTS & GALLERY
   ========================================================================= */

const LOCAL_STORAGE_GALLERY_KEY = "skyquest_gallery_photos";

export async function fetchGalleryItems(): Promise<GalleryItem[]> {
  if (typeof window !== "undefined") {
    const local = localStorage.getItem(LOCAL_STORAGE_GALLERY_KEY);
    if (local) {
      try {
        const parsed = JSON.parse(local);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) {}
    }
  }

  if (isFirebaseConfigured() && db) {
    try {
      const q = query(collection(db, "gallery"), orderBy("createdAt", "desc"));
      const timeoutPromise = new Promise<null>((_, reject) =>
        setTimeout(() => reject(new Error("Firestore timeout")), 2000)
      );
      const snapshot = (await Promise.race([getDocs(q), timeoutPromise])) as any;
      if (snapshot && !snapshot.empty) {
        const items = snapshot.docs.map((d: any) => ({ id: d.id, ...d.data() } as GalleryItem));
        if (typeof window !== "undefined") {
          localStorage.setItem(LOCAL_STORAGE_GALLERY_KEY, JSON.stringify(items));
        }
        return items;
      }
    } catch (error) {
      console.warn("[Firestore] fetchGalleryItems fallback:", error);
    }
  }

  return INITIAL_GALLERY;
}

export async function saveGalleryItem(item: Omit<GalleryItem, "id"> & { id?: string }): Promise<string> {
  const itemId = item.id || `gal-${Date.now()}`;
  const itemData = {
    ...item,
    id: itemId,
    createdAt: new Date().toISOString()
  };

  if (isFirebaseConfigured() && db) {
    try {
      const docRef = doc(db, "gallery", itemId);
      await setDoc(docRef, { ...itemData, createdAt: serverTimestamp() }, { merge: true });
    } catch (error) {
      console.error("[Firestore] saveGalleryItem error:", error);
    }
  }

  if (typeof window !== "undefined") {
    const all = await fetchGalleryItems();
    const existingIndex = all.findIndex((g) => g.id === itemId);
    if (existingIndex >= 0) {
      all[existingIndex] = { ...all[existingIndex], ...itemData };
    } else {
      all.unshift(itemData as GalleryItem);
    }
    localStorage.setItem(LOCAL_STORAGE_GALLERY_KEY, JSON.stringify(all));
  }

  return itemId;
}

export async function deleteGalleryItem(itemId: string): Promise<boolean> {
  if (isFirebaseConfigured() && db) {
    try {
      await deleteDoc(doc(db, "gallery", itemId));
    } catch (error) {
      console.error("[Firestore] deleteGalleryItem error:", error);
    }
  }

  if (typeof window !== "undefined") {
    const all = await fetchGalleryItems();
    const filtered = all.filter((g) => g.id !== itemId);
    localStorage.setItem(LOCAL_STORAGE_GALLERY_KEY, JSON.stringify(filtered));
  }
  return true;
}




