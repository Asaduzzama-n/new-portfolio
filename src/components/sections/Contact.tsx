'use client';

import { motion } from 'framer-motion';
import SectionHeader from '@/components/ui/SectionHeader';
import AnimatedButton from '@/components/ui/AnimatedButton';
import { fadeUp } from '@/lib/animations';

export default function Contact() {
    return (
        <section id="contact" className="py-24 px-4">
            <div className="max-w-4xl mx-auto">
                <SectionHeader
                    label="Contact"
                    title="Let's Work Together"
                    subtitle="Have a project in mind? I'd love to hear about it."
                />

                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-100px' }}
                    className="bg-[#111111] rounded-3xl border border-[#1a1a1a] p-8 md:p-12"
                >
                    <form className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium mb-2">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#1a1a1a] rounded-xl focus:outline-none focus:border-white/30 transition-colors"
                                    placeholder="Your name"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#1a1a1a] rounded-xl focus:outline-none focus:border-white/30 transition-colors"
                                    placeholder="your@email.com"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="subject" className="block text-sm font-medium mb-2">
                                Subject
                            </label>
                            <input
                                type="text"
                                id="subject"
                                name="subject"
                                className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#1a1a1a] rounded-xl focus:outline-none focus:border-white/30 transition-colors"
                                placeholder="Project inquiry"
                            />
                        </div>

                        <div>
                            <label htmlFor="message" className="block text-sm font-medium mb-2">
                                Message
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                rows={5}
                                className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#1a1a1a] rounded-xl focus:outline-none focus:border-white/30 transition-colors resize-none"
                                placeholder="Tell me about your project..."
                            />
                        </div>

                        <AnimatedButton variant="primary" size="lg">
                            SEND MESSAGE
                        </AnimatedButton>
                    </form>

                    {/* Social Links */}
                    <div className="mt-12 pt-8 border-t border-[#1a1a1a]">
                        <p className="text-white/50 text-sm mb-4">Or reach out directly:</p>
                        <div className="flex flex-wrap gap-4">
                            <a
                                href="mailto:hello@example.com"
                                className="text-sm hover:text-white/80 transition-colors"
                            >
                                hello@example.com
                            </a>
                            <span className="text-white/20">•</span>
                            <a
                                href="https://twitter.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm hover:text-white/80 transition-colors"
                            >
                                Twitter
                            </a>
                            <span className="text-white/20">•</span>
                            <a
                                href="https://linkedin.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm hover:text-white/80 transition-colors"
                            >
                                LinkedIn
                            </a>
                            <span className="text-white/20">•</span>
                            <a
                                href="https://dribbble.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm hover:text-white/80 transition-colors"
                            >
                                Dribbble
                            </a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
