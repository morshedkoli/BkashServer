"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from "next/link"

export default function Title({title, des, button}) {
  return (
    <Card className="sm:col-span-2">
      <CardHeader className="pb-3">
        <CardTitle>{title}</CardTitle>
        <CardDescription className="max-w-lg text-balance leading-relaxed">
          {des}
        </CardDescription>
      </CardHeader>
      <CardFooter>
        {
          button && <Button><Link href="/admin/users/new">Create New User</Link></Button>
        }
      </CardFooter>
    </Card>
  )
}
