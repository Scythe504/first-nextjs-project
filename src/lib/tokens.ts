import { getVerificationTokenByEmail } from "@/data/verification";
import { v4 as uuid } from "uuid";
import prisma from "@/db";


export const generateVerificationToken = async (email : string)=>{
    const token = uuid();
    const expires = new Date(new Date().getTime() + 3600 * 1000);

    const existingToken = await getVerificationTokenByEmail(email);
    if(existingToken){
        await prisma.verificationToken.delete({
            where: {
                id: existingToken.id,
            }
        })
    }
    try {
        const verificationToken = await prisma.verificationToken.create({
            data: {
                email: email,
                token: token,
                expires: expires
            }
        });
        return verificationToken;
    }catch(e){
        console.error({e})
        return null
    }

   
}