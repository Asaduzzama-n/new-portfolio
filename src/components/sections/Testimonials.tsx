'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import SectionHeader from '@/components/ui/SectionHeader';

const testimonials = [
    {
        name: 'Michael Brown',
        location: 'Creative Director, Studio X',
        avatar: '/me.png',
        quote: 'Asaduzzaman has an incredible eye for detail. The strategic approach to our brand redesign was exactly what we needed to move forward.',
        rating: 5,
    },
    {
        name: 'Wade Warren',
        location: 'Founder, TechFlow',
        avatar: '/profile.png',
        quote: 'Working with him was a game-changer. Our conversion rates increased significantly after the new portfolio launch. Highly recommended!',
        rating: 5,
    },
    {
        name: 'Sarah Jane',
        location: 'Product Manager, Kiva',
        avatar: '/me.png',
        quote: 'The design process was smooth and communicative. Asaduzzaman really takes the time to understand the product goals.',
        rating: 5,
    },
    {
        name: 'Jane Cooper',
        location: 'Brand Lead, Nova',
        avatar: '/profile.png',
        quote: 'Exceptional work on our visual identity. The brand feels more cohesive and premium than ever before.',
        rating: 5,
    },
    {
        name: 'Robert Fox',
        location: 'CEO, Brightly',
        avatar: '/me.png',
        quote: 'A true professional who delivers high-quality design work on time. The new interface is clean and intuitive.',
        rating: 5,
    },
    {
        name: 'Guy Hawkins',
        location: 'Creative Strategist',
        avatar: '/profile.png',
        quote: 'The level of creativity and technical skill brought to the table was impressive. A pleasure to collaborate with.',
        rating: 5,
    },
];

const TestimonialCard = ({ testimonial }: { testimonial: typeof testimonials[0] }) => (
    <div className=" backdrop-blur-sm bg-secondary rounded-[32px] p-8 mb-6 break-inside-avoid">
        <div className="flex gap-1 mb-6">
            {[...Array(5)].map((_, i) => (
                <span key={i} className="text-white text-lg">
                    ★
                </span>
            ))}
        </div>
        <p className="text-white/70 text-lg leading-relaxed mb-8 font-sans">
            &ldquo;{testimonial.quote}&rdquo;
        </p>
        <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full overflow-hidden border border-white/10">
                <Image src={testimonial.avatar} alt={testimonial.name} width={48} height={48} className="object-cover" />
            </div>
            <div>
                <h4 className="font-custom text-lg text-white leading-tight">{testimonial.name}</h4>
                <p className="text-white/40 text-sm font-sans">{testimonial.location}</p>
            </div>
        </div>
    </div>
);

const MarqueeColumn = ({ items, duration = 30, reverse = false }: { items: typeof testimonials, duration?: number, reverse?: boolean }) => {
    return (
        <div className="relative h-[700px] overflow-hidden">
            <motion.div
                initial={{ y: reverse ? '-50%' : '0%' }}
                animate={{ y: reverse ? '0%' : '-50%' }}
                transition={{
                    duration: duration,
                    repeat: Infinity,
                    ease: "linear"
                }}
                className="flex flex-col"
            >
                {[...items, ...items].map((testimonial, index) => (
                    <TestimonialCard key={`${testimonial.name}-${index}`} testimonial={testimonial} />
                ))}
            </motion.div>
        </div>
    );
};

export default function Testimonials() {
    return (
        <section id="testimonials" className="py-24 px-4 overflow-hidden relative">
            <div className="max-w-7xl mx-auto">
                {/* Standard Section Header */}
                <SectionHeader
                    label="Testimonials"
                    title="My Clients Talk About Me"
                    subtitle="Thoughtful words from people I've worked with."
                />

                <div className="grid lg:grid-cols-2 gap-16 items-center mt-16">
                    {/* Left Side Static Content */}
                    <div className="space-y-12">
                        <div className="space-y-6">
                            <span className="inline-block px-4 py-1 rounded-full border border-white/10 text-white/60  font-medium">
                                99+ Reviews
                            </span>
                            <h2 className="text-5xl md:text-7xl font-custom-2 tracking-tight text-white leading-[1.1]">
                                Empowering teams through <br />
                                <span className="text-white/40 italic">Thoughtful Design</span>
                            </h2>
                        </div>

                        <div className="flex items-center gap-6 py-8 rounded-[32px] bg-primary/30  w-fit">
                            <div className="flex -space-x-4">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="w-12 h-12 rounded-full border-2 border-[#1c1c1c] overflow-hidden">
                                        <Image src={`/profile.png`} alt={`User ${i}`} width={48} height={48} />
                                    </div>
                                ))}
                            </div>
                            <div>
                                <div className="flex items-center gap-2">
                                    <span className="text-2xl font-bold text-white">4.9/5</span>
                                    <div className="flex text-white text-sm">
                                        ★★★★★
                                    </div>
                                </div>
                                <p className="text-white/40 text-sm font-sans">Based on global client feedback</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Side Marquee */}
                    <div className="relative grid md:grid-cols-2 gap-6 h-[700px] mask-gradient-v">
                        <MarqueeColumn items={testimonials.slice(0, 3)} duration={35} />
                        <MarqueeColumn items={testimonials.slice(3, 6)} duration={40} reverse />

                        {/* Gradient Overlay for Fade Effect */}
                        <div className="absolute inset-0 pointer-events-none  z-10" />
                    </div>
                </div>
            </div>
        </section>
    );
}
