
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
import Spinner from "@/components/Spinner/Spinner"
import { useState } from "react"



const formSchema = z.object({
    number:z.string().min(11).max(11),
    type:z.enum(["bkash","nagad","rocket"]),
    amount: z.string()
   
})
export default  function SendForm() {
    const router = useRouter()
    const [submit,setSubmit] = useState(false)


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues:{
            number:"01",
            amount:"",
            
        }
    })
   

    const  handleSubmit = async (values:z.infer<typeof formSchema>) => {
       
        setSubmit(true)

            const options= {method:"POST", body:JSON.stringify(values)}
            let res =  await (await fetch("/api/transection/new", options)).json()

if(res?.["status"] === "success"){
    toast.success(`${res?.["data"]}`)
    window.location.replace("/client/history")
    setSubmit(false)
}else{
    toast.error(`There is problem, ${res?.['data']}`)
    setSubmit(false)
}

        
        }
     

  return (

   <div className="flex items-center justify-center h-screen -mt-20">
     <Card className="w-full max-w-sm ">

<CardHeader>
        <CardTitle className="text-2xl">Send Money</CardTitle>
        <CardDescription>
          Enter your number and amount below to send money.
        </CardDescription>
      </CardHeader>

      <CardContent className="grid gap-4">
    
    <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="max-w-md w-full flex flex-col gap-4">
          
        <FormField name="number" control={form.control} render={({field})=>{
                return <FormItem>
                    <FormLabel>Number</FormLabel> 
                    <FormControl>
                        <Input placeholder="Number"  type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            }}/>

<FormField name="amount" control={form.control} render={({ field }) => {
  return (
    <FormItem>
      <FormLabel>Amount</FormLabel>
      <FormControl>
        <Input placeholder="Amount"  type="text" {...field} />
      </FormControl>
      <FormMessage />
    </FormItem>
  );
}} />




<FormField name="type" control={form.control} render={({field})=>{
                return <FormItem>
                    <FormLabel>Select Type</FormLabel> 
                   <Select onValueChange={field.onChange}>
                   <FormControl>
                       <SelectTrigger>
                        <SelectValue placeholder="Select Type" />

                     
                       </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                        <SelectItem value="bkash">bKash</SelectItem>
                        <SelectItem value="nagad">Nagad</SelectItem>
                        <SelectItem value="rocket">Rocket</SelectItem>
                    </SelectContent>
                   </Select>
                    <FormMessage />
                </FormItem>
            }}/>



            <Button disabled={submit} type="submit" className="w-full">
            {
                    submit?<span className="flex items-center gap-1"><Spinner/> Sending... </span> :"Send"
                }
            </Button>
        </form>


    </Form>

    
                
    </CardContent>

    </Card>
   </div>
   
  )
}
