import type { Metadata } from "next";
import SeoLandingPage, { SeoGuideSection, SeoFaq } from "@/components/SeoLandingPage";
import { INITIAL_PACKAGES } from "@/lib/data";

export const metadata: Metadata = {
  title: "Family Tour Packages from Tamil Nadu & Namakkal | SKY QUEST HOLIDAYS",
  description:
    "Book memorable, child-safe family tour packages from Tamil Nadu and Namakkal with SKY QUEST HOLIDAYS. Customized trips to Kerala, Ooty, Kodaikanal, Mysore & Coorg with private AC cabs.",
  alternates: {
    canonical: "https://sky-quest-holidays.web.app/family-tour-packages",
  },
  openGraph: {
    title: "Family Tour Packages from Tamil Nadu | SKY QUEST HOLIDAYS",
    description:
      "Safe, comfortable, and personalized family tour packages starting directly from Namakkal and Tamil Nadu. Verified family resorts and sanitized private vehicles.",
    url: "https://sky-quest-holidays.web.app/family-tour-packages",
    siteName: "SKY QUEST HOLIDAYS",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Family Tour Packages from Tamil Nadu | SKY QUEST HOLIDAYS",
    description:
      "Custom family vacation packages from Tamil Nadu. Private cabs, child-friendly resorts, and relaxed sightseeing.",
  },
};

export default function FamilyTourPackagesPage() {
  // Select family-friendly packages across South India
  const packages = INITIAL_PACKAGES.filter(
    (p) =>
      p.category === "kerala" ||
      p.category === "tamilnadu" ||
      p.id.includes("mysore") ||
      p.id.includes("coorg")
  ).slice(0, 8);

  const guideSections: SeoGuideSection[] = [
    {
      title: "Handcrafted Family Vacation Packages from Tamil Nadu",
      subtitle: "Comfort, Safety & Care for Every Generation",
      content:
        "Traveling with family—parents, grandparents, and enthusiastic children—demands a thoughtful pace, clean hygienic accommodations, and trustworthy private transportation. SKY QUEST HOLIDAYS specializes in curated family tour packages departing from Namakkal, Salem, Erode, Trichy, Coimbatore, and Chennai.\n\nWe handpick family-friendly resorts that provide spacious interconnected rooms, swimming pools, lawns for kids to play, and wholesome multi-cuisine dining. Every itinerary is planned with generous rest stops, eliminating hectic rush so your loved ones can truly unwind and create lifelong memories.",
      bullets: [
        "Dedicated sanitized private AC vehicles (Innova Crysta, Ertiga, Tempo Traveller)",
        "Verified 3-Star & 4-Star resorts with swimming pools, gardens, and doctor-on-call",
        "Elder-friendly itineraries with relaxed sightseeing hours and wheelchair-accessible spots",
        "Transparent billing with zero unexpected on-road or hotel charges",
      ],
    },
    {
      title: "Top Family Vacation Destinations in South India",
      subtitle: "Most Loved Family Circuits by Our Travelers",
      content:
        "1. Munnar & Alleppey Houseboat (Kerala): 3 to 4 days of misty tea garden walks, gentle boat rides on Mattupetty lake, and an overnight stay in an exclusive private backwater houseboat with traditional meals.\n2. Ooty & Coonoor Hill Tour: 2 to 3 days of botanical flower gardens, chocolate factory visits that kids adore, and the iconic UNESCO heritage toy train journey.\n3. Mysore & Coorg Coffee Valley: 3 to 4 days featuring the grand Mysore Palace illuminations, Chamundi Hills, Dubare Elephant Camp, Abbey Falls, and coffee plantation walks.\n4. Kodaikanal Princess of Hill Stations: 3 days around the scenic star-shaped Kodai Lake, Bryant Park, Coaker's Walk, and Pillar Rocks.\n5. Tamil Nadu Temple & Heritage Circuit: Madurai Meenakshi Amman Temple, Rameshwaram Ramanathaswamy Temple, and Kanyakumari sunrise point.",
      bullets: [
        "Kerala Hills & Houseboat (Munnar, Thekkady, Alleppey)",
        "Nilgiri Mountains (Ooty, Coonoor, Mudumalai Safari)",
        "Karnataka Heritage & Nature (Mysore Palace, Coorg, Wayanad)",
        "Tamil Nadu Spiritual & Coastal (Madurai, Rameshwaram, Kanyakumari)",
      ],
    },
    {
      title: "Why Families in Namakkal Trust SKY QUEST HOLIDAYS",
      subtitle: "Local Care with Professional Standards",
      content:
        "We are a registered local business in Namakkal (Reg: TN/NKL/TOUR/2020/4891) with over 8 years of impeccable hospitality. Our courteous, polite, and non-smoking drivers are specially trained to assist families with luggage, child safety, and senior citizen comfort. Our travel coordinators monitor your journey 24/7 until you safely return home.",
    },
  ];

  const faqs: SeoFaq[] = [
    {
      q: "Does SKY QUEST HOLIDAYS arrange family tour packages from Namakkal?",
      a: "Yes! We specialize in customized family tour packages departing directly from your home in Namakkal and surrounding regions across Tamil Nadu, offering private AC cabs and verified family hotels.",
    },
    {
      q: "Which vehicle is best for a family of 4 to 6 people?",
      a: "For families of 4 to 6 members, we provide spacious Toyota Innova Crysta or Maruti Ertiga vehicles. For extended joint families (8 to 14 members), we provide luxury 12 to 14-seater AC Force Tempo Travellers.",
    },
    {
      q: "Can itineraries be adjusted for senior citizens or young children?",
      a: "Absolutely. We specialize in slow-paced, customizable itineraries with fewer stairs, ground-floor hotel rooms, elevator access, and flexible morning start times.",
    },
    {
      q: "What meals are included in the family package?",
      a: "Daily complimentary buffet breakfast is included in all our resort packages. On Alleppey houseboat stays, all three meals (lunch, evening tea/snacks, dinner, and breakfast) are freshly prepared and included.",
    },
    {
      q: "How do we book a family holiday package?",
      a: "Call or WhatsApp our family travel desk at +91 73387 10611 with your preferred dates, destination, and family member count to receive a transparent PDF quotation.",
    },
  ];

  const relatedLinks = [
    { title: "Best Travel Agency in Namakkal", href: "/namakkal-travel-agency" },
    { title: "Kerala Tour Packages", href: "/kerala-tour-packages" },
    { title: "Munnar Tour Packages", href: "/munnar-tour-packages" },
    { title: "Ooty Tour Packages", href: "/ooty-tour-packages" },
    { title: "Vagamon Tour Packages", href: "/vagamon-tour-packages" },
    { title: "College Tour Packages", href: "/college-tour-packages" },
    { title: "All Tour Packages", href: "/tour-packages" },
  ];

  return (
    <SeoLandingPage
      slug="family-tour-packages"
      pageTitle="Family Tour Packages from Tamil Nadu & Namakkal | SKY QUEST HOLIDAYS"
      pageDescription="Book memorable, child-safe family tour packages from Tamil Nadu and Namakkal with SKY QUEST HOLIDAYS. Trips to Kerala, Ooty, Kodaikanal, Mysore & Coorg with private AC cabs."
      h1="Family Tour Packages from Tamil Nadu & Namakkal"
      badgeText="Trusted Family Vacation Specialist"
      heroSubtitle="Create lifelong family memories with sanitized private cabs, child-friendly resorts, and relaxed itineraries. Doorstep pickup from Namakkal and across Tamil Nadu."
      packages={packages}
      guideSections={guideSections}
      faqs={faqs}
      relatedLinks={relatedLinks}
      searchIntent="Commercial"
    />
  );
}
