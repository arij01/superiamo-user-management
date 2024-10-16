import NextAuth from "next-auth";
import PostgresAdapter from "@auth/pg-adapter";
import { pool } from "@/src/lib/postgres";
import Google from "next-auth/providers/google";
import Nodemailer from "next-auth/providers/nodemailer";
import { clearStaleTokens } from "@/src/lib/auth/clearStaleTokensServerAction";
import { setName } from "@/src/lib/auth/setNameServerAction";

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
        verifyRequest: "/auth/success",
        error: "/auth/error",
    },
    providers: [
        Google({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET,
            allowDangerousEmailAccountLinking: true
        }),
        Nodemailer({
            server: {
                host: process.env.EMAIL_SERVER_HOST,
                port: parseInt(process.env.EMAIL_SERVER_PORT!, 10),
                auth: {
                  user: process.env.EMAIL_SERVER_USER,
                  pass: process.env.EMAIL_SERVER_PASSWORD,
                },
              },
              from: process.env.EMAIL_FROM,
            }),
    ],
    callbacks: {
        async jwt({ token, user, session, trigger }) {
            if (trigger === "update" && session?.name !== token.name) {
              token.name = session.name;
      
              try {
                await setName(token.name);
              } catch (error) {
                console.error("Échec de la définition du nom d'utilisateur ", error);
              }
            }
      
            if (user){
                await clearStaleTokens();
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