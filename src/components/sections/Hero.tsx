'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
    return (
        <section id="home" className="h-screen w-full flex items-stretch ">
            <div className="w-full h-full grid lg:grid-cols-2">
                {/* Left Side - Image */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
                    className="relative h-full w-full"
                >
                    <Image
                        src="/hero.png"
                        alt="Asaduzzaman"
                        fill
                        className="object-cover grayscale"
                        priority
                    />
                </motion.div>

                {/* Right Side - Text Content */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1], delay: 0.2 }}
                    className="flex flex-col justify-center px-8 lg:px-16 xl:px-24 space-y-8 lg:space-y-12 bg-background"
                >
                    {/* Large Vertical Name */}
                    <div className="relative">
                        <h1 className="text-[15vw] lg:text-6xl xl:text-8xl font-bold leading-[0.85] tracking-tight font-custom2">
                            ASADUZZAMAN
                        </h1>
                    </div>

                    {/* Name and Tagline */}
                    <div className="space-y-2">
                        <p className="text-lg lg:text-xl font-medium">Asaduzzaman</p>
                        <p className="text-sm lg:text-base text-white/60 max-w-md">
                            Designer, Entrepreneur & Tech Visionary
                        </p>
                        <div className="flex gap-2 text-xs text-white/40 pt-2">
                            <span className="border-b border-white/20 pb-0.5">English</span>
                            <span>|</span>
                            <span className="border-b border-white/20 pb-0.5">Bangla</span>
                        </div>
                    </div>

                    {/* Social Links */}
                    <div className="flex flex-wrap gap-4 text-sm">
                        <Link
                            href="#"
                            className="text-white/60 hover:text-white transition-colors border-b border-white/20 pb-0.5"
                        >
                            Film Maker*
                        </Link>
                        <Link
                            href="#"
                            className="text-white/60 hover:text-white transition-colors border-b border-white/20 pb-0.5"
                        >
                            LinkedIn
                        </Link>
                        <Link
                            href="#"
                            className="text-white/60 hover:text-white transition-colors border-b border-white/20 pb-0.5"
                        >
                            Instagram
                        </Link>
                        <Link
                            href="#"
                            className="text-white/60 hover:text-white transition-colors border-b border-white/20 pb-0.5"
                        >
                            hello@asaduzzaman.com
                        </Link>

                    </div>
                </motion.div>
            </div>

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
