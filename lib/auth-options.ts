import Google from "next-auth/providers/google";
import prisma from "./prisma";
import { NextAuthConfig } from "next-auth";

export const authOptions:NextAuthConfig = {
  providers: [Google],
  session: {
    strategy: "jwt",
    maxAge: 30 * 60, // 30 min session
    updateAge: 10 * 60, // after 10 min session will be refreshed
  },
  callbacks: {
    async authorized({ auth }) {
      return !!auth;
    },
    async signIn({ profile }) {
      try {
        // check it the user already exists
        const existingUser = await prisma.user.findUnique({
          where: {
            email: String(profile?.email),
          },
          select: {
            email: true,
          },
        });

        //   if no user found than create one
        if (!existingUser?.email) {
          await prisma.user.create({
            data: {
              email: String(profile?.email),
              name: String(profile?.name),
              image: String(profile?.picture),
            },
          });
        }

        // await prisma.user.update({
        //   where: {
        //     email: String(profile?.email),
        //   },
        //   data: {
        //     lastSeen: new Date(),
        //   },
        // });

        return true;
      } catch (error) {
        console.error(`Error in signIn callback: ${error}`);
        return false;
      }
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
      }
      return session;
    },
  },
  events: {
    async signIn({ user }) {
      // console.log("signin-event", user);
      await prisma.user.update({
        where: {
          email: String(user?.email),
        },
        data: {
          lastSeen: new Date(),
        },
      });
    },
    async signOut({}) {
      console.log("User Logged Out");
    },
  },
};
