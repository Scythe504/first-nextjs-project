
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function Navmenu() {

    return <div className=" min-h-20 border-b-0 w-full block bg-transparent ">
        <div className=" font-bold text-xl translate-y-5 flex flex-row items-center mx-16 gap-6">
        <div className="basis-1/3 flex items-center gap-2">
        <svg aria-label="Turbopack logomark" height="40" role="img" viewBox="0 0 40 40" width="40"><path clip-rule="evenodd" d="M15.4747 14.6794C15.0223 14.6794 14.6557 15.0461 14.6557 15.4984V24.6081C14.6557 25.0605 15.0223 25.4272 15.4747 25.4272H24.5844C25.0367 25.4272 25.4034 25.0605 25.4034 24.6081V15.4984C25.4034 15.0461 25.0367 14.6794 24.5844 14.6794H15.4747ZM8.90361 8.17712C8.48925 8.17712 8.15337 8.513 8.15337 8.92735V31.1792C8.15337 31.5936 8.48925 31.9295 8.90361 31.9295H31.1554C31.5698 31.9295 31.9057 31.5936 31.9057 31.1792V8.92735C31.9057 8.513 31.5698 8.17712 31.1554 8.17712H8.90361Z" fill="black" fill-rule="evenodd"></path><path clip-rule="evenodd" d="M0 20.4255V34.8936C0 35.8643 0.270864 36.7718 0.74114 37.5445L5.95744 32.3282V20.4255H0ZM2.37858 39.2112L7.55058 34.0391C7.58663 34.0413 7.62296 34.0425 7.6596 34.0425H19.0561V40H5.10636C4.10328 40 3.16772 39.7106 2.37858 39.2112ZM21.3923 40H34.8936C37.7138 40 40 37.7138 40 34.8936V5.10636C40 2.28621 37.7138 0 34.8936 0H20.4255V5.95744H32.3404C33.2805 5.95744 34.0425 6.71951 34.0425 7.6596V32.3404C34.0425 33.2805 33.2805 34.0425 32.3404 34.0425H21.3923V40Z" fill="url(#:R0:paint0_linear_902_253)" fill-rule="evenodd"></path><defs><linearGradient gradientUnits="userSpaceOnUse" id=":R0:paint0_linear_902_253" x1="21.9667" x2="2.27974" y1="2.8125" y2="22.3659"><stop stop-color="#0096FF"></stop><stop offset="1" stop-color="#FF1E56"></stop></linearGradient></defs></svg>
        
        Eternade</div>
        <div className="basis-3/5 mr-16"><Input placeholder="What are you looking for?"/></div> 
        <div className="basis-1/12 mr-4"><Button>Signin/Signup</Button></div>
        </div>
        </div>
}