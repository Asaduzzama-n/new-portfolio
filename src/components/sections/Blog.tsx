'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import SectionHeader from '@/components/ui/SectionHeader';
import AnimatedButton from '@/components/ui/AnimatedButton';
import { blogPosts } from '@/lib/blog-data';
import { staggerContainer } from '@/lib/animations';
import BlogCard from '@/components/blog/BlogCard';

export default function Blog() {
    // Show only the first 3 posts on homepage
    const featuredPosts = blogPosts.slice(0, 3);

    return (
        <section id="blog" className="py-24 px-4">
            <div className="max-w-7xl mx-auto">
                <SectionHeader
                    label="Blog"
                    title="Latest Insights"
                    subtitle="Thoughts on design, creativity, and building better digital products."
                />

                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-100px' }}
                    className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24 mb-20"
                >
                    {featuredPosts.map((post, index) => (
                        <BlogCard key={post.slug} post={post} index={index} />
                    ))}
                </motion.div>

                <div className="text-center">
                    <AnimatedButton href="/blog" variant="secondary">
                        VIEW ALL POSTS
                    </AnimatedButton>
                </div>
            </div>
        </section>
    );
}
