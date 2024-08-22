
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { cookies } from "next/headers";
import Sidebar from "@/components/layout/SideLayout";

const SideLayout = ({children}) => {


    const cookieStore = cookies()
const token = cookieStore.get("token")
let isLogin = false;
isLogin = typeof token !== "undefined";

    return ( 
        <>
        <Navbar isLogin={isLogin}/>
        <Sidebar/>
        {children}

        <Footer/>
        </>
     );
}
 
export default SideLayout;