import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const Page = () => {

    const cookieStore = cookies()
    const token = cookieStore.get("token")
    if(typeof token !== "undefined") {
        redirect("/");
    }
    return ( <></> );
}
 
export default Page;