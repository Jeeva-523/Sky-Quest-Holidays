import type { Metadata } from "next";
import SeoLandingPage, { SeoGuideSection, SeoFaq } from "@/components/SeoLandingPage";
import { INITIAL_PACKAGES } from "@/lib/data";

export const metadata: Metadata = {
  title: "Educational Tours for Schools & Colleges | SKY QUEST HOLIDAYS",
  description:
    "Organize safe and curriculum-aligned educational tours for schools and colleges with SKY QUEST HOLIDAYS. Complete logistics, pushback buses, verified accommodations, and faculty care across South India.",
  alternates: {
    canonical: "https://sky-quest-holidays.web.app/educational-tours",
  },
  openGraph: {
    title: "Educational Tours for Schools & Colleges | SKY QUEST HOLIDAYS",
    description:
      "Expert educational tour operators organizing experiential school field trips, science tours, and college study excursions across South India.",
    url: "https://sky-quest-holidays.web.app/educational-tours",
    siteName: "SKY QUEST HOLIDAYS",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Educational Tours for Schools & Colleges | SKY QUEST HOLIDAYS",
    description:
      "Curriculum-aligned educational tours with student safety, faculty care, and private transport across Tamil Nadu, Kerala & Karnataka.",
  },
};

export default function EducationalToursPage() {
  const packages = INITIAL_PACKAGES.filter(
    (p) =>
      p.category === "college" ||
      p.id.includes("munnar") ||
      p.id.includes("ooty") ||
      p.id.includes("cochin")
  ).slice(0, 8);

  const guideSections: SeoGuideSection[] = [
    {
      title: "Purpose-Driven Educational Tours for Schools and Colleges",
      subtitle: "Transforming Textbooks into Real-World Experiential Learning",
      content:
        "At SKY QUEST HOLIDAYS, we believe that education extends far beyond classroom walls. Our educational tours are thoughtfully planned to blend academic learning, cultural immersion, and nature exploration with the highest standards of student safety.\n\nFrom ecological and botanical studies in Munnar's high-altitude biodiversity reserves to heritage architecture tours in Mysore, aerospace science centers in Bangalore, and tea factory processing tours, we craft itineraries that align with academic curricula while giving students an unforgettable shared adventure with their classmates and teachers.",
      bullets: [
        "Curriculum-aligned itineraries for science, engineering, arts, and humanities students",
        "Strict student safety protocols with 24/7 dedicated on-tour managers",
        "Separate, premium executive room accommodations and dedicated care for teachers and professors",
        "Hygienic South and North Indian buffet meals prepared in certified hotel kitchens",
      ],
    },
    {
      title: "Key Learning Themes Covered in Our Educational Tours",
      subtitle: "Hands-on Learning Integrated with Sightseeing",
      content:
        "1. Environmental & Ecological Studies: Eravikulam National Park (endangered Nilgiri Tahr habitat), Periyar Tiger Reserve biodiversity, and mangrove conservation in Kerala.\n2. Agriculture & Agro-Processing: High-altitude tea manufacturing plants, spice plantations in Thekkady, and organic coffee processing in Coorg.\n3. Historical & Architectural Heritage: Mysore Palace, Padmanabhapuram Wooden Palace, Tipu Sultan's Fort in Srirangapatna, and Madurai Meenakshi Temple.\n4. Science & Technology: Visvesvaraya Industrial and Technological Museum in Bangalore, Planetariums, and hydroelectric power project viewpoints.",
    },
    {
      title: "Safety, Supervision & Medical Preparedness",
      subtitle: "Why School Principals and College HODs Rely on Us",
      content:
        "Managing groups of young learners requires strict discipline and medical preparedness. All our transport vehicles feature speed governors, first aid kits, experienced long-distance commercial drivers, and verified working mobile contacts. Resorts and hotels selected for educational groups undergo strict security screening, ensuring gated perimeters, separate floors for male and female students, and round-the-clock staff availability.",
    },
  ];

  const faqs: SeoFaq[] = [
    {
      q: "What is included in an educational tour organized by SKY QUEST HOLIDAYS?",
      a: "Our educational tour packages include private luxury AC bus transport, verified student hotel/resort accommodations, nutritious breakfast, lunch, and dinner, entry tickets to museums, national parks, and botanical gardens, official visit documentation, and a full-time on-tour manager.",
    },
    {
      q: "How do you ensure student safety on educational tours?",
      a: "We implement multi-layered safety: pre-screened hotels with gated boundaries, separate room wings for boys and girls, executive rooms for staff coordinators, speed-regulated pushback buses, on-board first aid kits, and 24/7 tour manager supervision.",
    },
    {
      q: "Can schools and colleges customize the educational itinerary?",
      a: "Yes. We work closely with the principal, department heads, or student committees to tailor the days, learning destinations, meal timings, and budget requirements.",
    },
    {
      q: "Do you arrange formal permission letters for institutional visits?",
      a: "Yes. We assist institutions with official visit coordination, industry liaison letters, and advance entry slot bookings for educational landmarks.",
    },
    {
      q: "How do institutions request an educational tour quotation?",
      a: "Contact our educational tour team at +91 73387 10611 or email skyquestholidays@gmail.com with your student count, faculty count, tentative dates, and preferred destinations for a customized proposal.",
    },
  ];

  const relatedLinks = [
    { title: "Educational Tour Packages", href: "/educational-tour-packages" },
    { title: "Industrial Visit Packages", href: "/industrial-visit-packages" },
    { title: "College Tour Packages", href: "/college-tour-packages" },
    { title: "Student Tour Packages", href: "/student-tour-packages" },
    { title: "Tour Operators in Tamil Nadu", href: "/tour-operators-tamil-nadu" },
    { title: "Group Tour Packages", href: "/group-tour-packages" },
    { title: "All Tour Packages", href: "/tour-packages" },
  ];

  return (
    <SeoLandingPage
      slug="educational-tours"
      pageTitle="Educational Tours for Schools & Colleges | SKY QUEST HOLIDAYS"
      pageDescription="Curriculum-aligned educational tours for schools and colleges across South India. High safety standards, luxury transport, verified stays, and faculty hospitality."
      h1="Educational Tours & Field Trips for Schools and Colleges"
      badgeText="Curriculum-Aligned Experiential Learning"
      heroSubtitle="Inspiring field trips, science tours, and nature excursions with certified luxury pushback buses, verified student accommodations, and 24/7 tour coordination."
      packages={packages}
      guideSections={guideSections}
      faqs={faqs}
      relatedLinks={relatedLinks}
      searchIntent="Commercial"
      serviceType="Educational Tour Planning Services"
    />
  );
}
