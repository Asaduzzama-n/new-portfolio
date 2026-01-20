export interface Project {
    slug: string;
    title: string;
    tagline: string;
    year: string;
    service: string;
    industry: string;
    client: string;
    mainImage: string;
    highlights: string[];
    deliverables?: string[];
    challenges: string;
    mockupImage1: string;
    mockupImage2: string;
    bgColor?: string;
}

export const projects: Project[] = [
    {
        slug: 'website-redesign',
        title: 'Website Redesign',
        tagline: 'A clean, modern redesign for a growing wellness brand. Refreshed the look and feel while improving flow and conversion across the site.',
        year: '2025',
        service: 'Webdesign',
        industry: 'Wellness',
        client: 'Confidential',
        mainImage: '/projects/project-1-main.png',
        highlights: [
            'Full visual refresh aligned with updated brand direction',
            'Improved user journey and mobile responsiveness'
        ],
        deliverables: [
            'Designed a sleek, content-first layout with soft typography and visual rhythm',
            'Introduced clearer CTAs and a simplified structure',
            'Optimized for mobile with fast load times and smooth scroll',
            'Built in Framer for easy handoff and edits'
        ],
        challenges: 'The previous site felt outdated and cluttered, with unclear hierarchy and inconsistent visuals. Users found it hard to navigate, especially on mobile, leading to drop-offs on key pages.',
        mockupImage1: '/projects/project-1-mockup-1.png',
        mockupImage2: '/projects/project-1-mockup-2.png',
        bgColor: 'bg-primary'
    },
    {
        slug: 'brand-identity',
        title: 'Brand Identity',
        tagline: 'Complete brand identity system including logo, color palette, typography, and brand guidelines.',
        year: '2025',
        service: 'Branding',
        industry: 'Creative',
        client: 'Confidential',
        mainImage: '/projects/project-1.png',
        highlights: [
            'Modern and minimal logo design',
            'Comprehensive brand guidelines'
        ],
        challenges: 'Need for a cohesive visual identity that stays true to the brand values while feeling modern and professional.',
        mockupImage1: '/projects/project-1.png',
        mockupImage2: '/projects/project-1.png',
    }
];
