'use client';

import React, { createContext, useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import PageTransitionOverlay from '@/components/ui/PageTransitionOverlay';

interface TransitionContextType {
    navigate: (href: string) => void;
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

    const navigate = (href: string) => {
        // Trigger the liquid sweep
        setIsTransitioning(true);

        // Wait for the sweep-up animation (0.8s entrance + some buffer)
        setTimeout(() => {
            router.push(href);

            // Allow the exit lift to happen after a small delay to ensure content is ready
            setTimeout(() => {
                setIsTransitioning(false);
            }, 300); // Reduced for snappier feel
        }, 800);
    };

    return (
        <TransitionContext.Provider value={{ navigate }}>
            <PageTransitionOverlay isTransitioning={isTransitioning} />
            {children}
        </TransitionContext.Provider>
    );
};
