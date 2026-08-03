import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { getUserByEmail, createUser } from "@/lib/db";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        action: { label: "Action", type: "text" },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const { email, password } = credentials as {
          email: string;
          password: string;
          action: string;
        };

        // ── SIGNUP ──────────────────────────
        if (credentials.action === "signup") {
          const existing = await getUserByEmail(email);
          if (existing) {
            throw new Error("An account with this email already exists.");
          }

          const hash = await bcrypt.hash(password, 12);
          const user = await createUser(email, hash);

          return {
            id: user.id,
            email: user.email,
            name: user.full_name,
          };
        }

        // ── LOGIN ───────────────────────────
        const user = await getUserByEmail(email);
        if (!user) {
          throw new Error("No account found with this email.");
        }

        const valid = await bcrypt.compare(password, user.password_hash);
        if (!valid) {
          throw new Error("Invalid password.");
        }

        return {
          id: user.id,
          email: user.email,
          name: user.full_name,
        };
      },
    }),
  ],

  pages: {
    signIn: "/login",
    newUser: "/dashboard",
  },

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        (session.user as { id: string }).id = token.id as string;
      }
      return session;
    },
  },

  secret: process.env.AUTH_SECRET,
});
