import * as z from 'zod'

export const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1,{
        message: "Password is required"
    }),
})

export const SignUpSchema = z.object({
    email : z.string().email({
        message: "Invalid Email"
    }),
    password: z.string().min(6,{
        message: "Password must be atleast of 6 digits"
    }),
    username : z.string().min(1,{
        message: "Username can not be empty"
    })
})

export const ResetSchema = z.object({
    email : z.string().email({
        message: "Invalid Email"
    })
})

export const NewPassword = z.object({
    password : z.string().min(6,{
        message : "It must be of 6 digits"
    })
})