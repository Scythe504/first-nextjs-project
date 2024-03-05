import prisma from "@/db"
import * as bcrypt from 'bcrypt'
import { generateJwt } from "./generateJwt"
import z from 'zod'

const loginSchema = z.object({
    email : z.string().email(),
    password: z.string()
})

export type inferredLoginSchema = z.infer<typeof loginSchema>


export async function handleLogin({email, password}: inferredLoginSchema){
    try {
        const validBody = loginSchema.safeParse({email, password})
        if(!validBody){
            throw new Error("Invalid inputs")
        }
        const dbUser = await prisma.user.findUnique({
            where: {
                email
            }
        })
        if(!dbUser){
            console.log("Wow no one exists")
            return null
        }
        try {
            const passIsCorrect = await bcrypt.compare(dbUser.password, password);
            if(passIsCorrect){
                const jwt = generateJwt(dbUser.id);
                return jwt;
            }
            throw new Error("incorrect password");
        } catch(e){
            console.error(`from inside nested try ${e}`)
        }
    } catch(e){
        console.error(e)
        return null;
    }
    
}