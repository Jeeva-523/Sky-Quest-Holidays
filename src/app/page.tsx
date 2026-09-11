import Hero from "@/components/Hero";
import PackagesSection from "@/components/PackagesSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import GallerySection from "@/components/GallerySection";
import AboutSection from "@/components/AboutSection";
import Testimonials from "@/components/Testimonials";
import FaqSection from "@/components/FaqSection";
import ContactForm from "@/components/ContactForm";

export default function Home() {
  return (
    <>
      <Hero />
      <PackagesSection />
      <WhyChooseUs />
      <GallerySection />
      <AboutSection />
      <Testimonials />
      <FaqSection />
      <ContactForm />
    </>
  );
}
