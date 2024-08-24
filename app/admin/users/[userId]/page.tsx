
import UserEdit from "@/components/admin/UserEdit";
import { getUser } from "@/utility/utils";

const page =async ({params}) => {

  const user = await getUser(params.userId)


    return ( 

        <UserEdit client={user}/>
     );
}
 
export default page;