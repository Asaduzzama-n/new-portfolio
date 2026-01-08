'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const footerLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'Projects', href: '#projects' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '#contact' },
];

const socialLinks = [
    { name: 'Instagram', href: 'https://instagram.com' },
    { name: 'Dribbble', href: 'https://dribbble.com' },
    { name: 'Behance', href: 'https://behance.com' },
    { name: 'LinkedIn', href: 'https://linkedin.com' },
    { name: 'X', href: 'https://twitter.com' },
];

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="fixed bottom-0 left-0 w-full h-[500px] md:h-[600px] bg-white text-black z-0 flex flex-col pt-20 px-4 md:px-12 overflow-hidden">
            <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col">
                {/* Work With Me Button */}
                <div className="mb-16">
                    <Link
                        href="#contact"
                        className="inline-flex items-center gap-4 text-sm font-medium tracking-[0.2em] group border-b border-black pb-1 hover:gap-6 transition-all"
                    >
                        WORK WITH ME
                        <span className="text-xl">↗</span>
                    </Link>
                </div>

                <div className="grid md:grid-cols-3 gap-12 mb-12">
                    {/* Contact Info */}
                    <div className="space-y-2">
                        <a href="mailto:hey@asad.com" className="block text-lg hover:opacity-70 transition-opacity">
                            hey@asad.com
                        </a>
                        <p className="text-lg">+(12) 3456 789</p>
                    </div>

                    {/* Navigation */}
                    <div className="flex flex-col gap-2">
                        {footerLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-lg hover:opacity-70 transition-opacity w-fit"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Socials */}
                    <div className="flex flex-col gap-2">
                        {socialLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-lg hover:opacity-70 transition-opacity w-fit"
                            >
                                {link.name}
                            </a>
                        ))}
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-auto mb-20 text-center">
                    <p className="text-sm opacity-60">
                        All rights reserved © {currentYear}. Portfolio made by Asaduzzaman
                    </p>
                </div>
            </div>

            {/* Large Background Text */}
            <div className="absolute -bottom-[20%] left-1/2 -translate-x-1/2 w-full text-center pointer-events-none select-none">
                <h1 className="text-[25vw] font-custom-2 leading-none opacity-[0.05] tracking-tighter">
                    ASAD
                </h1>
                {/* Blur Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/50 to-transparent h-full" />
            </div>

            {/* Bottom Blur positioned fixed to the bottom as requested */}
            {/* <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent blur-xl pointer-events-none" /> */}
        </footer>
    );
}
