import type { Metadata } from "next";
import SeoLandingPage, { SeoGuideSection, SeoFaq } from "@/components/SeoLandingPage";
import { INITIAL_PACKAGES } from "@/lib/data";

export const metadata: Metadata = {
  title: "Group Tour Packages in Tamil Nadu & South India | SKY QUEST HOLIDAYS",
  description:
    "Book customized group tour packages for families, colleges, and corporate teams with SKY QUEST HOLIDAYS. Private luxury buses, bulk discounts, verified resorts, and 24/7 tour managers.",
  alternates: {
    canonical: "https://sky-quest-holidays.web.app/group-tour-packages",
  },
  openGraph: {
    title: "Group Tour Packages in Tamil Nadu & South India | SKY QUEST HOLIDAYS",
    description:
      "All-inclusive group tour packages with private luxury transport, family & corporate discounts, verified resorts, and full-time tour coordination.",
    url: "https://sky-quest-holidays.web.app/group-tour-packages",
    siteName: "SKY QUEST HOLIDAYS",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Group Tour Packages in Tamil Nadu | SKY QUEST HOLIDAYS",
    description:
      "Hassle-free group tour packages for families, colleges, and corporate retreats across South India.",
  },
};

export default function GroupTourPackagesPage() {
  const packages = INITIAL_PACKAGES.filter(
    (p) =>
      p.category === "college" ||
      p.category === "kerala" ||
      p.id.includes("munnar") ||
      p.id.includes("ooty")
  ).slice(0, 8);

  const guideSections: SeoGuideSection[] = [
    {
      title: "Seamless Group Tour Packages across South India",
      subtitle: "Tailor-Made for Large Families, Colleges, Associations & Corporate Teams",
      content:
        "Traveling in a group of 15, 30, or 60+ people can be either an overwhelming logistical headache or an effortless, joyful celebration. The difference lies in having a professional tour operator managing every touchpoint.\n\nSKY QUEST HOLIDAYS specializes in full-scale group travel logistics. We provide exclusive, dedicated vehicle allocations (Tempo Travellers, mini-buses, or 50-seater pushback air-suspension coaches), block-booking at pre-screened resorts that accommodate entire groups under one roof, customized buffet menus accommodating regional tastes, and full-time on-tour managers to coordinate schedules, tolls, and entry queues.",
      bullets: [
        "Exclusive vehicle allocation with zero sharing with strangers or third parties",
        "Substantial group discounts on luxury transport and multi-room hotel bookings",
        "Customized buffet menus (South Indian, North Indian, Jain, and special dietary requests)",
        "Experienced group tour manager dedicated exclusively to your party throughout the trip",
      ],
    },
    {
      title: "Group Profiles We Cater To",
      subtitle: "Customized Experiences for Different Group Dynamics",
      content:
        "• Extended Families & Reunions: Multi-generational holidays with comfortable pacing, child-friendly resorts, and accessible sightseeing for elders in Munnar, Ooty, and Kodaikanal.\n• College Batches & Student Alumni: Action-packed circuits to Vagamon, Goa, and Dandeli with DJ nights, campfires, and adventure sports.\n• Corporate Teams & Companies: Annual offsite meets, team-building retreats, and executive reward trips with banquet facilities.\n• Community & Pilgrimage Groups: Temple and spiritual circuits across Rameswaram, Madurai, Kanyakumari, and Tirupati with hygienic vegetarian catering.",
    },
    {
      title: "Transparent Group Costing & Doorstep Pickup",
      subtitle: "Clear Line-Item Proposals with Zero Surcharges",
      content:
        "Every group quote from SKY QUEST HOLIDAYS is 100% itemized. We clearly detail the vehicle hire (including diesel, state permits, toll, and driver bata), hotel room allocations based on double or triple occupancy, meal plans, and activity fees. Doorstep pickup is available directly from your office, campus, or residential landmark across Tamil Nadu.",
    },
  ];

  const faqs: SeoFaq[] = [
    {
      q: "What is the minimum group size for a group tour package?",
      a: "Our dedicated group packages start from 12 passengers (Tempo Traveller) and scale up to 150+ passengers across multiple luxury 50-seater pushback coaches.",
    },
    {
      q: "Do you offer group discounts?",
      a: "Yes. Group bookings benefit from substantial volume discounts on both transport and resort accommodations compared to individual retail bookings.",
    },
    {
      q: "Can meal menus be customized for our group?",
      a: "Yes. You can specify breakfast, lunch, and dinner preferences (pure vegetarian, South Indian traditional meals, or non-veg buffet spreads).",
    },
    {
      q: "How can we request a group tour quotation?",
      a: "Call or WhatsApp our group travel coordinator at +91 73387 10611 or email skyquestholidays@gmail.com with your passenger count, dates, and destination for a detailed proposal.",
    },
  ];

  const relatedLinks = [
    { title: "Customized Tour Packages", href: "/customized-tour-packages" },
    { title: "Tour Operators in Tamil Nadu", href: "/tour-operators-tamil-nadu" },
    { title: "College Tour Packages", href: "/college-tour-packages" },
    { title: "Educational Tours", href: "/educational-tours" },
    { title: "Family Tour Packages", href: "/family-tour-packages" },
    { title: "Industrial Visit Packages", href: "/industrial-visit-packages" },
    { title: "All Tour Packages", href: "/tour-packages" },
  ];

  return (
    <SeoLandingPage
      slug="group-tour-packages"
      pageTitle="Group Tour Packages in Tamil Nadu & South India | SKY QUEST HOLIDAYS"
      pageDescription="Customized group tour packages for families, colleges, and corporate teams. Private luxury buses, bulk discounts, verified resorts, and 24/7 tour managers."
      h1="Group Tour Packages for Families, Colleges & Corporate Teams"
      badgeText="Turnkey Group Travel Specialist"
      heroSubtitle="Private luxury coaches, bulk resort discounts, customized buffet catering, and 24/7 on-tour management for groups of 15 to 150+ across South India."
      packages={packages}
      guideSections={guideSections}
      faqs={faqs}
      relatedLinks={relatedLinks}
      searchIntent="Commercial"
      serviceType="Group Tour Packages"
    />
  );
}
