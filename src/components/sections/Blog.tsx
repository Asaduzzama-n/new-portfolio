'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import SectionHeader from '@/components/ui/SectionHeader';
import Card from '@/components/ui/Card';
import AnimatedButton from '@/components/ui/AnimatedButton';
import { blogPosts } from '@/lib/blog-data';
import { staggerContainer, staggerItem } from '@/lib/animations';

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
                    className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
                >
                    {featuredPosts.map((post) => (
                        <motion.div key={post.slug} variants={staggerItem}>
                            <Link href={`/blog/${post.slug}`}>
                                <Card className="h-full overflow-hidden group">
                                    {/* Image placeholder */}
                                    <div className="h-48 bg-gradient-to-br from-[#1a1a1a] to-[#252525] flex items-center justify-center group-hover:from-[#252525] group-hover:to-[#1a1a1a] transition-all duration-500">
                                        <span className="text-5xl opacity-50 group-hover:scale-110 transition-transform duration-500">
                                            📝
                                        </span>
                                    </div>
                                    <div className="p-6">
                                        <div className="flex items-center gap-3 mb-3">
                                            <span className="text-xs font-medium px-3 py-1 bg-[#1a1a1a] rounded-full text-white/60">
                                                {post.category}
                                            </span>
                                            <span className="text-xs text-white/40">{post.readTime}</span>
                                        </div>
                                        <h3 className="text-lg font-serif mb-2 group-hover:text-white/80 transition-colors">
                                            {post.title}
                                        </h3>
                                        <p className="text-white/50 text-sm line-clamp-2">{post.excerpt}</p>
                                    </div>
                                </Card>
                            </Link>
                        </motion.div>
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
