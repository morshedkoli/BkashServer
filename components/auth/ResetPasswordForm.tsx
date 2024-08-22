
"use client"

import { toast } from "sonner"

import * as z from "zod"
import {set, useForm} from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {Form,FormControl,FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import Link from "next/link"
import {GetEmail,  GetOTP,  GetRole,  SetOTP, } from "@/utility/FormHelper"
import { useState } from "react"
import Spinner from "@/components/Spinner/Spinner"



const formSchema = z.object({
   
    password:z.string().min(6),
    passwordConfirm:z.string()
}).refine((data)=>{
    return data.password === data.passwordConfirm
}, {
    message:"Passwords do not match",
    path:["passwordConfirm"]
});

export default  function OtpVerifyForm() {

    const router = useRouter()

    const [submit,setSubmit] = useState(false)
    const email = GetEmail();
    const otp = GetOTP()
    const role = GetRole()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues:{
            password:'',
            passwordConfirm:''
            
        }
    })
   

    const  handleSubmit = async (values:z.infer<typeof formSchema>) => {

        const {password} = values
       
        const options= {method:"POST", body:JSON.stringify({
            otp,
            email,
            password,
            role,
        })}
        setSubmit(true)
     

        let res =  await (await fetch(`/api/user/recover/resetPassword`, options)).json()

        if( res["status"] === "success"){
            toast.success("Successfully Reset Your Password")
            sessionStorage.clear()
            router.push("/auth/login")
            setSubmit(false)
            
        }else{
            toast.error("Invalid OTP, Try again")
            setSubmit(false)
        }


    }

  return (

    <Card className="w-full max-w-sm">

<CardHeader>
        <CardTitle className="text-2xl">Otp Verify</CardTitle>
        <CardDescription>
          Enter your new password below to reset password.
        </CardDescription>
      </CardHeader>

      <CardContent className="grid gap-4">
    
    <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="max-w-md w-full flex flex-col gap-4">
           
            <h2>Your Email Is : {email}</h2>
            <FormField name="password" control={form.control} render={({field})=>{
                return <FormItem>
                    <FormLabel>Password</FormLabel> 
                    <FormControl>
                        <Input placeholder="Password" type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            }}/>

<FormField name="passwordConfirm" control={form.control} render={({field})=>{
                return <FormItem>
                    <FormLabel>Confirm Password</FormLabel> 
                    <FormControl>
                        <Input placeholder="password Confirm" type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            }}/>

            <Button disabled={submit} type="submit" className="w-full">
                {
                    submit?<span className="flex items-center gap-1"><Spinner/> Reseting... </span> :"Reset Password"
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
