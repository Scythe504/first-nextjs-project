import prisma from "@/db/index"



export const getVerificationTokenByToken = async (
    token : string
)=>{
    try {
        const verificationToken = await prisma.verificationToken.findFirst({
            where : {
                token,
            }
        })
        return verificationToken;
    } catch (e) {
        console.error({e})
        return null;
    }
}



export const getVerificationTokenByEmail = async (
    email : string
)=>{
    try {
        const verificationToken = await prisma.verificationToken.findFirst({
            where : {
                email,
            }
        })
        return verificationToken;
    } catch (e) {
        console.error("Error",{e});
        return null
    }
}