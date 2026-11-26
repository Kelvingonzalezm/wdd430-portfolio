
'use server';

import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { auth } from '@/auth';

const currentYear = new Date().getFullYear();

async function requireAuth() {
    const session = await auth();

    if (!session?.user) {
        throw new Error('Unauthorized: You must be logged in.');
    }
}

const yearCompletedSchema = z.preprocess(
    (value) => (value === '' || value === null ? null : value),
    z.coerce
        .number()
        .int('Year must be a whole number.')
        .gte(2000, 'Year must be 2000 or later.')
        .lte(currentYear, `Year cannot be later than ${currentYear}.`)
        .nullable(),
);

const ProjectFormSchema = z.object({
    title: z.string().trim().min(2, 'Title must have at least 2 characters.'),
    description: z.string().trim().min(10, 'Description must have at least 10 characters.'),
    technologies: z.string().trim().min(2, 'Technologies are required.'),
    yearCompleted: yearCompletedSchema,
    type: z.enum(['opensource', 'school']),
    link: z.string().trim().optional(),
});

const CreateProjectSchema = z.object({
    title: z.string().trim().min(3, 'Title must have at least 3 characters.'),
    description: z.string().trim().min(20, 'Description must have at least 20 characters.'),
    technologies: z.string().trim().min(2, 'Technologies are required.'),
    yearCompleted: yearCompletedSchema,
    type: z.enum(['opensource', 'school']),
    link: z.string().trim().optional(),
});

export type State = {
    errors?: {
        title?: string[];
        description?: string[];
        technologies?: string[];
        yearCompleted?: string[];
        type?: string[];
        link?: string[];
    };
    message?: string | null;
};

export async function createProject(
    _prevState: State,
    formData: FormData,
): Promise<State> {
    await requireAuth();

    const validatedFields = CreateProjectSchema.safeParse({
        title: formData.get('title'),
        description: formData.get('description'),
        technologies: formData.get('technologies'),
        yearCompleted: formData.get('yearCompleted'),
        type: formData.get('type'),
        link: formData.get('link'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Please correct the errors below.',
        };
    }

    const {
        title,
        description,
        technologies,
        yearCompleted,
        type,
        link,
    } = validatedFields.data;

    const technologyArray = technologies
        .split(',')
        .map((technology) => technology.trim())
        .filter(Boolean);

    try {
        await sql`
            INSERT INTO projects (
                title,
                description,
                type,
                technologies,
                link,
                year_completed
            )
            VALUES (
                ${title},
                ${description},
                ${type},
                string_to_array(${technologyArray.join(',')}, ','),
                ${link || null},
                ${yearCompleted}
            )
        `;
    } catch {
        return {
            message: 'Database Error: Failed to Create Project.',
        };
    }

    revalidatePath('/projects');
    revalidatePath('/dashboard/projects');
    redirect('/dashboard/projects');
}

export async function updateProject(
    id: string,
    formData: FormData,
) {
    await requireAuth();

    const projectId = Number(id);

    if (!Number.isSafeInteger(projectId) || projectId <= 0) {
        throw new Error('Invalid project ID.');
    }

    const validatedFields = ProjectFormSchema.safeParse({
        title: formData.get('title'),
        description: formData.get('description'),
        technologies: formData.get('technologies'),
        yearCompleted: formData.get('yearCompleted'),
        type: formData.get('type'),
        link: formData.get('link'),
    });

    if (!validatedFields.success) {
        throw new Error('Invalid project input.');
    }

    const {
        title,
        description,
        technologies,
        yearCompleted,
        type,
        link,
    } = validatedFields.data;

    const technologyArray = technologies
        .split(',')
        .map((technology) => technology.trim())
        .filter(Boolean);

    try {
        await sql`
            UPDATE projects
            SET
                title = ${title},
                description = ${description},
                technologies = string_to_array(${technologyArray.join(',')}, ','),
                year_completed = ${yearCompleted},
                type = ${type},
                link = ${link || null}
            WHERE id = ${projectId}
        `;
    } catch {
        throw new Error('Database Error: Failed to Update Project.');
    }

    revalidatePath('/projects');
    revalidatePath('/dashboard/projects');
    redirect('/dashboard/projects');
}

export async function deleteProject(id: string) {
    await requireAuth();

    const projectId = Number(id);

    if (!Number.isSafeInteger(projectId) || projectId <= 0) {
        throw new Error('Invalid project ID.');
    }

    try {
        await sql`
            DELETE FROM projects
            WHERE id = ${projectId}
        `;
    } catch {
        throw new Error('Database Error: Failed to Delete Project.');
    }

    revalidatePath('/projects');
    revalidatePath('/dashboard/projects');
}
