"use server"
import * as z from 'zod'
import { SignUpSchema } from '@/schema'
import * as bcrypt from 'bcrypt'
import prisma from '@/db/index'


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
    
    try {
        const existingUser = await prisma.user.findUnique({
            where: {
                email: email
            }
        })
        if(existingUser){
            throw new Error("User already exists")
        }
        await prisma.user.create({
            data:{
                username: username,
                email: email,
                password: hashedPassword
            }
        })
        // Send Verification token email
        return {success: "user created"}
    }catch(e){
        console.error("Error", e)
        return {error : "User couldnt be created"}
    }

    
}