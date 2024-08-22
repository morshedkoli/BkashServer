
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { cookies } from "next/headers";

const PlainLayout = ({children}) => {


    const cookieStore = cookies()
const token = cookieStore.get("token")
let isLogin = false;
isLogin = typeof token !== "undefined";

    return ( 
        <>
        <Navbar isLogin={isLogin}/>
        {children}

        <Footer/>
        </>
     );
}
 
export default PlainLayout;