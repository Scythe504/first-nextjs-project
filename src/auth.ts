import NextAuth from "next-auth"
import prisma from "@/db/index"
import authConfig from "@/auth.config"
import { PrismaAdapter } from "@auth/prisma-adapter"

export const {
    handlers : { GET, POST},
    auth,
    signIn,
    signOut
} = NextAuth({
    callbacks:{
        async jwt ({token}){
            console.log({token})
            return token
        }
    },
    adapter: PrismaAdapter(prisma),
    session: { strategy: "jwt"},
    ...authConfig
})