import { DefaultSession, DefaultUser, NextAuthOptions } from "next-auth";
import EmailProvider from "next-auth/providers/email";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/db";
import { AdminRole } from "./generated/prisma/enums";

declare module "next-auth" {
  interface Session {
    user: {
      role: AdminRole;
      isSuspended: boolean;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    role: AdminRole;
    isSuspended: boolean;
  }
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),

  session: {
    strategy: "jwt", // REQUIRED for middleware
  },

  providers: [
    EmailProvider({
      server: {
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      },
      from: process.env.SMTP_FROM,
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      // Runs on sign in
      if (user) {
        token.role = user.role;
        token.isSuspended = user.isSuspended;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as AdminRole;
        session.user.isSuspended = token.isSuspended as boolean;
      }
      return session;
    },
  },
};
