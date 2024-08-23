"use client"
import {
    Command,
    CommandEmpty,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
  } from "@/components/ui/command"

import AdminMenu from "./sidebar/AdminMenu";
import PartnerMenu from "./sidebar/PartnerMenu";
import UserMenu from "./sidebar/UserMenu";
import useSWR from "swr";
import { CircleUserRound, User, Wallet } from "lucide-react";
import Link from "next/link";




const Sidebar = () => {

  const fetcher = (url: string) => fetch(url).then(res => res.json());


  const { data:user, error, isLoading } = useSWR('/api/user/profile/details', fetcher)


    
    return ( 


  <Command className="bg-secondary rounded-none " >
  <CommandInput placeholder="Type a command or search..." />
  <CommandList >
    <CommandEmpty>No results found.</CommandEmpty>

    <CommandItem className="font-bold gap-4">
        <CircleUserRound />
        <Link className="uppercase" href="/profile">{user?.["data"]?.name}</Link>
       
        </CommandItem>
        <CommandItem className="font-bold gap-4">
        <Wallet />
        <p>{user?.["data"]?.balance}</p>
       
        </CommandItem>
   
   {
    user?.["data"]?.role==="admin" && (
     <AdminMenu/>
    )

   }
    
    {
      user?.["data"]?.role === "partner" && (
   <PartnerMenu/>
      )
    }

    <CommandSeparator />
   {
     user?.["data"]?.role=== "user" && (
     <UserMenu/>
    )
   }
  </CommandList>
</Command>
      


    );
}
 
export default Sidebar;