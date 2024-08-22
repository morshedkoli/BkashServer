import LoginForm from "@/components/auth/LoginForm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const LoginPage = () => {

    const cookieStore = cookies()
    const token = cookieStore.get("token")
    if(typeof token !== "undefined") {
        redirect("/");
    }

    return ( 
        <LoginForm/>
     );
}
 
export default LoginPage;