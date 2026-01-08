'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import React, { useRef } from 'react';
import Image from 'next/image';
import SectionHeader from '@/components/ui/SectionHeader';

const services = [
    {
        title: "Brand Identity",
        description: "Crafting unique visual identities that tell your story and resonate with your target audience through color, typography, and strategy.",
        src: "/services/brand.png",
    },
    {
        title: "Web Design",
        description: "Designing high-performance, conversion-focused websites that look stunning on every device and provide a seamless user experience.",
        src: "/services/web.png",
    },
    {
        title: "UI/UX Strategy",
        description: "Deep-diving into user behavior to create intuitive interfaces that are not only beautiful but also accessible and highly functional.",
        src: "/services/ux.png",
    },
    {
        title: "Creative Direction",
        description: "Strategic guidance to ensure your brand's visual communication is consistent and powerful across all digital and physical touchpoints.",
        src: "/services/brand.png",
    },
];

const StickyCard = ({
    i,
    title,
    src,
    description,
    progress,
    range,
    targetScale,
}: {
    i: number;
    title: string;
    src: string;
    description: string;
    progress: any;
    range: [number, number];
    targetScale: number;
}) => {
    const scale = useTransform(progress, range, [1, targetScale]);

    return (
        <div className="sticky top-[15vh] flex items-center justify-center w-full mb-12">
            <motion.div
                style={{
                    scale,
                    top: `calc(${i * 25}px)`,
                }}
                className="relative flex flex-col md:flex-row h-[500px] md:h-[450px] w-full bg-secondary rounded-[40px] border border-white/5 overflow-hidden origin-top"
            >
                {/* Content Side */}
                <div className="w-full md:w-1/2 p-10 md:p-16 flex flex-col justify-center">
                    <span className="text-white/40 font-mono text-sm mb-6">[ 0{i + 1} ]</span>
                    <h3 className="text-4xl md:text-5xl font-custom-2 text-white mb-6 leading-tight">
                        {title}
                    </h3>
                    <p className="text-lg text-white/50 font-sans leading-relaxed">
                        {description}
                    </p>
                </div>

                {/* Image Side */}
                <div className="hidden md:flex w-1/2 relative bg-primary/30 items-center justify-center p-12 overflow-hidden">
                    <div className="relative w-full h-full transform group-hover:scale-110 transition-transform duration-700">
                        <Image
                            src={src}
                            alt={title}
                            fill
                            className="object-contain p-8"
                        />
                    </div>
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-secondary/50 to-transparent pointer-events-none" />
                </div>

                {/* Mobile Image (Bottom) */}
                <div className="md:hidden flex-1 relative bg-primary/20">
                    <Image
                        src={src}
                        alt={title}
                        fill
                        className="object-contain p-12"
                    />
                </div>
            </motion.div>
        </div>
    );
};

export default function Services() {
    const container = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start start", "end end"],
    });

    return (
        <section id="services" ref={container} className="relative py-24 px-4 overflow-visible">
            <div className="max-w-7xl mx-auto">
                <SectionHeader
                    label="Services"
                    title="What I Bring to the Table"
                    subtitle="Strategic design solutions tailored to your unique brand needs."
                />

                <div className="mt-20 space-y-4 pb-[20vh]">
                    {services.map((service, i) => {
                        const targetScale = 1 - ((services.length - i - 1) * 0.05);
                        return (
                            <StickyCard
                                key={`s_${i}`}
                                i={i}
                                {...service}
                                progress={scrollYProgress}
                                range={[i * (1 / services.length), 1]}
                                targetScale={targetScale}
                            />
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
