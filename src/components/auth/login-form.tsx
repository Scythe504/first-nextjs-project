import { childrenProps } from "@/utils/children-interface"
import { CardWrapper } from "./card-wrapper"
type CardWrapperProps = {
    children : childrenProps;
    headerLabel : string;
    backButtonLabel : string;
    backButtonHref: string;
    showSocial? : boolean;
}

export const LoginForm = ()=>{
    return (
        <CardWrapper
        headerLabel="Welcome back!"
        backButtonLabel="Don't have an account?"
        backButtonHref="/auth/register"
        showSocial
        >
            Login form!
        </CardWrapper>
    )
}