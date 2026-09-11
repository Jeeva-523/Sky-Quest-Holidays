import type { Metadata } from "next";
import SeoLandingPage, { SeoGuideSection, SeoFaq } from "@/components/SeoLandingPage";
import { INITIAL_PACKAGES } from "@/lib/data";

export const metadata: Metadata = {
  title: "Tour Operators for Educational, Group & Customized Tours | SKY QUEST HOLIDAYS",
  description:
    "Looking for trusted tour operators in South India? SKY QUEST HOLIDAYS organizes educational tours, industrial visit packages, college excursions, group travel, and custom holidays across Tamil Nadu, Kerala, Karnataka & Goa.",
  alternates: {
    canonical: "https://sky-quest-holidays.web.app/tour-operators",
  },
  openGraph: {
    title: "Tour Operators for Educational, Group & Customized Tours | SKY QUEST HOLIDAYS",
    description:
      "Government-registered tour operator offering turnkey holiday packages, student educational tours, and group travel with private luxury transport.",
    url: "https://sky-quest-holidays.web.app/tour-operators",
    siteName: "SKY QUEST HOLIDAYS",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tour Operators for Educational, Group & Customized Tours | SKY QUEST HOLIDAYS",
    description:
      "Professional tour operator in South India for customized holiday packages, college IV trips, and group travel.",
  },
};

export default function TourOperatorsPage() {
  // Diverse showcase of packages
  const packages = INITIAL_PACKAGES.slice(0, 8);

  const guideSections: SeoGuideSection[] = [
    {
      title: "Comprehensive Tour Operator Services across South India",
      subtitle: "Turnkey Travel Planning, Transportation, Verified Resorts & On-Trip Coordination",
      content:
        "SKY QUEST HOLIDAYS is a full-service, government-registered tour operator based in Tamil Nadu, serving travelers, institutions, and organizations across South India. We eliminate the stress of coordinating multiple vendors by managing all aspects of travel under one roof — from private luxury AC transportation and verified star-rated accommodations to customized daily itineraries, official entry permits, and dedicated on-tour managers.\n\nWhether you are planning an institutional educational tour for 100+ students, an industrial visit (IV) for engineering colleges, an extended family reunion to Munnar and Alleppey, or a corporate outbound retreat to Goa, our operations team ensures safety, punctuality, and transparent pricing with zero hidden surcharges.",
      bullets: [
        "Single-point coordination for transport, hotels, food, sightseeing passes, and guide support",
        "Dedicated fleet of 16-seater Tempo Travellers, 21-seater mini buses, and 40/50-seater luxury pushback coaches",
        "Direct tie-ups with verified family-friendly resorts, beachside hotels, and student campsites",
        "24/7 on-trip tour manager accompanying groups to manage check-ins, tickets, and safety",
      ],
    },
    {
      title: "Who Can Book with SKY QUEST HOLIDAYS?",
      subtitle: "Tailored Solutions for Every Travel Profile",
      content:
        "Our tour operations cater to four core travel segments:\n\n1. Colleges & Universities: Departmental Industrial Visits (IV), graduation batch trips, and inter-state technical study tours.\n2. Schools & Institutions: Safe, supervised educational field trips, science center visits, and botanical nature walks.\n3. Families & Couples: Customized private holidays to Kerala, Munnar, Vagamon, Ooty, Kodaikanal, and coastal Karnataka.\n4. Corporate & Community Groups: Annual team outings, team-building retreats in Dandeli/Goa, and pilgrimage group journeys.",
      bullets: [
        "Colleges & Universities (Technical IV, Excursions, Graduation Trips)",
        "Schools (Supervised Field Trips, Heritage & Nature Tours)",
        "Families & Honeymooners (Private Chauffeur, Premium Resorts)",
        "Corporate Teams (Team Building, Offsite Meets, Adventure Circuits)",
      ],
    },
    {
      title: "Service Coverage: Destinations We Operate",
      subtitle: "Deep Local Roots in Tamil Nadu, Kerala, Karnataka & Beyond",
      content:
        "Our logistics network operates seamlessly across South India's premier tourist and industrial corridors:\n\n• Tamil Nadu: Ooty, Kodaikanal, Yercaud, Rameswaram, Kanyakumari, Madurai, Chennai, Mahabalipuram.\n• Kerala: Munnar, Vagamon, Thekkady, Alleppey Houseboats, Kochi, Wayanad, Varkala, Kovalam.\n• Karnataka: Bangalore IT Corridor, Mysore Palaces, Coorg Coffee Plantations, Chikmagalur, Dandeli River Rafting.\n• Goa: North & South Goa beaches, water sports, river cruises, and heritage landmarks.",
    },
    {
      title: "How to Request a Custom Tour Quotation",
      subtitle: "Fast, Itemized Proposals with Transparent Pricing",
      content:
        "Getting an itemized tour quotation is simple and obligation-free. Contact our tour planning desk via phone or WhatsApp with your group size, travel dates, preferred destination, and pickup location. We provide clear, broken-down pricing covering vehicle hire, hotel options (standard, deluxe, or luxury), food plans, and toll/parking charges within minutes.",
    },
  ];

  const faqs: SeoFaq[] = [
    {
      q: "What services do tour operators like SKY QUEST HOLIDAYS provide?",
      a: "As a registered tour operator, we handle end-to-end travel logistics: private AC transportation (Tempo Travellers, buses, cars), hotel/resort reservations, buffet meals, local sightseeing entry tickets, official industrial visit permission coordination, and 24/7 on-board tour manager support.",
    },
    {
      q: "Where is SKY QUEST HOLIDAYS based and which locations do you serve?",
      a: "Our headquarters is in Namakkal, Tamil Nadu (Govt Regd: TN/NKL/TOUR/2020/4891). We provide doorstep vehicle pickup and tour services across Namakkal, Salem, Erode, Tiruchirappalli, Coimbatore, Chennai, and all districts in Tamil Nadu, operating tours to Kerala, Karnataka, Goa, and all South Indian destinations.",
    },
    {
      q: "Can tour packages be customized to our budget and dates?",
      a: "Yes, 100%. All our itineraries are fully customizable. You can choose the duration, hotel category (budget, 3-star, or luxury resort), vehicle type, meal plans (breakfast only or all meals), and special inclusions like DJ nights or campfires.",
    },
    {
      q: "How do we get an itemized tour quotation?",
      a: "You can call or WhatsApp our tour operations desk at +91 73387 10611 or email skyquestholidays@gmail.com. Share your expected pax count, travel dates, and destination to receive a detailed PDF proposal.",
    },
    {
      q: "Do you provide on-tour managers for large groups?",
      a: "Yes. For college, educational, and corporate group tours, an experienced tour manager accompanies the group to handle hotel check-ins, toll booths, parking, entry passes, and schedule coordination.",
    },
  ];

  const relatedLinks = [
    { title: "Tour Operators in Tamil Nadu", href: "/tour-operators-tamil-nadu" },
    { title: "Educational Tours", href: "/educational-tours" },
    { title: "Industrial Visit Packages", href: "/industrial-visit-packages" },
    { title: "College Tour Packages", href: "/college-tour-packages" },
    { title: "Group Tour Packages", href: "/group-tour-packages" },
    { title: "Customized Tour Packages", href: "/customized-tour-packages" },
    { title: "Student Tour Packages", href: "/student-tour-packages" },
    { title: "All Tour Packages", href: "/tour-packages" },
  ];

  return (
    <SeoLandingPage
      slug="tour-operators"
      pageTitle="Tour Operators for Educational, Group & Customized Tours | SKY QUEST HOLIDAYS"
      pageDescription="Government-registered tour operator in South India organizing educational tours, industrial visits, college excursions, group travel, and custom holidays."
      h1="Tour Operators for Educational, Group & Customized Tours"
      badgeText="Registered South India Tour Operator"
      heroSubtitle="End-to-end travel solutions: luxury coaches, verified resorts, customized itineraries, and 24/7 on-trip tour management across Tamil Nadu, Kerala & Karnataka."
      packages={packages}
      guideSections={guideSections}
      faqs={faqs}
      relatedLinks={relatedLinks}
      searchIntent="Commercial"
      serviceType="Tour Operator Services"
    />
  );
}
