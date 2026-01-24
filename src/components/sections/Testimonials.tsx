'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import SectionHeader from '@/components/ui/SectionHeader';

const testimonials = [
    {
        name: 'Rezoan Ahmed',
        location: 'Founder, Bahonxbd',
        avatar: '/rezoan.png',
        quote: "Asaduzzaman's strategic development significantly improved our system performance. Highly professional and technical.",
        rating: 5,
    },
    {
        name: 'Ariful Islam',
        location: 'Owner, Timber Log Solutions',
        avatar: '/bangladeshi_user_2.png',
        quote: "The timber log software transformed how we manage our inventory. The UI is intuitive and exactly what we needed.",
        rating: 5,
    },
    {
        name: 'Julian Sterling',
        location: 'CTO, Pixel Forge',
        avatar: '/foreigner_1.png',
        quote: "Working with Asaduzzaman was a great experience. He brings a unique perspective to complex backend workflows.",
        rating: 5,
    },
    {
        name: 'Elena Rodriguez',
        location: 'Product Lead, TechNova',
        avatar: '/foreigner_2.png',
        quote: "Delivered high-quality software that exceeded our expectations. A true talent who understands infrastructure and business goals.",
        rating: 5,
    },
    {
        name: 'Sarah Johnson',
        location: 'Founder, CloudScale',
        avatar: '/sarah_johnson.png',
        quote: "The project management and support were flawless. Our team efficiency improved 40% in the first month.",
        rating: 5,
    },
    {
        name: 'David Chen',
        location: 'Senior Developer, DevFlow',
        avatar: '/david_chen.png',
        quote: "Deep technical expertise and clear communication. The transition to the new architecture was handled perfectly.",
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
            <div className="w-12 h-12 rounded-full overflow-hidden border border-white/10 shrink-0">
                <Image src={testimonial.avatar} alt={testimonial.name} width={48} height={48} className="object-cover rounded-full aspect-square" />
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
        <div className="relative h-[720px] overflow-hidden">
            <motion.div
                initial={{ y: reverse ? '-50%' : '0%' }}
                animate={{ y: reverse ? '0%' : '-50%' }}
                transition={{
                    duration: duration,
                    repeat: Infinity,
                    ease: "linear",
                    repeatType: "loop"
                }}
                className="flex flex-col gap-6"
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
                            {/* <span className="inline-block px-4 py-1 rounded-full border border-white/10 text-white/60  font-medium">
                                99+ Reviews
                            </span> */}
                            <h2 className="text-5xl md:text-7xl font-custom-2 tracking-tight text-white leading-[1.1]">
                                Empowering teams through <br />
                                <span className="text-white/40 italic">Thoughtful Design</span>
                            </h2>
                        </div>

                        <div className="flex items-center gap-6 py-8 rounded-[32px] bg-primary/30  w-fit">
                            <div className="flex -space-x-4">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="w-12 h-12 rounded-full border-2 border-[#1c1c1c] overflow-hidden shrink-0">
                                        <Image src={`/avatar_${i}.png`} alt={`User ${i}`} width={48} height={48} className="rounded-full object-cover aspect-square" />
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
                    <div className="relative grid md:grid-cols-2 gap-6 h-[720px] mask-gradient-v">
                        <MarqueeColumn items={testimonials.slice(0, 3)} duration={30} />
                        <MarqueeColumn items={testimonials.slice(3, 6)} duration={35} reverse />

                        {/* Gradient Overlay for Fade Effect */}
                        <div className="absolute inset-0 pointer-events-none z-10" />
                    </div>
                </div>
            </div>
        </section>
    );
}
