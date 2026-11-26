import Link from 'next/link';
import { notFound } from 'next/navigation';
import { connection } from 'next/server';
import { Suspense } from 'react';
import { getProjectById } from '@/lib/projects-db';

export default function ProjectDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    return (
        <Suspense fallback={<p className="p-8">Loading project...</p>}>
            <ProjectContent params={params} />
        </Suspense>
    );
}

async function ProjectContent({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    await connection();

    const { id } = await params;
    const projectId = Number(id);

    if (!Number.isInteger(projectId) || projectId <= 0) {
        notFound();
    }

    const project = await getProjectById(projectId);

    if (!project) {
        notFound();
    }

    return (
        <main className="mx-auto max-w-4xl p-8">
            <Link
                href="/projects"
                className="mb-6 inline-block text-blue-600 hover:underline"
            >
                ← Back to Projects
            </Link>

            <article className="rounded-xl border border-blue-200 bg-blue-50 p-6 shadow-md">
                <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                    {project.type === 'opensource' ? 'Open Source' : 'School'}
                </span>

                <h1 className="my-4 text-3xl font-bold text-gray-900">
                    {project.title}
                </h1>

                <p className="mb-6 leading-relaxed text-gray-700">
                    {project.description}
                </p>

                <h2 className="mb-2 font-semibold text-gray-800">
                    Technologies
                </h2>

                <div className="mb-6 flex flex-wrap gap-2">
                    {project.technologies.map((technology) => (
                        <span
                            key={technology}
                            className="rounded-md bg-gray-200 px-3 py-1 text-sm text-gray-700"
                        >
                            {technology}
                        </span>
                    ))}
                </div>

                {project.year_completed && (
                    <p className="mb-6 text-sm text-gray-600">
                        Year Completed: {project.year_completed}
                    </p>
                )}

                {project.link && (
                    <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"
                    >
                        View Project →
                    </a>
                )}
            </article>
        </main>
    );
}