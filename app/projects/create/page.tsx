import CreateProjectForm from './create-project-form';

export default function CreateProjectPage() {
    return (
        <main className="mx-auto max-w-2xl px-6 py-12">
            <h1 className="mb-8 text-3xl font-bold text-gray-900">
                Create New Project
            </h1>

            <CreateProjectForm />
        </main>
    );
}
