import NextAuth from "next-auth"
import Github from "next-auth/providers/github"

import authConfig from "@/auth.config"


export const {
    handlers : { GET, POST},
    auth
} = NextAuth({
    providers: [Github]
})