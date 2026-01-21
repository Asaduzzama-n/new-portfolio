'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface TextRollProps {
    text: string;
    className?: string;
    isHovered?: boolean;
    variant?: 'roll' | 'char' | 'char-roll';
}

export default function TextRoll({ text, className = '', isHovered, variant = 'roll' }: TextRollProps) {
    const [internalHover, setInternalHover] = useState(false);

    // Use external hover state if provided, otherwise use internal state
    const shouldAnimate = isHovered !== undefined ? isHovered : internalHover;

    // Character-based roll animation variant
    if (variant === 'char-roll') {
        const characters = text.split('');

        return (
            <span
                className={`inline-flex ${className}`}
                onMouseEnter={() => isHovered === undefined && setInternalHover(true)}
                onMouseLeave={() => isHovered === undefined && setInternalHover(false)}
            >
                {characters.map((char, index) => (
                    <span
                        key={`${char}-${index}`}
                        className="relative overflow-hidden inline-flex flex-col h-[1.2em] leading-[1.2em]"
                        style={{ display: char === ' ' ? 'inline' : 'inline-flex' }}
                    >
                        <motion.span
                            animate={{
                                y: shouldAnimate ? '-1.2em' : '0',
                            }}
                            transition={{
                                duration: 0.3,
                                ease: [0.33, 1, 0.68, 1],
                                delay: index * 0.02 // Stagger delay for each character
                            }}
                            className="flex flex-col"
                        >
                            <span className="h-[1.2em]">{char === ' ' ? '\u00A0' : char}</span>
                            <span className="h-[1.2em]">{char === ' ' ? '\u00A0' : char}</span>
                        </motion.span>
                    </span>
                ))}
            </span>
        );
    }

    // Character animation variant
    if (variant === 'char') {
        const characters = text.split('');

        const container = {
            hidden: { opacity: 0 },
            visible: (i = 1) => ({
                opacity: 1,
                transition: { staggerChildren: 0.03, delayChildren: 0 },
            }),
        };

        const child = {
            visible: {
                opacity: 1,
                y: 0,
                transition: {
                    type: "spring" as const,
                    damping: 12,
                    stiffness: 200,
                },
            },
            hidden: {
                opacity: 0,
                y: 20,
                transition: {
                    type: "spring" as const,
                    damping: 12,
                    stiffness: 200,
                },
            },
        };

        return (
            <motion.span
                className={`inline-block ${className}`}
                variants={container}
                initial="hidden"
                animate={shouldAnimate ? "visible" : "hidden"}
                onMouseEnter={() => isHovered === undefined && setInternalHover(true)}
                onMouseLeave={() => isHovered === undefined && setInternalHover(false)}
            >
                {characters.map((char, index) => (
                    <motion.span
                        key={`${char}-${index}`}
                        variants={child}
                        className="inline-block"
                        style={{ display: char === ' ' ? 'inline' : 'inline-block' }}
                    >
                        {char === ' ' ? '\u00A0' : char}
                    </motion.span>
                ))}
            </motion.span>
        );
    }

    // Roll animation variant (default)
    return (
        <span
            className={`relative overflow-hidden inline-flex flex-col h-[1.2em] leading-[1.2em] ${className}`}
            onMouseEnter={() => isHovered === undefined && setInternalHover(true)}
            onMouseLeave={() => isHovered === undefined && setInternalHover(false)}
        >
            <motion.span
                animate={{
                    y: shouldAnimate ? '-1.2em' : '0',
                }}
                transition={{ duration: 0.2, ease: [0.33, 1, 0.68, 1] }}
                className="flex flex-col"
            >
                <span className="h-[1.2em]">{text}</span>
                <span className="h-[1.2em]">{text}</span>
            </motion.span>
        </span>
    );
}
