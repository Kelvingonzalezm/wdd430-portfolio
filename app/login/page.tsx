import LoginForm from './login-form';

export default function LoginPage() {
    return (
        <main className="mx-auto mt-10 max-w-md rounded-lg border p-8 shadow-sm">
            <h1 className="mb-6 text-center text-2xl font-bold">
                Iniciar sesión
            </h1>

            <LoginForm />
        </main>
    );
}