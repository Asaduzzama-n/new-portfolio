export interface BlogPost {
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    date: string;
    readTime: string;
    category: string;
    image: string;
    author: {
        name: string;
        avatar: string;
    };
}

export const blogPosts: BlogPost[] = [
    {
        slug: 'design-principles-for-modern-portfolios',
        title: 'Design Principles for Modern Portfolios',
        excerpt: 'Learn the essential design principles that make a portfolio stand out in today\'s competitive landscape.',
        content: `
# Design Principles for Modern Portfolios

Creating a portfolio that stands out requires more than just showcasing your work. It's about telling a story, creating an experience, and leaving a lasting impression.

## 1. Less is More

In today's fast-paced world, attention spans are shorter than ever. Your portfolio should be clean, focused, and easy to navigate. Remove anything that doesn't serve a purpose.

## 2. Show Your Process

Clients and employers want to see how you think. Include case studies that walk through your design process, from initial concepts to final execution.

## 3. Quality Over Quantity

It's better to have 5 exceptional projects than 20 mediocre ones. Curate your best work and present it beautifully.

## 4. Tell a Story

Each project should have a narrative. What was the problem? How did you approach it? What was the outcome?

## 5. Make it Personal

Your portfolio should reflect who you are as a designer. Let your personality shine through in your copy, your project selection, and your design choices.

## Conclusion

A great portfolio is never finished—it's a living document that evolves with your career. Keep refining, keep updating, and keep pushing yourself to do better work.
    `,
        date: '2024-12-15',
        readTime: '5 min read',
        category: 'Design',
        image: '/blog/design-principles.jpg',
        author: {
            name: 'Elena',
            avatar: '/avatar.jpg',
        },
    },
    {
        slug: 'building-your-personal-brand',
        title: 'Building Your Personal Brand as a Creative',
        excerpt: 'Discover strategies to develop and maintain a strong personal brand that attracts the right opportunities.',
        content: `
# Building Your Personal Brand as a Creative

Your personal brand is more than just a logo or a color palette—it's how people perceive you and your work.

## Define Your Unique Value

What makes you different from other creatives? Maybe it's your background, your approach, or your specific niche. Identify what sets you apart.

## Be Consistent

Consistency builds trust. Use the same visual language, tone of voice, and messaging across all your platforms.

## Share Your Knowledge

Content marketing is powerful. Write blog posts, share tips on social media, and contribute to the creative community.

## Network Authentically

Build genuine relationships with other creatives, potential clients, and industry leaders. Attend events, engage online, and be helpful.

## Evolve Over Time

Your brand should grow with you. Don't be afraid to rebrand as your skills and interests evolve.

## Final Thoughts

Building a personal brand takes time and consistency. Be patient, stay authentic, and keep showing up.
    `,
        date: '2024-12-10',
        readTime: '4 min read',
        category: 'Career',
        image: '/blog/personal-brand.jpg',
        author: {
            name: 'Elena',
            avatar: '/avatar.jpg',
        },
    },
    {
        slug: 'responsive-design-best-practices',
        title: 'Responsive Design Best Practices in 2024',
        excerpt: 'Master the art of creating websites that look and work beautifully across all devices.',
        content: `
# Responsive Design Best Practices in 2024

With users accessing websites on everything from smartwatches to 4K monitors, responsive design is more important than ever.

## Mobile-First Approach

Start designing for mobile and progressively enhance for larger screens. This ensures your core experience works everywhere.

## Flexible Grids

Use relative units like percentages and rem instead of fixed pixels. CSS Grid and Flexbox make this easier than ever.

## Responsive Images

Use the srcset attribute and modern image formats like WebP to serve optimized images for each device.

## Touch-Friendly Design

Ensure buttons and interactive elements are large enough for touch (minimum 44x44 pixels) and have adequate spacing.

## Test on Real Devices

Simulators are helpful, but nothing beats testing on actual devices to catch issues with performance and usability.

## Performance Matters

Responsive design should also mean responsive performance. Optimize for slow connections and low-powered devices.

## Conclusion

Great responsive design is invisible—users should have a seamless experience regardless of their device.
    `,
        date: '2024-12-05',
        readTime: '6 min read',
        category: 'Web Design',
        image: '/blog/responsive-design.jpg',
        author: {
            name: 'Elena',
            avatar: '/avatar.jpg',
        },
    },
    {
        slug: 'crafting-brands-that-stick',
        title: 'Crafting Brands That Stick: The Power of Visual Identity',
        excerpt: 'Explore how a strong visual identity can transform a brand and create lasting connections.',
        content: `
# Crafting Brands That Stick

A brand is more than just a logo. It is an emotional connection between a company and its audience...
        `,
        date: '2024-11-20',
        readTime: '3 min read',
        category: 'Brand Design',
        image: '/blog/brand-design.jpg',
        author: {
            name: 'Elena',
            avatar: '/avatar.jpg',
        },
    },
    {
        slug: 'designing-interfaces-people-love',
        title: 'Designing Interfaces People Love to Use',
        excerpt: 'Learn the secrets to creating intuitive and engaging user interfaces that users will appreciate.',
        content: `
# Designing Interfaces People Love

User experience is the heart of any digital product. When users find an interface intuitive, they build trust...
        `,
        date: '2024-11-15',
        readTime: '2 min read',
        category: 'UX/UI Design',
        image: '/blog/ui-ux-design.jpg',
        author: {
            name: 'Elena',
            avatar: '/avatar.jpg',
        },
    },
    {
        slug: 'the-future-of-web-design',
        title: 'The Future of Web Design: Function Meets Emotion',
        excerpt: 'How the next generation of web design is blending technical excellence with emotional storytelling.',
        content: `
# The Future of Web Design

The web is evolving. No longer just a source of information, it is becoming a canvas for experiences...
        `,
        date: '2024-11-10',
        readTime: '3 min read',
        category: 'Web Design',
        image: '/blog/future-web.jpg',
        author: {
            name: 'Elena',
            avatar: '/avatar.jpg',
        },
    },
];

export function getBlogPost(slug: string): BlogPost | undefined {
    return blogPosts.find((post) => post.slug === slug);
}

export function getAllBlogSlugs(): string[] {
    return blogPosts.map((post) => post.slug);
}
