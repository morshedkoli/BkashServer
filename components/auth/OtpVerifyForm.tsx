
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
import {GetEmail,  SetOTP, } from "@/utility/FormHelper"
import { useState } from "react"
import Spinner from "@/components/Spinner/Spinner"



const formSchema = z.object({
    otp:z.string().min(6).max(6),
});

export default  function OtpVerifyForm() {

    const router = useRouter()

    const [submit,setSubmit] = useState(false)

    const email = GetEmail();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues:{
            otp:''
            
        }
    })
   

    const  handleSubmit = async (values:z.infer<typeof formSchema>) => {

        const {otp} = values
       
        const options= {method:"POST", body:JSON.stringify({otp:otp, email:email})}
        setSubmit(true)
     

        let res =  await (await fetch(`/api/user/recover/verifyOTP`, options)).json()

        if( res["status"] === "success"){
            toast.success("Your OTP Is Valid OTP ")
           SetOTP(otp)
            router.push("/auth/resetPassword")
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
          Enter your Otp below to reset password.
        </CardDescription>
      </CardHeader>

      <CardContent className="grid gap-4">
    
    <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="max-w-md w-full flex flex-col gap-4">
           
            <h2>Your Email Is : {email}</h2>
        <FormField name="otp" control={form.control} render={({field})=>{
                return <FormItem>
                    <FormLabel>OTP Code</FormLabel> 
                    <FormControl>
                        <Input placeholder="Otp Code" type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            }}/>

       

            <Button disabled={submit} type="submit" className="w-full">
                {
                    submit?<span className="flex items-center gap-1"><Spinner/> Verifing... </span> :"Verify OTP"
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
