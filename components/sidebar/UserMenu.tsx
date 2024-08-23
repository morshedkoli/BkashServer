import { CommandGroup, CommandItem } from "@/components/ui/command";
import {  History, LoaderIcon, Send, Settings } from "lucide-react";
import Link from "next/link";

const UserMenu = () => {
    return ( 
      <CommandGroup heading="Client">
      <CommandItem>
        <Send className="mr-2 h-4 w-4"/>
        <Link href="/send">Send Money</Link>
        </CommandItem>
  
        <CommandItem>
        <LoaderIcon className="mr-2 h-4 w-4"/>
        <Link href="/client/pendings">Pending Request</Link>
        </CommandItem>
  
        <CommandItem>
        <History className="mr-2 h-4 w-4"/>
        <Link href="/client/history">History</Link>
        </CommandItem>
  
        <CommandItem>
        <Settings className="mr-2 h-4 w-4"/>
        <Link href="/settings">Settings</Link>
        </CommandItem>
      </CommandGroup>
     );
}
 
export default UserMenu;