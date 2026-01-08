'use client';

import { motion } from 'framer-motion';
import { cardHover } from '@/lib/animations';
import { ReactNode } from 'react';

interface CardProps {
    children: ReactNode;
    className?: string;
    hover?: boolean;
    glow?: boolean;
}

export default function Card({
    children,
    className = '',
    hover = true,
    glow = false,
}: CardProps) {
    return (
        <motion.div
            whileHover={hover ? cardHover : undefined}
            className={`
        relative overflow-hidden rounded-2xl bg-[#111111] border border-[#1a1a1a]
        ${glow ? 'shadow-[0_0_50px_rgba(201,169,98,0.1)]' : ''}
        ${className}
      `}
        >
            {children}
        </motion.div>
    );
}
