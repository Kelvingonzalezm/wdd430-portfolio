
import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
    secret: process.env.AUTH_SECRET,
    trustHost: true,
    pages: {
        signIn: '/login',
    },
    session: {
        strategy: 'jwt',
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isProtected = nextUrl.pathname.startsWith('/dashboard');

            if (isProtected) {
                return isLoggedIn;
            }

            if (isLoggedIn && nextUrl.pathname === '/login') {
                return Response.redirect(new URL('/dashboard', nextUrl));
            }

            return true;
        },
    },
    providers: [],
} satisfies NextAuthConfig;
