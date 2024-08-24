"use client"

import UserEdit from "@/components/admin/UserEdit";
import useSWR from "swr";

const page = ({params}) => {

    const fetcher = (url: string) => fetch(url).then(res => res.json());


    const { data:client, error, isLoading } = useSWR(`/api/users/single?id=${params.userId}`, fetcher)
  
  console.log("data", client)


    return ( 

        <UserEdit client={client?.["data"]}/>
     );
}
 
export default page;