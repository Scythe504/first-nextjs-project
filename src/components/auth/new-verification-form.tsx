"use client"
import { BeatLoader } from "react-spinners"
import  { CardWrapper } from "./card-wrapper"
import { useSearchParams } from "next/navigation"
import { useCallback, useEffect } from "react"

export const NewVerficationForm = ()=>{
    const searchParams = useSearchParams();
    const token = searchParams.get("token");
    const onSubmit = useCallback(()=>{
        console.log(token)
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
            <BeatLoader/>
        </div>
        </CardWrapper>
    )
}