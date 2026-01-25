'use client';

import { motion } from 'framer-motion';
import SectionHeader from '@/components/ui/SectionHeader';
import AnimatedButton from '@/components/ui/AnimatedButton';
import { fadeUp } from '@/lib/animations';
import Image from 'next/image';

const stats = [
    // { label: 'Years Experience', value: '7+' },
    { label: 'Projects Completed', value: '120+' },
    // { label: 'Happy Clients', value: '50+' },
];

export default function About() {
    return (
        <section id="about" className="py-24 px-4 overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <SectionHeader
                    label="About Me"
                    title="Developer, Engineer, Problem Solver"
                    subtitle="Building robust digital solutions that combine performance with exceptional architecture."
                    centered={true}
                />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-16">
                    {/* Left: Bio Content */}
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="lg:col-span-7 space-y-8"
                    >
                        <div className="relative group">
                            <h3 className="text-4xl md:text-6xl font-custom-2 leading-tight">
                                Hi, I&apos;m <span className="">Asaduzzaman</span>, a Software Engineer who builds robust solutions.
                            </h3>
                        </div>

                        <div className="space-y-6 text-xl text-white/70 font-sans leading-relaxed max-w-2xl">
                            <p>
                                With <span className="text-white font-medium">3+ years of experience</span>, I specialize in building full-stack applications and providing long-term maintenance support. I bridge the gap between complex requirements and technical execution through diligent project management.
                            </p>
                            <p>
                                I don&apos;t just write code — I build for <span className="text-white font-medium">performance, reliability, and security</span>. Whether it&apos;s a complex web app, streamlined project management, or long-term system maintenance, I bring precision to every line.
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-4 pt-4">
                            <AnimatedButton href="#contact" variant="primary">
                                START A PROJECT
                            </AnimatedButton>
                            {/* <AnimatedButton href="#projects" variant="ghost">
                                VIEW MY WORK
                            </AnimatedButton> */}
                        </div>
                    </motion.div>

                    {/* Right: Personal Grid/Stats */}
                    <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* Image Block */}
                        <motion.div
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="sm:col-span-2 relative aspect-video rounded-3xl overflow-hidden bg-secondary border border-white/5 group"
                        >
                            <Image
                                src="/me.png"
                                alt="Asaduzzaman"
                                fill
                                className="object-cover grayscale hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
                            <div className="absolute bottom-6 left-6">
                                <span className="text-xs tracking-widest uppercase text-white font-mono mb-2 block">Available for work</span>
                                <h4 className="text-xl font-custom">Based in Bangladesh</h4>
                            </div>
                        </motion.div>

                        {/* Stats Blocks */}
                        {stats.map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                variants={fadeUp}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                transition={{ delay: 0.3 + (index * 0.1) }}
                                className="p-8 rounded-3xl bg-primary border border-white/5 hover:border-white/20 transition-all duration-300 flex items-center justify-center"
                            >
                                <div className="flex flex-col items-center">
                                    <div className="text-3xl md:text-4xl font-custom text-white mb-2">{stat.value}</div>
                                    <div className="text-xs uppercase tracking-widest text-white/40 font-mono">{stat.label}</div>
                                </div>
                            </motion.div>
                        ))}

                        {/* Small Quote/Philosophy Block */}
                        <motion.div
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            transition={{ delay: 0.6 }}
                            className="p-8 rounded-3xl border border-white/5 bg-primary/20 flex items-center justify-center text-center group cursor-default"
                        >
                            <p className="text-white font-custom-2 text-2xl leading-tight italic">
                                &quot;Great software is not just about code, but <span className="text-white">how it solves real-world problems.</span>&quot;
                            </p>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
