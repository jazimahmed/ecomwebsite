
import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import Credentials from "next-auth/providers/credentials"
import { prisma } from "./lib/prisma";
import { compare } from "bcrypt";
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GitHub,
    Credentials({
        name: "Credentials",
        credentials: {
          email: { label: "Email", type: "email" },
          password: { label: "Password", type: "password" },
        },
        async authorize(credentials) {
            if (!credentials.email || !credentials.password) return null;
    
            const user = await prisma.ecomUser.findUnique({
              where: { email: credentials.email },
            });
    
            if (!user) return null;
    
            const isValid = await compare(credentials.password, user.password);
            if (!isValid) return null;
    
            return {
              id: user.id,
              username: user.username,
              email: user.email,
            };
          },
      })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.username = token.username;
        session.user.email = token.email;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
  session: {
    strategy: "jwt",
  },


})