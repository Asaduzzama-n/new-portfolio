'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { fadeUp } from '@/lib/animations';

interface AnimatedSectionProps {
    children: ReactNode;
    className?: string;
    delay?: number;
}

export default function AnimatedSection({
    children,
    className = '',
    delay = 0,
}: AnimatedSectionProps) {
    return (
        <motion.section
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            transition={{ delay }}
            className={className}
        >
            {children}
        </motion.section>
    );
}
