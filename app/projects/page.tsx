
import { Suspense } from 'react';
import {
  fetchFilteredProjects,
  fetchProjectsPages,
} from '@/lib/projects-db';
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
        <p className="py-8 text-center text-gray-600">
          No projects found.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {projects.map((project) => (
            <article
              key={project.id}
              className="rounded-xl border border-blue-200 bg-blue-50 p-5 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="mb-3 flex items-center justify-between">
                <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                  {project.type === 'opensource'
                    ? 'Open Source'
                    : 'School'}
                </span>

                <span className="text-xs text-gray-400">
                  Project {project.id}
                </span>
              </div>

              <h2 className="mb-2 text-xl font-bold text-gray-900">
                {project.title}
              </h2>

              <p className="mb-3 text-sm leading-relaxed text-gray-600">
                {project.description}
              </p>

              <div className="mb-3">
                <h3 className="mb-2 text-xs font-semibold text-gray-800">
                  Technologies
                </h3>

                <div className="flex flex-wrap gap-2">
                  {project.technologies?.map((technology) => (
                    <span
                      key={technology}
                      className="rounded-md bg-gray-200 px-3 py-1 text-xs text-gray-700"
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
                  className="inline-block rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors duration-200 hover:bg-blue-700"
                >
                  View Project →
                </a>
              )}
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
    <main className="mx-auto max-w-7xl px-6 pb-4 pt-8">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold text-gray-900">
          My Projects
        </h1>

        <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-600">
          Explore my personal and academic projects, the technologies I use,
          and the solutions I have developed.
        </p>
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
