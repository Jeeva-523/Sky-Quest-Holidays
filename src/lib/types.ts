export interface TourPackage {
  id: string;
  name: string;
  title: string;
  state: string;
  badge?: string;
  price: string;
  originalPrice?: string;
  duration: string;
  image: string;
  desc: string;
  location: string;
  placesToVisit: string[];
  inclusions: string[];
  exclusions: string[];
  category: string;
  featured?: boolean;
  createdAt?: any;
}

export interface EnquiryLead {
  id: string;
  name: string;
  phone: string;
  email?: string;
  packageId?: string;
  packageName?: string;
  travelDate?: string;
  travelers?: number | string;
  message?: string;
  source?: string;
  status: 'new' | 'contacted' | 'converted' | 'closed';
  createdAt?: any;
}

export interface Booking {
  id: string;
  customerName: string;
  phone: string;
  email: string;
  packageName: string;
  packageId?: string;
  travelDate: string;
  numberOfTravelers: number;
  totalAmount: number | string;
  advancePaid?: number | string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
  createdAt?: any;
}

export interface FeedbackReview {
  id: string;
  name: string;
  location: string;
  rating: number;
  comment: string;
  tour: string;
  avatar?: string;
  createdAt?: any;
}

export interface GalleryItem {
  id: string;
  title: string;
  location: string;
  category: string;
  image: string;
  featured?: boolean;
}
