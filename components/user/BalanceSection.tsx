"use client"

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

import { toast } from "sonner"

import * as z from "zod"
import {set, useForm} from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {Form,FormControl,FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useRouter } from 'next/navigation'
import Spinner from "../Spinner/Spinner"
import { useState } from "react";



const formSchema = z.object({
    rechargeAmount:z.string()
   
})





const BalanceSection = ({balance, id}) => {
    
    const router = useRouter()
    const [submit,setSubmit] = useState(false)
    
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues:{
            rechargeAmount:''
        }
    })

    const  handleSubmit = async (values:z.infer<typeof formSchema>) => {
       
        setSubmit(true)

        const newData = {
            rechargeAmount:values["rechargeAmount"],
            clientId: id,
        }

            const options= {method:"POST", body:JSON.stringify(newData)}
            let res =  await (await fetch("/api/users/recharge", options)).json()
    console.log(res)

        if(res["status"] === "success"){
        toast.success(`${res['data']}`)
         router.push(`/admin/users/${id}`)
         window.location.reload()
        setSubmit(false)
        }else{
        toast.error(`There is problem, ${res['data']}`)
        setSubmit(false)
    }

           
        
        }

    return ( 
        <div className="grid gap-6">
        <div className="flex gap-3 font-bold items-center">
          <Label htmlFor="name">Balance:</Label>
          <Input
           readOnly
            type="text"
            className="w-full"
            defaultValue={balance}
          />
        </div>
        <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className=" w-full flex flex-col gap-4">
            



<FormField name="rechargeAmount" control={form.control} render={({field})=>{
                return <FormItem>
                    <FormLabel>Recharge Amount</FormLabel> 
                    <FormControl>
                        <Input placeholder="Recharge Amount" type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            }}/>


            <Button disabled={submit} type="submit" className="w-full">
            {
                    submit?<span className="flex items-center gap-1"><Spinner/> Adding Money... </span> :"Add Money"
                }
            </Button>
        </form>


    </Form>
       
      </div>
     );
}
 
export default BalanceSection;