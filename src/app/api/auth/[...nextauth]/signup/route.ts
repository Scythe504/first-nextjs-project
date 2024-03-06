import { handleSignup } from "@/utils/handleSignup";
import { NextRequest } from "next/server";
import type { inferredSignupSchema } from "@/utils/handleSignup";


export async function POST(req: NextRequest){
    const body: inferredSignupSchema = await req.json();
    return handleSignup({
        email: body.email,
        password: body.password,
        username: body.username
    })
}