import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { getUser, newUser } from "./data-service";
import type { NextAuthConfig } from "next-auth";

const authConfig: NextAuthConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!
    })
  ],
  callbacks: {
    authorized({ auth }) {

      return !!auth?.user;
    },
    async signIn({ user, profile }) {
      try {
        if (!user.email) {
          return false; 
        }

        const existingUser = await getUser(user.email);

        if (!existingUser) {
          await newUser({
            email: user.email,
            first_name: profile?.given_name || user.name?.split(' ')[0] || '',
            last_name: profile?.family_name || user.name?.split(' ')[1] || '',
            profile_image_url: profile?.picture || user.image || '',
            phone_number: profile?.phone_number || ''
          });
        }
        return true;
      } catch (error) {
        console.error('Error during sign-in:', error);
        return false; // Prevent sign-in if there's an error
      }
    },
  },
  pages: {
    signIn: "/login",
  },
};

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(authConfig);