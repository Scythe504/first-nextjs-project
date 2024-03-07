"use server"
import * as z from 'zod'
import { LoginSchema } from '@/schema'
import { signIn } from '@/auth'
import { DEFAULT_LOGIN_REDIRECT } from '@/routes'
import { AuthError } from 'next-auth'
import { getUserByEmail } from '@/data/user'
import {
    generateVerificationToken,
    generateTwoFactorToken
} from "@/lib/tokens"
import { sendTwoFactorTokenEmail, sendVerificationEmail } from '@/lib/mail'
import { getTwoFactorTokenByEmail } from '@/lib/two-factor-token'
import { getTwoFactorConfirmationByUserId } from '@/lib/two-factor-token-confirmation'

export const login = async (value : z.infer<typeof LoginSchema>)=>{
    const validatedFields = LoginSchema.safeParse(value)
    if(!validatedFields.success){
        return {
            error: "error occured while validating inputs"
        }
    }
    const { email, password, code } = validatedFields.data;

    const existingUser = await getUserByEmail(email);

    if(!existingUser || !existingUser.email || !existingUser.password){
        return { error: "User credentials Invalid"}
    }

    if(!existingUser.emailVerified){
        const verificationToken = await generateVerificationToken(
            existingUser.email
            );
        const email = await sendVerificationEmail(
            //@ts-ignore
            verificationToken?.email,
            verificationToken?.token,
        );
        console.log(email);
        return { success : "Confirmation email sent"}
    }

    if(existingUser.isTwoFactorEnabled && existingUser.email){
        if(code){
            const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email);
            if(!twoFactorToken) return { error : "Invalid Code!"}

            if(twoFactorToken.token){
                return { error : "Invalid code"};
            }
            const hasExpired = new Date(twoFactorToken.expires) < new Date();

            if(hasExpired){
                return { error : "Code expired"};
            }

            await prisma?.twoFactorToken.delete({
                where: {
                    id: twoFactorToken.id
                }
            })

            const existingConfirmation = await getTwoFactorConfirmationByUserId(
                existingUser.id
            )

            if(existingConfirmation){
                await prisma?.twoFactorConfirmation.delete({
                    where : {
                        id: existingConfirmation.id
                    }
                })
            }

            await prisma?.twoFactorConfirmation.create({//@ts-ignore
                data: {
                    userId: existingUser.id,
                }
            })
        } else {

            const twoFactorToken = await generateTwoFactorToken(existingUser.email);
            await sendTwoFactorTokenEmail(
                existingUser.email,
                twoFactorToken.token
                )
                return { success : "A code has been sent" }
        }
    }

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