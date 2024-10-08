
"use client"

import { toast } from "sonner"

import * as z from "zod"
import {set, useForm} from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {Form,FormControl,FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import Link from "next/link"
import {SetEmail, SetRole} from "@/utility/FormHelper"
import { useState } from "react"
import Spinner from "@/components/Spinner/Spinner"



const formSchema = z.object({
    email:z.string().email(),
    role:z.enum(["admin","partner","user"])
});

export default  function EmailVerifyForm() {

    const router = useRouter()

    const [submit,setSubmit] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues:{
            email:''
        }
    })
   

    const  handleSubmit = async (values:z.infer<typeof formSchema>) => {
       
        // const options= {method:"POST", body:JSON.stringify(values)}
        setSubmit(true)
        const {email,role} = values

        let res =  await (await fetch(`/api/user/recover/verifyEmail?email=${email}&role=${role}`)).json()

        if( res["status"] === "success"){
            toast.success("OTP Send to your email.")
            SetEmail(email);
            SetRole(role)
            router.push("/auth/otpVerify")
            setSubmit(false)
            
        }else{
            toast.error("Your email not found")
            setSubmit(false)
        }


    }

  return (

    <Card className="w-full max-w-sm">

<CardHeader>
        <CardTitle className="text-2xl">Email Verify</CardTitle>
        <CardDescription>
          Enter your email below to reset password.
        </CardDescription>
      </CardHeader>

      <CardContent className="grid gap-4">
    
    <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="max-w-md w-full flex flex-col gap-4">
            <FormField name="role" control={form.control} render={({field})=>{
                return <FormItem>
                    <FormLabel>Select Your Role</FormLabel> 
                   <Select onValueChange={field.onChange}>
                   <FormControl>
                       <SelectTrigger>
                        <SelectValue placeholder="Select Your Role" />

                     
                       </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="partner">Partner</SelectItem>
                        <SelectItem value="user">User</SelectItem>
                    </SelectContent>
                   </Select>
                    <FormMessage />
                </FormItem>
            }}/>


        <FormField name="email" control={form.control} render={({field})=>{
                return <FormItem>
                    <FormLabel>Email address</FormLabel> 
                    <FormControl>
                        <Input placeholder="Email Adress" type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            }}/>

       

            <Button disabled={submit} type="submit" className="w-full">
                {
                    submit?<span className="flex items-center gap-1"><Spinner/> Verifing... </span> :"Verify Email"
                }
            </Button>
        </form>


    </Form>

<div className="my-3 d-flex">
    <Link href="/auth/register" className="mx-2 nav-link">Register |</Link>
    <Link href="/auth/login">Login</Link>
</div>

    </CardContent>

    </Card>
   
  )
}
