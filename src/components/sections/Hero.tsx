'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { RoleSwitcher } from '@/components/ui/RoleSwitcher';
import { useTransitionNavigate } from '@/components/providers/TransitionProvider';


export default function Hero() {
    const { isPageReady } = useTransitionNavigate();

    return (
        <section id="home" className="h-screen w-full flex items-stretch ">
            <div className="w-full h-full grid lg:grid-cols-2">
                {/* Left Side - Image */}
                <div className="relative h-full w-full overflow-hidden">
                    <motion.div
                        initial={{ clipPath: 'inset(100% 0% 0% 0%)', scale: 1.1 }}
                        animate={isPageReady ? { clipPath: 'inset(0% 0% 0% 0%)', scale: 1 } : { clipPath: 'inset(100% 0% 0% 0%)', scale: 1.1 }}
                        transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
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
                </div>

                {/* Right Side - Text Content */}
                <div className="flex flex-col justify-center px-8 lg:px-16 xl:px-24 space-y-8 lg:space-y-12 bg-background">
                    {/* Large Vertical Name - Masked Reveal */}
                    <div className="overflow-hidden">
                        <motion.h1
                            initial={{ y: '100%' }}
                            animate={isPageReady ? { y: '0%' } : { y: '100%' }}
                            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
                            className="text-[15vw] lg:text-6xl xl:text-8xl font-bold leading-[0.85] tracking-tight font-custom-2"
                        >
                            ASADUZZAMAN
                        </motion.h1>
                    </div>

                    {/* Name and Tagline - Staggered Entry */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isPageReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.4 }}
                        className="space-y-2"
                    >
                        <RoleSwitcher />
                        <div className="flex gap-2 text-xs text-white/40 pt-2">
                            <span className="border-b border-white/20 pb-0.5">English</span>
                            <span>|</span>
                            <span className="border-b border-white/20 pb-0.5">Bangla</span>
                        </div>
                    </motion.div>

                    {/* Social Links - Staggered Entry */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isPageReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.5 }}
                        className="flex flex-wrap gap-4 text-sm"
                    >
                        <Link
                            href="https://github.com/Asaduzzama-n"
                            target="_blank"
                            className="text-white/60 hover:text-white transition-colors border-b border-white/20 pb-0.5"
                        >
                            GitHub
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
                            Twitter
                        </Link>
                        <Link
                            href="mailto:hello@asaduzzaman.com"
                            className="text-white/60 hover:text-white transition-colors border-b border-white/20 pb-0.5"
                        >
                            hello@asaduzzaman.com
                        </Link>
                    </motion.div>
                </div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={isPageReady ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: 0.8, duration: 1 }}
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
