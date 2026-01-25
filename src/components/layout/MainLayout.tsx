"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import WordPreloader from "@/components/ui/WordPreloader";
import Navigation from "@/components/ui/Navigation";
import Footer from "@/components/sections/Footer";
import ProgressiveBlur from "@/components/ui/ProgressiveBlur";
import { TransitionProvider } from "@/components/providers/TransitionProvider";

export default function MainLayout({ children }: { children: React.ReactNode }) {
    const [isLoading, setIsLoading] = useState(true);
    const pathname = usePathname();

    useEffect(() => {
        // Initial delay to match word preloader timing
        const timer = setTimeout(() => {
            setIsLoading(false);
            // Ensure scroll is enabled after preloader
            document.body.style.cursor = 'default';
            window.scrollTo(0, 0);
        }, 2800);

        return () => clearTimeout(timer);
    }, []);

    return (
        <TransitionProvider>
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
        </TransitionProvider>
    );
}
