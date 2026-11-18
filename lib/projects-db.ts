
import { sql } from '@vercel/postgres';

export interface Project {
    id: number;
    title: string;
    description: string;
    type: 'opensource' | 'school';
    technologies: string[];
    link?: string;
}

export const ITEMS_PER_PAGE = 6;

function sanitizeQuery(query: string): string {
    return query.trim().slice(0, 100);
}

export async function getProjects(type?: string | null): Promise<Project[]> {
    if (type) {
        const { rows } = await sql<Project>`
            SELECT * FROM projects
            WHERE type = ${type}
            ORDER BY id
        `;
        return rows;
    }

    const { rows } = await sql<Project>`
        SELECT * FROM projects
        ORDER BY id
    `;

    return rows;
}

export async function getProjectById(id: number): Promise<Project | null> {
    const { rows } = await sql<Project>`
        SELECT * FROM projects
        WHERE id = ${id}
    `;

    return rows[0] ?? null;
}

export async function fetchFilteredProjects(
    query: string,
    currentPage: number
): Promise<Project[]> {
    const safeQuery = sanitizeQuery(query);
    const safePage =
        Number.isInteger(currentPage) && currentPage > 0
            ? currentPage
            : 1;

    const offset = (safePage - 1) * ITEMS_PER_PAGE;

    if (safeQuery) {
        const searchPattern = `%${safeQuery}%`;

        const { rows } = await sql<Project>`
            SELECT * FROM projects
            WHERE title ILIKE ${searchPattern}
                OR COALESCE(description, '') ILIKE ${searchPattern}
                OR array_to_string(technologies, ' ') ILIKE ${searchPattern}
            ORDER BY id
            LIMIT ${ITEMS_PER_PAGE}
            OFFSET ${offset}
        `;

        return rows;
    }

    const { rows } = await sql<Project>`
        SELECT * FROM projects
        ORDER BY id
        LIMIT ${ITEMS_PER_PAGE}
        OFFSET ${offset}
    `;

    return rows;
}

export async function fetchProjectsPages(query: string): Promise<number> {
    const safeQuery = sanitizeQuery(query);

    if (safeQuery) {
        const searchPattern = `%${safeQuery}%`;

        const { rows } = await sql<{ count: number }>`
            SELECT COUNT(*)::int AS count
            FROM projects
            WHERE title ILIKE ${searchPattern}
                OR COALESCE(description, '') ILIKE ${searchPattern}
                OR array_to_string(technologies, ' ') ILIKE ${searchPattern}
        `;

        return Math.ceil(rows[0].count / ITEMS_PER_PAGE);
    }

    const { rows } = await sql<{ count: number }>`
        SELECT COUNT(*)::int AS count
        FROM projects
    `;

    return Math.ceil(rows[0].count / ITEMS_PER_PAGE);
}
