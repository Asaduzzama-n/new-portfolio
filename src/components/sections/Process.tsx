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

    // Sequential connections for mobile
    const mobileConnections = useMemo(() => {
        const conns = [];
        for (let i = 0; i < PROCESS_STEPS.length - 1; i++) {
            conns.push({
                from: PROCESS_STEPS[i].id,
                fromPort: 'bottom',
                to: PROCESS_STEPS[i + 1].id,
                toPort: 'top'
            });
        }
        return conns;
    }, []);

    const activeConnections = layoutMode === 'mobile' ? mobileConnections : CONNECTIONS;

    return (
        // overflow-visible is key so lines don't get cut off
        <section id="process" className="py-24 px-4 md:px-8 overflow-visible">
            <div className="max-w-7xl mx-auto mb-16">
                <SectionHeader
                    label="Process"
                    title="How I Work"
                    subtitle="A glimpse into my creative workflow and technical approach."
                />
            </div>

            {/* Responsive Wrapper - Handles centering and scaled height */}
            <div
                style={{
                    height: `${activeHeight * scale}px`,
                    width: '100%',
                    maxWidth: `${activeWidth * scale}px`
                }}
                className="relative mb-20 mx-auto overflow-visible"
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
                        {activeConnections.map((conn, idx) => {
                            const start = getPortCoords(conn.from, conn.fromPort);
                            const end = getPortCoords(conn.to, conn.toPort);

                            // Calculate control points for smooth Bezier curves
                            const dx = Math.abs(end.x - start.x);
                            const dy = Math.abs(end.y - start.y);

                            let cp1x = start.x;
                            let cp1y = start.y;
                            let cp2x = end.x;
                            let cp2y = end.y;

                            // Tension factor
                            const t = layoutMode === 'mobile' ? 0.3 : 0.5;

                            if (conn.fromPort === 'right') cp1x += dx * t;
                            if (conn.fromPort === 'left') cp1x -= dx * t;
                            if (conn.fromPort === 'bottom') cp1y += dy * t;
                            if (conn.fromPort === 'top') cp1y -= dy * t;

                            if (conn.toPort === 'right') cp2x += dx * t;
                            if (conn.toPort === 'left') cp2x -= dx * t;
                            if (conn.toPort === 'bottom') cp2y += dy * t;
                            if (conn.toPort === 'top') cp2y -= dy * t;

                            const d = `M ${start.x} ${start.y} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${end.x} ${end.y}`;

                            return (
                                <g key={`${conn.from}-${conn.to}-${idx}`}>
                                    {/* --------------------------------------------------------- */}
                                    {/* CUSTOMIZATION TIP: Change stroke and strokeWidth for style */}
                                    {/* --------------------------------------------------------- */}
                                    <path
                                        d={d}
                                        fill="none"
                                        stroke="#FFFFFF"
                                        strokeWidth="1"
                                        style={{ opacity: 0.15 }} // Subtle lines on re-render
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
                            className={`absolute z-10 p-6 rounded-3xl  flex flex-col justify-between cursor-grab active:cursor-grabbing select-none border border-white/5 ${step.color === 'white' ? 'bg-[#ffffff] text-[#0A0A0A]' : 'bg-[#262727] text-white'
                                }`}
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
                                        <li key={i} className="flex items-center gap-3 text-sm  tracking-tight">
                                            <span className={step.color === 'white' ? 'text-[#262727]' : 'text-[#ffffff]'}>•</span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Connection Ports (Visual dots) */}
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
