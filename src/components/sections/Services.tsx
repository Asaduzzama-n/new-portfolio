'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import React, { useRef } from 'react';
import Image from 'next/image';
import SectionHeader from '@/components/ui/SectionHeader';

const services = [
    {
        title: "Software Development",
        description: "Building high-performance, robust applications using modern frameworks like Next.js, React, and Node.js, ensuring security and long-term stability.",
        src: "/services/software_dev_v2.png",
    },
    {
        title: "Maintenance Support",
        description: "Providing ongoing technical support and maintenance to ensure your software remains secure, updated, and optimized for performance.",
        src: "/services/maintenance_support_v2.png",
    },
    {
        title: "Project Management",
        description: "Providing end-to-end project management using tools like Jira and Trello, ensuring milestones are met and communication is seamless.",
        src: "/services/project_management_v2.png",
    },
    {
        title: "API Development",
        description: "Designing and implementing scalable RESTful and GraphQL APIs that power modern web and mobile applications.",
        src: "/services/api_development_v2.png",
    },
    {
        title: "Consultancy",
        description: "Strategic technical consulting to help you choose the right stack, optimize your development workflow, and solve complex architectural challenges.",
        src: "/services/consultancy_v2.png",
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
                    subtitle="Technical solutions tailored to your complex software and infrastructure needs."
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
