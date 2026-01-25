"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const words = [
    // "السلام علیکم",
    "أهلاً",
    "Hello",
    // "ہیلو",
    "Olà",
    "हैलो",
    "Hola",
    "Ciao",
    "Welcome"
];

const WordPreloader = () => {
    const [index, setIndex] = useState(0);
    const [dimension, setDimension] = useState({ width: 0, height: 0 });

    useEffect(() => {
        setDimension({ width: window.innerWidth, height: window.innerHeight });

        // Disable scrolling while preloader is active
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = '';
        };
    }, []);

    useEffect(() => {
        if (index === words.length - 1) return;
        const timeout = setTimeout(() => {
            setIndex(index + 1);
        }, index === 0 ? 1000 : 150);
        return () => clearTimeout(timeout);
    }, [index]);

    const width = dimension.width;
    const height = dimension.height;

    // We start with a flat bottom (full white page)
    const initialPath = `M0 0 L${width} 0 L${width} ${height} Q${width / 2} ${height} 0 ${height} L0 0`;

    // As it slides up, the curve pulls down (stretches) and then flattens at the very end
    // To achieve the "shrinking" to flat at the end, we'll use an intermediate state or a carefully tuned exit path
    // Target path: A flat line at the top of the curtain
    const targetPath = `M0 0 L${width} 0 L${width} ${height} Q${width / 2} ${height + 250} 0 ${height} L0 0`;

    // Exit transition variants
    const curveVariants = {
        initial: {
            d: initialPath
        },
        exit: {
            d: [initialPath, targetPath, initialPath], // Stretch then shrink to flat
            transition: { duration: 1.2, times: [0, 0.5, 1], ease: [0.76, 0, 0.24, 1] as any }
        }
    };

    return (
        <motion.div
            variants={{
                initial: { y: 0 },
                exit: {
                    y: "-110%", // Move slightly more to hide the curve
                    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] as any, delay: 0.2 }
                }
            }}
            initial="initial"
            exit="exit"
            className="fixed inset-0 z-[99999] flex items-center justify-center bg-transparent"
        >
            {dimension.width > 0 && (
                <>
                    {/* The White Canvas Curtain */}
                    <svg className="absolute top-0 left-0 w-full h-[calc(100%+400px)] fill-white pointer-events-none -z-10 overflow-visible">
                        <motion.path
                            variants={curveVariants}
                            initial="initial"
                            exit="exit"
                        />
                    </svg>

                    {/* Content: Black Words */}
                    <div className="relative z-10 flex items-center justify-center min-w-[300px] gap-3 md:gap-4 px-10">
                        {/* <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-black shrink-0" /> */}
                        <div className="relative flex items-center justify-center">
                            <AnimatePresence mode="wait">
                                <motion.p
                                    key={words[index]}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.2, ease: "linear" }}
                                    className="text-gray-800 text-5xl md:text-6xl font-light font-custom-2 tracking-tight whitespace-nowrap text-center"
                                >
                                    {words[index]}
                                </motion.p>
                            </AnimatePresence>
                        </div>
                    </div>
                </>
            )}
        </motion.div>
    );
};

export default WordPreloader;
