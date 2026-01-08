'use client';

import { motion } from 'framer-motion';
import SectionHeader from '@/components/ui/SectionHeader';
import Card from '@/components/ui/Card';
import { staggerContainer, staggerItem } from '@/lib/animations';

const testimonials = [
    {
        name: 'Clara Jennings',
        role: 'Creative Director, Luna Studio',
        avatar: '👩‍💼',
        quote: 'Working with Elena felt effortless. She immediately understood our vision and translated it into a design that just worked.',
    },
    {
        name: 'Marek Ivanov',
        role: 'Founder, BetterBlocks',
        avatar: '👨‍💻',
        quote: 'Elena brought clarity to our brand and built a site that reflects who we are. She\'s fast, communicative, and cares about the details.',
    },
    {
        name: 'Jasmine Liu',
        role: 'Product Manager, Kiva',
        avatar: '👩‍🔬',
        quote: 'She made everything feel simple. From concept to launch, Elena guided us with a clear process and delivered exactly what we needed.',
    },
    {
        name: 'Rafael Mendez',
        role: 'Co-Founder, Nolo',
        avatar: '👨‍🎨',
        quote: 'This was the smoothest design experience I\'ve had. Elena listened, adapted quickly, and created something far better than we imagined.',
    },
];

export default function Testimonials() {
    return (
        <section id="testimonials" className="py-24 px-4">
            <div className="max-w-7xl mx-auto">
                <SectionHeader
                    label="Testimonials"
                    title="Testimonials"
                    subtitle="Thoughtful words from people I've worked with."
                />

                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-100px' }}
                    className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                    {testimonials.map((testimonial) => (
                        <motion.div key={testimonial.name} variants={staggerItem}>
                            <Card className="p-6 h-full flex flex-col">
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="text-2xl">{testimonial.avatar}</span>
                                    <div>
                                        <h4 className="font-medium text-sm">{testimonial.name}</h4>
                                        <p className="text-white/50 text-xs">{testimonial.role}</p>
                                    </div>
                                </div>
                                <p className="text-white/70 text-sm leading-relaxed flex-1">
                                    &ldquo;{testimonial.quote}&rdquo;
                                </p>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
