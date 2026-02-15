// 🔐 AUTHENTICATION API - Handles login
// This is like a security guard that checks if the password is correct

import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Check if username and password match the ones in .env.local
        if (
          credentials?.username === process.env.ADMIN_USERNAME &&
          credentials?.password === process.env.ADMIN_PASSWORD
        ) {
          // ✅ Correct! Let them in
          return {
            id: '1',
            name: 'Admin',
            email: 'admin@example.com',
          };
        }
        // ❌ Wrong password! Don't let them in
        return null;
      },
    }),
  ],
  pages: {
    signIn: '/admin', // Where to go for login
  },
  session: {
    strategy: 'jwt', // Use tokens (like a temporary pass)
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
