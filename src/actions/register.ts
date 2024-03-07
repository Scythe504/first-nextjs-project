"use server"
import * as z from 'zod'
import { SignUpSchema } from '@/schema'
import * as bcrypt from 'bcryptjs'
import prisma from '@/db/index'
import { getUserByEmail } from '@/data/user'
import { generateVerificationToken } from '@/lib/tokens'

const saltRounds = 10;
export const register = async (value : z.infer<typeof SignUpSchema>)=>{
    const validatedFields = SignUpSchema.safeParse(value)
    if(!validatedFields.success){
        return {
            error: "error occured while validating inputs"
        }
    }
    const {email, password, username} = validatedFields.data;
    const hashedPassword : string = await bcrypt.hash(password, saltRounds);
    
        const existingUser = await getUserByEmail(email)
        if(existingUser){
            return { error : "User already exists please use another email"}
        }
        await prisma.user.create({
            data:{
                username: username,
                email: email,
                password: hashedPassword
            }
        })
        // Send Verification token email
        const verificationToken = await generateVerificationToken(email);

        return {success: "Confirmation Email Sent"}    
}