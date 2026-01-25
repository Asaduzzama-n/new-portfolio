import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { blogPosts, getBlogPost, getAllBlogSlugs } from '@/lib/blog-data';
import BlogHeader from '@/components/blog/BlogHeader';
import SectionHighlighter from '@/components/blog/SectionHighlighter';

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    return getAllBlogSlugs().map((slug) => ({
        slug,
    }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const post = getBlogPost(slug);

    if (!post) {
        return {
            title: 'Post Not Found',
        };
    }

    return {
        title: `${post.title} | ${post.category}`,
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

    // Improved Markdown Parser
    const lines = post.content.split('\n');
    let htmlContent = '';
    let inList = false;
    let listType: 'ul' | 'ol' | null = null;

    const processInline = (text: string) => {
        return text.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-bold">$1</strong>');
    };

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();

        // Handle Headings
        if (line.startsWith('# ')) {
            if (inList) { htmlContent += `</${listType}>`; inList = false; }
            const title = line.slice(2).trim();
            const id = slugify(title);
            sections.push({ id, title, level: 1 });
            htmlContent += `<h1 id="${id}" class="text-4xl md:text-5xl font-custom-2 mb-6 mt-12 scroll-mt-32">${processInline(title)}</h1>`;
            continue;
        }
        if (line.startsWith('## ')) {
            if (inList) { htmlContent += `</${listType}>`; inList = false; }
            const title = line.slice(3).trim();
            const id = slugify(title);
            sections.push({ id, title, level: 2 });
            htmlContent += `<h2 id="${id}" class="text-2xl md:text-3xl font-custom-2 mb-4 mt-10 scroll-mt-32">${processInline(title)}</h2>`;
            continue;
        }
        if (line.startsWith('### ')) {
            if (inList) { htmlContent += `</${listType}>`; inList = false; }
            const title = line.slice(4).trim();
            const id = slugify(title);
            sections.push({ id, title, level: 3 });
            htmlContent += `<h3 id="${id}" class="text-xl md:text-2xl font-custom-2 mb-3 mt-8 scroll-mt-32">${processInline(title)}</h3>`;
            continue;
        }

        // Handle Lists
        const isUnordered = line.startsWith('- ');
        const isOrdered = /^\d+\.\s/.test(line);

        if (isUnordered || isOrdered) {
            const currentType = isUnordered ? 'ul' : 'ol';
            const content = isUnordered ? line.slice(2) : line.replace(/^\d+\.\s*/, '');

            if (!inList) {
                inList = true;
                listType = currentType;
                htmlContent += `<${listType} class="mb-6 space-y-4">`;
            } else if (listType !== currentType) {
                htmlContent += `</${listType}><${currentType} class="mb-6 space-y-4">`;
                listType = currentType;
            }

            htmlContent += `<li class="ml-6 text-white/70 ${isUnordered ? 'list-disc' : 'list-decimal'} pl-2 leading-relaxed">${processInline(content)}</li>`;
            continue;
        }

        // Handle Empty Lines
        if (line === '') {
            // If we are in a list, a blank line might just be spacing between items
            // But if the NEXT line is not a list item, we should close the list.
            const nextLine = lines[i + 1]?.trim();
            if (!nextLine?.startsWith('- ') && !/^\d+\.\s/.test(nextLine || '')) {
                if (inList) {
                    htmlContent += `</${listType}>`;
                    inList = false;
                }
            }
            continue;
        }

        // Handle Paragraphs
        if (inList) { htmlContent += `</${listType}>`; inList = false; }
        htmlContent += `<p class="text-white/70 leading-relaxed mb-6">${processInline(line)}</p>`;
    }

    if (inList) { htmlContent += `</${listType}>`; }

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
                        {/* Featured Image */}
                        <div className="mb-12">
                            <div className="relative h-64 md:h-96 rounded-3xl bg-gradient-to-br from-[#1a1a1a] to-[#252525] flex items-center justify-center border border-white/5 overflow-hidden group">
                                {post.image ? (
                                    <Image
                                        src={post.image}
                                        alt={post.title}
                                        fill
                                        className="object-cover grayscale transition-all duration-700 group-hover:scale-105"
                                        priority
                                    />
                                ) : (
                                    <>
                                        <span className="text-8xl opacity-10 group-hover:scale-110 transition-transform duration-700">
                                            {post.category.includes('Project') ? '📊' : post.category.includes('App') ? '📱' : '💻'}
                                        </span>
                                        <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                                    </>
                                )}
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
                                dangerouslySetInnerHTML={{ __html: htmlContent }}
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
