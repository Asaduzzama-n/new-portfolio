'use client';

import { motion } from 'framer-motion';
import SectionHeader from '@/components/ui/SectionHeader';
import Card from '@/components/ui/Card';
import { staggerContainer, staggerItem } from '@/lib/animations';

const services = [
    {
        icon: '🎨',
        title: 'Brand Identity',
        description: 'Complete brand systems including logos, color palettes, typography, and brand guidelines.',
    },
    {
        icon: '💻',
        title: 'Web Design',
        description: 'Beautiful, responsive websites that convert visitors into customers.',
    },
    {
        icon: '📱',
        title: 'UI/UX Design',
        description: 'User-centered interfaces that are intuitive, accessible, and delightful to use.',
    },
    {
        icon: '✨',
        title: 'Creative Direction',
        description: 'Strategic creative guidance to ensure your brand communicates effectively.',
    },
];

export default function Services() {
    return (
        <section id="services" className="py-24 px-4">
            <div className="max-w-7xl mx-auto">
                <SectionHeader
                    label="Services"
                    title="Services"
                    subtitle="What I can help you with."
                />

                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-100px' }}
                    className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                    {services.map((service) => (
                        <motion.div key={service.title} variants={staggerItem}>
                            <Card className="p-6 h-full">
                                <span className="text-4xl mb-4 block">{service.icon}</span>
                                <h3 className="text-xl font-serif mb-3">{service.title}</h3>
                                <p className="text-white/60 text-sm">{service.description}</p>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
