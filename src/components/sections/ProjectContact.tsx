'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function ProjectContact() {
    return (
        <section className="py-32 px-4  rounded-[40px] mt-24">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end gap-12">
                <div className="flex-1">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-2 mb-8"
                    >
                        <span className="text-white/60 text-lg">✦</span>
                        <span className="text-xs font-bold tracking-[0.2em] uppercase text-white/60">Get in Touch</span>
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        viewport={{ once: true }}
                        className="text-5xl  md:text-8xl font-custom tracking-tight mb-4"
                    >
                        Ready When You Are.
                    </motion.h2>
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-[#1a1a1a] flex items-center justify-center hover:bg-[#252525] transition-colors cursor-pointer"
                >
                    <Link href="/#contact" className="text-2xl md:text-4xl">✦</Link>
                </motion.div>
            </div>
        </section>
    );
}
