import type { Metadata } from "next";
import SeoLandingPage, { SeoGuideSection, SeoFaq } from "@/components/SeoLandingPage";
import { INITIAL_PACKAGES } from "@/lib/data";

export const metadata: Metadata = {
  title: "Vagamon Tour Package from Tamil Nadu & Namakkal | SKY QUEST HOLIDAYS",
  description:
    "Discover the serene pine forests, green meadows & misty peaks of Vagamon. Book custom Vagamon tour packages from Tamil Nadu and Namakkal with SKY QUEST HOLIDAYS.",
  alternates: {
    canonical: "https://sky-quest-holidays.web.app/vagamon-tour-packages",
  },
  openGraph: {
    title: "Vagamon Tour Package from Tamil Nadu | SKY QUEST HOLIDAYS",
    description:
      "Explore Vagamon's pine forests, green meadows, and glass bridge with custom holiday packages from Tamil Nadu and Namakkal.",
    url: "https://sky-quest-holidays.web.app/vagamon-tour-packages",
    siteName: "SKY QUEST HOLIDAYS",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vagamon Tour Package from Tamil Nadu | SKY QUEST HOLIDAYS",
    description:
      "Vagamon holiday packages from Tamil Nadu. Pine forest walks, off-road jeep safaris, and private cab services.",
  },
};

export default function VagamonTourPackagesPage() {
  // Filter Vagamon packages
  const packages = INITIAL_PACKAGES.filter(
    (p) =>
      p.id.includes("vagamon") ||
      p.name.toLowerCase().includes("vagamon") ||
      p.desc.toLowerCase().includes("vagamon")
  );

  const guideSections: SeoGuideSection[] = [
    {
      title: "Vagamon – The Serene Offbeat Hill Station of Kerala",
      subtitle: "Uncrowded Meadows, Pine Valleys & Cool Mountain Breezes",
      content:
        "Tucked away in the Idukki district of Kerala, Vagamon is an enchanting highland retreat celebrated for its sweeping velvet-green meadows, aromatic pine forests, tea estates, and year-round pleasant weather.\n\nUnlike commercialized hill stations, Vagamon retains a peaceful, untouched natural ambiance that makes it a top favorite for couples seeking romance, families desiring quiet nature walks, and college groups looking for adventure activities like off-road jeep trekking and glass bridge skywalks. SKY QUEST HOLIDAYS provides curated Vagamon tour packages from Namakkal and Tamil Nadu with dedicated private transportation and premium mountain accommodations.",
      bullets: [
        "Private AC cab pickup directly from Namakkal, Salem, Erode, or Coimbatore",
        "Scenic stays in hilltop resorts, pine valley cottages, and valley-view hotels",
        "Guided visits to Vagamon Pine Forest, Vagamon Meadows, and Glass Bridge",
        "Exciting off-road 4x4 jeep safari through rugged tea estates and hidden waterfalls",
      ],
    },
    {
      title: "Key Attractions in Our Vagamon Tour Packages",
      subtitle: "The Most Scenic Spots in Vagamon",
      content:
        "Our Vagamon itineraries include all the iconic attractions:\n\n1. Vagamon Pine Forest: Towering pine trees creating a tranquil shade and carpeted forest floor, made famous by numerous South Indian movie songs.\n2. Vagamon Meadows (Mottaikunnu): Rolling emerald mounds with gentle walking trails, pedal boating lakes, and panoramic valley views.\n3. Vagamon Glass Bridge & Adventure Park: India's longest cantilever glass bridge offering adrenaline-filled views of the deep abyss beneath your feet, along with ziplining and rope courses.\n4. Kurisumala Ashram & Murugan Mala: Spiritual and scenic hilltop sanctuaries offering peaceful morning walks and mist-covered vistas.\n5. Marmala Waterfalls: Spectacular cascading waterfall hidden amidst dense rubber plantations, reached via thrilling off-road jeep rides.\n6. Thangal Para: Massive spherical rock formation of historical and spiritual significance overlooking stunning valleys.",
      bullets: [
        "Walk through the enchanting Vagamon Pine Forest",
        "Experience India's famous cantilever Glass Bridge",
        "Relax amidst the undulating Vagamon Green Meadows",
        "Thrilling 4x4 Off-Road Jeep Safari to hidden waterfalls",
      ],
    },
    {
      title: "Combine Vagamon with Munnar or Thekkady",
      subtitle: "Popular 3D/2N Multi-Destination Tour from Namakkal",
      content:
        "Many travelers from Tamil Nadu choose to combine Vagamon with Munnar (2.5 hours drive) or Thekkady (1.5 hours drive) for an unforgettable 3-day or 4-day circuit. SKY QUEST HOLIDAYS arranges seamless inter-destination transfers, coordinating your hotel check-ins and sightseeing so you spend less time worrying and more time enjoying the mountains.",
    },
  ];

  const faqs: SeoFaq[] = [
    {
      q: "Does SKY QUEST HOLIDAYS organize Vagamon tour packages from Tamil Nadu?",
      a: "Yes! We specialize in customized Vagamon tour packages from Namakkal, Salem, Trichy, Coimbatore, Chennai, and across Tamil Nadu with private AC cab pickup and comfortable resort stays.",
    },
    {
      q: "How many days are needed to visit Vagamon?",
      a: "A 2-Day / 1-Night tour is ideal to cover Vagamon's primary attractions (Pine Forest, Meadows, Glass Bridge, and Kurisumala). If combined with Munnar or Thekkady, a 3-Day / 2-Night or 4-Day / 3-Night package is recommended.",
    },
    {
      q: "Is the Vagamon Glass Bridge included in your tour itinerary?",
      a: "Yes, our sightseeing itinerary includes a stop at the Vagamon Adventure Park where the cantilever Glass Bridge is located. Entry tickets can be availed at the counter or pre-arranged on request.",
    },
    {
      q: "Can college groups visit Vagamon for Industrial Visits or class trips?",
      a: "Yes! Vagamon is one of our top college group destinations due to its budget-friendly resorts, campfires with DJ nights, and off-road jeep safaris.",
    },
    {
      q: "What is the best route from Namakkal to Vagamon?",
      a: "The most scenic and comfortable route from Namakkal to Vagamon is via Dindigul – Theni – Kumily – Kattappana – Vagamon (approx. 270 km, 7 hours). Our drivers have extensive experience navigating this ghat route safely.",
    },
  ];

  const relatedLinks = [
    { title: "Kerala Tour Packages", href: "/kerala-tour-packages" },
    { title: "Munnar Tour Packages", href: "/munnar-tour-packages" },
    { title: "College Tour Packages", href: "/college-tour-packages" },
    { title: "Best Travel Agency in Namakkal", href: "/namakkal-travel-agency" },
    { title: "Ooty Tour Packages", href: "/ooty-tour-packages" },
    { title: "Family Tour Packages", href: "/family-tour-packages" },
    { title: "All Tour Packages", href: "/tour-packages" },
  ];

  return (
    <SeoLandingPage
      slug="vagamon-tour-packages"
      pageTitle="Vagamon Tour Package from Tamil Nadu & Namakkal | SKY QUEST HOLIDAYS"
      pageDescription="Discover the serene pine forests, green meadows & misty peaks of Vagamon. Book custom Vagamon tour packages from Tamil Nadu and Namakkal with SKY QUEST HOLIDAYS."
      h1="Vagamon Tour Package from Tamil Nadu & Namakkal"
      badgeText="Scenic Offbeat Hill Retreat"
      heroSubtitle="Wander through pine valleys, roll down green meadows, and walk on the thrilling Glass Bridge. Doorstep private cab pickup from Namakkal and Tamil Nadu."
      packages={packages}
      guideSections={guideSections}
      faqs={faqs}
      relatedLinks={relatedLinks}
      searchIntent="Commercial"
    />
  );
}
