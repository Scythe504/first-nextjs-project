import { getVerificationTokenByEmail } from "@/data/verification";
import { v4 as uuid } from "uuid";
import prisma from "@/db/index";
import { getPasswordResetTokenByEmail } from "./get-password-token";
import Crypto from "crypto"
import { getTwoFactorTokenByEmail } from "./two-factor-token";

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

export const generateTwoFactorToken = async (email : string)=>{
	const token = Crypto.randomInt(100_000,1_000_000).toString();
	const expires = new Date(new Date().getTime() + 1800*1000);

	const existingToken = await getTwoFactorTokenByEmail(email);
	
	if(existingToken) await prisma.twoFactorToken.delete({
		where : {
			id: existingToken.id
		}
	})
	const twoFactorToken = await prisma.twoFactorToken.create({
		data: {
			email,
			token,
			expires
		}
	})
	console.log({twoFactorToken});
	return twoFactorToken
}