import Navbar from "@/components/Navbar";
import { cookies } from "next/headers";

const AuthLayout = ({children}:{children:React.ReactNode}) => {

    const cookieStore = cookies()
    const token = cookieStore.get("token")
    let isLogin = false;
    isLogin = typeof token !== "undefined";

    return ( 
        <section className="w-full">
            <div className="h-screen flex items-center justify-center">
            {children}
        </div>
        </section>
     );
}
 
export default AuthLayout;