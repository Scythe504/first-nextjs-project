import { getVerificationTokenByEmail } from "@/data/verification";
import { v4 as uuid } from "uuid";
import prisma from "@/db/index";


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
export const generatePasswordResetToken = async (email: string) => {
    const token = uuid();
    const expires = new Date(new Date().getTime() + 3600 * 1000);
  
    const existingToken = await getPasswordResetTokenByEmail(email);
  
    if (existingToken) {
      await prisma.passwordResetToken.delete({
        where: { id: existingToken.id }
      });
    }
  
    const passwordResetToken = await prisma.passwordResetToken.create({
      data: {
        email,
        token,
        expires
      }
    });
  
    return passwordResetToken;
  }
  

export const getPasswordResetTokenByToken = async (token: string) => {
  try {
    const passwordResetToken = await prisma.passwordResetToken.findUnique({
      where: { token }
    });

    return passwordResetToken;
  } catch {
    return null;
  }
};

export const getPasswordResetTokenByEmail = async (email: string) => {
  try {
    const passwordResetToken = await prisma.passwordResetToken.findFirst({
      where: { email }
    });

    return passwordResetToken;
  } catch {
    return null;
  }
};