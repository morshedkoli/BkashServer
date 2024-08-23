import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import logo from "../img/logo.png";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { Button } from "./ui/button";
  
interface NaverProps{
  isLogin:boolean,
}



const Navbar = ({isLogin}:NaverProps) => {
    return ( 
    
    <div className="bg-primary dark:bg-slate-700 py-2 px-5 flex justify-between text-white">
        

<Link href={'/'}>
<Image src={logo} alt="ikramtelecom" width={40} />



</Link>


{
  isLogin?(
    <div >
    
<DropdownMenu >
  <DropdownMenuTrigger className="focus:outline-none">
  <Avatar>
    <AvatarImage src="https://github.com/shadcn.png" alt="shadcn"/>
    <AvatarFallback className="text-black" >BT</AvatarFallback>
</Avatar>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel><Link href="/profile">My Account</Link></DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>
        <Link href="/profile">
        Profile
        </Link>
    </DropdownMenuItem>
    <DropdownMenuItem><a href="/api/user/login">
    Log Out
      </a></DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
    </div>
  ):(
    <>
   <Link href="/auth/login"> <Button >Login</Button>
   </Link></>
  )
}


    </div> 
    

);
}
 
export default Navbar;