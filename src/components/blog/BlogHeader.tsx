'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { BlogPost } from '@/lib/blog-data';
import { fadeUp } from '@/lib/animations';

interface BlogHeaderProps {
    post: BlogPost;
}

export default function BlogHeader({ post }: BlogHeaderProps) {
    return (
        <motion.header
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="max-w-4xl mx-auto text-center mb-16"
        >
            {/* Back link */}
            <div className="mb-12">
                <Link
                    href="/blog"
                    className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-white/40 hover:text-white transition-colors"
                >
                    <span>←</span>
                    BACK TO BLOG
                </Link>
            </div>

            {/* Category Label - Perfectly Matches SectionHeader Pattern */}
            <div className="mb-6">
                <span className="inline-flex items-center gap-2 text-lg font-medium tracking-widest uppercase">
                    <span className="text-white">✦</span>
                    {post.category}
                </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-custom-2 mb-8 leading-[1.1] tracking-tight text-white">
                {post.title}
            </h1>

            {/* Meta Info & Tags */}
            <div className="flex flex-col items-center gap-6">
                <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.2em] text-white/80">
                    <span>{post.readTime}</span>
                    <span className="w-1 h-1 rounded-full bg-white/10" />
                    <span>
                        {new Date(post.date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                        })}
                    </span>
                </div>

                {/* Tags - Minimalist Style */}
                <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
                    {post.tags.map((tag) => (
                        <span key={tag} className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/80 hover:text-white/90 transition-colors">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </motion.header>
    );
}
