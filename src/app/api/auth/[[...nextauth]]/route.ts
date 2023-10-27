import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { type NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { db } from "@/app/utils/db";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
      profile(profile) {
        return {
          id: profile.id.toString(),
          name: profile.name ?? profile.login,
          email: profile.email,
          image: profile.avatar_url,
          userName: profile.login,
        };
      },
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      if (session?.user) {
        session.user.id = user.id;
        session.user.userName = user.userName;
      }
      return session;
    },
  },
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
