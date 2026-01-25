"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PageTransitionOverlayProps {
    isTransitioning: boolean;
}

const PageTransitionOverlay = ({ isTransitioning }: PageTransitionOverlayProps) => {
    const [dimension, setDimension] = useState({ width: 0, height: 0 });

    useEffect(() => {
        setDimension({ width: window.innerWidth, height: window.innerHeight });
        const handleResize = () => setDimension({ width: window.innerWidth, height: window.innerHeight });
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const width = dimension.width;
    const height = dimension.height;

    // SVG path refined for the "liquid" joss effect
    const initialPath = `M0 0 L${width} 0 L${width} ${height} Q${width / 2} ${height} 0 ${height} L0 0`;
    const targetPath = `M0 0 L${width} 0 L${width} ${height} Q${width / 2} ${height + 300} 0 ${height} L0 0`;

    const layerVariants = {
        initial: {
            y: "100%"
        },
        animate: {
            y: "0%",
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] as any }
        },
        exit: {
            y: "-110%",
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] as any, delay: 0.1 }
        }
    };

    const curveVariants = {
        initial: {
            d: initialPath
        },
        exit: {
            d: [initialPath, targetPath, initialPath],
            transition: { duration: 1.0, times: [0, 0.5, 1], ease: [0.76, 0, 0.24, 1] as any }
        }
    };

    return (
        <AnimatePresence>
            {isTransitioning && dimension.width > 0 && (
                <div className="fixed inset-0 z-[999999] pointer-events-none">
                    {/* Primary Dark Liquid Curtain */}
                    <motion.div
                        variants={layerVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className="absolute inset-0 bg-[#000]"
                    >
                        <svg className="absolute top-0 left-0 w-full h-[calc(100%+300px)] fill-[#000] pointer-events-none overflow-visible">
                            <motion.path
                                variants={curveVariants}
                                initial="initial"
                                exit="exit"
                            />
                        </svg>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default PageTransitionOverlay;
