
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
import { useRouter } from 'next/navigation'
import Link from "next/link"
import Spinner from "../Spinner/Spinner"
import { useState } from "react"



const formSchema = z.object({
    email:z.string().email(),
    role:z.enum(["partner","user"]),
    name: z.string(),
    mobile:z.string().min(11),
    password:z.string().min(6),
    passwordConfirm:z.string()
}).refine((data)=>{
    return data.password === data.passwordConfirm
}, {
    message:"Passwords do not match",
    path:["passwordConfirm"]
});

export default  function RegisterForm() {
    const router = useRouter()
    const [submit,setSubmit] = useState(false)


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues:{
            email:''
        }
    })
   

    const  handleSubmit = async (values:z.infer<typeof formSchema>) => {
       
        setSubmit(true)
        const role = values["role"]

        const newData = {
            email:values["email"],
            password:values["password"],
            name:values["name"],
            mobile:values["mobile"],
        }


        if(role === "user") {
            const options= {method:"POST", body:JSON.stringify(newData)}
            let res =  await (await fetch("/api/user/register", options)).json()
    

if(res["status"] === "success"){
    toast.success("You are Register successfully as user.")
    router.push('/auth/login')
    setSubmit(false)
}else{
    toast.error(`There is problem, ${res['data'].name}`)
    setSubmit(false)
}

           
        }

        if (role === "partner") {
            const options= {method:"POST", body:JSON.stringify(newData)}
            let res =  await (await fetch("/api/user/partner/create", options)).json()
    
            if(res["status"] === "success"){
                toast.success("You are Register successfully as partner.")
                router.push('/auth/login')
            }else{
                toast.error(`There is problem, ${res['data'].name}`)
            }
        }

        
        }
     

  return (

    <Card className="w-full max-w-sm">

<CardHeader>
        <CardTitle className="text-2xl">Register</CardTitle>
        <CardDescription>
          Enter your information below to register a account.
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
                        <SelectItem value="partner">Partner</SelectItem>
                        <SelectItem value="user">User</SelectItem>
                    </SelectContent>
                   </Select>
                    <FormMessage />
                </FormItem>
            }}/>


        <FormField name="name" control={form.control} render={({field})=>{
                return <FormItem>
                    <FormLabel>Your Name</FormLabel> 
                    <FormControl>
                        <Input placeholder="Name" type="text" {...field} />
                    </FormControl>
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

<FormField name="mobile" control={form.control} render={({field})=>{
                return <FormItem>
                    <FormLabel>Mobile Number</FormLabel> 
                    <FormControl>
                        <Input placeholder="Mobile Number" type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            }}/>

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
                    submit?<span className="flex items-center gap-1"><Spinner/> Registering... </span> :"Register"
                }
            </Button>
        </form>


    </Form>

    
<div className="my-3 d-flex">
    <Link href="/auth/login" className="mx-2 nav-link">Login |</Link>
    <Link href="/auth/emailVerify">Forget Password</Link>
</div>
    </CardContent>

    </Card>
   
  )
}
