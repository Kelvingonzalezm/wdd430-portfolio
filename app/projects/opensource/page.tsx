
import type { Project } from '@/lib/projects-db';

export const instant = false;

export default async function OpenSourceProjectsPage() {
    const response = await fetch(
        'http://localhost:3001/api/projects?type=opensource',
        { cache: 'no-store' }
    );

    if (!response.ok) {
        throw new Error('Failed to fetch open source projects');
    }

    const projects: Project[] = await response.json();

    return (
        <main className="max-w-7xl mx-auto px-6 pt-8 pb-4">
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-3">
                    Open Source Projects
                </h1>

                <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                    Explore my personal projects and the technologies I use to develop them.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {projects.map((project) => (
                    <article
                        key={project.id}
                        className="bg-blue-50 border border-blue-200 rounded-xl p-5 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                    >
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-xs font-semibold text-blue-700 bg-blue-100 px-3 py-1 rounded-full">
                                Open Source
                            </span>

                            <span className="text-gray-400 text-xs">
                                Project {project.id}
                            </span>
                        </div>

                        <h2 className="text-xl font-bold text-gray-900 mb-2">
                            {project.title}
                        </h2>

                        <p className="text-sm text-gray-600 leading-relaxed mb-3">
                            {project.description}
                        </p>

                        <div className="mb-3">
                            <h3 className="text-xs font-semibold text-gray-800 mb-2">
                                Technologies
                            </h3>

                            <div className="flex flex-wrap gap-2">
                                {project.technologies.map((technology) => (
                                    <span
                                        key={technology}
                                        className="text-xs bg-gray-200 text-gray-700 px-3 py-1 rounded-md"
                                    >
                                        {technology}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {project.link && (
                            <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors duration-200"
                            >
                                View Project →
                            </a>
                        )}
                    </article>
                ))}
            </div>
        </main>
    );
}
