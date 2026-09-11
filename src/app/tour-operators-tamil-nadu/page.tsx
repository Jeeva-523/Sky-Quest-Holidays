import type { Metadata } from "next";
import SeoLandingPage, { SeoGuideSection, SeoFaq } from "@/components/SeoLandingPage";
import { INITIAL_PACKAGES } from "@/lib/data";

export const metadata: Metadata = {
  title: "Tour Operators in Tamil Nadu | SKY QUEST HOLIDAYS",
  description:
    "Looking for verified tour operators in Tamil Nadu? SKY QUEST HOLIDAYS provides doorstep pickup from Namakkal, Salem, Erode, Coimbatore & Chennai for Kerala, Munnar, Goa & South India group tours.",
  alternates: {
    canonical: "https://sky-quest-holidays.web.app/tour-operators-tamil-nadu",
  },
  openGraph: {
    title: "Tour Operators in Tamil Nadu | SKY QUEST HOLIDAYS",
    description:
      "Government-registered tour operator in Tamil Nadu. Specialized in college IV trips, family holidays, and group tour packages across South India.",
    url: "https://sky-quest-holidays.web.app/tour-operators-tamil-nadu",
    siteName: "SKY QUEST HOLIDAYS",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tour Operators in Tamil Nadu | SKY QUEST HOLIDAYS",
    description:
      "Top-rated tour operator in Tamil Nadu for group tours, college IV packages, and family vacations.",
  },
};

export default function TourOperatorsTamilNaduPage() {
  const packages = INITIAL_PACKAGES.filter(
    (p) =>
      p.state?.toLowerCase().includes("tamil") ||
      p.state?.toLowerCase().includes("kerala") ||
      p.category === "college"
  ).slice(0, 8);

  const guideSections: SeoGuideSection[] = [
    {
      title: "Trusted Tour Operator in Tamil Nadu",
      subtitle: "Headquartered in Namakkal with Statewide Fleet Pickup & Support",
      content:
        "SKY QUEST HOLIDAYS (Govt Regd: TN/NKL/TOUR/2020/4891) is a registered tour operator located centrally in Namakkal, Tamil Nadu. Being situated in the transportation heartland of Tamil Nadu allows us to offer direct, uninterrupted doorstep pickup services across all major cities and educational centers including Chennai, Coimbatore, Salem, Erode, Tiruchirappalli, Madurai, Karur, and Dindigul.\n\nWe specialize in turning travel plans into seamlessly coordinated experiences. Whether you need a 50-seater pushback air-suspension coach for an engineering college industrial visit, a 21-seater mini bus for an extended family reunion to Kodaikanal, or a private AC sedan for a Kerala honeymoon, our regional network delivers verified vehicles, skilled drivers, and punctual execution.",
      bullets: [
        "Centrally headquartered in Namakkal, Tamil Nadu with statewide logistics coverage",
        "Direct doorstep vehicle pickups from any institution, office, or residence in Tamil Nadu",
        "Expert commercial drivers well-versed in ghat roads (Munnar, Ooty, Kodaikanal, Vagamon)",
        "Strict adherence to government transport safety norms and passenger permits",
      ],
    },
    {
      title: "Popular Group & College Routes from Tamil Nadu",
      subtitle: "Top Circuits Operated Frequently from Tamil Nadu Cities",
      content:
        "Our operational experience covers hundreds of successful trips along South India's top travel routes:\n\n1. Tamil Nadu to Kerala Hills: Munnar – Vagamon – Thekkady – Alleppey Backwaters (3 to 5 Days).\n2. Tamil Nadu to Goa: Calangute, Baga, Water Sports, Sunset River Cruise, and heritage forts (4 to 5 Days).\n3. Tamil Nadu to Karnataka: Bangalore Tech Parks – Mysore Royal Palace – Coorg Coffee Hills – Dandeli Adventure (3 to 4 Days).\n4. Intra-Tamil Nadu Circuits: Ooty Nilgiri Hills, Kodaikanal Valley, Yercaud, and the spiritual circuit of Rameswaram & Kanyakumari.",
    },
    {
      title: "Why Colleges and Families in Tamil Nadu Choose SKY QUEST HOLIDAYS",
      subtitle: "Reliability, Safety, and Direct Operator Pricing",
      content:
        "Unlike online aggregator platforms that act merely as middlemen, SKY QUEST HOLIDAYS is a hands-on local tour operator. You communicate directly with the planners and fleet managers who supervise your journey. We provide:\n\n• Transparent, all-inclusive pricing (vehicle, toll, driver bata, parking, resort stays, and meals).\n• Dedicated tour managers on large group tours to manage tickets, room allocations, and schedules.\n• Strict safety standards, verified family-friendly hotels, and separate accommodations for professors and faculty.",
    },
  ];

  const faqs: SeoFaq[] = [
    {
      q: "Where in Tamil Nadu does SKY QUEST HOLIDAYS operate from?",
      a: "Our central office is located in Namakkal, Tamil Nadu. We deploy vehicles and coordinate tours for travelers and colleges departing from Namakkal, Salem, Erode, Coimbatore, Trichy, Chennai, and across the state.",
    },
    {
      q: "What types of tours do you organize in Tamil Nadu?",
      a: "We organize College Industrial Visits (IV), school educational trips, corporate team outings, family holiday packages, honeymoon tours, and weekend hill station getaways to Munnar, Ooty, Vagamon, Kodaikanal, and Goa.",
    },
    {
      q: "Do you provide vehicles with driver for outstation trips from Tamil Nadu?",
      a: "Yes, our fleet includes luxury 40 & 50-seater AC pushback buses, 21-seater mini buses, 12 to 17-seater Tempo Travellers, and premium Innova / sedan cabs with experienced commercial drivers.",
    },
    {
      q: "How can we get an immediate quotation for a tour from Tamil Nadu?",
      a: "Simply call or WhatsApp our Tamil Nadu tour coordination desk at +91 73387 10611 with your pickup location, dates, passenger count, and destination. We provide a complete PDF itinerary and quote within minutes.",
    },
  ];

  const relatedLinks = [
    { title: "Tour Operators South India", href: "/tour-operators" },
    { title: "College Tour Packages", href: "/college-tour-packages" },
    { title: "Industrial Visit Packages", href: "/industrial-visit-packages" },
    { title: "Group Tour Packages", href: "/group-tour-packages" },
    { title: "Customized Tour Packages", href: "/customized-tour-packages" },
    { title: "Namakkal Travel Agency", href: "/namakkal-travel-agency" },
    { title: "Kerala Tour Packages", href: "/kerala-tour-packages" },
    { title: "All Tour Packages", href: "/tour-packages" },
  ];

  return (
    <SeoLandingPage
      slug="tour-operators-tamil-nadu"
      pageTitle="Tour Operators in Tamil Nadu | SKY QUEST HOLIDAYS"
      pageDescription="Government-registered tour operator in Tamil Nadu organizing college IV packages, educational tours, family vacations, and group travel across South India."
      h1="Tour Operators in Tamil Nadu – SKY QUEST HOLIDAYS"
      badgeText="Tamil Nadu's Trusted Tour Operator"
      heroSubtitle="Doorstep vehicle pickup across Namakkal, Salem, Erode, Coimbatore & Chennai. Luxury pushback coaches, verified resorts, and 24/7 on-tour management."
      packages={packages}
      guideSections={guideSections}
      faqs={faqs}
      relatedLinks={relatedLinks}
      searchIntent="Commercial"
      serviceType="Tamil Nadu Tour Operator Services"
    />
  );
}
