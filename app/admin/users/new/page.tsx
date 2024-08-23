import RegisterForm from "@/components/auth/RegisterForm";
import { UserTable } from "@/components/dashboard/UserTable";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const Users = () => {
    return ( 
        <RegisterForm admin={true}/>
     );
}
 
export default Users;