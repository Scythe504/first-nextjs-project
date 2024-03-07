import prisma from "@/db/index"

export const getPasswordResetTokenByToken = async (token : string)=>{
    try {
        const passwordToken = await prisma.passwordResetToken.findUnique({
            where : {
                token
            },
        });
        return passwordToken;
    }catch(e){
        return null
    }
}


export const getPasswordTokenByEmail = async (email : string)=>{
    try {
        const passwordResetToken = await prisma.passwordResetToken.findFirst({
            where : {
                email
            },
        });
        return passwordResetToken;
    }catch(e){
        return null
    }
}


