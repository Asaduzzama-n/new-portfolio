'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Card from '@/components/ui/Card';
import { BlogPost } from '@/lib/blog-data';

interface BlogCardProps {
    post: BlogPost;
    index?: number;
}

export default function BlogCard({ post, index = 0 }: BlogCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
        >
            <Link href={`/blog/${post.slug}`}>
                <Card className="h-full overflow-hidden group">
                    {/* Image placeholder */}
                    <div className="h-56 bg-gradient-to-br from-[#1a1a1a] to-[#252525] flex items-center justify-center group-hover:from-[#252525] group-hover:to-[#1a1a1a] transition-all duration-500">
                        <span className="text-6xl opacity-50 group-hover:scale-110 transition-transform duration-500">
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
                        <h3 className="text-xl font-serif mb-3 group-hover:text-white/80 transition-colors">
                            {post.title}
                        </h3>
                        <p className="text-white/50 text-sm line-clamp-2 mb-4">{post.excerpt}</p>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <span className="text-lg">{post.author.avatar ? '👤' : '👤'}</span>
                                <span className="text-sm text-white/60">{post.author.name}</span>
                            </div>
                            <span className="text-xs text-white/40">
                                {new Date(post.date).toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric',
                                    year: 'numeric',
                                })}
                            </span>
                        </div>
                    </div>
                </Card>
            </Link>
        </motion.div>
    );
}
