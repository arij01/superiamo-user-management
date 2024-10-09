import NextAuth from "next-auth";
import PostgresAdapter from "@auth/pg-adapter";
import { pool } from "../postgres";
import Google from "next-auth/providers/google";

export const {handlers,signIn,signOut,auth} = NextAuth({
    trustHost: true,
    adapter: PostgresAdapter(pool),
    secret: process.env.AUTH_SECRET,
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60,
        
    },
    pages: {
        signIn: "/auth/signin",
    },
    providers: [
        Google({
            clientId: process.env.AUTH_GOOGLE_ID as string,
            clientSecret: process.env.AUTH_GOOGLE_SECRET as string,
            allowDangerousEmailAccountLinking: true
        }),
    ],
    callbacks: {
        async jwt({token,user}) {
            if (user){
                return {
                    ...token,
                    id: user.id,
                };
            }
            return token;
            
        },
        async session({session,token}) {
            console.log("session callback", { session, token });
            return {
                ...session,
                user: {
                  ...session.user,
                  id: token.id as string,
                },
            };
            
        },

        
    },


});