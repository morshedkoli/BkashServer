import { UserTable } from "@/components/dashboard/UserTable";
import Title from "@/components/Title";

const Users = () => {
    return ( <div>

        <div className=" m-5">
          <Title title="User List" des="All users list are here" button={true}/>

        </div>

        <div>
            <UserTable/>
        </div>
    </div> );
}
 
export default Users;