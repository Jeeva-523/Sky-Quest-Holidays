import type { Metadata } from "next";
import SeoLandingPage, { SeoGuideSection, SeoFaq } from "@/components/SeoLandingPage";
import { INITIAL_PACKAGES } from "@/lib/data";

export const metadata: Metadata = {
  title: "Industrial Visit Packages for Colleges (IV) | SKY QUEST HOLIDAYS",
  description:
    "Looking for verified industrial visit packages in Tamil Nadu? SKY QUEST HOLIDAYS organizes college IV trips with company permissions, luxury pushback buses, DJ nights, and faculty care to Munnar, Kochi, Bangalore & Goa.",
  alternates: {
    canonical: "https://sky-quest-holidays.web.app/industrial-visit-packages",
  },
  openGraph: {
    title: "Industrial Visit Packages for Colleges (IV) | SKY QUEST HOLIDAYS",
    description:
      "Premier college IV packages with factory visit coordination, luxury 50-seater AC buses, campfire DJ nights, and separate faculty accommodations across South India.",
    url: "https://sky-quest-holidays.web.app/industrial-visit-packages",
    siteName: "SKY QUEST HOLIDAYS",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Industrial Visit Packages for Colleges | SKY QUEST HOLIDAYS",
    description:
      "Turnkey college IV tour packages with company coordination, luxury transport, and 24/7 tour managers.",
  },
};

export default function IndustrialVisitPackagesPage() {
  const packages = INITIAL_PACKAGES.filter(
    (p) =>
      p.category === "college" ||
      p.id.includes("munnar") ||
      p.id.includes("vagamon") ||
      p.id.includes("cochin") ||
      p.id.includes("goa")
  ).slice(0, 8);

  const guideSections: SeoGuideSection[] = [
    {
      title: "What is an Industrial Visit (IV) Package?",
      subtitle: "Bridging Theoretical Education and Real-World Industrial Practice",
      content:
        "An Industrial Visit (IV) is an integral curriculum requirement for engineering, management, science, and arts colleges. It provides students with first-hand exposure to industrial operations, manufacturing processes, workplace cultures, and technology implementations.\n\nAt SKY QUEST HOLIDAYS, an Industrial Visit Package is an all-inclusive, turnkey educational tour that combines official industrial and manufacturing plant visits with scenic hill station sightseeing, student adventure activities, resort campfire evenings, and luxury transport. We manage the delicate balance between technical learning for institutional clearance and memorable travel for students.",
      bullets: [
        "Assistance with official company permission letters and plant visit scheduling",
        "Luxury 40 & 50-seater AC air-suspension pushback buses equipped with professional sound systems",
        "Complimentary executive rooms and prioritized hospitality for accompanying professors",
        "Resort stays with private boundaries, DJ night audio-visual setups, and open campfires",
      ],
    },
    {
      title: "Industries & Sectors We Coordinate for College Visits",
      subtitle: "Connecting College Departments with Relevant Industry Sectors",
      content:
        "Depending on your academic discipline, we help align visits with relevant industrial operations along travel routes:\n\n• Mechanical & Automobile Engineering: Heavy manufacturing plants, automated assembly lines, and CNC machining centers.\n• Electrical & Electronics Engineering: Hydroelectric power project viewpoints, solar generation parks, and electrical substations.\n• Computer Science & IT: Technology parks in Bangalore and Kochi, software incubators, and electronics manufacturing hubs.\n• Food Technology & Chemical Engineering: Tea processing factories in Munnar/Ooty, spice extraction units, and dairy processing plants.\n• Management & Commerce (MBA/BBA): Supply chain logistics hubs, container terminals, and FMCG manufacturing distribution centers.",
    },
    {
      title: "How SKY QUEST HOLIDAYS Organizes College IV Trips",
      subtitle: "End-to-End Execution for Stress-Free Student & Faculty Coordinators",
      content:
        "1. Doorstep Campus Pickup: Your private luxury coach arrives at your college campus on time.\n2. Official Industry Visit: Guided technical walk-through of the pre-scheduled industrial facility with Q&A session.\n3. Sightseeing & Leisure: Afternoon hill station viewpoints, jeep safaris in Vagamon, or beach walks in Kochi/Varkala.\n4. Resort Campfire & DJ Night: Evening celebration with verified sound permits and dinner buffets.\n5. Punctual Campus Drop-off: Safe, on-time return back to your college campus.",
    },
    {
      title: "Faculty Care, Student Safety & Transparent Budgeting",
      subtitle: "Why College Principals and HODs Choose SKY QUEST HOLIDAYS",
      content:
        "College administration places safety above all else. We ensure pre-screened resorts with separate, well-maintained room wings for boys and girls, executive suites for faculty coordinators, experienced drivers trained for night and ghat road driving, and full-time on-tour managers who handle logistics so professors never have to worry about local vendor disputes.",
    },
  ];

  const faqs: SeoFaq[] = [
    {
      q: "What is included in SKY QUEST HOLIDAYS Industrial Visit (IV) packages?",
      a: "Our IV packages include round-trip luxury AC pushback bus transport, verified resort/hotel accommodations, buffet meals (Breakfast, Lunch, and Dinner), factory/industry permission liaison support, sightseeing entry passes, DJ night audio setup, campfire, toll/parking charges, and an experienced on-tour manager.",
    },
    {
      q: "Do you arrange official permission letters for industrial visits?",
      a: "Yes. We guide student and staff coordinators with industry request templates, direct contacts of industrial plants along the route, and schedule coordination for factory walk-throughs.",
    },
    {
      q: "Are accommodations separate for male and female students and staff?",
      a: "Yes, absolutely. We enforce strict room segregation with separate room wings or villas for male and female students, and complimentary private executive AC rooms for accompanying professors and staff.",
    },
    {
      q: "Which destinations are most popular for college IV trips from Tamil Nadu?",
      a: "The top circuits are: (1) Cochin – Munnar – Vagamon – Alleppey (Tea and agro-industries + hills); (2) Bangalore – Mysore – Coorg (IT hubs, aerospace, and palaces); (3) Goa Beach & Coastal Circuit (Port logistics, adventure, and water sports); (4) Ooty – Kodaikanal (Chocolate, tea factories, and mountain viewpoints).",
    },
    {
      q: "How can college student coordinators get an instant IV quotation?",
      a: "Call or WhatsApp our dedicated group travel desk at +91 73387 10611. Provide your college name, branch, expected student count, travel dates, and destination for an itemized PDF quote.",
    },
  ];

  const relatedLinks = [
    { title: "College IV Packages", href: "/iv-packages" },
    { title: "Industrial Visit Organizers", href: "/industrial-visit-organizers" },
    { title: "College Tour Packages", href: "/college-tour-packages" },
    { title: "Educational Tours", href: "/educational-tours" },
    { title: "College Excursion Packages", href: "/college-excursion-packages" },
    { title: "Tour Operators in Tamil Nadu", href: "/tour-operators-tamil-nadu" },
    { title: "Group Tour Packages", href: "/group-tour-packages" },
    { title: "All Tour Packages", href: "/tour-packages" },
  ];

  return (
    <SeoLandingPage
      slug="industrial-visit-packages"
      pageTitle="Industrial Visit Packages for Colleges (IV) | SKY QUEST HOLIDAYS"
      pageDescription="Verified industrial visit packages in Tamil Nadu. Complete IV tour packages with factory visit support, luxury buses, DJ nights, and faculty care across South India."
      h1="Industrial Visit Packages for Colleges & Universities"
      badgeText="South India's Top College IV Specialist"
      heroSubtitle="Turnkey Industrial Visit (IV) packages: factory visits, luxury 50-seater pushback AC buses, private resort stays, DJ nights, and dedicated faculty care."
      packages={packages}
      guideSections={guideSections}
      faqs={faqs}
      relatedLinks={relatedLinks}
      searchIntent="Commercial"
      serviceType="Industrial Visit Tour Packages"
    />
  );
}
