import HeroSection from '@/components/sections/Hero';
import AboutSection from '@/components/sections/About';
import ServicesSection from '@/components/sections/Services';
import QuoteBannerSection from '@/components/sections/QuoteBanner';
import TestimonialsSection from '@/components/sections/Testimonials';
import BlogSection from '@/components/sections/Blog';

export default function Home() {
  return (
    <main className="flex flex-col">
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <QuoteBannerSection />
      <TestimonialsSection />
      <BlogSection />
    </main>
  );
}
