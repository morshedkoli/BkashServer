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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

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
      <CardFooter className="flex justify-between">
        <Button>Recharge</Button>
      </CardFooter>
    </Card>
  )
}
