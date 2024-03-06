import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import type { NextAuthConfig } from "next-auth"
import { LoginSchema } from "@/schema/index"
import { getUserByEmail } from "./data/user";


export default {
    providers: [
        Credentials({//@ts-ignore
            async authorize(credentials){
                const validatedFields = LoginSchema.safeParse(credentials);
                if(validatedFields.success){
                    const { email, password } = validatedFields.data;

                    const user = await getUserByEmail(email);
                    if(!user || !user.password) return null

                    const isPassword = await bcrypt.compare(password, user.password);

                    if(isPassword) return user;
                }
                return null;
            }
        })
    ]
} satisfies NextAuthConfig