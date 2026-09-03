import { TourPackage, FeedbackReview, GalleryItem } from './types';

export const COMPANY_INFO = {
  name: "Sky Quest Holidays",
  tagline: "Explore Beyond Horizons",
  phone: "+91 73387 10611",
  whatsapp: "917338710611",
  email: "skyquestholidays@gmail.com",
  address: "Namakkal, Tamil Nadu - 627015",
  rating: 4.9,
  reviewsCount: "500+",
  yearsOfExperience: 6,
  govtRegNumber: "TN/NKL/TOUR/2020/4891"
};

export const CATEGORIES = [
  { id: "all", name: "All Packages", icon: "🌍" },
  { id: "tamilnadu", name: "Tamil Nadu", icon: "🏛️" },
  { id: "kerala", name: "Kerala", icon: "🌴" },
  { id: "karnataka", name: "Karnataka", icon: "⛰️" },
  { id: "honeymoon", name: "Honeymoon Specials", icon: "❤️" },
  { id: "family", name: "Family Vacations", icon: "👨‍👩‍👧‍👦" },
  { id: "college", name: "College IV & Groups", icon: "🎓" },
  { id: "international", name: "International Tours", icon: "✈️" }
];

export const INITIAL_PACKAGES: TourPackage[] = [
  // --- Kerala ---
  {
    id: "cochin-munnar",
    name: "Cochin – Munnar",
    title: "Cochin – Munnar Tea Hills Retreat",
    state: "Kerala",
    badge: "Popular",
    price: "₹4,999",
    originalPrice: "₹6,999",
    duration: "2D | 1N",
    image: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=800&q=80",
    desc: "Breathtaking tea gardens, misty hilltops, waterfalls, and tea factory tour.",
    location: "Munnar, Kerala",
    placesToVisit: ["Eravikulam National Park", "Mattupetty Dam", "Echo Point", "Top Station", "Tea Museum"],
    inclusions: ["3-Star Resort Stay", "Daily Breakfast", "Sightseeing Private Cab"],
    exclusions: ["Entry Tickets to Parks"],
    category: "kerala",
    featured: true
  },
  {
    id: "cochin-vagamon",
    name: "Cochin – Vagamon",
    title: "Cochin – Vagamon Pine Hills Tour",
    state: "Kerala",
    badge: "Scenic",
    price: "₹5,499",
    originalPrice: "₹7,500",
    duration: "2D | 1N",
    image: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=800&q=80",
    desc: "Explore pine forests, green meadows, and misty hills of Vagamon.",
    location: "Vagamon, Kerala",
    placesToVisit: ["Vagamon Pine Forest", "Vagamon Meadows", "Kurisumala", "Vagamon Lake"],
    inclusions: ["Deluxe Hotel Stay", "Daily Breakfast", "Private AC Cab for Sightseeing"],
    exclusions: ["Personal Expenses"],
    category: "kerala"
  },
  {
    id: "cochin-alappuzha",
    name: "Cochin – Alappuzha",
    title: "Cochin – Alappuzha Houseboat Cruise",
    state: "Kerala",
    badge: "Backwaters",
    price: "₹6,999",
    originalPrice: "₹9,500",
    duration: "2D | 1N",
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80",
    desc: "Luxury houseboat stay with delicious Kerala traditional meals.",
    location: "Alappuzha, Kerala",
    placesToVisit: ["Alleppey Backwaters", "Vembanad Lake", "Alappuzha Beach", "Lighthouse"],
    inclusions: ["Private Houseboat Cruise", "All Meals (Lunch, Dinner, Breakfast)", "Welcome Drink"],
    exclusions: ["Canoeing rides"],
    category: "kerala",
    featured: true
  },
  {
    id: "wayanad-adventure",
    name: "Wayanad Nature & Wildlife",
    title: "Wayanad Wilderness & Waterfalls Escape",
    state: "Kerala",
    badge: "Nature",
    price: "₹5,999",
    originalPrice: "₹8,200",
    duration: "3D | 2N",
    image: "https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&w=800&q=80",
    desc: "Explore lush green caves, bamboo rafting, dams and cascading waterfalls.",
    location: "Wayanad, Kerala",
    placesToVisit: ["Edakkal Caves", "Banasura Sagar Dam", "Soochipara Falls", "Chembra Peak"],
    inclusions: ["Valley View Resort", "Breakfast & Dinner", "Sightseeing Cab"],
    exclusions: ["Forest trek fee"],
    category: "kerala"
  },

  // --- Tamil Nadu ---
  {
    id: "ooty-queen-hills",
    name: "Ooty & Coonoor Queen of Hills",
    title: "Ooty – Coonoor Nilgiri Mountain Magic",
    state: "Tamil Nadu",
    badge: "Bestseller",
    price: "₹4,499",
    originalPrice: "₹6,500",
    duration: "2D | 1N",
    image: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80",
    desc: "Toy train journey, botanical gardens, lake boating and tea estates.",
    location: "Ooty, Tamil Nadu",
    placesToVisit: ["Ooty Lake & Boathouse", "Botanical Garden", "Doddabetta Peak", "Sim's Park", "Dolphin's Nose"],
    inclusions: ["Cozy Resort Stay", "Complimentary Breakfast", "Private AC/Non-AC Vehicle"],
    exclusions: ["Toy train tickets (subject to availability)"],
    category: "tamilnadu",
    featured: true
  },
  {
    id: "kodaikanal-misty",
    name: "Kodaikanal Princess of Hill Stations",
    title: "Kodaikanal Lake & Pillar Rocks Gateway",
    state: "Tamil Nadu",
    badge: "Romantic",
    price: "₹4,999",
    originalPrice: "₹6,999",
    duration: "2D | 1N",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    desc: "Star-shaped lake, pine forests, Bryant Park, and misty viewpoints.",
    location: "Kodaikanal, Tamil Nadu",
    placesToVisit: ["Kodai Lake", "Pillar Rocks", "Coaker's Walk", "Pine Forest", "Bryant Park"],
    inclusions: ["Hilltop View Hotel", "Daily Breakfast", "Sightseeing Cab"],
    exclusions: ["Boating fees"],
    category: "tamilnadu"
  },
  {
    id: "rameshwaram-kanyakumari",
    name: "Rameshwaram & Kanyakumari",
    title: "Holy Land & Sunrise Coastal Circuit",
    state: "Tamil Nadu",
    badge: "Spiritual",
    price: "₹6,499",
    originalPrice: "₹8,999",
    duration: "3D | 2N",
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80",
    desc: "Pamban Bridge, Dhanushkodi ghost town, Ramanathaswamy Temple, and Vivekananda Rock.",
    location: "Rameshwaram & Kanyakumari, Tamil Nadu",
    placesToVisit: ["Pamban Bridge", "Dhanushkodi Point", "Vivekananda Rock Memorial", "Thiruvalluvar Statue", "Sunset View Point"],
    inclusions: ["3-Star Hotels", "Daily Breakfast", "Private Cab for full tour"],
    exclusions: ["Ferry tickets"],
    category: "tamilnadu"
  },

  // --- Karnataka ---
  {
    id: "coorg-coffee-hills",
    name: "Coorg Coffee Paradise",
    title: "Coorg Scotland of India Experience",
    state: "Karnataka",
    badge: "Trending",
    price: "₹5,499",
    originalPrice: "₹7,800",
    duration: "2D | 1N",
    image: "https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?auto=format&fit=crop&w=800&q=80",
    desc: "Aroma of coffee plantations, Abbey Falls, Raja's Seat, and Golden Temple.",
    location: "Madikeri, Coorg, Karnataka",
    placesToVisit: ["Abbey Falls", "Raja's Seat", "Dubare Elephant Camp", "Namdroling Golden Temple", "Talacauvery"],
    inclusions: ["Plantation Resort", "Buffet Breakfast", "Private Sightseeing Car"],
    exclusions: ["Elephant activity charges"],
    category: "karnataka"
  },
  {
    id: "mysore-heritage",
    name: "Mysore & Chikmagalur",
    title: "Royal Heritage & Peak Trekking",
    state: "Karnataka",
    badge: "Heritage",
    price: "₹6,999",
    originalPrice: "₹9,200",
    duration: "3D | 2N",
    image: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=800&q=80",
    desc: "Mysore Palace illumination, Chamundi Hill, Mullayanagiri peak, and coffee estates.",
    location: "Mysore & Chikmagalur, Karnataka",
    placesToVisit: ["Mysuru Palace", "Brindavan Gardens", "Mullayanagiri Peak", "Baba Budangiri", "Hebbe Falls"],
    inclusions: ["3-Star Hotel Stay", "Daily Breakfast", "Sightseeing Cab"],
    exclusions: ["Palace entry passes"],
    category: "karnataka"
  },

  // --- Honeymoon ---
  {
    id: "honeymoon-munnar-alappuzha",
    name: "Munnar & Alleppey Luxury Honeymoon",
    title: "Romantic Mist & Backwater Romance 4D/3N",
    state: "Kerala",
    badge: "Honeymoon Special",
    price: "₹18,999",
    originalPrice: "₹24,999",
    duration: "4D | 3N",
    image: "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=800&q=80",
    desc: "Flower bed decoration, candle light dinner, private luxury houseboat cruise and hill station stay.",
    location: "Munnar & Alleppey, Kerala",
    placesToVisit: ["Munnar Tea Hills", "Mattupetty Lake", "Alleppey Backwaters", "Marari Beach"],
    inclusions: ["Candle Light Dinner", "Honeymoon Cake & Flower Bed", "1 Night Luxury Houseboat", "2 Nights 4-Star Resort", "Private AC Sedan"],
    exclusions: ["Personal shopping"],
    category: "honeymoon",
    featured: true
  },

  // --- Family ---
  {
    id: "family-kerala-delight",
    name: "Complete Kerala Family Delight",
    title: "Cochin – Munnar – Thekkady – Alleppey",
    state: "Kerala",
    badge: "Family Favorite",
    price: "₹12,499",
    originalPrice: "₹16,500",
    duration: "5D | 4N",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    desc: "Complete family vacation with tea hills, elephant safari, spice plantation and backwaters.",
    location: "Kerala All Circuit",
    placesToVisit: ["Munnar Tea Gardens", "Periyar Wildlife Sanctuary", "Spice Plantation Thekkady", "Alleppey Houseboat"],
    inclusions: ["Deluxe Family Rooms", "Daily Breakfast & Dinner", "All Transfers & Sightseeing in AC Innova"],
    exclusions: ["Safari tickets"],
    category: "family",
    featured: true
  },

  // --- College / Group ---
  {
    id: "goa-college-group",
    name: "Goa Beach & Party Express",
    title: "Goa Vibes, Water Sports & Cruise Party",
    state: "Goa",
    badge: "College IV",
    price: "₹4,999",
    originalPrice: "₹7,200",
    duration: "4D | 3N",
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80",
    desc: "North & South Goa beaches, water sports combo, DJ cruise night, and Portuguese forts.",
    location: "Goa",
    placesToVisit: ["Baga Beach", "Calangute Beach", "Aguada Fort", "Mandovi River Cruise", "Dudhsagar Falls"],
    inclusions: ["Resort with Swimming Pool", "Daily Breakfast", "Group Coach Transfers", "DJ Night Party"],
    exclusions: ["Water sports add-ons"],
    category: "college"
  },

  // --- International ---
  {
    id: "thailand-express",
    name: "Thailand Bangkok & Pattaya",
    title: "Pattaya Coral Island & Bangkok City Tour",
    state: "Thailand",
    badge: "International",
    price: "₹18,999",
    originalPrice: "₹26,000",
    duration: "5D | 4N",
    image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=800&q=80",
    desc: "Speedboat ride to Coral Island, Alcazar Show, Temple tour, and Chao Phraya Cruise.",
    location: "Bangkok & Pattaya, Thailand",
    placesToVisit: ["Coral Island with Indian Lunch", "Alcazar Cabaret Show", "Wat Traimit & Wat Pho", "Chao Phraya Dinner Cruise"],
    inclusions: ["4-Star Hotel Stay", "Daily Breakfast", "Speedboat to Coral Island", "Airport Transfers"],
    exclusions: ["Air tickets & Visa fees"],
    category: "international",
    featured: true
  },
  {
    id: "malaysia-singapore",
    name: "Malaysia & Singapore Combo",
    title: "Kuala Lumpur, Genting Highlands & Singapore Universal",
    state: "International",
    badge: "Mega Tour",
    price: "₹34,999",
    originalPrice: "₹45,000",
    duration: "6D | 5N",
    image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=800&q=80",
    desc: "Petronas Twin Towers, Batu Caves, Genting Cable Car, Marina Bay Sands, and Sentosa Island.",
    location: "Kuala Lumpur & Singapore",
    placesToVisit: ["Petronas Towers", "Batu Caves", "Genting Cable Car", "Gardens by the Bay", "Sentosa Island", "Universal Studios"],
    inclusions: ["City Center Hotels", "Daily Breakfast", "Universal Studio Pass", "Luxury Coach Transfers"],
    exclusions: ["Flights"],
    category: "international"
  }
];

export const INITIAL_FEEDBACK: FeedbackReview[] = [
  {
    id: "rev-1",
    name: "Karthik R.",
    location: "Chennai",
    rating: 5,
    comment: "Our Munnar family trip arranged by Sky Quest was unbelievable! The driver was very polite, hotel had misty mountain views, and the pricing was super genuine. Highly recommended!",
    tour: "Cochin – Munnar 3D/2N"
  },
  {
    id: "rev-2",
    name: "Priya & Vignesh",
    location: "Coimbatore",
    rating: 5,
    comment: "Booked our honeymoon to Alleppey houseboat and Munnar. The candle light dinner and flower decoration were magical. 10/10 service by Jeeva and team!",
    tour: "Munnar & Alleppey Honeymoon"
  },
  {
    id: "rev-3",
    name: "Suresh Kumar",
    location: "Salem",
    rating: 5,
    comment: "Organized our college IV to Goa (45 students). Everything from luxury bus, beach resort, buffet food, and party cruise was perfectly handled without a single glitch.",
    tour: "Goa College IV Tour"
  }
];

export const INITIAL_GALLERY: GalleryItem[] = [
  {
    id: "gal-1",
    title: "Tea Plantations Munnar",
    location: "Munnar, Kerala",
    category: "Kerala",
    image: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=800&q=80",
    featured: true
  },
  {
    id: "gal-2",
    title: "Alleppey Backwaters Houseboat",
    location: "Alappuzha, Kerala",
    category: "Kerala",
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80",
    featured: true
  },
  {
    id: "gal-3",
    title: "Ooty Botanical Garden",
    location: "Ooty, Tamil Nadu",
    category: "Tamil Nadu",
    image: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "gal-4",
    title: "Kodaikanal Lake Mist",
    location: "Kodaikanal, Tamil Nadu",
    category: "Tamil Nadu",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "gal-5",
    title: "Goa Sunset Beach",
    location: "Goa",
    category: "Goa",
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "gal-6",
    title: "Coral Island Pattaya",
    location: "Pattaya, Thailand",
    category: "International",
    image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=800&q=80"
  }
];
