'use client';

import { motion } from 'framer-motion';
import { buttonHover } from '@/lib/animations';

interface AnimatedButtonProps {
    children: React.ReactNode;
    href?: string;
    onClick?: () => void;
    variant?: 'primary' | 'secondary' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    className?: string;
    showArrow?: boolean;
}

export default function AnimatedButton({
    children,
    href,
    onClick,
    variant = 'primary',
    size = 'md',
    className = '',
    showArrow = true,
}: AnimatedButtonProps) {
    const baseStyles = 'inline-flex items-center gap-2 font-medium tracking-wide transition-all duration-300 rounded-full';

    const variants = {
        primary: 'bg-white text-black hover:bg-white/90',
        secondary: 'bg-[#1a1a1a] text-white hover:bg-[#252525] border border-[#2a2a2a]',
        ghost: 'bg-transparent text-white hover:bg-white/5',
    };

    const sizes = {
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-3 text-sm',
        lg: 'px-8 py-4 text-base',
    };

    const buttonContent = (
        <>
            {children}
            {showArrow && (
                <motion.span
                    className="inline-block"
                    initial={{ x: 0 }}
                    whileHover={{ x: 4 }}
                >
                    ↗
                </motion.span>
            )}
        </>
    );

    if (href) {
        return (
            <motion.a
                href={href}
                whileHover={buttonHover}
                whileTap={{ scale: 0.98 }}
                className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
            >
                {buttonContent}
            </motion.a>
        );
    }

    return (
        <motion.button
            onClick={onClick}
            whileHover={buttonHover}
            whileTap={{ scale: 0.98 }}
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        >
            {buttonContent}
        </motion.button>
    );
}
