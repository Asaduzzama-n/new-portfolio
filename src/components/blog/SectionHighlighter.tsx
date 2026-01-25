'use client';

import React, { useEffect, useState, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';

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
    const itemRefs = useRef<{ [key: string]: HTMLLIElement | null }>({});

    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '-10% 0px -80% 0px',
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

    // Calculate marker position and height
    const markerStyle = useMemo(() => {
        if (!activeId || Object.keys(itemRefs.current).length === 0) return null;

        const activeIndex = sections.findIndex(s => s.id === activeId);
        if (activeIndex === -1) return null;

        const activeSection = sections[activeIndex];
        const activeEl = itemRefs.current[activeId];
        if (!activeEl) return null;

        let height = 24; // Default height for a single item

        // If it's a parent (level 1 or 2), find the "scope" of its children
        if (activeSection.level < 3) {
            let lastChildIndex = activeIndex;
            for (let i = activeIndex + 1; i < sections.length; i++) {
                if (sections[i].level > activeSection.level) {
                    lastChildIndex = i;
                } else {
                    break;
                }
            }

            if (lastChildIndex > activeIndex) {
                const lastChildEl = itemRefs.current[sections[lastChildIndex].id];
                if (lastChildEl) {
                    const top = activeEl.offsetTop;
                    const bottom = lastChildEl.offsetTop + lastChildEl.offsetHeight;
                    height = bottom - top;
                }
            }
        }

        return {
            top: activeEl.offsetTop,
            height: height
        };
    }, [activeId, sections]);

    if (sections.length === 0) return null;

    return (
        <div className="relative pl-6 py-2 ">
            {/* Background Line */}
            {/* <div className="absolute left-[-1px] top-0 bottom-0 w-[1px] bg-white/5" /> */}

            {/* Active Marker Line */}
            {markerStyle && (
                <motion.div
                    layout
                    className="absolute left-[-1.5px] w-[2px] bg-white shadow-[0_0_15px_rgba(255,255,255,0.4)] rounded-full z-20"
                    initial={false}
                    animate={{
                        top: markerStyle.top,
                        height: markerStyle.height,
                        opacity: 1
                    }}
                    transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 35
                    }}
                />
            )}

            <ul className="space-y-6">
                {sections.map((section) => (
                    <li
                        key={section.id}
                        ref={(el) => { itemRefs.current[section.id] = el; }}
                        className={`transition-all duration-300 flex items-center ${section.level === 3 ? 'pl-4' : 'pl-0'
                            }`}
                        style={{ height: '1.5rem' }}
                    >
                        <button
                            onClick={() => scrollToSection(section.id)}
                            className={`group inline-block w-full text-left text-sm transition-all duration-300 whitespace-nowrap overflow-hidden text-ellipsis ${activeId === section.id
                                ? 'text-white font-medium'
                                : 'text-white/40 hover:text-white/60'
                                }`}
                            title={section.title}
                        >
                            {section.title}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SectionHighlighter;
