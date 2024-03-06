"use server"
import * as z from 'zod'
import {  SignUpSchema } from '@/schema'

export const register = async (value : z.infer<typeof SignUpSchema>)=>{
    const validatedFields = SignUpSchema.safeParse(value)
    if(!validatedFields.success){
        return {
            error: "error occured while validating inputs"
        }
    }
    return {
        success: "User created successfully"
    }
}