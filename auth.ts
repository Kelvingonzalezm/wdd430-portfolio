
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { getUserByEmail } from '@/lib/users-db';
import { authConfig } from './auth.config';

export const { handlers, auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            async authorize(credentials) {
                const parsedCredentials = z
                    .object({
                        email: z.string().email(),
                        password: z.string().min(6),
                    })
                    .safeParse(credentials);

                if (!parsedCredentials.success) {
                    return null;
                }

                const { email, password } = parsedCredentials.data;

                const user = await getUserByEmail(email);

                if (!user) {
                    return null;
                }

                const passwordsMatch = await bcrypt.compare(
                    password,
                    user.password_hash,
                );

                if (!passwordsMatch) {
                    return null;
                }

                return {
                    id: String(user.id),
                    name: user.name,
                    email: user.email,
                };
            },
        }),
    ],
});
