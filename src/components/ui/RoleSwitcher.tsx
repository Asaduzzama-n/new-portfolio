"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useMemo, useState } from "react";

const useLoop = (delay = 2500) => {
    const [key, setKey] = useState(0);

    const incrementKey = useCallback(() => {
        setKey((prev) => prev + 1);
    }, []);

    useEffect(() => {
        const interval = setInterval(incrementKey, delay);
        return () => clearInterval(interval);
    }, [delay, incrementKey]);

    return { key };
};

const RoleSwitcher = () => {
    const { key } = useLoop();

    const roles = useMemo(
        () => [
            "Software Engineer",
            "Full Stack Developer",
            "Project Manager",
            "Maintenance Support Specialist",
        ],
        [],
    );

    const currentRole = useMemo(() => {
        return roles[key % roles.length];
    }, [roles, key]);

    return (
        <div className="h-6 flex items-center overflow-hidden">
            <AnimatePresence mode="popLayout">
                <motion.p
                    key={key}
                    initial={{ opacity: 0, y: "100%" }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: "-100%" }}
                    transition={{
                        duration: 0.4,
                        ease: [0.23, 1, 0.32, 1] // Professional ease-out
                    }}
                    className="text-sm lg:text-base text-white/60 whitespace-nowrap"
                >
                    {currentRole}
                </motion.p>
            </AnimatePresence>
        </div>
    );
};

export { RoleSwitcher };
