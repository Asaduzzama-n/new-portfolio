"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import WordPreloader from "@/components/ui/WordPreloader";
import Navigation from "@/components/ui/Navigation";
import Footer from "@/components/sections/Footer";
import ProgressiveBlur from "@/components/ui/ProgressiveBlur";
import { TransitionProvider, useTransitionNavigate } from "@/components/providers/TransitionProvider";

export default function MainLayout({ children }: { children: React.ReactNode }) {
    const [isLoading, setIsLoading] = useState(true);
    const pathname = usePathname();
    const { setIsPageReady } = useTransitionNavigate();

    useEffect(() => {
        // Initial delay to match word preloader timing
        const timer = setTimeout(() => {
            setIsLoading(false);
            // Ensure scroll is enabled after preloader
            document.body.style.cursor = 'default';

            // Handle initial scroll: Top unless hash exists
            if (window.location.hash) {
                const id = window.location.hash.replace('#', '');
                const element = document.getElementById(id);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            } else {
                window.scrollTo(0, 0);
            }

            // Mark page as ready for hero animations after curtain lift starts
            setTimeout(() => setIsPageReady(true), 400);
        }, 2800);

        return () => clearTimeout(timer);
    }, [setIsPageReady]);

    return (
        <>
            <AnimatePresence mode="wait">
                {isLoading && <WordPreloader key="preloader" />}
            </AnimatePresence>

            <motion.div
                key={pathname}
                initial={{ y: 150, opacity: 0 }}
                animate={{
                    y: 0,
                    opacity: 1
                }}
                transition={{
                    duration: 1.0,
                    ease: [0.76, 0, 0.24, 1],
                    delay: 0.1
                }}
                className="relative z-0"
            >
                <Navigation />
                {children}
                <Footer />
                <ProgressiveBlur />
            </motion.div>
        </>
    );
}
