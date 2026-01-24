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
const Journey = dynamic(() => import('@/components/sections/Journey'));
const Technologies = dynamic(() => import('@/components/sections/Technologies'));

export default function Home() {
  return (
    <div className="relative min-h-screen">
      <main className="relative z-10 bg-[#1C1C1C] mb-[500px] md:mb-[700px] rounded-b-[60px] md:rounded-b-[100px]">
        <Hero />
        <div className="overflow-x-clip">
          <About />
          <Process />
          <Journey />
          <Technologies />
          {/* <Projects /> */}
        </div>
        <Services />
        <Testimonials />
        <FAQ />
        {/* <Blog /> */}
        <Contact />
      </main>
    </div>
  );
}
