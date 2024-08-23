import { CommandGroup, CommandItem } from "@/components/ui/command";
import { Hand, History, LoaderIcon, Settings } from "lucide-react";
import Link from "next/link";

const PartnerMenu = () => {
    return ( 
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
     );
}
 
export default PartnerMenu;