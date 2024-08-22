
import {
    Command,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
  } from "@/components/ui/command"
import { VerifyToken } from "@/utility/JWTTokenHelper";
  
import { LayoutDashboard,  Settings, User, History,  Send, LoaderIcon, Hand} from 'lucide-react'
import { cookies } from "next/headers";
import Link from "next/link";





const Sidebar = async() => {

  const cookieStore = cookies()
    const token = cookieStore.get("token")

let user;

    if (token) {
      user = await VerifyToken(token["value"]);
    }
    
    return ( 


       
        <Command className="bg-secondary rounded-none  " >
  <CommandInput placeholder="Type a command or search..." />
  <CommandList >
    <CommandEmpty>No results found.</CommandEmpty>
   
   {
    user?.role==="admin" && (
      <CommandGroup heading="Admin">
      <CommandItem>
        <LayoutDashboard className="mr-2 h-4 w-4"/>
        <Link href="/">Dashboard</Link>
      </CommandItem>
      <CommandItem>
      <User className="mr-2 h-4 w-4"/>
      <Link href="/admin/users">Users</Link>
      </CommandItem>
      <CommandItem>
      <Send className="mr-2 h-4 w-4"/>
      <Link href="/send">Send Money</Link>
      </CommandItem>
      <CommandItem>
      <LoaderIcon className="mr-2 h-4 w-4"/>
      <Link href="/admin/pendings">Pending Request</Link>
      </CommandItem>

      <CommandItem>
      <History className="mr-2 h-4 w-4"/>
      <Link href="/admin/history">History</Link>
      </CommandItem>

      <CommandItem>
      <Settings className="mr-2 h-4 w-4"/>
      <Link href="/settings">Settings</Link>
      </CommandItem>

    </CommandGroup>
    )

    
   }
    
    {
      user?.role === "partner" && (
    <CommandGroup heading="Partner">

    <CommandItem>
      <Hand className="mr-2 h-4 w-4"/>
      <Link href="/partner/accepted">Accepted Request</Link>
      </CommandItem>

    
      <CommandItem>
      <LoaderIcon className="mr-2 h-4 w-4"/>
      <Link href="/partner/pendings">Pending Request</Link>
      </CommandItem>

      <CommandItem>
      <History className="mr-2 h-4 w-4"/>
      <Link href="/partner/history">History</Link>
      </CommandItem>

      <CommandItem>
      <Settings className="mr-2 h-4 w-4"/>
      <Link href="/settings">Settings</Link>
      </CommandItem>
    </CommandGroup>
      )
    }


    <CommandSeparator />
   {
    user?.role === "user" && (
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
    )
   }
  </CommandList>
</Command>


    );
}
 
export default Sidebar;