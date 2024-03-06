import authConfig  from '@/auth.config'
import NextAuth from 'next-auth';

import {
    DEFAULT_LOGIN_REDIRECT,
    publicRoutes,
    apiAuthPrefix,
    authRoutes
} from "@/routes"
import { NextResponse } from 'next/server';

const { auth } = NextAuth(authConfig);
//@ts-ignore
export default auth((req)=>{
    const { nextUrl } = req;
    const pathName: string = nextUrl.pathname
    const isLoggedIn: boolean = !!req.auth;
    const isApiAuthRoute: boolean = pathName.startsWith(apiAuthPrefix);
    const isPublicRoute: boolean = publicRoutes.includes(pathName);
    const isAuthRoute: boolean = authRoutes.includes(pathName)

    // switch (true) {
    //     case isApiAuthRoute:
    //         return null;
    //     case isAuthRoute: 
    //         if(isLoggedIn){
    //             return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
    //         }
    //         return null;
    //     case isPublicRoute: 
    //         return null
    //     default :if(!isPublicRoute && !isLoggedIn) return Response.redirect(new URL("/auth/login", nextUrl));
    //     return null;
    // }
    
    if(isApiAuthRoute){
        return null
    }
    if(isAuthRoute){
        if(isLoggedIn){
            return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT,nextUrl));
        }
    }
    if(!isLoggedIn && !isPublicRoute){
        return Response.redirect(new URL("/auth/login", nextUrl));
    }
    return null;
})


export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};