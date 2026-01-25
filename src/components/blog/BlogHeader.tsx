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

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-custom-2 mb-8 leading-tight">
                {post.title}
            </h1>

            {/* Author & Meta Info */}
            <div className="flex items-center justify-center gap-6 text-sm">
                {/* <div className="flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-[#1a1a1a] flex items-center justify-center border border-white/5 shadow-sm">
                        👤
                    </span>
                    <span className="font-medium text-white/90">{post.author.name}</span>
                </div> */}

                <div className="flex items-center gap-4 text-white/40">
                    <span className="bg-white/10 px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-bold text-white border border-white/5">
                        {post.category}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-white/20" />
                    <span>{post.readTime}</span>
                    <span className="w-1 h-1 rounded-full bg-white/20" />
                    <span>
                        {new Date(post.date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                        })}
                    </span>
                </div>
            </div>
        </motion.header>
    );
}
