'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Project } from '@/lib/data';
import { fadeUp } from '@/lib/animations';

interface ProjectDetailsProps {
    project: Project;
}

interface SectionProps {
    label: string;
    children: React.ReactNode;
}

function Section({ label, children }: SectionProps) {
    return (
        <div className="grid md:grid-cols-12 gap-8 py-16 border-t border-white/10 first:border-t-0">
            <div className="md:col-span-4">
                <span className="text-xs font-bold tracking-[0.2em] uppercase text-white/40">{label}</span>
            </div>
            <div className="md:col-span-8">
                {children}
            </div>
        </div>
    );
}

export default function ProjectDetails({ project }: ProjectDetailsProps) {
    return (
        <section className="py-24 px-4 overflow-hidden">
            <div className="max-w-7xl mx-auto">
                {/* Highlights */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                >
                    <Section label="Highlights">
                        <ul className="space-y-4">
                            {project.highlights.map((highlight, index) => (
                                <li key={index} className="text-lg md:text-xl text-white/80 flex gap-4">
                                    <span className="text-white/40">•</span>
                                    {highlight}
                                </li>
                            ))}
                        </ul>
                    </Section>
                </motion.div>

                {/* Mockups Grid 1 */}
                <div className="grid md:grid-cols-2 gap-8 my-20">
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative aspect-square rounded-[40px] overflow-hidden bg-secondary"
                    >
                        <Image
                            src={project.mockupImage1}
                            alt="Mockup 1"
                            fill
                            className="object-cover"
                        />
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative aspect-square rounded-[40px] overflow-hidden bg-secondary"
                    >
                        <Image
                            src={project.mockupImage2}
                            alt="Mockup 2"
                            fill
                            className="object-cover"
                        />
                    </motion.div>
                </div>

                {/* Deliverables (Optional) */}
                {project.deliverables && (
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeUp}
                    >
                        <Section label="Deliverables">
                            <ul className="space-y-4">
                                {project.deliverables.map((deliverable, index) => (
                                    <li key={index} className="text-lg md:text-xl text-white/80 flex gap-4">
                                        <span className="text-white/40">•</span>
                                        {deliverable}
                                    </li>
                                ))}
                            </ul>
                        </Section>
                    </motion.div>
                )}

                {/* Challenges */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                >
                    <Section label="Challenges">
                        <p className="text-lg md:text-2xl text-white/80 leading-relaxed font-custom">
                            {project.challenges}
                        </p>
                    </Section>
                </motion.div>
            </div>
        </section>
    );
}
