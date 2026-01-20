import { projects } from '@/lib/data';
import { notFound } from 'next/navigation';
import ProjectHero from '@/components/sections/ProjectHero';
import ProjectDetails from '@/components/sections/ProjectDetails';
import Contact from '@/components/sections/Contact';

interface PageProps {
    params: Promise<{ slug: string }>;
}

export default async function ProjectPage({ params }: PageProps) {
    const { slug } = await params;
    const project = projects.find((p) => p.slug === slug);

    if (!project) {
        notFound();
    }

    return (
        <div className="relative min-h-screen">
            <main className="relative z-10 bg-[#1C1C1C] mb-[500px] md:mb-[700px] rounded-b-[60px] md:rounded-b-[100px]">
                <ProjectHero project={project} />
                <ProjectDetails project={project} />
                <Contact />
            </main>
        </div>
    );
}

export async function generateStaticParams() {
    return projects.map((project) => ({
        slug: project.slug,
    }));
}
