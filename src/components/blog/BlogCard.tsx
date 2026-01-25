'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { BlogPost } from '@/lib/blog-data';


interface BlogCardProps {
    post: BlogPost;
    index?: number;
}

export default function BlogCard({ post, index = 0 }: BlogCardProps) {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            className="flex flex-col h-full bg-[#272726] rounded-4xl p-6"
        >
            <Link href={`/blog/${post.slug}`} className="group flex flex-col h-full">
                {/* Image Container */}
                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-[#1a1a1a] border border-white/5 mb-6">
                    {post.image ? (
                        <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            className="object-cover grayscale transition-all duration-700"
                        />
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-7xl opacity-5">
                                {post.category.includes('Project') ? '📊' : post.category.includes('App') ? '📱' : '💻'}
                            </span>
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="flex flex-col flex-grow">
                    <div className="flex items-center gap-2 mb-3 text-sm font-medium">
                        <span className="text-white/40">{post.category}</span>
                        <span className="text-white/20">•</span>
                        <span className="text-white/40">{post.readTime}</span>
                    </div>

                    <h3 className="text-2xl font-custom-2 text-white/90 leading-tight mb-4">
                        {post.title}
                    </h3>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mt-auto">
                        {post.tags.map((tag) => (
                            <span key={tag} className="text-[9px] uppercase tracking-widest text-white/60 font-bold border border-white/5 px-2 py-0.5 rounded-4xl">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
