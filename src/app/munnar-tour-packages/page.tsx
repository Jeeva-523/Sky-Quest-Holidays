import type { Metadata } from "next";
import SeoLandingPage, { SeoGuideSection, SeoFaq } from "@/components/SeoLandingPage";
import { INITIAL_PACKAGES } from "@/lib/data";

export const metadata: Metadata = {
  title: "Munnar Tour Package from Namakkal & Tamil Nadu | SKY QUEST HOLIDAYS",
  description:
    "Book an unforgettable Munnar tour package from Namakkal and Tamil Nadu with SKY QUEST HOLIDAYS. Includes private AC cab, tea garden resort stay, Eravikulam safari, and complete sightseeing.",
  alternates: {
    canonical: "https://sky-quest-holidays.web.app/munnar-tour-packages",
  },
  openGraph: {
    title: "Munnar Tour Package from Namakkal | SKY QUEST HOLIDAYS",
    description:
      "Explore the misty hills of Munnar with customized packages starting from Namakkal and Tamil Nadu. Private cab, mountain resorts, and sightseeing.",
    url: "https://sky-quest-holidays.web.app/munnar-tour-packages",
    siteName: "SKY QUEST HOLIDAYS",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Munnar Tour Package from Namakkal | SKY QUEST HOLIDAYS",
    description:
      "Munnar holiday packages from Namakkal. Visit tea plantations, waterfalls, and viewpoints with private AC cabs.",
  },
};

export default function MunnarTourPackagesPage() {
  // Filter Munnar packages
  const packages = INITIAL_PACKAGES.filter(
    (p) =>
      p.id.includes("munnar") ||
      p.name.toLowerCase().includes("munnar") ||
      p.desc.toLowerCase().includes("munnar")
  );

  const guideSections: SeoGuideSection[] = [
    {
      title: "Experience the Green Paradise of Munnar with SKY QUEST HOLIDAYS",
      subtitle: "Customized 2D/1N and 3D/2N Packages from Namakkal & Tamil Nadu",
      content:
        "Perched at 1,600 meters in the Western Ghats, Munnar is South India's premier tea hill station. Known for its rolling emerald plantations, misty peaks, and cool climate, Munnar is the ideal weekend or holiday retreat from Namakkal and Tamil Nadu.\n\nSKY QUEST HOLIDAYS arranges personalized Munnar tour packages with private AC cab pickup right from your doorstep in Namakkal, Tiruchengode, Salem, or Erode. Our experienced hill station drivers navigate the scenic ghat roads smoothly, allowing you and your family to soak in panoramic waterfall views, spice gardens, and fresh mountain air.",
      bullets: [
        "Doorstep private cab pickup from Namakkal, Salem, Erode, or Coimbatore",
        "Scenic stays in handpicked 3-Star and 4-Star tea garden view resorts",
        "Complete sightseeing including Eravikulam National Park and Mattupetty Dam",
        "Flexible itineraries for couples, families, and college IV groups",
      ],
    },
    {
      title: "Top Sightseeing Places Covered in Our Munnar Packages",
      subtitle: "Unmissable Highlights of Munnar Hill Station",
      content:
        "Our Munnar itineraries are crafted to cover both iconic landmarks and serene viewpoints:\n\n1. Eravikulam National Park (Rajamalai): Home to the endangered Nilgiri Tahr mountain goat and the famous Neelakurinji flower blooming grounds.\n2. Mattupetty Dam & Lake: Beautiful storage reservoir nestled between hills, offering speedboat rides and calm scenic walks.\n3. Echo Point: Natural acoustic phenomenon where your voice echoes back across the misty lake surrounded by tea slopes.\n4. Kundala Dam & Lake: Asia's first arch dam featuring pedal boating and Kashmiri-style Shikara boat rides.\n5. KDHP Tea Museum: Historic tea manufacturing showcase explaining the history of Munnar's tea industry with live tea tasting sessions.\n6. Top Station: The highest point on the Munnar-Kodaikanal road offering breathtaking 360-degree views of the Western Ghats.",
      bullets: [
        "Eravikulam National Park & Nilgiri Tahr Safari",
        "Mattupetty Dam Speedboating & Kundala Shikara Rides",
        "Echo Point, Photo Point & Rose Garden",
        "Tea Museum, Attukad Waterfalls & Cheeyappara Falls",
      ],
    },
    {
      title: "Best Munnar Itinerary from Namakkal (3 Days / 2 Nights)",
      subtitle: "Recommended Flow for Families and Couples",
      content:
        "Day 1: Early morning pickup from Namakkal. Scenic drive via Pollachi / Udumalpet or Cochin route. En route visit Cheeyappara and Valara waterfalls. Check in to your Munnar tea resort. Evening leisure at Blossom Park or Munnar town spice market.\n\nDay 2: Full day Munnar sightseeing. Morning visit to Eravikulam National Park. Afternoon visit Mattupetty Dam, Echo Point, Kundala Lake, and Tea Museum. Evening campfire at the resort.\n\nDay 3: Sunrise viewpoint or Top Station visit. Post breakfast, check out. Return journey with drop-off at your doorstep in Namakkal by night.",
    },
  ];

  const faqs: SeoFaq[] = [
    {
      q: "What is the driving distance and travel time from Namakkal to Munnar?",
      a: "The road distance from Namakkal to Munnar is approximately 250 km, taking about 6 to 7 hours of comfortable driving via Karur – Dharapuram – Udumalpet – Marayoor or via Coimbatore – Pollachi. Our drivers are hill-road experts.",
    },
    {
      q: "Can SKY QUEST HOLIDAYS arrange a 2-day Munnar tour package from Namakkal?",
      a: "Yes! We offer a popular 2-Day / 1-Night Cochin-Munnar or direct Namakkal-Munnar package that covers all major sights, an overnight resort stay, breakfast, and private cab.",
    },
    {
      q: "Are the park entry fees and boating tickets included in the Munnar package?",
      a: "Our standard packages include private cab, fuel, driver beta, tolls, and hotel stays. Sightseeing entry tickets (like Eravikulam Park or speedboating) can either be paid directly at counters or bundled upon request.",
    },
    {
      q: "Which hotel categories do you provide in Munnar?",
      a: "We offer Standard 3-Star tea valley hotels, Deluxe 4-Star plantation resorts, luxury cliff-view pool villas, and cozy family cottages according to your budget.",
    },
    {
      q: "How do I book a Munnar tour package from Namakkal?",
      a: "Call or WhatsApp SKY QUEST HOLIDAYS at +91 73387 10611 with your preferred travel dates and group size. We will provide an instant custom quote.",
    },
  ];

  const relatedLinks = [
    { title: "Kerala Tour Packages", href: "/kerala-tour-packages" },
    { title: "Vagamon Tour Packages", href: "/vagamon-tour-packages" },
    { title: "Best Travel Agency in Namakkal", href: "/namakkal-travel-agency" },
    { title: "College Tour Packages", href: "/college-tour-packages" },
    { title: "Ooty Tour Packages", href: "/ooty-tour-packages" },
    { title: "Family Tour Packages", href: "/family-tour-packages" },
    { title: "All Tour Packages", href: "/tour-packages" },
  ];

  return (
    <SeoLandingPage
      slug="munnar-tour-packages"
      pageTitle="Munnar Tour Package from Namakkal & Tamil Nadu | SKY QUEST HOLIDAYS"
      pageDescription="Book an unforgettable Munnar tour package from Namakkal and Tamil Nadu with SKY QUEST HOLIDAYS. Private AC cab, tea garden resort stay, and complete sightseeing."
      h1="Munnar Tour Package from Namakkal & Tamil Nadu"
      badgeText="Bestselling Hill Station Package"
      heroSubtitle="Escape into the rolling tea gardens, misty peaks, and serene waterfalls of Munnar. Enjoy hassle-free private cab pickup from Namakkal and verified resort stays."
      packages={packages}
      guideSections={guideSections}
      faqs={faqs}
      relatedLinks={relatedLinks}
      searchIntent="Commercial"
    />
  );
}
