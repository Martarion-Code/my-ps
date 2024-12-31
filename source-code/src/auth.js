
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import { authConfig } from "@/lib/auth.config";
import db from "@/lib/db";

export const { handlers, signIn, signOut, auth } = NextAuth({
    ...authConfig,
    adapter: PrismaAdapter(db),
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/login",
    },
    callbacks: {
        async signIn({ account, profile }) {
            if (account.provider === "google") {
                // Check if the user's email is verified
                const allowedEmails = ["2211102079@ittelkom-pwt.ac.id"];
                // Check if the user's email is verified and in the list of allowed emails
                if (allowedEmails.includes(profile.email)) {
                  return true; // Allow sign-in
                } else {
                  return false; // Deny sign-in
                }
            }
            return true; // Default to allow sign-in for other providers
        },
        async jwt({ token, user }) {
            if (user) {
                // get user from db with the email
                // if there is no user with the email, create new user
                // else set the user data to token
            }

            return token;
        },

        async session({ session, token }) {
            if (token) {
                // set the token data to session
            }

            return session;
        },

        redirect() {
            return "/login";
        },
    },
});