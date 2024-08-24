// "use client"

import * as React from "react"

import UserBox from "./UserBox"
import { getUsers } from "@/utility/utils"



export async function UserTable() {

 const data = await getUsers()
  return (
    <div className="w-full">


      {
        data?.map(user => 
         <UserBox key={user.id} data={user}/>
        )
      }
     
    </div>
  )
}
