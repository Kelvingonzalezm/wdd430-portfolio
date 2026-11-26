import { Suspense } from 'react';
import CreateProjectForm from './create-project-form';

export default function NewProjectPage() {
    return (
        <main className="mx-auto mt-10 max-w-4xl p-8">
            <Suspense fallback={<p>Cargando formulario...</p>}>
                <h1 className="mb-6 text-3xl font-bold">Add New Project</h1>
                <CreateProjectForm />
            </Suspense>
        </main>
    );
}