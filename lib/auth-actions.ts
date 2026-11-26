
'use server';

import { signIn, signOut } from '@/auth';
import { AuthError } from 'next-auth';

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        await signIn('credentials', {
            email: formData.get('email'),
            password: formData.get('password'),
            redirectTo: '/dashboard',
        });
    } catch (error) {
        if (error instanceof AuthError) {
            console.error('Error Auth.js:', error.type);

            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Credenciales incorrectas.';
                default:
                    return 'Algo salió mal.';
            }
        }

        throw error;
    }
}

export async function logout() {
    await signOut({ redirectTo: '/' });
}
