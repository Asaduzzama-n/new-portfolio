'use client';

import { motion } from 'framer-motion';
import { fadeUp, staggerContainer, staggerItem } from '@/lib/animations';
import Image from 'next/image';

const roles = ['DESIGNER', 'BRAND BUILDER', 'CREATIVE STRATEGIST'];

export default function Hero() {
    return (
        <section id="home" className="min-h-screen flex flex-col items-center justify-center px-4 pt-24 pb-16">
            <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="text-center max-w-5xl mx-auto"
            >
                {/* Roles */}
                <motion.div
                    variants={staggerItem}
                    className="flex flex-wrap items-center justify-center gap-2 mb-8"
                >
                    {roles.map((role, index) => (
                        <span key={role} className="flex items-center gap-2 text-sm tracking-widest text-white/60">
                            <span className="text-white">✦</span>
                            {role}
                            {index < roles.length && <span className="text-white">✦</span>}
                        </span>
                    ))}
                </motion.div>

                {/* Main Headline */}
                <motion.h1
                    variants={fadeUp}
                    className="text-4xl md:text-6xl lg:text-7xl  leading-tight font-custom2  mb-12"
                >
                    Clean, modern portfolios built to impress
                    <br />
                    <span className="">— and built to convert.</span>
                </motion.h1>

                {/* Profile Image */}
                <motion.div
                    variants={fadeUp}
                    className="relative inline-block"
                >
                    <div className="h-[50vh] rounded-3xl overflow-hidden">
                        <div className="w-full h-full flex items-center justify-center text-white/20">
                            <Image
                                src="/profile.png"
                                alt="Profile"
                                width={2000}
                                height={2000}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>


                </motion.div>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
            >
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-2"
                >
                    <div className="w-1 h-2 bg-white/40 rounded-full" />
                </motion.div>
            </motion.div>
        </section>
    );
}
