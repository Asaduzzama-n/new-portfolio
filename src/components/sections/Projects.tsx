'use client';

import { motion } from 'framer-motion';
import SectionHeader from '@/components/ui/SectionHeader';
import { fadeUp, slideFromLeft, slideFromRight } from '@/lib/animations';
import Link from 'next/link';
import Image from 'next/image';

const projects = [
    {
        number: '01',
        title: 'Website Redesign',
        description: 'A clean, modern refresh for a creative agency — built for clarity, performance, and visual impact.',
        link: '#',
        image: '/projects/project-1.png',
        bgColor: 'bg-gradient-to-br from-[#4ea1fd] to-[#98c9ff]'
    },
    {
        number: '02',
        title: 'Brand Identity',
        description: 'Complete brand identity system including logo, color palette, typography, and brand guidelines.',
        link: '#',
        image: '/projects/project-1.png',
        bgColor: 'bg-gradient-to-br from-[#a18cd1] to-[#fbc2eb]'
    },
    {
        number: '03',
        title: 'E-commerce Platform',
        description: 'Full-stack e-commerce solution with seamless checkout experience and inventory management.',
        link: '#',
        image: '/projects/project-1.png',
        bgColor: 'bg-gradient-to-br from-[#84fab0] to-[#8fd3f4]'
    },
    {
        number: '04',
        title: 'Mobile App Design',
        description: 'User-centered mobile application design with intuitive navigation and engaging interactions.',
        link: '#',
        image: '/projects/project-1.png',
        bgColor: 'bg-gradient-to-br from-[#ff9a9e] to-[#fecfef]'
    },
];

export default function Projects() {
    return (
        <section id="projects" className="py-24 px-4 overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <SectionHeader
                    label="Projects"
                    title="Projects"
                    subtitle="Selected work in branding, web, and product design."
                />

                <div className="space-y-8">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.number}
                            variants={index % 2 === 0 ? slideFromLeft : slideFromRight}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: '-100px' }}
                            className="group"
                        >
                            <div className="grid md:grid-cols-2 bg-primary rounded-[40px] overflow-hidden transition-all duration-500">
                                {/* Content */}
                                <div className={`p-10 md:p-20 flex flex-col justify-center ${index % 2 === 1 ? 'md:order-2' : ''}`}>
                                    <span className="text-white/80 font-custom text-4xl mb-8 tracking-tighter">[ {project.number} ]</span>
                                    <h3 className="text-4xl md:text-6xl font-custom mb-6 tracking-tight">{project.title}</h3>
                                    <p className="text-lg text-white/60 mb-10 leading-relaxed font-sans">{project.description}</p>
                                    <Link
                                        href={`/projects/${project.title.toLowerCase().replace(/\s+/g, '-')}`}
                                        className="inline-flex items-center gap-3 text-sm font-medium tracking-[0.2em] group-hover:gap-4 transition-all uppercase"
                                    >
                                        PREVIEW
                                        <span className="text-lg">↗</span>
                                    </Link>
                                </div>

                                {/* Image Section */}
                                <div className={`relative h-[400px] md:h-auto overflow-hidden ${project.bgColor} ${index % 2 === 1 ? 'md:order-1' : ''}`}>
                                    {/* <div className="absolute inset-0 flex items-center justify-center p-8 md:p-12"> */}
                                    <div className="relative w-full h-full transform group-hover:scale-105 transition-transform duration-700 ease-out">
                                        <Image
                                            src={project.image}
                                            alt={project.title}
                                            fill
                                            className="object-cover"
                                            priority={index === 0}
                                        />
                                    </div>
                                </div>
                                {/* </div> */}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
