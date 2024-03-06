import z from 'zod'
import * as bcrypt from 'bcrypt'
import { generateJwt } from './generateJwt';

const signUpSchema = z.object({
    email : z.string().email(),
    password: z.string(),
    username : z.string()
})

const saltRounds = 10;

export type inferredSignupSchema = z.infer<typeof signUpSchema>

export async function handleSignup(
    {email, password, username}: inferredSignupSchema
    ) {
    const validCred = signUpSchema.safeParse({email, password, username});
    if(!validCred){
        throw new Error("Invalid Inputs");
    }
    
    try{
         const hashedPassword = await bcrypt.hash(password, saltRounds);
         const dbUser = await prisma?.user.upsert({
            where: {
                email,
            },create: {
                email: email,
                password: hashedPassword,
                username: username,
            },update:{
                password: hashedPassword,
                username: username
            }
         })
         if(dbUser){
            return generateJwt(dbUser.id)
         }
        throw new Error("user creation/updation failed");
    }catch(e){
        console.error("Inside catch block", e);
        return null
    }
}   