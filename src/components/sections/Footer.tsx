'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { fadeUp } from '@/lib/animations';

const footerLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Projects', href: '#projects' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '#contact' },
];

const socialLinks = [
    { name: 'Twitter', href: 'https://twitter.com' },
    { name: 'LinkedIn', href: 'https://linkedin.com' },
    { name: 'Dribbble', href: 'https://dribbble.com' },
    { name: 'GitHub', href: 'https://github.com' },
];

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <motion.footer
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="py-16 px-4 border-t border-[#1a1a1a]"
        >
            <div className="max-w-7xl mx-auto">
                <div className="grid md:grid-cols-3 gap-12 mb-12">
                    {/* Brand */}
                    <div>
                        <Link href="/" className="inline-flex items-center gap-2 mb-4">
                            <span className="w-10 h-10 rounded-full bg-[#1a1a1a] flex items-center justify-center">
                                <span className="text-lg font-serif">✦</span>
                            </span>
                            <span className="font-serif text-xl">Asaduzzaman</span>
                        </Link>
                        <p className="text-white/50 text-sm">
                            Clean, modern portfolios built to impress — and built to convert.
                        </p>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h4 className="font-medium mb-4">Navigation</h4>
                        <ul className="space-y-2">
                            {footerLinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-white/50 text-sm hover:text-white transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Social */}
                    <div>
                        <h4 className="font-medium mb-4">Connect</h4>
                        <ul className="space-y-2">
                            {socialLinks.map((link) => (
                                <li key={link.name}>
                                    <a
                                        href={link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-white/50 text-sm hover:text-white transition-colors inline-flex items-center gap-1"
                                    >
                                        {link.name}
                                        <span className="text-xs">↗</span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom */}
                <div className="pt-8 border-t border-[#1a1a1a] flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-white/40 text-sm">
                        © {currentYear} Asaduzzaman. All rights reserved.
                    </p>
                    <p className="text-white/40 text-sm">
                        Built with ❤️ using Next.js
                    </p>
                </div>
            </div>
        </motion.footer>
    );
}
