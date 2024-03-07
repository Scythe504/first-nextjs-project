import NextAuth from "next-auth"
import prisma from "@/db/index"
import authConfig from "@/auth.config"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { getUserById } from "./data/user"


export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut
} = NextAuth({
    pages:{
        signIn: "/auth/login",
        error: "/auth/error"
    },
    events: {
       async linkAccount({user}){
            await prisma.user.update({
                where: {
                    id: user.id,
                },data:{
                    emailVerified : new Date(),
                }
            })
       }
    },
    callbacks: {
        async session({ token, session }) {
            console.log({
                sessionToken: token,
                session
            })
            if (token.role && session.user) {
                session.user.role = token.role;
            }
            // if(session.user){
                //     //@ts-ignore
                //     session.user.customField = token.customField;
                // }
                if (token.sub && session.user) {
                    session.user.id = token.sub;
                }
                return session;
            },
            async jwt({ token }) {
                // console.log({token})
                // token.customField = 'testtoken'
                if (!token.sub) {
                    return token
                }
                const existingUser = await getUserById(token.sub)
                if (!existingUser) {
                    return token
                }
                token.role = existingUser.role;
                return token
            },
            // async signIn({user}){//@ts-ignore
            //     const existingUser = await getUserById(user.id) ;
            //     if(!existingUser || !existingUser.emailVerified){
            //         return false;
            //     }
                
            //     return true;
            // },
    },
    adapter: PrismaAdapter(prisma),
    session: { strategy: "jwt" },
    ...authConfig
})