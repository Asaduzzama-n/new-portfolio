'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { blogPosts } from '@/lib/blog-data';
import BlogCard from '@/components/blog/BlogCard';

const CATEGORIES = ['All', 'Brand Design', 'UX/UI Design', 'Web Design', 'Design', 'Career'];

export default function BlogPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');

    const filteredPosts = useMemo(() => {
        return blogPosts.filter((post) => {
            const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
            return matchesSearch && matchesCategory;
        });
    }, [searchQuery, activeCategory]);

    return (
        <div className="pt-32 pb-32 px-4 selection:bg-white/10">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.3em] text-white/20 mb-8">
                            <span className="text-white text-lg">✦</span> BLOG
                        </span>

                        <h1 className="text-4xl md:text-6xl font-custom-2 mb-8 max-w-5xl mx-auto leading-[1.1] tracking-tight">
                            Ideas that inspire — <br className="hidden md:block" />
                            <span className="text-white/40">thoughts on design</span> <br className="hidden md:block" />
                            and creativity.
                        </h1>


                    </motion.div>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 mb-20 px-4  pb-8">
                    {CATEGORIES.map((category) => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`text-[10px] uppercase tracking-[0.2em] font-bold transition-none relative pb-2 ${activeCategory === category
                                ? 'text-white'
                                : 'text-white/70'
                                }`}
                        >
                            {category}
                            {activeCategory === category && (
                                <motion.div
                                    layoutId="active-filter"
                                    className="absolute bottom-0 left-0 w-full h-[1px] bg-white"
                                />
                            )}
                        </button>
                    ))}
                </div>



                {/* Blog Grid */}
                <motion.div
                    layout
                    className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24"
                >
                    <AnimatePresence mode="popLayout" initial={false}>
                        {filteredPosts.map((post, index) => (
                            <BlogCard key={post.slug} post={post} index={index} />
                        ))}
                    </AnimatePresence>
                </motion.div>

                {/* Empty State */}
                {filteredPosts.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-20"
                    >
                        <h3 className="text-xl  text-white/20">No articles found matching your criteria.</h3>
                        <button
                            onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
                            className="mt-6 text-white/40 border-b border-white/10 pb-1 uppercase tracking-widest text-[10px] font-bold"
                        >
                            Clear all filters
                        </button>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
