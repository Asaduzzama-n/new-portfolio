'use client';

import { motion } from 'framer-motion';
import { fadeUp } from '@/lib/animations';

interface SectionHeaderProps {
    label: string;
    title: string;
    subtitle?: string;
    centered?: boolean;
}

export default function SectionHeader({
    label,
    title,
    subtitle,
    centered = true,
}: SectionHeaderProps) {
    return (
        <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className={`mb-12 ${centered ? 'text-center' : ''}`}
        >
            <span className="inline-flex items-center gap-2 text-lg font-medium tracking-widest uppercase mb-4">
                <span className="text-white ">✦</span>
                {label}
            </span>
            <h2 className="text-4xl md:text-5xl font-serif mb-4 font-custom-2">{title}</h2>
            {subtitle && (
                <p className="text-white/60 max-w-2xl mx-auto">{subtitle}</p>
            )}
        </motion.div>
    );
}
