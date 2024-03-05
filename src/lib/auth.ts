import { handleLogin } from '@/utils/handleSignin';
import CredentialsProvider from 'next-auth/providers/credentials'
import Google from "next-auth/providers/google";
import type { inferredLoginSchema } from '@/utils/handleSignin';


export const authOptions = {
    providers: [
        Google({
            clientId : process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_LIENT_SECRET as string
        }),
        CredentialsProvider({
            name: "Login",
            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                    placeholder: "example@example.com"
                },
                password: {
                    label: "Password", type: "password"
                },
                //@ts-ignore
            }, async authorize(credentials : inferredLoginSchema ){
                if(!credentials || !credentials.email || !credentials.password) return null
                return await handleLogin({
                    email: credentials.email,
                    password: credentials.password
                })
            }
        })
    ]
}