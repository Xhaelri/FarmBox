import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { getUser, newUser } from "./data-service";


const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET
    })
  ],
  callbacks:{
    authorized({auth,request}:any){
      // Check if the user is authenticated !! return boolean
      // If the user is authenticated, return true, otherwise return false
      return !!auth?.user;
    },
    async signIn({user,account,profile}:any){
      try{
        const existingUser = await getUser(user.email);

        if(!existingUser){
          newUser({email:user.email, first_name:profile.given_name, last_name:profile.family_name,profile_image_url:profile.picture, phone_number:profile.phone_number});
        }
        return true
      } catch {
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

