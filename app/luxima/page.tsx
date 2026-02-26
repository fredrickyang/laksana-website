"use client";
import HeroSection from '@/components/luxima/HeroSection';
import AboutSection from '@/components/luxima/AboutSection';
import SectionViewCarousel from '@/components/luxima/SectionViewCarousel';
// import ProjectsSection from '@/components/luxima/ProjectsSection';
// import ContactSection from '@/components/luxima/ContactSection';
import ProductsSection from '@/components/luxima/ProductsSection';
import FacilitySection from '@/components/luxima/FacilitySection';
import SpecificationSection from '@/components/luxima/SpecificationSection';


export default function LuximaPage() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <SectionViewCarousel />
      <ProductsSection />
      <FacilitySection />
      <SpecificationSection />
      {/* <ProjectsSection /> */}
      {/* <ContactSection /> */}
    </main>
  );
} 