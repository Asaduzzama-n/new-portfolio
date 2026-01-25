'use client';

import React, { createContext, useContext, useTransition } from 'react';
import { useRouter } from 'next/navigation';

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
    const [isPending, startTransition] = useTransition();

    const navigate = (href: string) => {
        // If View Transition API is not supported, just use regular router push
        if (!document.startViewTransition) {
            router.push(href);
            return;
        }

        // Trigger the wave overlay if we want it (optional, can be done via CSS classes)
        document.documentElement.classList.add('wave-transition-active');

        document.startViewTransition(() => {
            return new Promise((resolve) => {
                startTransition(() => {
                    router.push(href);
                    // We need a way to know when the new page is rendered.
                    // React's startTransition combined with Next.js navigation 
                    // is tricky to resolve exactly when the DOM is ready.
                    // For now, we'll use a short timeout or just resolve immediately
                    // as the View Transition API handles the snapshotting.
                    setTimeout(resolve, 100);
                });
            });
        }).finished.finally(() => {
            document.documentElement.classList.remove('wave-transition-active');
        });
    };

    return (
        <TransitionContext.Provider value={{ navigate }}>
            {children}
        </TransitionContext.Provider>
    );
};
