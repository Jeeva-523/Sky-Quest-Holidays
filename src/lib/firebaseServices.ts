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
import { TourPackage, EnquiryLead, Booking } from "./types";
import { INITIAL_PACKAGES } from "./data";

const LOCAL_STORAGE_PACKAGES_KEY = "skyquest_custom_packages";
const LOCAL_STORAGE_LEADS_KEY = "skyquest_leads";
const LOCAL_STORAGE_BOOKINGS_KEY = "skyquest_bookings";

/* =========================================================================
   1. FIRESTORE - TOUR PACKAGES
   ========================================================================= */

export async function fetchAllPackages(): Promise<TourPackage[]> {
  if (isFirebaseConfigured() && db) {
    try {
      const q = query(collection(db, "packages"), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        return snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as TourPackage));
      }
    } catch (error) {
      console.warn("[Firestore] Error loading packages from Firestore, using local fallback:", error);
    }
  }

  // Local storage / Initial Seed Fallback
  if (typeof window !== "undefined") {
    const local = localStorage.getItem(LOCAL_STORAGE_PACKAGES_KEY);
    if (local) {
      try {
        const parsed = JSON.parse(local);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) {}
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
   4. FIREBASE STORAGE - TOUR IMAGES
   ========================================================================= */

export async function uploadTourImage(file: File, folder: string = "tours"): Promise<string> {
  if (isFirebaseConfigured() && storage) {
    try {
      const cleanFileName = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.]/g, "_")}`;
      const storageRef = ref(storage, `${folder}/${cleanFileName}`);
      const snapshot = await uploadBytes(storageRef, file);
      const downloadUrl = await getDownloadURL(snapshot.ref);
      return downloadUrl;
    } catch (error) {
      console.error("[Firebase Storage] Image upload error:", error);
    }
  }

  // Fallback for local preview: create data URL
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve(reader.result as string);
    };
    reader.readAsDataURL(file);
  });
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
