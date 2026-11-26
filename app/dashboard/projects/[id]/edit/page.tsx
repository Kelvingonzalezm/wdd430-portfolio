
import Link from 'next/link';
import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { connection } from 'next/server';
import { updateProject } from '@/lib/actions';
import { getProjectById } from '@/lib/projects-db';

type EditProjectPageProps = {
    params: Promise<{ id: string }>;
};

async function EditProjectForm({
    params,
}: EditProjectPageProps) {
    await connection();

    const { id } = await params;
    const projectId = Number(id);

    if (!Number.isSafeInteger(projectId) || projectId <= 0) {
        notFound();
    }

    const project = await getProjectById(projectId);

    if (!project) {
        notFound();
    }

    const updateProjectWithId = updateProject.bind(null, id);

    return (
        <form action={updateProjectWithId} className="space-y-6">
            <div>
                <label
                    htmlFor="title"
                    className="mb-2 block text-sm font-medium text-gray-700"
                >
                    Project Title
                </label>
                <input
                    id="title"
                    name="title"
                    type="text"
                    defaultValue={project.title}
                    required
                    minLength={2}
                    className="w-full rounded-lg border border-gray-300 p-3"
                />
            </div>

            <div>
                <label
                    htmlFor="description"
                    className="mb-2 block text-sm font-medium text-gray-700"
                >
                    Description
                </label>
                <textarea
                    id="description"
                    name="description"
                    defaultValue={project.description ?? ''}
                    required
                    minLength={10}
                    rows={4}
                    className="w-full rounded-lg border border-gray-300 p-3"
                />
            </div>

            <div>
                <label
                    htmlFor="technologies"
                    className="mb-2 block text-sm font-medium text-gray-700"
                >
                    Technologies (comma-separated)
                </label>
                <input
                    id="technologies"
                    name="technologies"
                    type="text"
                    defaultValue={project.technologies?.join(', ') ?? ''}
                    required
                    minLength={2}
                    className="w-full rounded-lg border border-gray-300 p-3"
                />
            </div>

            <div>
                <label
                    htmlFor="yearCompleted"
                    className="mb-2 block text-sm font-medium text-gray-700"
                >
                    Year Completed (optional)
                </label>
                <input
                    id="yearCompleted"
                    name="yearCompleted"
                    type="number"
                    defaultValue={project.year_completed ?? ''}
                    min="2000"
                    max={new Date().getFullYear()}
                    className="w-full rounded-lg border border-gray-300 p-3"
                />
            </div>

            <div>
                <label
                    htmlFor="type"
                    className="mb-2 block text-sm font-medium text-gray-700"
                >
                    Project Type
                </label>
                <select
                    id="type"
                    name="type"
                    defaultValue={project.type}
                    required
                    className="w-full rounded-lg border border-gray-300 p-3"
                >
                    <option value="school">School</option>
                    <option value="opensource">Open Source</option>
                </select>
            </div>

            <div>
                <label
                    htmlFor="link"
                    className="mb-2 block text-sm font-medium text-gray-700"
                >
                    Project Link (optional)
                </label>
                <input
                    id="link"
                    name="link"
                    type="url"
                    defaultValue={project.link ?? ''}
                    className="w-full rounded-lg border border-gray-300 p-3"
                />
            </div>

            <div className="flex gap-4">
                <button
                    type="submit"
                    className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
                >
                    Update Project
                </button>

                <Link
                    href="/dashboard/projects"
                    className="rounded-lg bg-gray-200 px-6 py-3 font-semibold text-gray-800 hover:bg-gray-300"
                >
                    Cancel
                </Link>
            </div>
        </form>
    );
}

export default function EditProjectPage({
    params,
}: EditProjectPageProps) {
    return (
        <main className="mx-auto max-w-2xl px-6 py-12">
            <h1 className="mb-8 text-3xl font-bold text-gray-900">
                Edit Project
            </h1>

            <Suspense fallback={<p>Loading project...</p>}>
                <EditProjectForm params={params} />
            </Suspense>
        </main>
    );
}
