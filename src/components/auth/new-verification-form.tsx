"use client"
import { BeatLoader } from "react-spinners"
import  { CardWrapper } from "./card-wrapper"
import { useSearchParams } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import { newVerification } from "@/actions/new-verification"
import { FormSuccess } from "../form-success"
import { FormError } from "../form-error"

export const NewVerficationForm = ()=>{
    const searchParams = useSearchParams();
    const token = searchParams.get("token");
    const [ error, setError] = useState<string | undefined>()
    const [ success, setSuccess] = useState<string | undefined>()
    const onSubmit = useCallback(()=>{
        if(error || success) return ;//on dev mode it will hae no effect
        if(!token){
            setError("Token not present")
            return ;
        }
        newVerification(token)
        .then((data)=>{
            setError(data.error);
            setSuccess(data.success);
        })
        .catch((e)=>console.error({e}))
    },[token])

    useEffect(()=>{
        onSubmit();
    },[onSubmit])

    return (
        <CardWrapper
            headerLabel="Confirming your verification"
            backButtonLabel="Back to login"
            backButtonHref="/auth/login"
        >
        <div className="flex items-center w-full justify-center">
            {!error && !success &&(<BeatLoader/>) }
            <FormSuccess message={success}/>
            <FormError message={error}/>
        </div>
        </CardWrapper>
    )
}