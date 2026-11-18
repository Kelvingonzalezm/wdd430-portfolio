import { Suspense } from 'react';
import Link from 'next/link';
import {
  fetchFilteredProjects,
  fetchProjectsPages,
} from '@/lib/projects-db';
import { deleteProject } from '@/lib/actions';
import ProjectSearch from './project-search';
import Pagination from './pagination';

type ProjectsPageProps = {
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
};

async function ProjectsContent({
  searchParams,
}: {
  searchParams: ProjectsPageProps['searchParams'];
}) {
  const params = await searchParams;

  const query = typeof params.query === 'string' ? params.query : '';
  const pageParam = typeof params.page === 'string' ? params.page : '1';

  const parsedPage = Number(pageParam);
  const currentPage =
    Number.isSafeInteger(parsedPage) && parsedPage > 0
      ? parsedPage
      : 1;

  const [projects, totalPages] = await Promise.all([
    fetchFilteredProjects(query, currentPage),
    fetchProjectsPages(query),
  ]);

  return (
    <>
      {projects.length === 0 ? (
        <p className="text-center text-gray-600 py-8">
          No projects found.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <article
              key={project.id}
              className="bg-blue-50 border border-blue-200 rounded-xl p-5 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-blue-700 bg-blue-100 px-3 py-1 rounded-full">
                  {project.type === 'opensource'
                    ? 'Open Source'
                    : 'School'}
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
                  {project.technologies?.map((technology) => (
                    <span
                      key={technology}
                      className="text-xs bg-gray-200 text-gray-700 px-3 py-1 rounded-md"
                    >
                      {technology}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
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

                <Link
                  href={`/projects/${project.id}/edit`}
                  className="inline-block bg-yellow-500 hover:bg-yellow-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors duration-200"
                >
                  Edit
                </Link>

                <form action={deleteProject.bind(null, String(project.id))}>
                  <button
                    type="submit"
                    className="bg-red-600 hover:bg-red-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors duration-200"
                  >
                    Delete
                  </button>
                </form>
              </div>
            </article>
          ))}
        </div>
      )}

      <Pagination totalPages={totalPages} />
    </>
  );
}

export default function ProjectsPage({ searchParams }: ProjectsPageProps) {
  return (
    <main className="max-w-7xl mx-auto px-6 pt-8 pb-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          My Projects
        </h1>

        <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-8">
          Explore my personal and academic projects, the technologies I use,
          and the solutions I have developed.
        </p>

        <Link
          href="/projects/create"
          className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200"
        >
          + Add New Project
        </Link>
      </div>

      <Suspense
        fallback={
          <p className="text-center text-gray-600">
            Loading projects...
          </p>
        }
      >
        <ProjectSearch />
        <ProjectsContent searchParams={searchParams} />
      </Suspense>
    </main>
  );
}
