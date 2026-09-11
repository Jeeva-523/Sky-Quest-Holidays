import type { Metadata } from "next";
import SeoLandingPage, { SeoGuideSection, SeoFaq } from "@/components/SeoLandingPage";
import { INITIAL_PACKAGES } from "@/lib/data";

export const metadata: Metadata = {
  title: "Ooty Tour Package from Namakkal & Tamil Nadu | SKY QUEST HOLIDAYS",
  description:
    "Plan the perfect Ooty tour package from Namakkal and Tamil Nadu with SKY QUEST HOLIDAYS. Includes private AC cab, Nilgiri mountain toy train, botanical gardens, and scenic resort stays.",
  alternates: {
    canonical: "https://sky-quest-holidays.web.app/ooty-tour-packages",
  },
  openGraph: {
    title: "Ooty Tour Package from Namakkal | SKY QUEST HOLIDAYS",
    description:
      "Explore the Queen of Hill Stations. Custom Ooty holiday packages from Namakkal with private cab, botanical gardens, and tea factory visits.",
    url: "https://sky-quest-holidays.web.app/ooty-tour-packages",
    siteName: "SKY QUEST HOLIDAYS",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ooty Tour Package from Namakkal | SKY QUEST HOLIDAYS",
    description:
      "Ooty holiday packages from Namakkal. Mountain toy train, botanical gardens, and private cab services.",
  },
};

export default function OotyTourPackagesPage() {
  // Filter Ooty & Nilgiri packages
  const packages = INITIAL_PACKAGES.filter(
    (p) =>
      p.id.includes("ooty") ||
      p.name.toLowerCase().includes("ooty") ||
      p.desc.toLowerCase().includes("ooty") ||
      p.category === "tamilnadu"
  ).slice(0, 8);

  const guideSections: SeoGuideSection[] = [
    {
      title: "Ooty – The Queen of Hill Stations in Tamil Nadu",
      subtitle: "Comfortable Ghat Road Journey from Namakkal, Salem & Erode",
      content:
        "Nestled in the breathtaking Nilgiri Blue Mountains, Ooty (Udhagamandalam) remains South India's most beloved hill resort. From heritage British colonial bungalows and sprawling botanical gardens to scenic toy train journeys and tranquil lakes, Ooty offers an unforgettable experience for families, newlyweds, and student groups.\n\nTraveling to Ooty from Namakkal is exceptionally quick and scenic. At just around 180 km via Tirupur – Avinashi – Mettupalayam – Coonoor, you can reach the cool heights of Ooty in under 5 hours. SKY QUEST HOLIDAYS provides doorstep pickup from Namakkal in well-maintained private cabs driven by skilled hill-station drivers.",
      bullets: [
        "Direct doorstep pickup from Namakkal, Salem, Erode, Tirupur, or Coimbatore",
        "Assistance with UNESCO Nilgiri Mountain Railway (Toy Train) tickets",
        "Handpicked 3-Star, 4-Star hotels and heritage valley cottages",
        "Sightseeing covering Ooty, Coonoor, and Pykara lake waterfalls",
      ],
    },
    {
      title: "Must-Visit Places in Our Ooty Tour Packages",
      subtitle: "Complete Sightseeing Across Ooty and Coonoor",
      content:
        "Our Ooty packages are thoughtfully structured to cover the premier sights without feeling rushed:\n\n1. Government Botanical Gardens & Rose Garden: Home to thousands of exotic plant species, fossil tree trunks, and over 20,000 varieties of blooming roses.\n2. Ooty Lake & Boat House: Enjoy boating against the backdrop of towering eucalyptus trees, along with horse riding and cycle tracks.\n3. Doddabetta Peak: The highest mountain in the Nilgiris (2,637 m) offering telescope house views of the Coimbatore plains and Mysore plateau.\n4. Tea Factory & Chocolate Museum: Watch fresh Nilgiri orthodox tea being processed and sample homemade Ooty chocolates.\n5. Pykara Lake & Waterfalls: Serene boat ride on the pristine Pykara reservoir surrounded by shola forests and roaring twin waterfalls.\n6. Coonoor Sightseeing (Sim's Park, Dolphin's Nose & Lamb's Rock): A short drive to witness jaw-dropping cliff views and lush Catherine falls.",
      bullets: [
        "Government Botanical Garden & Rose Garden",
        "Ooty Lake Boating & Doddabetta Peak Viewpoint",
        "UNESCO Nilgiri Mountain Toy Train Experience",
        "Coonoor Sim's Park, Dolphin's Nose & Lamb's Rock",
      ],
    },
    {
      title: "Popular 2D/1N and 3D/2N Ooty Tour Itineraries",
      subtitle: "Tailored for Weekend Getaways and Family Vacations",
      content:
        "Option 1 (2 Days / 1 Night Quick Getaway):\nDay 1: Morning pickup from Namakkal. Arrive in Ooty via Coonoor. Visit Sim's Park, Tea Factory, and Botanical Garden. Evening at Ooty Lake. Overnight stay.\nDay 2: Morning visit to Doddabetta Peak and Rose Garden. Afternoon scenic drive to Pykara Lake and Shooting Point. Return journey with drop at Namakkal.\n\nOption 2 (3 Days / 2 Nights Extended Vacation):\nIncludes an additional leisure day to experience the UNESCO Toy train ride from Mettupalayam/Coonoor to Ooty, Mudumalai wildlife safari, and relaxed shopping for homemade chocolates and eucalyptus oils.",
    },
  ];

  const faqs: SeoFaq[] = [
    {
      q: "What is the driving distance from Namakkal to Ooty?",
      a: "The driving distance is approximately 180 km, taking about 4.5 to 5 hours via Karur – Kangeyam – Palladam – Coimbatore – Mettupalayam or via Erode – Avinashi – Mettupalayam. The road is well-paved and scenic.",
    },
    {
      q: "Does SKY QUEST HOLIDAYS arrange Ooty family tour packages?",
      a: "Yes! We arrange customized family packages with private vehicles (Innova, Ertiga, or Dzire), verified family-friendly hotel rooms, daily breakfast, and flexible sightseeing stops tailored for kids and seniors.",
    },
    {
      q: "Can we experience the Nilgiri Mountain Toy Train during the trip?",
      a: "Yes, we can adjust your itinerary to include the famous heritage toy train ride between Ooty and Coonoor, or Mettupalayam to Ooty.",
    },
    {
      q: "Are driver allowances, toll gates, and parking charges included?",
      a: "Yes! All quoted package costs from SKY QUEST HOLIDAYS include dedicated vehicle, fuel, driver allowances, toll gates, and parking fees with zero hidden charges.",
    },
    {
      q: "How can I book an Ooty tour package from Namakkal?",
      a: "Call or WhatsApp us at +91 73387 10611 with your preferred dates and group size to receive an instant, itemized PDF quote.",
    },
  ];

  const relatedLinks = [
    { title: "Best Travel Agency in Namakkal", href: "/namakkal-travel-agency" },
    { title: "Kerala Tour Packages", href: "/kerala-tour-packages" },
    { title: "Munnar Tour Packages", href: "/munnar-tour-packages" },
    { title: "College Tour Packages", href: "/college-tour-packages" },
    { title: "Family Tour Packages", href: "/family-tour-packages" },
    { title: "Vagamon Tour Packages", href: "/vagamon-tour-packages" },
    { title: "All Tour Packages", href: "/tour-packages" },
  ];

  return (
    <SeoLandingPage
      slug="ooty-tour-packages"
      pageTitle="Ooty Tour Package from Namakkal & Tamil Nadu | SKY QUEST HOLIDAYS"
      pageDescription="Plan the perfect Ooty tour package from Namakkal and Tamil Nadu with SKY QUEST HOLIDAYS. Private AC cab, Nilgiri mountain toy train, and scenic resort stays."
      h1="Ooty Tour Package from Namakkal & Tamil Nadu"
      badgeText="Queen of Hill Stations"
      heroSubtitle="Enjoy the cool Nilgiri breeze, aromatic tea estates, botanical gardens, and heritage toy train rides. Fast and comfortable private cab travel directly from Namakkal."
      packages={packages}
      guideSections={guideSections}
      faqs={faqs}
      relatedLinks={relatedLinks}
      searchIntent="Commercial"
    />
  );
}
