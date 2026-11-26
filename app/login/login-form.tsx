'use client';

import { useActionState } from 'react';
import { authenticate } from '@/lib/auth-actions';

export default function LoginForm() {
    const [errorMessage, formAction, isPending] = useActionState(
        authenticate,
        undefined,
    );

    return (
        <form action={formAction} className="space-y-4">
            <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium">
                    Correo electrónico
                </label>
                <input
                    id="email"
                    type="email"
                    name="email"
                    required
                    placeholder="Ingresa tu correo"
                    className="w-full rounded-md border border-gray-300 p-2"
                />
            </div>

            <div>
                <label htmlFor="password" className="mb-2 block text-sm font-medium">
                    Contraseña
                </label>
                <input
                    id="password"
                    type="password"
                    name="password"
                    required
                    minLength={6}
                    placeholder="Ingresa tu contraseña"
                    className="w-full rounded-md border border-gray-300 p-2"
                />
            </div>

            <button
                type="submit"
                disabled={isPending}
                className="w-full rounded-md bg-blue-600 p-2 text-white hover:bg-blue-700 disabled:opacity-50"
            >
                {isPending ? 'Iniciando sesión...' : 'Iniciar sesión'}
            </button>

            {errorMessage && (
                <p className="text-sm text-red-600">{errorMessage}</p>
            )}
        </form>
    );
}