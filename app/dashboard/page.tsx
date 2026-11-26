
import { Suspense } from 'react';
import { auth } from '@/auth';
import { logout } from '@/lib/auth-actions';
import { redirect } from 'next/navigation';
import { connection } from 'next/server';
import Link from 'next/link';

export default function DashboardPage() {
    return (
        <Suspense fallback={<p className="p-8">Cargando dashboard...</p>}>
            <DashboardContent />
        </Suspense>
    );
}

async function DashboardContent() {
    await connection();

    const session = await auth();

    if (!session?.user) {
        redirect('/login');
    }

    return (
        <main className="mx-auto mt-10 max-w-4xl p-8">
            <h1 className="mb-4 text-3xl font-bold">Dashboard</h1>

            <p className="mb-6">
                Bienvenido, {session.user.name ?? session.user.email}.
            </p>

            <Link
                href="/dashboard/projects"
                className="mb-6 inline-block rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
                Manage Projects
            </Link>

            <form
                action={async () => {
                    'use server';
                    await logout();
                }}
            >
                <button
                    type="submit"
                    className="rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700"
                >
                    Cerrar sesión
                </button>
            </form>
        </main>
    );
}
