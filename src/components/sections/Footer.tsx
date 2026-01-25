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
    { name: 'LinkedIn', href: 'https://www.linkedin.com/in/asaduzzaman193146/' },
    { name: 'Facebook', href: 'https://www.facebook.com/asaduzzaman.shanto.963/' },
    { name: 'GitHub', href: 'https://github.com/Asaduzzama-n' },
];

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="fixed bottom-0 left-0 w-full h-[600px] md:h-[800px] z-0 flex flex-col pt-32 md:pt-64 px-6 md:px-24 overflow-hidden text-black">
            {/* Background Layer with Top Rounding to match Main Section bottom curve */}
            <div className="absolute inset-0 bg-white  -z-10" />

            <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col relative z-10">
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

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-12 mb-12">
                    {/* Contact Info */}
                    <div className="space-y-4">
                        <div className="space-y-1">
                            <p className="text-xs uppercase tracking-wider opacity-40 mb-2">Email</p>
                            <a href="mailto:masaduzzaman193146@gmail.com" className="block text-lg hover:opacity-70 transition-opacity break-all">
                                masaduzzaman193146@gmail.com
                            </a>
                        </div>
                        <div className="space-y-1">
                            <p className="text-xs uppercase tracking-wider opacity-40 mb-2">Phone</p>
                            <p className="text-lg">+880 1889126591</p>
                        </div>
                    </div>

                    {/* Navigation */}
                    <div className="flex flex-col gap-2">
                        <p className="text-xs uppercase tracking-wider opacity-40 mb-4">Nav</p>
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
                        <p className="text-xs uppercase tracking-wider opacity-40 mb-4">Socials</p>
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
            <div className="absolute -bottom-[10%] left-1/2 -translate-x-1/2 w-full text-center pointer-events-none select-none">
                <h1 className="text-[30vw] font-custom-2 leading-none opacity-[0.10] tracking-tighter">
                    ASAD
                </h1>
                {/* Blur Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent h-full" />
            </div>

            {/* Bottom Blur positioned fixed to the bottom as requested */}
            {/* <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent blur-xl pointer-events-none" /> */}
        </footer>
    );
}
