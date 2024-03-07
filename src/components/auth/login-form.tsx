"use client"
import { CardWrapper } from "./card-wrapper"
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod';
import { LoginSchema } from "../../schema/index";
import { useForm } from "react-hook-form";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form'
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { login } from "@/actions/login";
import { useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";



export const LoginForm = () => {
    const searchParams = useSearchParams();

    const urlError = searchParams.get("error") === "OAuthAccountNotLinked" ?
        "Email already linked via another provider" : "";

    const [isPending, startTransition] = useTransition();

    const [error, setError] = useState<string | undefined>("");
    const [showTwoFA, setShowTwoFA] = useState(false);
    const [success, setSuccess] = useState<string | undefined>("");

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    })

    const onSubmit = (values: z.infer<typeof LoginSchema>) => {
        startTransition(() => {
            login(values)
                .then((data) => {
                    if (data?.error) {
                        form.reset()
                        setError(error);
                    }
                    if (data?.success) {
                        form.reset();
                        setSuccess(data.success);
                    }

                }).catch(e => {
                    form.reset()
                    console.log({ e })
                    setError("Something went wrong");
                })
        })
    }


    return (
        <CardWrapper
            headerLabel="Welcome back!"
            backButtonLabel="Don't have an account?"
            backButtonHref="/auth/register"
            showSocial
        >

            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                >
                    <div
                        className=" space-y-4"
                    >
                        {
                            <FormField control={form.control}
                            name="code"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Two-Factor-Code
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={isPending}
                                            {...field}
                                            placeholder="123456"
                                            type="number"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        }
                        {!showTwoFA&&
                            <>
                            <FormField control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Email
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={isPending}
                                                {...field}
                                                placeholder="example@example.com"
                                                type="email"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Password
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={isPending}
                                                {...field}
                                                type="password"
                                            />
                                        </FormControl>
                                        <Button
                                            size={"sm"}
                                            variant={"link"}
                                            asChild
                                            className="px-0 font-normal"
                                        >
                                            <Link href="/auth/reset">
                                                Forgot Password?
                                            </Link>
                                        </Button>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </>}
                    </div>
                    <FormError message={error || urlError} />
                    <FormSuccess message={success} />
                    <Button
                        type="submit"
                        className="w-full"
                        disabled={isPending}
                    >
                        {showTwoFA ? "Confirm":"Login"}
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    )
}