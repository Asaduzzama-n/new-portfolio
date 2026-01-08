'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Projects', href: '#projects' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Blog', href: '#blog' },
    { name: 'Contact', href: '#contact' },
];

export default function Navigation() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
        setIsMobileMenuOpen(false);
    };

    return (
        <>
            <motion.header
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
                className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${isScrolled ? 'top-2' : 'top-4'
                    }`}
            >
                <nav className="glass rounded-full px-2 py-1 bg-primary">
                    <div className="flex items-center gap-1">
                        {/* Logo */}
                        <Link
                            href="/"
                            className="w-10 h-10 rounded-full bg-[#1a1a1a] flex items-center justify-center mr-2 hover:bg-[#252525] transition-colors"
                        >
                            <span className="text-lg font-serif">✦</span>
                        </Link>

                        {/* Desktop Nav */}
                        <div className="hidden md:flex items-center gap-1">
                            {navLinks.map((link) => (
                                <motion.a
                                    key={link.name}
                                    href={link.href}
                                    onClick={(e) => scrollToSection(e, link.href)}
                                    className="px-4 py-2 text-sm font-medium text-white/80 hover:text-white rounded-full  bg-secondary transition-all duration-200"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    {link.name.toUpperCase()}
                                </motion.a>
                            ))}
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="md:hidden w-10 h-10 rounded-full bg-[#1a1a1a] flex items-center justify-center hover:bg-[#252525] transition-colors"
                        >
                            <span className="sr-only">Menu</span>
                            <div className="flex flex-col gap-1">
                                <span className={`w-4 h-0.5 bg-white transition-all ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
                                <span className={`w-4 h-0.5 bg-white transition-all ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
                                <span className={`w-4 h-0.5 bg-white transition-all ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
                            </div>
                        </button>
                    </div>
                </nav>
            </motion.header>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed top-20 left-4 right-4 z-40 md:hidden glass rounded-2xl border border-[#1a1a1a] p-4"
                    >
                        <div className="flex flex-col gap-2">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    onClick={(e) => scrollToSection(e, link.href)}
                                    className="px-4 py-3 text-sm font-medium text-white/80 hover:text-white rounded-xl hover:bg-[#1a1a1a] transition-all"
                                >
                                    {link.name.toUpperCase()}
                                </a>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
