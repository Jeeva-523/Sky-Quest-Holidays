import type { Metadata } from "next";
import SeoLandingPage, { SeoGuideSection, SeoFaq } from "@/components/SeoLandingPage";
import { INITIAL_PACKAGES } from "@/lib/data";

export const metadata: Metadata = {
  title: "Best Travel Agency in Namakkal | SKY QUEST HOLIDAYS – Tour Operator",
  description:
    "Looking for the best travel agency in Namakkal? SKY QUEST HOLIDAYS offers customized tour packages, college IV trips, Kerala holidays, and family vacations with private AC cabs and 24/7 support.",
  alternates: {
    canonical: "https://sky-quest-holidays.web.app/namakkal-travel-agency",
  },
  openGraph: {
    title: "Best Travel Agency in Namakkal | SKY QUEST HOLIDAYS",
    description:
      "Govt-registered premier tour operator in Namakkal, Tamil Nadu. Book customized holiday packages, college tours, and family trips.",
    url: "https://sky-quest-holidays.web.app/namakkal-travel-agency",
    siteName: "SKY QUEST HOLIDAYS",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Travel Agency in Namakkal | SKY QUEST HOLIDAYS",
    description:
      "Premier tour operator in Namakkal offering customized holiday packages, college IV tours, and private cab services.",
  },
};

export default function NamakkalTravelAgencyPage() {
  const packages = INITIAL_PACKAGES.slice(0, 8);

  const guideSections: SeoGuideSection[] = [
    {
      title: "Why SKY QUEST HOLIDAYS is the Best Travel Agency in Namakkal",
      subtitle: "8+ Years of Reliable Travel Services from Namakkal Across South India",
      content:
        "SKY QUEST HOLIDAYS is a trusted, government-registered travel agency and tour operator headquartered in Namakkal, Tamil Nadu (Reg: TN/NKL/TOUR/2020/4891). For over 8 years, we have helped thousands of families, students, and corporate teams travel stress-free across South India, Kerala, Karnataka, and Goa.\n\nUnlike generic online booking portals that connect you with unverified middle-men, SKY QUEST HOLIDAYS operates with our own fleet of verified private cabs (Sedans, Ertiga, Innova Crysta, Urbania, and Tempo Travellers) and direct partnerships with handpicked 3-Star, 4-Star, and luxury heritage resorts. We ensure every trip starting from Namakkal is customized to your preferred pace, schedule, and budget.",
      bullets: [
        "Headquartered locally in Namakkal with doorstep cab pickup across Salem, Erode, and Trichy",
        "Official Government Registered Tour Operator (TN/NKL/TOUR/2020/4891)",
        "4.9★ Average Traveler Rating with 500+ verified customer reviews",
        "Zero hidden fees – all package rates include fuel, toll gates, parking, and driver beta",
      ],
    },
    {
      title: "Comprehensive Tour Services Provided from Namakkal",
      subtitle: "Customized Holidays for Every Traveler and Group Size",
      content:
        "Whether you are planning a weekend hill station escape, a sacred pilgrimage, or a week-long multi-city holiday, our Namakkal travel desk offers end-to-end management:\n\n1. College & School Industrial Visits (IV): Complete college tour packages from Tamil Nadu featuring luxury 50-seater pushback buses, DJ nights, campfires, industry permissions, and verified faculty rooms.\n2. Family Vacation Packages: Child-friendly and elder-friendly itineraries to Munnar, Vagamon, Ooty, Kodaikanal, and Coorg with relaxed sightseeing and sanitized private cabs.\n3. Honeymoon & Couple Packages: Candlelight dinners, flower bed decorations, private pool villas, and romantic viewpoints in Wayanad, Munnar, and Alleppey backwaters.\n4. Corporate & Group Retreats: Team building events, buffet catering, resort bookings, and comfortable AC group transport.",
      bullets: [
        "College Industrial Visits (IV) & Educational tours across South India & Goa",
        "Kerala backwater houseboats & tea garden retreats with private doorstep cab",
        "Hill station getaways: Munnar, Vagamon, Ooty, Kodaikanal, Coorg, Chikmagalur",
        "Customized pilgrimage tours: Rameswaram, Madurai, Kanyakumari, Tirupati",
      ],
    },
    {
      title: "How to Book Your Tour Package in Namakkal",
      subtitle: "Simple, Transparent 3-Step Booking Process",
      content:
        "Booking a holiday package with SKY QUEST HOLIDAYS is effortless:\n\nStep 1: Contact our Namakkal office via WhatsApp or call at +91 73387 10611 with your preferred destination, travel dates, and group size.\nStep 2: Receive an itemized, custom PDF quotation with hotel options, vehicle category, and day-wise sightseeing plan.\nStep 3: Confirm with a nominal advance payment. Your sanitized vehicle and confirmed hotel vouchers are delivered directly to your phone.",
    },
  ];

  const faqs: SeoFaq[] = [
    {
      q: "Where is SKY QUEST HOLIDAYS located in Namakkal?",
      a: "SKY QUEST HOLIDAYS is based in Namakkal, Tamil Nadu (627015). We provide direct doorstep pickup and drop across Namakkal, Tiruchengode, Rasipuram, Paramathi Velur, Salem, Erode, and surrounding regions.",
    },
    {
      q: "Why is SKY QUEST HOLIDAYS considered the best travel agency in Namakkal?",
      a: "We are an officially registered tour operator (TN/NKL/TOUR/2020/4891) with 8+ years of experience, 4.9-star rating, and over 500+ happy traveler reviews. We provide direct cab allocations, verified hotel stays, transparent pricing with no hidden charges, and dedicated 24/7 tour managers.",
    },
    {
      q: "Do you offer doorstep cab pickup from Namakkal for Kerala and Ooty trips?",
      a: "Yes! All our tour packages include private AC cab pickup directly from your doorstep in Namakkal and return drop at the end of the tour.",
    },
    {
      q: "Can college groups book industrial visits through your Namakkal office?",
      a: "Yes, we are one of Tamil Nadu's leading college tour operators. We organize end-to-end college IV packages with 50-seater pushback AC buses, DJ nights, campfires, and verified faculty rooms.",
    },
    {
      q: "How can I get an instant tour quotation from SKY QUEST HOLIDAYS?",
      a: "You can call or WhatsApp our Namakkal travel team at +91 73387 10611. We share customized PDF quotations within minutes with zero obligation.",
    },
  ];

  const relatedLinks = [
    { title: "College Tour Packages", href: "/college-tour-packages" },
    { title: "Kerala Tour Packages", href: "/kerala-tour-packages" },
    { title: "Munnar Tour Packages", href: "/munnar-tour-packages" },
    { title: "Vagamon Tour Packages", href: "/vagamon-tour-packages" },
    { title: "Ooty Tour Packages", href: "/ooty-tour-packages" },
    { title: "Family Tour Packages", href: "/family-tour-packages" },
    { title: "All Tour Packages", href: "/tour-packages" },
  ];

  return (
    <SeoLandingPage
      slug="namakkal-travel-agency"
      pageTitle="Best Travel Agency in Namakkal | SKY QUEST HOLIDAYS"
      pageDescription="Looking for the best travel agency in Namakkal? SKY QUEST HOLIDAYS is a govt-registered tour operator offering customized South India holiday packages, Kerala tours, and college trips."
      h1="Best Travel Agency in Namakkal – SKY QUEST HOLIDAYS"
      badgeText="Namakkal's #1 Rated Tour Operator"
      heroSubtitle="Experience personalized holiday packages, private AC cab transportation, and verified hotel stays directly from Namakkal. Over 8 years of trusted hospitality across South India."
      packages={packages}
      guideSections={guideSections}
      faqs={faqs}
      relatedLinks={relatedLinks}
      searchIntent="Commercial"
    />
  );
}
