'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeader from '@/components/ui/SectionHeader';
import { fadeUp } from '@/lib/animations';

const faqs = [
    {
        question: 'What services do you offer?',
        answer: 'I offer brand identity design, web design and development, UI/UX design, and creative direction. Each project is tailored to your specific needs and goals.',
    },
    {
        question: 'What is your design process?',
        answer: 'My process typically includes discovery (understanding your business and goals), strategy (defining the approach), design (creating the visual solution), and delivery (finalizing and launching). I keep you involved at every stage.',
    },
    {
        question: 'How long does a typical project take?',
        answer: 'Timeline varies by project scope. A brand identity typically takes 4-6 weeks, while a full website can take 6-10 weeks. I\'ll provide a detailed timeline during our initial consultation.',
    },
    {
        question: 'What are your rates?',
        answer: 'I offer project-based pricing tailored to scope and complexity. Reach out with your project details for a custom quote. I\'m happy to work within various budgets while maintaining quality.',
    },
    {
        question: 'Do you work with clients internationally?',
        answer: 'Absolutely! I work with clients worldwide. Most of my collaboration happens virtually through video calls, email, and project management tools.',
    },
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section id="faq" className="py-24 px-4">
            <div className="max-w-3xl mx-auto">
                <SectionHeader
                    label="FAQ's"
                    title="FAQ&apos;s"
                    subtitle="Everything you might want to know."
                />

                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-100px' }}
                    className="space-y-4"
                >
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="rounded-2xl overflow-hidden bg-primary"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-[#1a1a1a] transition-colors"
                            >
                                <span className="font-medium">{faq.question}</span>
                                <motion.span
                                    animate={{ rotate: openIndex === index ? 45 : 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="text-xl text-white/60"
                                >
                                    +
                                </motion.span>
                            </button>
                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="overflow-hidden"
                                    >
                                        <p className="p-6 text-white/60">{faq.answer}</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
