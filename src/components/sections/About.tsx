'use client';

import { motion } from 'framer-motion';
import SectionHeader from '@/components/ui/SectionHeader';
import AnimatedButton from '@/components/ui/AnimatedButton';
import { fadeUp, slideFromLeft, slideFromRight } from '@/lib/animations';
import Image from 'next/image';

export default function About() {
    return (
        <section id="about" className="py-24 px-4">
            <div className="max-w-7xl mx-auto">
                <SectionHeader
                    label="About"
                    title="About"
                    subtitle="A quick intro to who I am, how I work, and what drives my design decisions."
                />

                <div className="grid md:grid-cols-2 gap-8 bg-primary rounded-3xl overflow-hidden border border-[#1a1a1a]">
                    {/* Image */}
                    <motion.div
                        variants={slideFromLeft}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-100px' }}
                        className="relative h-80 md:h-auto min-h-[400px]"
                    >
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center">
                                <Image src="/me.png" alt="Profile" width={3000} height={3000} className="w-full h-full object-contain" />
                                <p className="text-white/30 text-sm">Your photo here</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Content */}
                    <motion.div
                        variants={slideFromRight}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-100px' }}
                        className="p-8 md:p-12 flex flex-col justify-center"
                    >
                        <h3 className="text-3xl md:text-4xl font-custom mb-6">Hi, I&apos;m Asaduzzaman,</h3>

                        <div className="space-y-4 text-white/70 mb-8 font-custom">
                            <p>
                                <span className="text-white">A designer with 7+ years of experience</span> crafting digital products and visual identities that stand out without shouting.
                            </p>
                            <p>
                                I work with founders, creatives, and growing teams to shape brands, design clean user interfaces, and bring clarity to complex ideas. My background blends branding, UX, and web design — so whether it&apos;s a new portfolio, a product launch, or a full rebrand, I design with both impact and usability in mind.
                            </p>
                            <p>
                                When I&apos;m not designing, I&apos;m probably reorganizing my desktop, hunting for perfect type pairings, or sketching out my next big idea.
                            </p>
                        </div>

                        <AnimatedButton href="#contact" variant="ghost" className="self-start">
                            LEARN MORE
                        </AnimatedButton>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
