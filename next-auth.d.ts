import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      userName: string;
    } & DefaultSession["user"];
  }
  interface User {
    id: string;
    name: string;
    image: string;
    userName: string;
  }
}
