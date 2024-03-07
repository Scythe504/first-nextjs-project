import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY);

const baseUrl = 'http://localhost:3000'


export const sendVerificationEmail = async (
    email: string,
    token: string
)=>{
    const confirmLink = `${baseUrl}/auth/new-verification?token=${token}`;
    const resendMail = await resend.emails.send({
        from: "onboarding@reesend.com",
        to: email,
        subject: "Confirm your email",
        html: `<p>Click <a href="${confirmLink}">here</a> to confirm email</p>`
    })
    console.log({resendMail});
    return resendMail;
}