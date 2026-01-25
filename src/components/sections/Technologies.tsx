'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionHeader from '@/components/ui/SectionHeader';

gsap.registerPlugin(ScrollTrigger);

const technologies = [
    'React',
    'Next.js',
    'NestJS',
    'TypeScript',
    'Node.js',
    'Python',
    'Django',
    'FastAPI',
    'PostgreSQL',
    'MySQL',
    'Redis',
    'BullMQ',
    'RabbitMQ',
    'Docker',
    'AWS',
    'Selenium',
    'Jest',
    'Swagger',
    'Redux',
    'Zustand',
    'Tailwind CSS',
    'Framer Motion',
    'GSAP',
    'React Native',
    'OpenAI',
    'LangChain',
    'GraphQL',
    'Git',
];

export default function Technologies() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const items = gsap.utils.toArray('.tech-item');

        // Set initial state - all items start from right
        gsap.set(items, {
            xPercent: 100,
            opacity: 0
        });

        // Create timeline with ScrollTrigger
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 80%',
                end: 'bottom 40%',
                scrub: 1,
            }
        });

        // Animate each item one after another
        items.forEach((item: any, index) => {
            tl.to(item, {
                xPercent: 0,
                opacity: 1,
                duration: 1,
                ease: 'power2.out',
            }, index * 0.1); // Stagger based on index
        });

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    return (
        <section id="technologies" className="py-24 px-4 overflow-hidden">
            <div className="max-w-6xl mx-auto">
                <SectionHeader
                    label="Technologies"
                    title="Tech Stack"
                    subtitle="The tools and technologies I use to bring ideas to life."
                />

                <div ref={sectionRef} className="mt-16">
                    <div
                        ref={containerRef}
                        className="flex flex-wrap justify-center gap-x-6 gap-y-4 md:gap-x-10 md:gap-y-6"
                    >
                        {technologies.map((tech, index) => (
                            <span
                                key={tech}
                                className="tech-item text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-custom text-white/50 hover:text-white transition-colors duration-300 cursor-default"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Bottom Decorative Line */}
                <div className="mt-16 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </div>
        </section>
    );
}
