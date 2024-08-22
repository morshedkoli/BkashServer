import RegisterForm from "@/components/auth/RegisterForm";
import PlainLayout from "@/components/layout/Plain-Layout";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const RegisterPage = () => {


    const cookieStore = cookies()
    const token = cookieStore.get("token")
    if(typeof token !== "undefined") {
        redirect("/");
    }
    return ( 

     
        
             <RegisterForm/>
      
     );
}
 
export default RegisterPage;