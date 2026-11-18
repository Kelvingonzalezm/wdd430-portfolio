'use client';

import { useActionState } from 'react';
import Link from 'next/link';
import { createProject, type State } from '@/lib/actions';

const initialState: State = {
    message: null,
    errors: {},
};

export default function CreateProjectForm() {
    const [state, formAction, isPending] = useActionState(
        createProject,
        initialState,
    );

    return (
        <form
            action={formAction}
            className="space-y-6 rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
        >
            <div>
                <label htmlFor="title" className="mb-2 block text-sm font-medium text-gray-700">
                    Project Title
                </label>
                <input
                    id="title"
                    name="title"
                    type="text"
                    required
                    minLength={3}
                    aria-describedby="title-error"
                    className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div id="title-error" aria-live="polite" aria-atomic="true">
                    {state.errors?.title?.map((error) => (
                        <p key={error} className="mt-1 text-sm text-red-600">
                            {error}
                        </p>
                    ))}
                </div>
            </div>

            <div>
                <label htmlFor="description" className="mb-2 block text-sm font-medium text-gray-700">
                    Description
                </label>
                <textarea
                    id="description"
                    name="description"
                    required
                    minLength={20}
                    rows={4}
                    aria-describedby="description-error"
                    className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div id="description-error" aria-live="polite" aria-atomic="true">
                    {state.errors?.description?.map((error) => (
                        <p key={error} className="mt-1 text-sm text-red-600">
                            {error}
                        </p>
                    ))}
                </div>
            </div>

            <div>
                <label htmlFor="technologies" className="mb-2 block text-sm font-medium text-gray-700">
                    Technologies (comma-separated)
                </label>
                <input
                    id="technologies"
                    name="technologies"
                    type="text"
                    placeholder="Next.js, TypeScript, PostgreSQL"
                    required
                    minLength={2}
                    aria-describedby="technologies-error"
                    className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div id="technologies-error" aria-live="polite" aria-atomic="true">
                    {state.errors?.technologies?.map((error) => (
                        <p key={error} className="mt-1 text-sm text-red-600">
                            {error}
                        </p>
                    ))}
                </div>
            </div>

            <div>
                <label htmlFor="yearCompleted" className="mb-2 block text-sm font-medium text-gray-700">
                    Year Completed
                </label>
                <input
                    id="yearCompleted"
                    name="yearCompleted"
                    type="number"
                    min="2000"
                    required
                    aria-describedby="yearCompleted-error"
                    className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div id="yearCompleted-error" aria-live="polite" aria-atomic="true">
                    {state.errors?.yearCompleted?.map((error) => (
                        <p key={error} className="mt-1 text-sm text-red-600">
                            {error}
                        </p>
                    ))}
                </div>
            </div>

            <div>
                <label htmlFor="type" className="mb-2 block text-sm font-medium text-gray-700">
                    Project Type
                </label>
                <select
                    id="type"
                    name="type"
                    required
                    defaultValue="school"
                    className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="school">School</option>
                    <option value="opensource">Open Source</option>
                </select>
            </div>

            <div>
                <label htmlFor="link" className="mb-2 block text-sm font-medium text-gray-700">
                    Project Link (optional)
                </label>
                <input
                    id="link"
                    name="link"
                    type="url"
                    placeholder="https://github.com/..."
                    className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {state.message && (
                <p className="text-sm text-red-600" aria-live="polite">
                    {state.message}
                </p>
            )}

            <div className="flex gap-4">
                <button
                    type="submit"
                    disabled={isPending}
                    className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {isPending ? 'Saving...' : 'Save Project'}
                </button>

                <Link
                    href="/projects"
                    className="rounded-lg bg-gray-200 px-6 py-3 font-semibold text-gray-800 hover:bg-gray-300"
                >
                    Cancel
                </Link>
            </div>
        </form>
    );
}
