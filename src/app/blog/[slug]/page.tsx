import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { blogPosts, getBlogPost, getAllBlogSlugs } from '@/lib/blog-data';
import BlogHeader from '@/components/blog/BlogHeader';
import SectionHighlighter from '@/components/blog/SectionHighlighter';

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

function slugify(text: string) {
    return text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

export default async function BlogPostPage({ params }: Props) {
    const { slug } = await params;
    const post = getBlogPost(slug);

    if (!post) {
        notFound();
    }

    const sections: { id: string; title: string; level: number }[] = [];

    // Convert markdown-like content to HTML and extract sections
    const contentHtml = post.content
        .split('\n')
        .map((line) => {
            if (line.startsWith('# ')) {
                const title = line.slice(2).trim();
                const id = slugify(title);
                sections.push({ id, title, level: 1 });
                return `<h1 id="${id}" class="text-3xl md:text-4xl font-custom-2 mb-6 mt-12 scroll-mt-32">${title}</h1>`;
            }
            if (line.startsWith('## ')) {
                const title = line.slice(3).trim();
                const id = slugify(title);
                sections.push({ id, title, level: 2 });
                return `<h2 id="${id}" class="text-2xl md:text-3xl font-custom-2 mb-4 mt-10 scroll-mt-32">${title}</h2>`;
            }
            if (line.startsWith('### ')) {
                const title = line.slice(4).trim();
                const id = slugify(title);
                sections.push({ id, title, level: 3 });
                return `<h3 id="${id}" class="text-xl md:text-2xl font-custom-2 mb-3 mt-8 scroll-mt-32">${title}</h3>`;
            }
            if (line.trim() === '') {
                return '';
            }
            return `<p class="text-white/70 leading-relaxed mb-4">${line}</p>`;
        })
        .join('');

    return (
        <div className="pt-32 pb-24 px-4">
            <BlogHeader post={post} />

            <div className="max-w-7xl mx-auto mt-12">
                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Left Sidebar - Table of Contents */}
                    <div className="hidden lg:block lg:w-1/4">
                        <div className="sticky top-32 self-start">
                            <h4 className="text-xs font-bold uppercase tracking-widest text-white/30 mb-8 ml-2">
                                Table of Contents
                            </h4>
                            <SectionHighlighter sections={sections} />
                        </div>
                    </div>

                    {/* Right Content - Blog Article */}
                    <div className="w-full lg:w-3/4">
                        {/* Featured Image Replacement/Placeholder */}
                        <div className="mb-12">
                            <div className="h-64 md:h-96 rounded-3xl bg-gradient-to-br from-[#1a1a1a] to-[#252525] flex items-center justify-center border border-white/5 relative overflow-hidden group">
                                <span className="text-8xl opacity-10 group-hover:scale-110 transition-transform duration-700">📝</span>
                                <div className="absolute inset-0 bg-gradient-to-tr from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                            </div>
                        </div>

                        <article className="max-w-3xl">
                            <div
                                className="prose prose-invert prose-lg max-w-none 
                                    prose-headings:font-custom-2 prose-headings:text-white prose-headings:tracking-tight
                                    prose-h1:text-4xl md:prose-h1:text-5xl prose-h1:mb-8
                                    prose-h2:text-2xl md:prose-h2:text-3xl prose-h2:mt-16 prose-h2:mb-6
                                    prose-h3:text-xl md:prose-h3:text-2xl prose-h3:mt-12 prose-h3:mb-4
                                    prose-p:text-white/60 prose-p:leading-[1.8] prose-p:mb-6
                                    prose-strong:text-white prose-strong:font-semibold
                                    prose-a:text-accent hover:prose-a:text-accent/80 transition-colors
                                    prose-blockquote:border-accent prose-blockquote:bg-white/5 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-2xl
                                "
                                dangerouslySetInnerHTML={{ __html: contentHtml }}
                            />
                        </article>

                        {/* More Posts */}
                        <div className="mt-20 pt-12 border-t border-white/5">
                            <h3 className="text-3xl font-custom-2 mb-8">Continue Reading</h3>
                            <div className="grid md:grid-cols-2 gap-6">
                                {blogPosts
                                    .filter((p) => p.slug !== post.slug)
                                    .slice(0, 2)
                                    .map((relatedPost) => (
                                        <a
                                            key={relatedPost.slug}
                                            href={`/blog/${relatedPost.slug}`}
                                            className="group p-8 rounded-2xl bg-[#272726] transition-all duration-300 relative overflow-hidden"
                                        >
                                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                                <span className="text-4xl ">✦</span>
                                            </div>
                                            <span className="text-xs font-bold uppercase tracking-widest  mb-4 block">
                                                {relatedPost.category}
                                            </span>
                                            <h4 className="text-xl font-custom-2 group-hover:text-white/90 transition-colors">
                                                {relatedPost.title}
                                            </h4>
                                            <p className="mt-2 text-sm text-white/50 line-clamp-2">
                                                {relatedPost.excerpt}
                                            </p>
                                        </a>
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
