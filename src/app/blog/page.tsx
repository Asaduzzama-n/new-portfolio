import { Metadata } from 'next';
import Link from 'next/link';
import { blogPosts } from '@/lib/blog-data';
import BlogCard from '@/components/blog/BlogCard';
import Navigation from '@/components/ui/Navigation';
import Footer from '@/components/sections/Footer';

export const metadata: Metadata = {
    title: 'Blog | Elena Portfolio',
    description: 'Thoughts on design, creativity, and building better digital products.',
};

export default function BlogPage() {
    return (
        <>
            <Navigation />
            <main className="min-h-screen pt-32 pb-24 px-4">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors mb-8"
                        >
                            <span>←</span>
                            Back to Home
                        </Link>
                        <span className="block text-sm font-medium tracking-widest text-white/60 uppercase mb-4">
                            <span className="text-white">✦</span> Blog
                        </span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-4">Latest Insights</h1>
                        <p className="text-white/60 max-w-2xl mx-auto">
                            Thoughts on design, creativity, and building better digital products.
                        </p>
                    </div>

                    {/* Blog Grid */}
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {blogPosts.map((post, index) => (
                            <BlogCard key={post.slug} post={post} index={index} />
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
