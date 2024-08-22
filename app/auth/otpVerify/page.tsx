import OtpVerifyForm from "@/components/auth/OtpVerifyForm";
import PlainLayout from "@/components/layout/Plain-Layout";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const Page = () => {
    const cookieStore = cookies()
    const token = cookieStore.get("token")
    if(typeof token !== "undefined") {
        redirect("/");
    }

    return ( 
      
                    <OtpVerifyForm/>

       
    );
}
 
export default Page;