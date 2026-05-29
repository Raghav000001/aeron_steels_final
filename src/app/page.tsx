import HeroSection from '@/components/sections/Hero';
import AboutSection from '@/components/sections/About';
import ServicesSection from '@/components/sections/Services';
import QuoteBannerSection from '@/components/sections/QuoteBanner';
import ExhibitionsSection from '@/components/sections/Testimonials';

export default function Home() {
  return (
    <main className="flex flex-col">
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <QuoteBannerSection />
      <ExhibitionsSection />
    </main>
  );
}
