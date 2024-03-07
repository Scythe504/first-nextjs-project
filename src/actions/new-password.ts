"use server"

import { getUserByEmail } from "@/data/user";
import { generatePasswordResetToken, getPasswordResetTokenByToken } from "@/lib/tokens";
import { NewPassword } from "@/schema"
import { z } from "zod"
import bcrypt from "bcryptjs"


export const newPassword = async ( 
    value : z.infer<typeof NewPassword>,
    token? : string | null
)=>{
    if(!token){
        return { error : "Missing token!"};
    }
    const validatedFields = NewPassword.safeParse(value)

    if(!validatedFields.success){
        return { error : "Invalid Inputs!"}
    }

    const { password } = validatedFields.data;

    const existingToken = await getPasswordResetTokenByToken(token);
    console.log({existingToken})
    if(!existingToken){
        return { error : "Invalid token!"}
    }

    const hasExpired = new Date(existingToken.expires) < new Date();

    if(hasExpired) return { error : "token has expired"};

    const existingUser = await getUserByEmail(existingToken.email);

    if(!existingUser){
        return { error : "Email does not exist"}
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await prisma?.user.update({
            where : {
                id : existingUser.id
            },data: {
                password : hashedPassword,
            }
        })
        return { success : "Password Reset successful"}
    }catch (e){
        console.error({e});
        return null;
    }
}
