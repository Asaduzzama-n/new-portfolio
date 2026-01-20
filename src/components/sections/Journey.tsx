'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import SectionHeader from '../ui/SectionHeader';

gsap.registerPlugin(ScrollTrigger);

export default function Journey() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const pinRef = useRef<HTMLDivElement>(null);
    const path1Ref = useRef<SVGPathElement>(null);
    const path2Ref = useRef<SVGPathElement>(null);

    useEffect(() => {
        let mm = gsap.matchMedia();

        mm.add("(min-width: 768px)", () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: pinRef.current,
                    start: 'top top',
                    end: '+=300%',
                    pin: true,
                    scrub: 1,
                    anticipatePin: 1
                },
            });

            // Initial states
            gsap.set('.milestone-box', { opacity: 0, y: 30 });
            gsap.set('.path-svg', { opacity: 0 });
            gsap.set('.arrow-marker', { opacity: 0 });

            tl.to('.milestone-today', { opacity: 1, y: 0, duration: 2 })
                .to('.path-1', { opacity: 1, duration: 1 }, '-=1')
                .fromTo(path1Ref.current, { strokeDashoffset: 1000, strokeDasharray: 1000 }, { strokeDashoffset: 0, duration: 4 })
                .to('.arrow-1', { opacity: 1, duration: 0.5 }) // Arrow appears after path draws
                .to('.milestone-yesterday', { opacity: 1, y: 0, duration: 2 }, '-=1')
                .to('.path-2', { opacity: 1, duration: 1 }, '-=1')
                .fromTo(path2Ref.current, { strokeDashoffset: 1000, strokeDasharray: 1000 }, { strokeDashoffset: 0, duration: 4 })
                .to('.arrow-2', { opacity: 1, duration: 0.5 }) // Arrow appears after path draws
                .to('.milestone-tomorrow', { opacity: 1, y: 0, duration: 2 }, '-=1');
        });

        mm.add("(max-width: 767px)", () => {
            // Simple mobile reveal - no pinning
            const boxes = gsap.utils.toArray('.milestone-box');
            boxes.forEach((box: any) => {
                gsap.fromTo(box,
                    { opacity: 0, y: 30 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        scrollTrigger: {
                            trigger: box,
                            start: 'top 85%',
                        }
                    }
                );
            });
        });

        return () => mm.revert();
    }, []);

    return (
        <section ref={sectionRef} className="relative text-white py-24 mb-24">
            {/* Section Header */}
            <div className="px-6 max-w-6xl mx-auto">
                <SectionHeader
                    label="Journey"
                    title="The Roadmap"
                    subtitle="Where I've been and where I'm going."
                />
            </div>

            <div ref={pinRef} className="min-h-screen md:h-screen w-full relative flex flex-col items-center justify-center overflow-hidden px-6 py-12 md:py-0">

                {/* Max-Width Container */}
                <div className="max-w-6xl mx-auto w-full h-full relative z-10">

                    {/* TODAY (Top Left) */}
                    <div className="milestone-box milestone-today md:absolute md:top-[15%] md:left-[5%] max-w-[280px] mb-8 md:mb-0 text-center md:text-left mx-auto md:mx-0">
                        <div className="relative inline-block mb-3">
                            <h2 className="text-3xl md:text-4xl font-custom tracking-wide uppercase">Today</h2>
                            <svg className="absolute -bottom-1 left-0 w-full h-3" viewBox="0 0 100 12" preserveAspectRatio="none">
                                <path d="M0,6 Q25,2 50,6 T100,6" fill="none" stroke="#ffffff" strokeWidth="3" />
                            </svg>
                        </div>
                        <p className="text-lg font-custom-2 font-semibold mb-1">Keep it accurate.</p>
                        <p className="text-sm text-white/70 leading-relaxed font-sans">
                            [day-to day operations handled, records accurate, compliance sorted]
                        </p>
                        <div className="mt-4 inline-flex items-center gap-1.5">
                            <span className="text-white/60 font-mono text-lg">⌜</span>
                            <span className="text-xs tracking-widest font-medium">Help me start</span>
                            <span className="text-white/60 font-mono text-lg">⌟</span>
                        </div>
                    </div>

                    {/* Mobile Arrow 1 */}
                    <div className="md:hidden flex justify-center mb-8">
                        <svg width="40" height="60" viewBox="0 0 40 60" className="text-white/40">
                            <path d="M20,5 C20,25 15,35 20,55" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
                            <polygon points="20,55 15,48 25,48" fill="currentColor" />
                        </svg>
                    </div>

                    {/* YESTERDAY (Center) */}
                    <div className="milestone-box milestone-yesterday md:absolute md:top-[40%] md:left-1/2 md:-translate-x-1/2 max-w-[320px] text-center mb-8 md:mb-0 mx-auto">
                        <div className="relative inline-block mb-3">
                            <h2 className="text-3xl md:text-4xl font-custom tracking-wide uppercase">Yesterday</h2>
                            <svg className="absolute -bottom-1 left-0 w-full h-3" viewBox="0 0 100 12" preserveAspectRatio="none">
                                <path d="M0,6 Q25,10 50,6 T100,6" fill="none" stroke="#ffffff" strokeWidth="3" />
                            </svg>
                        </div>
                        <p className="text-lg font-custom-2 font-semibold mb-1">Know where you stand.</p>
                        <p className="text-sm text-white/70 leading-relaxed font-sans">
                            [reports and KPIs to track your progress and performance]
                        </p>
                        <div className="mt-4 inline-flex items-center gap-1.5">
                            <span className="text-white/60 font-mono text-lg">⌜</span>
                            <span className="text-xs tracking-widest font-medium">Help me level up</span>
                            <span className="text-white/60 font-mono text-lg">⌟</span>
                        </div>
                    </div>

                    {/* Mobile Arrow 2 */}
                    <div className="md:hidden flex justify-center mb-8">
                        <svg width="40" height="60" viewBox="0 0 40 60" className="text-white/40">
                            <path d="M20,5 C20,25 25,35 20,55" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
                            <polygon points="20,55 15,48 25,48" fill="currentColor" />
                        </svg>
                    </div>

                    {/* TOMORROW (Bottom Right) */}
                    <div className="milestone-box milestone-tomorrow md:absolute md:bottom-[15%] md:right-[5%] max-w-[280px] text-center md:text-right mx-auto md:mx-0">
                        <div className="relative inline-block mb-3">
                            <h2 className="text-3xl md:text-4xl font-custom tracking-wide uppercase">Tomorrow</h2>
                            <svg className="absolute -bottom-1 left-0 w-full h-3" viewBox="0 0 100 12" preserveAspectRatio="none">
                                <path d="M0,6 Q25,2 50,6 T100,6" fill="none" stroke="#ffffff" strokeWidth="3" />
                            </svg>
                        </div>
                        <p className="text-lg font-custom-2 font-semibold mb-1">The Digital Horizon.</p>
                        <p className="text-sm text-white/70 leading-relaxed font-sans">
                            [Next-gen cloud-native systems & cross-platform high-perf mobile]
                        </p>
                        <div className="mt-4 inline-flex items-center gap-1.5 md:justify-end">
                            <span className="text-white/60 font-mono text-lg">⌜</span>
                            <span className="text-xs tracking-widest font-medium">Future State</span>
                            <span className="text-white/60 font-mono text-lg">⌟</span>
                        </div>
                    </div>

                    {/* SVG Connections (Desktop Only) */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 hidden md:block" viewBox="0 0 1000 700" preserveAspectRatio="xMidYMid meet">
                        {/* Today -> Yesterday: Curved arrow going down and right */}
                        <path
                            ref={path1Ref}
                            className="path-svg path-1"
                            d="M 140,260 C 180,350 250,550 400,480 C 420,470 440,460 450,450"
                            stroke="#ffffff"
                            strokeWidth="3"
                            strokeDasharray="1000"
                            strokeDashoffset="1000"
                            strokeLinecap="round"
                            fill="none"
                        />
                        {/* Arrowhead for path 1 */}
                        <path
                            className="arrow-marker arrow-1"
                            d="M 445,445 L 460,455 L 448,460"
                            stroke="#ffffff"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            fill="none"
                            opacity="0"
                        />

                        {/* Yesterday -> Tomorrow: Loopy curve going right */}
                        <path
                            ref={path2Ref}
                            className="path-svg path-2"
                            d="M 560,380 C 650,380 700,280 680,220 C 660,160 750,350 850,480"
                            stroke="#ffffff"
                            strokeWidth="3"
                            strokeDasharray="1000"
                            strokeDashoffset="1000"
                            strokeLinecap="round"
                            fill="none"
                        />
                        {/* Arrowhead for path 2 */}
                        <path
                            className="arrow-marker arrow-2"
                            d="M 845,475 L 860,490 L 848,495"
                            stroke="#ffffff"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            fill="none"
                            opacity="0"
                        />
                    </svg>

                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-40 hidden md:block">
                    <div className="w-5 h-8 border-2 border-white rounded-full flex justify-center p-1">
                        <motion.div
                            animate={{ y: [0, 8, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="w-1 h-2 bg-white rounded-full"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
