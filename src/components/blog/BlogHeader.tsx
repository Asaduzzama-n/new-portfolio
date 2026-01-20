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
            className="max-w-4xl mx-auto text-center mb-12"
        >
            {/* Back link */}
            <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors mb-8"
            >
                <span>←</span>
                Back to Blog
            </Link>

            {/* Category & Read time */}
            <div className="flex items-center justify-center gap-4 mb-6">
                <span className="text-sm font-medium px-4 py-1.5 bg-[#1a1a1a] rounded-full text-white/60">
                    {post.category}
                </span>
                <span className="text-sm text-white/40">{post.readTime}</span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-6 leading-tight">
                {post.title}
            </h1>

            {/* Author & Date */}
            <div className="flex items-center justify-center gap-4">
                <div className="flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-[#1a1a1a] flex items-center justify-center">
                        👤
                    </span>
                    <span className="text-sm">{post.author.name}</span>
                </div>
                <span className="text-white/20">•</span>
                <span className="text-sm text-white/60">
                    {new Date(post.date).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                    })}
                </span>
            </div>
        </motion.header>
    );
}
