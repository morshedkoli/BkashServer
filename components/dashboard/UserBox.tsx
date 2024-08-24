import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from "next/link"
import UserAction from "@/components/admin/UserAction"

const UserBox =  ({data}) => {

  return ( 
    <Card className="mx-5 mb-3 flex  justify-around items-center">
    <CardHeader className="w-10">
      <CardTitle className="uppercase">{data?.["name"]}</CardTitle>
      <CardDescription>{data?.["mobile"]}</CardDescription>
    </CardHeader>
    <CardContent className="w-4">
     <h2>{data?.["email"]}</h2>
    </CardContent>
    <CardContent className="font-bold text-3xl w-4"> 
     <h2>{data?.["balance"]}</h2>
    </CardContent>

    <CardContent className="font-bold text-3xl w-4"> 
    <Button><Link href={`/admin/users/${data?.["id"]}`}>Manage</Link></Button>
    </CardContent>


    <UserAction data={data}/>
  </Card>
   );
}

export default UserBox;

