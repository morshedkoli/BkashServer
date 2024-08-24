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


export function UserBox({data}) {
  return (
    <Card className="mx-5 mb-3 flex justify-around items-center">
      <CardHeader>
        <CardTitle className="uppercase">{data?.["name"]}</CardTitle>
        <CardDescription>{data?.["mobile"]}</CardDescription>
      </CardHeader>
      <CardContent>
       <h2>{data?.["email"]}</h2>
      </CardContent>
      <CardContent className="font-bold text-3xl"> 
       <h2>{data?.["balance"]}</h2>
      </CardContent>
      <CardContent className="font-bold flex flex-col"> 
       <p>{data?.["active"]?"Activated":"Deactivated"} </p>
       {data?.["active"] &&  <Button variant="destructive">Deactive</Button>} 
      
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button><Link href={`/admin/users/${data?.["id"]}`}>Recharge</Link></Button>
      </CardFooter>
    </Card>
  )
}
