'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { RoleSwitcher } from '@/components/ui/RoleSwitcher';
import { useTransitionNavigate } from '@/components/providers/TransitionProvider';


export default function Hero() {
    const { isPageReady } = useTransitionNavigate();

    return (
        <section id="home" className="relative h-screen w-full flex items-center items-end overflow-hidden pb-24">
            {/* Background Image */}
            <div className="absolute inset-0 z-0 h-full w-full">
                <motion.div
                    initial={{ clipPath: 'inset(100% 0% 0% 0%)', scale: 1.1 }}
                    animate={isPageReady ? { clipPath: 'inset(0% 0% 0% 0%)', scale: 1 } : { clipPath: 'inset(100% 0% 0% 0%)', scale: 1.1 }}
                    transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
                    className="relative h-full w-full"
                >
                    <Image
                        src="/profile1.png"
                        alt="Asaduzzaman"
                        fill
                        className="object-cover grayscale brightness-[0.9]"
                        priority
                    />
                    {/* Optional Gradient Overlay for better text readability */}
                    <div className="absolute inset-0 bg-gradient-to-r from-background via-background/40 to-transparent" />
                </motion.div>
            </div>

            {/* Content Container */}
            <div className="relative z-10 w-full px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col items-start text-left space-y-4 lg:space-y-10 max-w-4xl">
                        {/* Large Vertical Name - Masked Reveal */}
                        <div className="overflow-hidden">
                            <motion.h1
                                initial={{ y: '100%' }}
                                animate={isPageReady ? { y: '0%' } : { y: '100%' }}
                                transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
                                className="text-[clamp(2.5rem,10vw,5rem)] lg:text-7xl xl:text-9xl font-bold leading-none tracking-tighter font-custom-2"
                            >
                                ASADUZZAMAN
                            </motion.h1>
                        </div>

                        {/* Role and Language */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={isPageReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.4 }}
                            className="space-y-4"
                        >
                            <div className="transform origin-left scale-125 lg:scale-150">
                                <RoleSwitcher />
                            </div>
                            <div className="flex gap-4 text-xs text-white/40 pt-4">
                                <span className="border-b border-white/20 pb-0.5">English</span>
                                <span className="opacity-20">|</span>
                                <span className="border-b border-white/20 pb-0.5">Bangla</span>
                            </div>
                        </motion.div>

                        {/* Social Links */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={isPageReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.5 }}
                            className="flex flex-wrap gap-6 text-sm pt-4"
                        >
                            {[
                                { label: 'GitHub', href: 'https://github.com/Asaduzzama-n' },
                                { label: 'LinkedIn', href: '#' },
                                { label: 'Twitter', href: '#' },
                                { label: 'Email', href: 'mailto:hello@asaduzzaman.com' }
                            ].map((link) => (
                                <Link
                                    key={link.label}
                                    href={link.href}
                                    target={link.href.startsWith('http') ? "_blank" : undefined}
                                    className="text-white/60 hover:text-white transition-all hover:-translate-y-0.5 border-b border-white/10 hover:border-white pb-1"
                                >
                                    {link.label === 'Email' ? 'hello@asaduzzaman.com' : link.label}
                                </Link>
                            ))}
                        </motion.div>
                    </div>
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
