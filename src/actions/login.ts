"use server"
import * as z from 'zod'
import { LoginSchema } from '@/schema'
import { signIn } from '@/auth'
import { DEFAULT_LOGIN_REDIRECT } from '@/routes'
import { AuthError } from 'next-auth'
import { getUserByEmail } from '@/data/user'
import { generateVerificationToken } from '@/lib/tokens'
import { sendVerificationEmail } from '@/lib/mail'

export const login = async (value : z.infer<typeof LoginSchema>)=>{
    const validatedFields = LoginSchema.safeParse(value)
    if(!validatedFields.success){
        return {
            error: "error occured while validating inputs"
        }
    }
    const { email, password } = validatedFields.data;

    const existingUser = await getUserByEmail(email);

    if(!existingUser || !existingUser.email || !existingUser.password){
        return { error: "User credentials Invalid"}
    }

    // if(!existingUser.emailVerified){
    //     const verificationToken = await generateVerificationToken(
    //         existingUser.email
    //         );
    //     const email = await sendVerificationEmail(
    //         //@ts-ignore
    //         verificationToken?.email,
    //         verificationToken?.token,
    //     );
    //     console.log(email);
    //     return { success : "Confirmation email sent"}
    // }

    try {
        await signIn("credentials",{
            email,
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT
        })
    } catch (error) {
        if(error instanceof AuthError){
            switch (error.type){
                case "CredentialsSignin": return { error: "Invalid Credentials" }
                default: 
                return { error : "Something went wrong!"}
            }
        }
        throw error;
    }
}