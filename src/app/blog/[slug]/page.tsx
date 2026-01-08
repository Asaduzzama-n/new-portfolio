import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { blogPosts, getBlogPost, getAllBlogSlugs } from '@/lib/blog-data';
import BlogHeader from '@/components/blog/BlogHeader';
import Navigation from '@/components/ui/Navigation';
import Footer from '@/components/sections/Footer';

interface Props {
    params: Promise<{ slug: string }>;
}

// Generate static paths for all blog posts
export async function generateStaticParams() {
    return getAllBlogSlugs().map((slug) => ({
        slug,
    }));
}

// Generate metadata for each blog post
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const post = getBlogPost(slug);

    if (!post) {
        return {
            title: 'Post Not Found',
        };
    }

    return {
        title: `${post.title} | Elena Blog`,
        description: post.excerpt,
    };
}

export default async function BlogPostPage({ params }: Props) {
    const { slug } = await params;
    const post = getBlogPost(slug);

    if (!post) {
        notFound();
    }

    // Convert markdown-like content to HTML
    const contentHtml = post.content
        .split('\n')
        .map((line) => {
            if (line.startsWith('# ')) {
                return `<h1 class="text-3xl md:text-4xl font-serif mb-6 mt-12">${line.slice(2)}</h1>`;
            }
            if (line.startsWith('## ')) {
                return `<h2 class="text-2xl font-serif mb-4 mt-10">${line.slice(3)}</h2>`;
            }
            if (line.startsWith('### ')) {
                return `<h3 class="text-xl font-serif mb-3 mt-8">${line.slice(4)}</h3>`;
            }
            if (line.trim() === '') {
                return '';
            }
            return `<p class="text-white/70 leading-relaxed mb-4">${line}</p>`;
        })
        .join('');

    return (
        <>
            <Navigation />
            <main className="min-h-screen pt-32 pb-24 px-4">
                <BlogHeader post={post} />

                {/* Featured Image */}
                <div className="max-w-4xl mx-auto mb-12">
                    <div className="h-64 md:h-96 rounded-3xl bg-gradient-to-br from-[#1a1a1a] to-[#252525] flex items-center justify-center">
                        <span className="text-8xl opacity-30">📝</span>
                    </div>
                </div>

                {/* Content */}
                <article className="max-w-3xl mx-auto">
                    <div
                        className="prose prose-invert prose-lg max-w-none"
                        dangerouslySetInnerHTML={{ __html: contentHtml }}
                    />
                </article>

                {/* More Posts */}
                <div className="max-w-4xl mx-auto mt-20 pt-12 border-t border-[#1a1a1a]">
                    <h3 className="text-2xl font-serif mb-8 text-center">More Posts</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                        {blogPosts
                            .filter((p) => p.slug !== post.slug)
                            .slice(0, 2)
                            .map((relatedPost) => (
                                <a
                                    key={relatedPost.slug}
                                    href={`/blog/${relatedPost.slug}`}
                                    className="group p-6 rounded-2xl bg-[#111111] border border-[#1a1a1a] hover:border-[#2a2a2a] transition-colors"
                                >
                                    <span className="text-xs font-medium px-3 py-1 bg-[#1a1a1a] rounded-full text-white/60 inline-block mb-3">
                                        {relatedPost.category}
                                    </span>
                                    <h4 className="font-serif text-lg group-hover:text-white/80 transition-colors">
                                        {relatedPost.title}
                                    </h4>
                                </a>
                            ))}
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
