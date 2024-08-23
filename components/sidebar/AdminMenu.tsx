import { CommandGroup, CommandItem } from "@/components/ui/command";
import { History, LayoutDashboard, LoaderIcon, Send, Settings, User, User2, Users, UsersRound } from "lucide-react";
import Link from "next/link";

const AdminMenu = () => {
    return (    
        <CommandGroup heading="Admin">
        <CommandItem>
          <LayoutDashboard className="mr-2 h-4 w-4"/>
          <Link href="/">Dashboard</Link>
        </CommandItem>
        <CommandItem>
        <Users className="mr-2 h-4 w-4"/>
        <Link href="/admin/users">Users</Link>
        </CommandItem>
        <CommandItem>
        <UsersRound className="mr-2 h-4 w-4"/>
        <Link href="/partners">Partners</Link>
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
     );
}
 
export default AdminMenu;
