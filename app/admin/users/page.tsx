import { UserTable } from "@/components/dashboard/UserTable";
import { Button } from "@/components/ui/button";

const Users = () => {
    return ( <div>

        <div className="flex justify-between m-10">
            <h2>User List</h2>
          

        <Button> 
            <a href="/admin/users/new">New User</a></Button>
        </div>

        <div>
            <UserTable/>
        </div>
    </div> );
}
 
export default Users;