'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import React, { useRef } from 'react';
import Image from 'next/image';
import SectionHeader from '@/components/ui/SectionHeader';

const services = [
    {
        title: "Web Development",
        description: "Building high-performance, responsive websites using modern frameworks like Next.js and React, ensuring speed, security, and scalability.",
        src: "/services/web.png",
    },
    {
        title: "App Development",
        description: "Creating intuitive, cross-platform mobile applications that provide native experiences and leverage the latest mobile technologies.",
        src: "/services/app.png",
    },
    {
        title: "AI Applications",
        description: "Integrating cutting-edge AI and machine learning solutions into your workflows to automate processes and provide intelligent insights.",
        src: "/services/app.png",
    },
    {
        title: "Maintenance",
        description: "Comprehensive support and updates for your digital products, including performance optimization, bug fixes, and feature enhancements.",
        src: "/services/web.png",
    },
    {
        title: "MVP Prototype",
        description: "Rapidly building functional prototypes and MVPs to validate your ideas and test market viability with minimal investment.",
        src: "/services/app.png",
    },
    {
        title: "Project Management",
        description: "Streamlined project delivery through agile methodologies, ensuring clear communication, milestone tracking, and on-time completion.",
        src: "/services/web.png",
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
    const isEven = i % 2 === 0;

    return (
        <div className="sticky top-[15vh] flex items-center justify-center w-full mb-12">
            <motion.div
                style={{
                    scale,
                    top: `calc(${i * 25}px)`,
                }}
                className="relative flex flex-col md:grid md:grid-cols-2 h-[500px] md:h-[500px] w-full bg-secondary rounded-[40px]  overflow-hidden origin-top"
            >
                {/* Content Side */}
                <div className={`w-full p-10 md:p-16 flex flex-col justify-center ${!isEven ? 'md:order-2' : ''}`}>
                    <span className="text-white/40 font-mono text-sm mb-6">[ 0{i + 1} ]</span>
                    <h3 className="text-4xl md:text-5xl font-custom-2 text-white mb-6 leading-tight">
                        {title}
                    </h3>
                    <p className="text-lg text-white/50 font-sans leading-relaxed">
                        {description}
                    </p>
                </div>

                {/* Image Side */}
                <div className={`hidden md:flex relative bg-primary/30 items-center justify-center overflow-hidden ${!isEven ? 'md:order-1' : ''}`}>
                    <div className="relative w-full h-full transform group-hover:scale-110 transition-transform duration-700">
                        <Image
                            src={src}
                            alt={title}
                            fill
                            className="object-cover"
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
                        className="object-cover"
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
