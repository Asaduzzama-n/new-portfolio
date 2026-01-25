'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import PageTransitionOverlay from '@/components/ui/PageTransitionOverlay';

interface TransitionContextType {
    navigate: (href: string) => void;
    isPageReady: boolean;
    setIsPageReady: (ready: boolean) => void;
}

const TransitionContext = createContext<TransitionContextType | undefined>(undefined);

export const useTransitionNavigate = () => {
    const context = useContext(TransitionContext);
    if (!context) {
        throw new Error('useTransitionNavigate must be used within a TransitionProvider');
    }
    return context;
};

export const TransitionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const router = useRouter();
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [isPageReady, setIsPageReady] = useState(false);

    // Provide a way to set initial ready state from layout
    const setReady = (ready: boolean) => setIsPageReady(ready);

    const navigate = (href: string) => {
        setIsTransitioning(true);
        setIsPageReady(false);

        // Wait for the sweep-up animation (0.8s entrance)
        setTimeout(() => {
            // Scroll to top while curtain is covering the screen
            // unless it's a home page section link handled later
            if (!href.includes('#')) {
                window.scrollTo(0, 0);
            }

            router.push(href);

            // Allow the exit lift to finish before marking as ready
            setTimeout(() => {
                setIsTransitioning(false);
                setTimeout(() => {
                    setIsPageReady(true);

                    // Handle hash scrolling after page is ready
                    if (href.includes('#')) {
                        const id = href.split('#')[1];
                        const element = document.getElementById(id);
                        if (element) {
                            element.scrollIntoView({ behavior: 'smooth' });
                        }
                    }
                }, 400); // Wait for lift
            }, 300);
        }, 800);
    };

    // We also need to handle the initial preloader completion
    // This will be handled by a useEffect or by a custom trigger
    useEffect(() => {
        // Exposed for components to use if they aren't controlled by navigate
        // On mount, if not loading, we're ready. (Layout will handle the first one)
    }, []);

    return (
        <TransitionContext.Provider value={{ navigate, isPageReady, setIsPageReady }}>
            <PageTransitionOverlay isTransitioning={isTransitioning} />
            {children}
        </TransitionContext.Provider>
    );
};
