import prisma  from "@/db/index"

export const getUserByEmail = async (email : string)=>{
    try {
        const user = await prisma.user.findUnique({
            where:{
                email
            }
        })
        return user;
    } catch (error) {
        console.error(error)
        return null
    }
}


export const getUserById = async (id : string)=>{
    try {
        const user = await prisma.user.findUnique({
            where:{
                id
            }
        })
        if(!user){
            throw new Error("User Already Exists");
        }
        return user;
    } catch (error) {
        console.error(error)
        return null
    }
}