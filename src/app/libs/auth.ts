import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { db } from '@/app/libs/db';
import GithubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import jwt from 'jsonwebtoken';
import type { JWT } from 'next-auth/jwt';

import type { NextAuthOptions } from 'next-auth';
import axios from './axios';
import { getCurrentUserData } from '../utils/user';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    // CredentialsProvider({
    //   credentials: {
    //     username: {
    //       label: "Username or Email",
    //       type: "text",
    //       placeholder: "Username",
    //     },
    //     password: {
    //       label: "Password",
    //       type: "password",
    //       placeholder: "Password",
    //     },
    //   },
    //   async authorize(credentials, req) {
    //     const { username, password } = credentials as any;
    //     if (!username || !password) return null;
    //     const user = await fetchUser({ userName: username, password });
    //     if (!user) return null;
    //     return user;
    //   },
    // }),
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
      profile(profile) {
        return {
          id: profile.id.toString(),
          name: profile.name ?? profile.login,
          image: profile.avatar_url,
          userName: profile.login,
        };
      },
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      const currUser = await getCurrentUserData({ userName: user.userName });
      if (session?.user) {
        session.user.id = user.id;
        session.user.userName = user.userName;
      }

      return {
        ...session,
        user: {
          ...session?.user,
          ...currUser,
        },
      };
    },
  },
  // callbacks: {
  //   async jwt({ token, user }) {
  //     delete user?.password;
  //     delete user?.updatedAt;
  //     delete user?.createdAt;
  //     delete user?.email;
  //     delete user?.emailVerified;
  //     delete user?.image;

  //     return { ...token, ...user };
  //   },
  //   async session({ session, token }) {
  //     if (session?.user) {
  //       session.user.id = token.id;
  //       session.user.userName = token.userName;
  //     }
  //     return session;
  //   },
  // },
  // pages: {
  //   signIn: "/",
  //   signOut: "/",
  // },
  // session: {
  //   strategy: "jwt",
  // },
  // jwt: {
  //   encode: ({ secret, token }) => {
  //     const encodedToken = jwt.sign(
  //       {
  //         ...token,
  //         iss: process.env.ISSUER_URL,
  //         exp: Math.floor(Date.now() / 1000) + 60 * 60,
  //       },
  //       secret,
  //     );
  //     return encodedToken;
  //   },
  //   decode: async ({ secret, token }) => {
  //     const decodedToken = jwt.verify(token!, secret);
  //     return decodedToken as JWT;
  //   },
  // },

  // debug: process.env.NODE_ENV === "development",
};

async function fetchUser({ userName, password }: { userName: string; password: string }) {
  return (await axios.get('/user', { params: { userName, password } })).data;
}
