import type { Metadata } from "next";
import SeoLandingPage, { SeoGuideSection, SeoFaq } from "@/components/SeoLandingPage";
import { INITIAL_PACKAGES } from "@/lib/data";

export const metadata: Metadata = {
  title: "Tour Packages in Namakkal & Tamil Nadu | SKY QUEST HOLIDAYS",
  description:
    "Explore the best tour packages in Namakkal and Tamil Nadu with SKY QUEST HOLIDAYS. 22+ handpicked holiday packages to Kerala, Ooty, Kodaikanal, Goa, Coorg & Mysore with private AC cabs.",
  alternates: {
    canonical: "https://sky-quest-holidays.web.app/tour-packages",
  },
  openGraph: {
    title: "Tour Packages in Namakkal | SKY QUEST HOLIDAYS",
    description:
      "Browse 22+ custom holiday packages across South India starting from Namakkal and Tamil Nadu. Private AC cabs and verified hotels.",
    url: "https://sky-quest-holidays.web.app/tour-packages",
    siteName: "SKY QUEST HOLIDAYS",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tour Packages in Namakkal | SKY QUEST HOLIDAYS",
    description:
      "Discover the best holiday packages in Tamil Nadu. Custom trips to Kerala, Karnataka, and Tamil Nadu hill stations.",
  },
};

export default function TourPackagesHubPage() {
  // Show all available packages
  const packages = INITIAL_PACKAGES;

  const guideSections: SeoGuideSection[] = [
    {
      title: "Best Tour Packages in Namakkal & Tamil Nadu",
      subtitle: "22+ Curated Domestic Holidays & Customized South India Itineraries",
      content:
        "SKY QUEST HOLIDAYS is your one-stop tour operator in Namakkal, Tamil Nadu for all domestic and South Indian holiday packages. Whether you are seeking the misty tea valleys of Munnar, serene backwater houseboats of Alleppey, royal palaces of Mysore, wildlife adventures in Dandeli, or sun-drenched beaches of Goa, we provide completely organized holiday experiences with private sanitized vehicles and certified resort stays.\n\nEvery package listed in our collection can be customized around your specific travel dates, group size, and preferred hotel standard.",
      bullets: [
        "22+ fixed and customizable tour itineraries across Kerala, Tamil Nadu, Karnataka & Goa",
        "Doorstep private AC vehicle pickup from Namakkal, Salem, Erode, Trichy, and Coimbatore",
        "Transparent pricing: vehicle, driver allowances, fuel, tolls, and taxes included",
        "Special group discounts for college industrial visits, joint families, and corporate outings",
      ],
    },
    {
      title: "Explore Tour Categories by Region",
      subtitle: "Find the Perfect Itinerary for Your Vacation",
      content:
        "1. Kerala Tour Packages: Cochin – Munnar (2D/1N), Cochin – Vagamon (2D/1N), Munnar – Alleppey Houseboat (3D/2N), Wayanad Nature Retreat (3D/2N), and Athirappilly Falls.\n2. Tamil Nadu Hill Stations & Heritage: Ooty – Coonoor (2D/1N & 3D/2N), Kodaikanal Princess of Hills (3D/2N), Yercaud Lake Tour, and Rameshwaram – Kanyakumari coastal pilgrimage.\n3. Karnataka Coffee & Heritage: Bangalore – Mysore – Coorg (3D/2N), Chikmagalur Peak & Coffee Trek (3D/2N), Dandeli River Rafting (3D/2N).\n4. Goa Beach & Youth Tours: 4-day student and family packages with beach shacks, watersports, and Old Goa heritage tours.\n5. College Industrial Visits (IV): Customized 3 to 5-day educational packages with luxury buses, DJ nights, and campfire parties.",
      bullets: [
        "Kerala: Munnar, Vagamon, Alleppey, Wayanad, Thekkady",
        "Tamil Nadu: Ooty, Kodaikanal, Yercaud, Rameshwaram, Kanyakumari",
        "Karnataka: Coorg, Mysore, Chikmagalur, Dandeli, Bangalore",
        "Goa: North Goa Beaches, South Goa Heritage, Mandovi River Cruise",
      ],
    },
    {
      title: "Personalized Itineraries & Transparent Pricing",
      subtitle: "How We Deliver 100% Customer Satisfaction",
      content:
        "At SKY QUEST HOLIDAYS, we never believe in a one-size-fits-all approach. When you reach out to our Namakkal travel desk, a dedicated holiday planner works with you to choose the ideal accommodation (Standard 3-Star, Deluxe 4-Star, or Luxury Private Villas), optimize sightseeing hours, and select comfortable transport (Sedan, Ertiga, Innova Crysta, Tempo Traveller, or 50-seater Bus). You receive an official PDF quotation detailing every inclusion before you make any payment.",
    },
  ];

  const faqs: SeoFaq[] = [
    {
      q: "What are the most popular tour packages from Namakkal?",
      a: "Our most booked packages from Namakkal are Cochin-Munnar (2D/1N), Cochin-Vagamon (2D/1N), Munnar-Alleppey Houseboat (3D/2N), Ooty-Coonoor (2D/1N & 3D/2N), and Bangalore-Mysore-Coorg (3D/2N).",
    },
    {
      q: "Are the package prices per person or for the entire group/couple?",
      a: "Our standard packages are priced based on double-sharing / group occupancy and clearly itemize both per-person and total package costs. Contact us for custom group rates.",
    },
    {
      q: "Can I customize the pickup location if I live outside Namakkal?",
      a: "Yes! While our headquarters is in Namakkal, we provide private doorstep cab pickup from Salem, Erode, Tirupur, Coimbatore, Trichy, Karur, and Chennai.",
    },
    {
      q: "What is included in SKY QUEST HOLIDAYS tour packages?",
      a: "All packages include dedicated private sanitized AC transportation, fuel, driver allowances (beta), toll gates, parking charges, hotel/resort accommodations, and daily complimentary breakfast.",
    },
    {
      q: "How can I request a customized tour package quotation?",
      a: "You can click on any package card above to submit an enquiry, or call/WhatsApp our Namakkal team at +91 73387 10611 for an instant quote.",
    },
  ];

  const relatedLinks = [
    { title: "Best Travel Agency in Namakkal", href: "/namakkal-travel-agency" },
    { title: "College Tour Packages", href: "/college-tour-packages" },
    { title: "Kerala Tour Packages", href: "/kerala-tour-packages" },
    { title: "Munnar Tour Packages", href: "/munnar-tour-packages" },
    { title: "Vagamon Tour Packages", href: "/vagamon-tour-packages" },
    { title: "Ooty Tour Packages", href: "/ooty-tour-packages" },
    { title: "Family Tour Packages", href: "/family-tour-packages" },
  ];

  return (
    <SeoLandingPage
      slug="tour-packages"
      pageTitle="Tour Packages in Namakkal & Tamil Nadu | SKY QUEST HOLIDAYS"
      pageDescription="Explore the best tour packages in Namakkal and Tamil Nadu with SKY QUEST HOLIDAYS. 22+ handpicked holiday packages to Kerala, Ooty, Kodaikanal, Goa, Coorg & Mysore."
      h1="Tour Packages in Namakkal & Tamil Nadu"
      badgeText="22+ Bestselling Holiday Itineraries"
      heroSubtitle="Find your dream vacation with South India's top-rated tour operator. Private AC cab transportation, verified hotel stays, and transparent all-inclusive billing."
      packages={packages}
      guideSections={guideSections}
      faqs={faqs}
      relatedLinks={relatedLinks}
      searchIntent="Commercial"
    />
  );
}
