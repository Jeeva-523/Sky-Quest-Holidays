import type { Metadata } from "next";
import SeoLandingPage, { SeoGuideSection, SeoFaq } from "@/components/SeoLandingPage";
import { INITIAL_PACKAGES } from "@/lib/data";

export const metadata: Metadata = {
  title: "Kerala Tour Packages from Namakkal & Tamil Nadu | SKY QUEST HOLIDAYS",
  description:
    "Book the best Kerala tour packages from Namakkal and Tamil Nadu with SKY QUEST HOLIDAYS. Customized trips to Munnar, Alleppey houseboats, Vagamon, Wayanad & Thekkady with private AC cabs.",
  alternates: {
    canonical: "https://sky-quest-holidays.web.app/kerala-tour-packages",
  },
  openGraph: {
    title: "Kerala Tour Packages from Namakkal | SKY QUEST HOLIDAYS",
    description:
      "Experience God's Own Country with custom Kerala holiday packages starting directly from Namakkal and Tamil Nadu. Private cabs and verified resorts.",
    url: "https://sky-quest-holidays.web.app/kerala-tour-packages",
    siteName: "SKY QUEST HOLIDAYS",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kerala Tour Packages from Namakkal | SKY QUEST HOLIDAYS",
    description:
      "Customized Kerala tour packages from Namakkal. Visit Munnar, Alleppey, Vagamon, and Wayanad with private AC cabs.",
  },
};

export default function KeralaTourPackagesPage() {
  // Filter Kerala packages
  const packages = INITIAL_PACKAGES.filter(
    (p) => p.category === "kerala" || p.state?.toLowerCase().includes("kerala")
  );

  const guideSections: SeoGuideSection[] = [
    {
      title: "Discover God's Own Country with SKY QUEST HOLIDAYS",
      subtitle: "Doorstep Cab Pickup from Namakkal, Salem, Erode & Across Tamil Nadu",
      content:
        "Kerala is renowned worldwide for its emerald tea plantations, serene backwater canals, misty hill ranges, and vibrant wildlife sanctuaries. SKY QUEST HOLIDAYS brings you custom-tailored Kerala tour packages starting directly with private AC cab pickup from your home in Namakkal, Salem, Erode, Trichy, Coimbatore, or Chennai.\n\nWhether you desire a romantic honeymoon in the cool hills of Munnar, a tranquil family getaway in an Alleppey luxury houseboat, or an adventurous trek through Vagamon's pine forests, our experienced local drivers and tour planners guarantee a smooth, safe, and memorable holiday.",
      bullets: [
        "Private AC vehicle (Sedan, Ertiga, Innova Crysta, Tempo Traveller) for complete tour",
        "Handpicked 3-Star, 4-Star & luxury plantation resorts with daily breakfast",
        "Direct doorstep pickup from Namakkal or Tamil Nadu drop off at Cochin airport/railway",
        "Complete transparency: all fuel, driver allowances, toll gates, and parking included",
      ],
    },
    {
      title: "Must-Visit Destinations in Our Kerala Packages",
      subtitle: "Top Highlights Included in Our Curated Itineraries",
      content:
        "Our Kerala tour packages combine the finest experiences God's Own Country has to offer:\n\n1. Munnar: The crown jewel of South India's hill stations. Marvel at the sprawling tea gardens, Eravikulam National Park (home of the Nilgiri Tahr), Mattupetty Dam, Echo Point, and Top Station.\n2. Alleppey (Alappuzha): Cruise the world-famous backwaters aboard a traditional deluxe or luxury private houseboat with authentic Kerala meals prepared by an onboard chef.\n3. Vagamon: A tranquil offbeat paradise featuring mist-laden pine forests, rolling green meadows, Kurisumala ashram, and paragliding points.\n4. Thekkady (Periyar): Wildlife boat safari on Periyar Lake, spice plantation tours, elephant junctions, and traditional Kathakali and Kalaripayattu martial arts shows.\n5. Wayanad: Pristine waterfalls (Meenmutty, Soochipara), Edakkal Caves, Banasura Sagar Dam, and wildlife safaris.",
      bullets: [
        "Munnar: Tea Museum, Eravikulam National Park, Kundala Lake",
        "Alleppey: Backwater Houseboat Cruise, Vembanad Lake, Marari Beach",
        "Thekkady: Periyar Tiger Reserve Boat Safari, Spice Plantations",
        "Vagamon: Pine Valley, Vagamon Meadows, Suicide Point, Glass Bridge",
      ],
    },
    {
      title: "Best Time to Visit Kerala from Tamil Nadu",
      subtitle: "Season Guide for Families, Couples & Group Tours",
      content:
        "Kerala is a year-round destination, but different seasons offer unique charms:\n\n• September to March (Peak Season): Pleasant weather with cool temperatures in Munnar and Vagamon (15°C - 22°C), ideal for sightseeing, houseboats, and family holidays.\n• June to August (Monsoon Season): Lush greenery, scenic gushing waterfalls, and the best time for traditional Ayurvedic rejuvenation treatments.\n• April to May (Summer Escapes): Perfect time to escape the Tamil Nadu plains into the chilled mountain heights of Munnar, Vagamon, and Wayanad.",
    },
  ];

  const faqs: SeoFaq[] = [
    {
      q: "Does SKY QUEST HOLIDAYS arrange Kerala tours from Namakkal?",
      a: "Yes! SKY QUEST HOLIDAYS offers direct Kerala tour packages from Namakkal, Salem, Erode, Trichy, and all parts of Tamil Nadu. We provide doorstep private cab pickup and customized itineraries to Munnar, Alleppey, Vagamon, Wayanad, and Thekkady.",
    },
    {
      q: "How many days are recommended for a Kerala tour from Tamil Nadu?",
      a: "A 3-day/2-night package (Cochin – Munnar – Alleppey) or a 4-day/3-night package (Munnar – Thekkady – Alleppey) is ideal for a fulfilling holiday. We also organize customized 2-day quick weekend getaways to Munnar or Vagamon.",
    },
    {
      q: "Are Alleppey houseboat meals included in the package?",
      a: "Yes, when booking an overnight Alleppey houseboat package, all meals (traditional Kerala lunch, evening tea with snacks, dinner, and breakfast) prepared fresh on board by a dedicated chef are included.",
    },
    {
      q: "What types of vehicles are provided for Kerala tours?",
      a: "We offer sanitized private AC vehicles: Swift Dzire / Etios for couples (up to 3 people), Ertiga / Innova Crysta for families (4 to 7 people), and Tempo Travellers / Luxury Buses for large college or corporate groups.",
    },
    {
      q: "How do I book a Kerala tour package from Namakkal?",
      a: "Simply call or WhatsApp our Namakkal travel desk at +91 73387 10611. Let us know your preferred dates, family or group size, and we will send you a tailored itinerary with an official PDF quote.",
    },
  ];

  const relatedLinks = [
    { title: "Best Travel Agency in Namakkal", href: "/namakkal-travel-agency" },
    { title: "Munnar Tour Packages", href: "/munnar-tour-packages" },
    { title: "Vagamon Tour Packages", href: "/vagamon-tour-packages" },
    { title: "College Tour Packages", href: "/college-tour-packages" },
    { title: "Family Tour Packages", href: "/family-tour-packages" },
    { title: "Ooty Tour Packages", href: "/ooty-tour-packages" },
    { title: "All Tour Packages", href: "/tour-packages" },
  ];

  return (
    <SeoLandingPage
      slug="kerala-tour-packages"
      pageTitle="Kerala Tour Packages from Namakkal & Tamil Nadu | SKY QUEST HOLIDAYS"
      pageDescription="Book the best Kerala tour packages from Namakkal and Tamil Nadu with SKY QUEST HOLIDAYS. Customized trips to Munnar, Alleppey houseboats, Vagamon, Wayanad & Thekkady."
      h1="Kerala Tour Packages from Namakkal & Tamil Nadu"
      badgeText="Most Popular Holiday Destination"
      heroSubtitle="Experience the magic of God's Own Country with doorstep private AC cab pickup from Namakkal. Sprawling tea hills, backwater houseboats, and misty mountain retreats."
      packages={packages}
      guideSections={guideSections}
      faqs={faqs}
      relatedLinks={relatedLinks}
      searchIntent="Commercial"
    />
  );
}
