'use client';

import { useState, useRef, useEffect, useMemo } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import SectionHeader from '@/components/ui/SectionHeader';

interface ProcessStep {
    id: string;
    title: string;
    items: string[];
    initialPos: { x: number; y: number };
    color: 'white' | 'black';
}

const PROCESS_STEPS: ProcessStep[] = [
    {
        id: 'idea',
        title: 'IDEA & REQUIREMENTS',
        items: ['Idea Generation', 'Requirement Gathering', 'Stakeholder Alignment'],
        initialPos: { x: 50, y: 300 },
        color: 'white',
    },
    {
        id: 'planning',
        title: 'PLANNING',
        items: ['Project Roadmap', 'Scope Definition', 'Resource Allocation'],
        initialPos: { x: 350, y: 50 },
        color: 'black',
    },
    {
        id: 'design',
        title: 'DESIGNING',
        items: ['UI/UX Layouts', 'System Architecture', 'Database Schema'],
        initialPos: { x: 350, y: 300 },
        color: 'white',
    },
    {
        id: 'development',
        title: 'DEV & TESTING',
        items: ['Sprint Execution', 'Continuous Testing', 'CI/CD Pipeline'],
        initialPos: { x: 350, y: 550 },
        color: 'black',
    },
    {
        id: 'launch',
        title: 'LAUNCH',
        items: ['Production Deploy', 'User Onboarding', 'Performance Audit'],
        initialPos: { x: 650, y: 300 },
        color: 'white',
    },
    {
        id: 'maintenance',
        title: 'MAINTENANCE',
        items: ['Feature Scalability', 'Bug Tracking', 'Continuous Support'],
        initialPos: { x: 950, y: 300 },
        color: 'black',
    },
];

const CONNECTIONS = [
    { from: 'idea', fromPort: 'right', to: 'design', toPort: 'left' },
    { from: 'planning', fromPort: 'left', to: 'idea', toPort: 'top' },
    { from: 'planning', fromPort: 'bottom', to: 'design', toPort: 'top' },
    { from: 'design', fromPort: 'right', to: 'launch', toPort: 'left' },
    { from: 'development', fromPort: 'top', to: 'design', toPort: 'bottom' },
    { from: 'development', fromPort: 'right', to: 'launch', toPort: 'bottom' },
    { from: 'planning', fromPort: 'right', to: 'launch', toPort: 'top' },
    { from: 'launch', fromPort: 'right', to: 'maintenance', toPort: 'left' },
];

export default function Process() {
    const containerRef = useRef<HTMLDivElement>(null);
    const cardRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
    const [scale, setScale] = useState(1);
    const [layoutMode, setLayoutMode] = useState<'desktop' | 'mobile'>('desktop');

    // -----------------------------------------------------------------
    // RESPONSIVE CONFIG
    // -----------------------------------------------------------------
    const DESKTOP_WIDTH = 1200;
    const MOBILE_WIDTH = 320; // Narrower for single column
    const DESKTOP_HEIGHT = 750;
    const MOBILE_HEIGHT = 1350;

    const [positions, setPositions] = useState<{ [key: string]: { x: number; y: number } }>(() => {
        const initial: { [key: string]: { x: number; y: number } } = {};
        PROCESS_STEPS.forEach(step => initial[step.id] = step.initialPos);
        return initial;
    });

    const updatePositions = () => {
        const containerRect = containerRef.current?.getBoundingClientRect();
        if (!containerRect) return;

        const newPositions: { [key: string]: { x: number; y: number } } = {};
        PROCESS_STEPS.forEach(step => {
            const cardEl = cardRefs.current[step.id];
            if (cardEl) {
                const rect = cardEl.getBoundingClientRect();
                newPositions[step.id] = {
                    x: (rect.left - containerRect.left) / scale,
                    y: (rect.top - containerRect.top) / scale
                };
            }
        });
        setPositions(newPositions);
    };

    const handleResize = () => {
        const width = window.innerWidth;
        const isMob = width < 768;
        setLayoutMode(isMob ? 'mobile' : 'desktop');

        const padding = isMob ? 32 : 64;
        const activeWidth = isMob ? MOBILE_WIDTH : DESKTOP_WIDTH;
        const newScale = Math.min(1, (width - padding) / activeWidth);
        setScale(newScale);
    };

    // Calculate initial positions based on layout
    const getInitialPos = (stepId: string) => {
        const desktop = PROCESS_STEPS.find(s => s.id === stepId)?.initialPos || { x: 0, y: 0 };
        if (layoutMode === 'desktop') return desktop;

        // Mobile single column layout
        const stepIndex = PROCESS_STEPS.findIndex(s => s.id === stepId);
        const yBase = 50;
        const yGap = 210;
        return {
            x: (MOBILE_WIDTH - cardWidth) / 2, // Centered
            y: yBase + (stepIndex * yGap)
        };
    };

    useEffect(() => {
        handleResize();
        window.addEventListener('resize', handleResize);

        const timer = setTimeout(updatePositions, 150);
        return () => {
            window.removeEventListener('resize', handleResize);
            clearTimeout(timer);
        };
    }, []);

    // Re-check positions when layout or scale changes
    useEffect(() => {
        updatePositions();
    }, [scale, layoutMode]);

    // -----------------------------------------------------------------
    // CUSTOMIZATION TIP: Change these values to adjust card size
    // -----------------------------------------------------------------
    const cardWidth = 240;
    const cardHeight = 160;

    // -----------------------------------------------------------------
    // CUSTOMIZATION TIP: Change the offsets here to move the "dots"
    // (e.g., adding +20 to x or y to offset from the edge)
    // -----------------------------------------------------------------
    const getPortCoords = (id: string, port: string) => {
        const pos = positions[id];
        if (!pos) return { x: 0, y: 0 };

        switch (port) {
            case 'left': return { x: pos.x, y: pos.y + cardHeight / 2 };
            case 'right': return { x: pos.x + cardWidth, y: pos.y + cardHeight / 2 };
            case 'top': return { x: pos.x + cardWidth / 2, y: pos.y };
            case 'bottom': return { x: pos.x + cardWidth / 2, y: pos.y + cardHeight };
            default: return { x: pos.x + cardWidth / 2, y: pos.y + cardHeight / 2 };
        }
    };

    const activeHeight = layoutMode === 'mobile' ? MOBILE_HEIGHT : DESKTOP_HEIGHT;
    const activeWidth = layoutMode === 'mobile' ? MOBILE_WIDTH : DESKTOP_WIDTH;

    // Map original connections to mobile-friendly ports with overlap prevention
    const mobileConnections = useMemo(() => {
        return CONNECTIONS.map(conn => {
            const fromIdx = PROCESS_STEPS.findIndex(s => s.id === conn.from);
            const toIdx = PROCESS_STEPS.findIndex(s => s.id === conn.to);
            const dist = toIdx - fromIdx;

            // Sequential - use vertical flow
            if (dist === 1) {
                return { ...conn, fromPort: 'bottom', toPort: 'top', dist: 1 };
            }
            if (dist === -1) {
                return { ...conn, fromPort: 'top', toPort: 'bottom', dist: -1 };
            }

            // Jumps - use side ports (alternating left/right to reduce overlap)
            const side = (fromIdx + toIdx) % 2 === 0 ? 'right' : 'left';
            return { ...conn, fromPort: side, toPort: side, dist };
        });
    }, []);

    const activeConnections = layoutMode === 'mobile' ? mobileConnections : CONNECTIONS;

    return (
        // relative z-20 ensures cards stay above adjacent sections when dragged
        // overflow-visible allows cards and lines to pop out of the section bounds
        <section id="process" className="relative z-20 pt-24 pb-0 px-4 md:px-8 overflow-visible">
            <div className="max-w-7xl mx-auto mb-16">
                <SectionHeader
                    label="Process"
                    title="How I Work"
                    subtitle="A glimpse into my creative workflow and technical approach."
                />
            </div>

            {/* Responsive Wrapper - mb-0 to remove gap */}
            <div
                style={{
                    height: `${activeHeight * scale}px`,
                    width: '100%',
                    maxWidth: `${activeWidth * scale}px`,
                    marginInline: 'auto'
                }}
                className="relative mb-0 overflow-visible"
            >
                <div
                    ref={containerRef}
                    style={{
                        transform: `scale(${scale})`,
                        transformOrigin: 'top left',
                        width: `${activeWidth}px`,
                        height: `${activeHeight}px`
                    }}
                    className="relative overflow-visible"
                >
                    {/* SVG Layer for connections - overflow-visible prevents clipping */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible">
                        {activeConnections.map((conn: any, idx) => {
                            const start = getPortCoords(conn.from, conn.fromPort);
                            const end = getPortCoords(conn.to, conn.toPort);

                            const dx = Math.abs(end.x - start.x);
                            const dy = Math.abs(end.y - start.y);

                            let cp1x = start.x;
                            let cp1y = start.y;
                            let cp2x = end.x;
                            let cp2y = end.y;

                            // Adjust tension and curvature for mobile jumps
                            const t = layoutMode === 'mobile' ? 0.4 : 0.5;
                            const isJump = layoutMode === 'mobile' && Math.abs(conn.dist || 0) > 1;
                            const jumpOffset = isJump ? Math.max(dy * 0.3, 120) * (Math.abs(conn.dist) * 0.3 + 0.7) : dx;

                            if (conn.fromPort === 'right') cp1x += (isJump ? jumpOffset : dx) * t;
                            if (conn.fromPort === 'left') cp1x -= (isJump ? jumpOffset : dx) * t;
                            if (conn.fromPort === 'bottom') cp1y += dy * t;
                            if (conn.fromPort === 'top') cp1y -= dy * t;

                            if (conn.toPort === 'right') cp2x += (isJump ? jumpOffset : dx) * t;
                            if (conn.toPort === 'left') cp2x -= (isJump ? jumpOffset : dx) * t;
                            if (conn.toPort === 'bottom') cp2y += dy * t;
                            if (conn.toPort === 'top') cp2y -= dy * t;

                            const d = `M ${start.x} ${start.y} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${end.x} ${end.y}`;

                            return (
                                <g key={`${conn.from}-${conn.to}-${idx}`}>
                                    <path
                                        d={d}
                                        fill="none"
                                        stroke="#FFFFFF"
                                        strokeWidth="1.5"
                                        style={{ opacity: layoutMode === 'mobile' ? 0.08 : 0.15 }} // Subtle lines on mobile
                                    />
                                </g>
                            );
                        })}
                    </svg>

                    {/* Draggable Cards */}
                    {PROCESS_STEPS.map((step) => (
                        <motion.div
                            key={step.id + layoutMode} // Key change triggers reposition on layout switch
                            ref={(el: any) => cardRefs.current[step.id] = el}
                            drag
                            dragMomentum={false}
                            onDrag={updatePositions}
                            initial={getInitialPos(step.id)}
                            style={{
                                width: cardWidth,
                                height: cardHeight,
                            }}
                            className={`absolute z-10 p-6 rounded-3xl flex flex-col justify-between cursor-grab active:cursor-grabbing select-none border border-white/5 ${step.color === 'white' ? 'bg-[#ffffff] text-[#0A0A0A]' : 'bg-[#262727] text-white'}`}
                        >
                            <div>
                                <div className="flex justify-between items-start mb-4">
                                    <h4 className="font-custom-2 font-bold text-[10px] tracking-[0.2em]">{step.title}</h4>
                                    <div className="flex gap-1">
                                        <div className={`w-1.5 h-1.5 rounded-full ${step.color === 'white' ? 'bg-black/20' : 'bg-white/20'}`} />
                                        <div className={`w-1.5 h-1.5 rounded-full ${step.color === 'white' ? 'bg-black/20' : 'bg-white/20'}`} />
                                    </div>
                                </div>
                                <ul className="space-y-3">
                                    {step.items.map((item, i) => (
                                        <li key={i} className="flex items-center gap-3 text-sm tracking-tight">
                                            <span className={step.color === 'white' ? 'text-[#262727]' : 'text-[#ffffff]'}>•</span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="absolute top-1/2 -left-1.25 w-2.5 border border-[#1C1C1C] h-2.5 bg-white rounded-full -translate-y-1/2" />
                            <div className="absolute top-1/2 -right-1.25 w-2.5 border border-[#1C1C1C] h-2.5 bg-white rounded-full -translate-y-1/2" />
                            <div className="absolute -top-1.25 left-1/2 w-2.5 border border-[#1C1C1C] h-2.5 bg-white rounded-full -translate-x-1/2" />
                            <div className="absolute -bottom-1.25 left-1/2 w-2.5 border border-[#1C1C1C] h-2.5 bg-white rounded-full -translate-x-1/2" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
