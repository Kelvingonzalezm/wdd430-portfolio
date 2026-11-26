
import Link from 'next/link';
import { Suspense } from 'react';
import { connection } from 'next/server';
import { getProjects } from '@/lib/projects-db';
import { deleteProject } from '@/lib/actions';

async function ProjectsContent() {
    await connection();

    const projects = await getProjects();

    return (
        <div className="space-y-6">
            {projects.length === 0 ? (
                <p>No projects found.</p>
            ) : (
                projects.map((project) => (
                    <div
                        key={project.id}
                        className="flex flex-col justify-between gap-4 rounded-lg border border-gray-200 p-5 sm:flex-row sm:items-center"
                    >
                        <div>
                            <h2 className="text-xl font-semibold">
                                {project.title}
                            </h2>
                            <p className="mt-1 text-sm text-gray-600">
                                {project.type === 'opensource'
                                    ? 'Open Source'
                                    : 'School'}
                            </p>
                        </div>

                        <div className="flex gap-3">
                            <Link
                                href={`/dashboard/projects/${project.id}/edit`}
                                className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                            >
                                Edit
                            </Link>

                            <form
                                action={deleteProject.bind(null, String(project.id))}
                            >
                                <button
                                    type="submit"
                                    className="rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700"
                                >
                                    Delete
                                </button>
                            </form>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}

export default function ManageProjectsPage() {
    return (
        <main className="mx-auto mt-10 max-w-4xl space-y-8 p-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
                <h1 className="text-3xl font-bold">Manage Projects</h1>

                <Link
                    href="/dashboard/projects/new"
                    className="rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700"
                >
                    + Add New Project
                </Link>
            </div>

            <Suspense fallback={<p>Loading projects...</p>}>
                <ProjectsContent />
            </Suspense>

            <Link
                href="/dashboard"
                className="inline-block text-blue-600 hover:underline"
            >
                Back to Dashboard
            </Link>
        </main>
    );
}
