import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import NextAuth, { User } from "next-auth";
import { JWT } from "next-auth/jwt";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {
        username: { label: "username", type: "text", placeholder: "username" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "password",
        },
      },
      async authorize(credentials, req) {
        const res = await fetch("https://dummyjson.com/auth/login", {
          method: "POST",

          headers: { "Content-Type": "application/json" },

          body: JSON.stringify(credentials),
        });
        const user = await res.json();
        console.log(user);
        if (!user.token) {
          throw new Error(user.message);
        }
        // If no error and we have user data, return it
        if (user.token) {
          return user;
        }

        // Return null if user data could not be retrieved
        return { errors: user.errors, status: false };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    // ...add more providers here
  ],
  pages: {
    signIn: "/",
  },
  session: {
    jwt: true,
    maxAge: 30 * 24 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user: User }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: JWT }) {
      session.user = token.user;
      return session;
    },
  },
  //   debug: process.nextTick.NODE_ENV === "development",
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
