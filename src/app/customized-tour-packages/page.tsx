import type { Metadata } from "next";
import SeoLandingPage, { SeoGuideSection, SeoFaq } from "@/components/SeoLandingPage";
import { INITIAL_PACKAGES } from "@/lib/data";

export const metadata: Metadata = {
  title: "Customized Tour Packages in South India | SKY QUEST HOLIDAYS",
  description:
    "Design your dream holiday with 100% customized tour packages from SKY QUEST HOLIDAYS. Flexible dates, private vehicles, handpicked resorts, and tailored itineraries across Kerala, Tamil Nadu, and Karnataka.",
  alternates: {
    canonical: "https://sky-quest-holidays.web.app/customized-tour-packages",
  },
  openGraph: {
    title: "Customized Tour Packages in South India | SKY QUEST HOLIDAYS",
    description:
      "Bespoke holiday packages tailored to your schedule, budget, and travel preferences. Private AC vehicles and verified resort stays.",
    url: "https://sky-quest-holidays.web.app/customized-tour-packages",
    siteName: "SKY QUEST HOLIDAYS",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Customized Tour Packages in South India | SKY QUEST HOLIDAYS",
    description:
      "Tailor-made holiday packages with private cabs, handpicked resorts, and flexible itineraries across South India.",
  },
};

export default function CustomizedTourPackagesPage() {
  const packages = INITIAL_PACKAGES.slice(0, 8);

  const guideSections: SeoGuideSection[] = [
    {
      title: "100% Customized Tour Packages Tailored to Your Lifestyle",
      subtitle: "Your Dates, Your Pace, Your Preferred Resorts, and Private Vehicles",
      content:
        "No two travelers are identical. Rigid, pre-packaged group itineraries often rush you through viewpoints you don't care about and leave out the experiences you truly desire.\n\nAt SKY QUEST HOLIDAYS, customization is at the core of what we do. When you request a customized tour package, our travel designers build your itinerary from a blank canvas. You decide the departure date, the duration, the travel pace, the vehicle class (private sedan, Innova Crysta, Tempo Traveller, or luxury coach), and the accommodation style — from cozy tea plantation cottages in Munnar to private pool villas in Wayanad or budget-friendly student dormitories.",
      bullets: [
        "Completely flexible itineraries adapted to family, student, or corporate preferences",
        "Freedom to choose hotel tiers: Budget, Deluxe 3-Star, or Premium 4/5-Star Resorts",
        "Dedicated private AC vehicle with commercial driver — zero sharing with other travelers",
        "Personalized meal plans ranging from breakfast-only to full gourmet buffet packages",
      ],
    },
    {
      title: "How to Build Your Custom Tour Itinerary",
      subtitle: "Three Simple Steps to Your Tailored Holiday",
      content:
        "1. Tell Us Your Dream: Share your travel dates, passenger count, preferred destinations, and any specific wishes (e.g. treehouse stays, campfire DJ nights, Ayurvedic massages, or adventure treks).\n2. Review Itemized Options: Within hours, we present 2 to 3 tailored itinerary drafts with clear price options for different hotel categories.\n3. Fine-Tune and Finalize: Adjust timing, add extra sightseeing spots, or swap activities until the itinerary matches your vision perfectly.",
    },
    {
      title: "Popular Custom Travel Combinations",
      subtitle: "Bespoke Circuits Curated Frequently by Our Planners",
      content:
        "• Munnar & Alleppey Luxury Escape: 2 nights in misty tea hill resorts followed by 1 night aboard a private AC houseboat in the backwaters.\n• Ooty & Wayanad Nature Retreat: Mountain train rides, botanical gardens, wildlife safaris, and bamboo rafting in natural reserves.\n• Vagamon & Varkala Cliff Discovery: Offroad jeep safaris across pine valleys paired with sunset walks on the famous Varkala cliff beaches.\n• Coorg & Mysore Royal Tour: Palaces and heritage walks combined with serene coffee plantation estate stays.",
    },
  ];

  const faqs: SeoFaq[] = [
    {
      q: "Can we change sightseeing spots during the tour?",
      a: "Yes. Because your vehicle is 100% private and dedicated to your party, you have the flexibility to spend more time at spots you love or adjust daily start times in consultation with your driver.",
    },
    {
      q: "How does pricing work for customized tour packages?",
      a: "We provide itemized, transparent pricing based on the vehicle type, number of hotel rooms, hotel category, and meal plan. There are zero hidden costs.",
    },
    {
      q: "Can we include specialized activities like jeep safaris or campfires?",
      a: "Yes. We arrange offroad jeep safaris, campfire evenings, DJ sound setups, spice plantation guided walks, and boat cruises as part of your custom itinerary.",
    },
    {
      q: "How do we get started with a customized tour plan?",
      a: "Call or WhatsApp our travel design desk at +91 73387 10611 or email skyquestholidays@gmail.com with your travel ideas for a personalized proposal.",
    },
  ];

  const relatedLinks = [
    { title: "Group Tour Packages", href: "/group-tour-packages" },
    { title: "Tour Operators in Tamil Nadu", href: "/tour-operators-tamil-nadu" },
    { title: "College Tour Packages", href: "/college-tour-packages" },
    { title: "Family Tour Packages", href: "/family-tour-packages" },
    { title: "Kerala Tour Packages", href: "/kerala-tour-packages" },
    { title: "Munnar Tour Packages", href: "/munnar-tour-packages" },
    { title: "All Tour Packages", href: "/tour-packages" },
  ];

  return (
    <SeoLandingPage
      slug="customized-tour-packages"
      pageTitle="Customized Tour Packages in South India | SKY QUEST HOLIDAYS"
      pageDescription="Design your dream holiday with 100% customized tour packages from SKY QUEST HOLIDAYS. Flexible dates, private vehicles, handpicked resorts across South India."
      h1="Customized Tour Packages Tailored to Your Schedule & Budget"
      badgeText="100% Bespoke Travel Planning"
      heroSubtitle="Tailor-made itineraries with private AC vehicles, handpicked resorts, flexible sightseeing pace, and transparent pricing across Kerala, Tamil Nadu & Karnataka."
      packages={packages}
      guideSections={guideSections}
      faqs={faqs}
      relatedLinks={relatedLinks}
      searchIntent="Commercial"
      serviceType="Customized Tour Planning"
    />
  );
}
