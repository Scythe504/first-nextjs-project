"use server"
import * as z from "zod"
import { ResetSchema } from "@/schema"
import { getUserByEmail } from "@/data/user"
import { getPasswordResetTokenfromDb } from "@/lib/tokens"
import { sendPasswordResetEmail } from "@/lib/mail"

export const reset = async (values: z.infer<typeof ResetSchema>)=>{
    const validatedFields = ResetSchema.safeParse(values)

    if(!validatedFields.success){
        return { error : "Invalid email!"}
    }

    const { email } = validatedFields.data;

    const existingUser = await getUserByEmail(email);

    if(!existingUser){
        return { error : "User doesnt exist"}
    }

    const passwordResetToken = await getPasswordResetTokenfromDb(email);
    const emailReset = await sendPasswordResetEmail(//@ts-ignore
        passwordResetToken?.email,
        passwordResetToken?.token
    )
    console.log(emailReset)
    return { success : "Reset email sent"};
}
