import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { UpstashRedisAdapter } from "@next-auth/upstash-redis-adapter";
import { db } from "./db";
export const authOptions:NextAuthOptions = {
    adapter:UpstashRedisAdapter(db),
    session:{
        strategy:"jwt"
    },
    pages:{
        signIn:"/login"
    },
    // Configure one or more authentication providers
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_ID as string,
        clientSecret: process.env.GOOGLE_SECRET as string,
      }),
      // ...add more providers here
    ],
    callbacks:{
        async jwt({token,user}) {
            const dbUser=(await db.get(`user:${token.id}`)) as User | null;
            if(!dbUser){
                token.id=user!.id;
                return token;
            }

            return {
                id:dbUser.id,
                name:dbUser.name,
                email:dbUser.email,
                picture:dbUser.image
            }
        },
        async session({ session,token }) {
            if(token) {
                session.user.id = token.id
            }
        }

       
    }
  }