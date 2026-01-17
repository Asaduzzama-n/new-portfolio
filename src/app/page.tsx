import dynamic from 'next/dynamic';
import Navigation from '@/components/ui/Navigation';

// Dynamic imports for code splitting
const Hero = dynamic(() => import('@/components/sections/Hero'));
const Projects = dynamic(() => import('@/components/sections/Projects'));
const About = dynamic(() => import('@/components/sections/About'));
const Services = dynamic(() => import('@/components/sections/Services'));
const Testimonials = dynamic(() => import('@/components/sections/Testimonials'));
const FAQ = dynamic(() => import('@/components/sections/FAQ'));
const Blog = dynamic(() => import('@/components/sections/Blog'));
const Contact = dynamic(() => import('@/components/sections/Contact'));
const Footer = dynamic(() => import('@/components/sections/Footer'));
const Process = dynamic(() => import('@/components/sections/Process'));

export default function Home() {
  return (
    <div className="relative min-h-screen">
      <Navigation />
      <main className="relative z-10 bg-[#1C1C1C] mb-[500px] md:mb-[600px] rounded-b-4xl">
        <Hero />
        <About />
        <Process />
        <Projects />
        <Services />
        <Testimonials />
        <FAQ />
        <Blog />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
