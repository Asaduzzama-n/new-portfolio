'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Project } from '@/lib/data';
import { fadeUp, fadeIn } from '@/lib/animations';

interface ProjectHeroProps {
    project: Project;
}

export default function ProjectHero({ project }: ProjectHeroProps) {
    return (
        <section className="pt-32 pb-16 px-4">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={fadeUp}
                    className="text-center mb-16"
                >
                    <span className="inline-block text-sm font-medium tracking-[0.3em] uppercase mb-6 text-white/60">
                        ✦ Projects
                    </span>
                    <h1 className="text-5xl md:text-8xl font-custom mb-8 tracking-tight">
                        {project.title}
                    </h1>
                    <p className="text-lg md:text-xl text-white/60 max-w-3xl mx-auto leading-relaxed">
                        {project.tagline}
                    </p>
                </motion.div>

                {/* Metadata */}
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={fadeIn}
                    className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-y border-white/10 mb-20"
                >
                    <div>
                        <span className="block text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-white/40 mb-2">Year</span>
                        <span className="text-sm md:text-base font-medium">{project.year}</span>
                    </div>
                    <div>
                        <span className="block text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-white/40 mb-2">Service</span>
                        <span className="text-sm md:text-base font-medium">{project.service}</span>
                    </div>
                    <div>
                        <span className="block text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-white/40 mb-2">Industry</span>
                        <span className="text-sm md:text-base font-medium">{project.industry}</span>
                    </div>
                    <div>
                        <span className="block text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-white/40 mb-2">Client</span>
                        <span className="text-sm md:text-base font-medium">{project.client}</span>
                    </div>
                </motion.div>

                {/* Main Image */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className={`relative aspect-video rounded-[40px] overflow-hidden ${project.bgColor || 'bg-secondary'}`}
                >
                    <Image
                        src={project.mainImage}
                        alt={project.title}
                        fill
                        className="object-cover"
                        priority
                    />
                </motion.div>
            </div>
        </section>
    );
}
