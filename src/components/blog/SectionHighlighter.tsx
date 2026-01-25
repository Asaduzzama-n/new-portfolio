'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

interface Section {
    id: string;
    title: string;
    level: number;
}

interface SectionHighlighterProps {
    sections: Section[];
}

const SectionHighlighter: React.FC<SectionHighlighterProps> = ({ sections }) => {
    const [activeId, setActiveId] = useState<string>('');
    const { scrollYProgress } = useScroll();
    const containerRef = useRef<HTMLDivElement>(null);
    const [lineHeight, setLineHeight] = useState(0);

    // Smooth the scroll progress for the SVG line
    const scaleY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    useEffect(() => {
        if (containerRef.current) {
            setLineHeight(containerRef.current.offsetHeight);
        }
    }, [sections]);

    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '-10% 0px -85% 0px', // Adjusted for better accuracy
            threshold: 0
        };

        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveId(entry.target.id);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        sections.forEach((section) => {
            const element = document.getElementById(section.id);
            if (element) {
                observer.observe(element);
            }
        });

        return () => {
            observer.disconnect();
        };
    }, [sections]);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            const offset = 120;
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = element.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    if (sections.length === 0) return null;

    return (
        <div ref={containerRef} className="relative pl-4">
            {/* Background Line */}
            <div
                className="absolute left-[7px] top-2 bottom-2 w-[1px] bg-white/5 rounded-full"
                style={{ height: lineHeight > 0 ? `${lineHeight - 16}px` : '100%' }}
            />

            {/* Progress Line */}
            <motion.div
                className="absolute left-[7px] top-2 w-[1px] bg-white origin-top rounded-full"
                style={{
                    scaleY,
                    height: lineHeight > 0 ? `${lineHeight - 16}px` : '100%',
                }}
            />

            <ul className="space-y-4 relative z-10">
                {sections.map((section) => (
                    <li
                        key={section.id}
                        className={`transition-none ${section.level === 3 ? 'ml-6' : 'ml-0'
                            }`}
                    >
                        <button
                            onClick={() => scrollToSection(section.id)}
                            className={`group flex items-start text-left ${activeId === section.id
                                    ? 'text-white'
                                    : 'text-white/20'
                                }`}
                        >
                            {/* Marker Dot */}
                            <div className="relative flex items-center justify-center mr-4 mt-[6px] shrink-0">
                                {section.level === 1 || section.level === 2 ? (
                                    <div className={`w-[7px] h-[7px] rounded-full border ${activeId === section.id
                                            ? 'bg-white border-white'
                                            : 'bg-transparent border-white/10'
                                        }`} />
                                ) : (
                                    <div className={`w-[3px] h-[3px] rounded-full ${activeId === section.id
                                            ? 'bg-white/60'
                                            : 'bg-white/5'
                                        }`} />
                                )}
                            </div>

                            <span className={`text-[10px] font-bold uppercase tracking-[0.2em] leading-relaxed ${activeId === section.id
                                    ? 'opacity-100'
                                    : 'opacity-40'
                                } ${section.level === 3 ? 'text-[9px] font-medium tracking-widest' : ''}`}>
                                {section.title}
                            </span>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SectionHighlighter;
