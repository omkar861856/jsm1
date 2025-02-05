"use client"

import React from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { DefaultValues, FieldValues, SubmitHandler, useForm, UseFormReturn } from 'react-hook-form'
import {  ZodType } from 'zod'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
  import { Input } from "@/components/ui/input"
  import { Button } from './ui/button'
  import Link from 'next/link'
  import { Path } from 'react-hook-form'
import { FIELD_NAMES, FIELD_TYPES } from '@/constants'
import { toast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'
import FileUpload from './FileUpload'

interface Props<T extends FieldValues>{
    schema: ZodType<T>,
    defaultValues: T,
    onSubmit: (data:T)=>Promise<{success:boolean, error?:string}>,
    type: "SIGN_IN" | "SIGN_UP";
}

const AuthForm = <T extends FieldValues>({type, schema, defaultValues, onSubmit}: Props<T>) => {

   const router = useRouter();

   const isSignIn = type === 'SIGN_IN'


    const form: UseFormReturn<T> = useForm({
        defaultValues: defaultValues as DefaultValues<T>,
        resolver: zodResolver(schema)
    })

    const handleSubmit: SubmitHandler<T> = async (data) => {
      const result = await onSubmit(data)
      if(result.success){
        toast({
          title: "Success",
          description: isSignIn?"You have successfully signed in":"You have successfully signed up", 
        })
        router.push('/')
      }
      else{
        toast({
          title: `Error ${isSignIn?"signing in":"signing up"}`,
          description: isSignIn?"Invalid credentials":"An error occurred",
          variant: 'destructive'
        })
      }
    }


  return (
    <div className='flex flex-col gap-4'>
        <h1 className="text-2xl font-semibold text-white">
            {
                isSignIn?
                "Welcome back!"
                :
                "Create an account"
            }
        </h1>
        <p className="text-light-100">
            {isSignIn?"Access the vast collection of resources and stay updated": "Please complete all fields and "}
        </p>
      <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6 w-full">
        {
            Object.keys(defaultValues).map((field) => {

                return (
                    <FormField
                    control={form.control}
                    key={field}
                    name={field as Path<T>}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='capitalize'>{FIELD_NAMES[field.name as keyof typeof FIELD_NAMES]}</FormLabel>
                        {/* <FormControl>
                          <Input placeholder={field.name} {...field} />
                        </FormControl> */}

<FormControl>
                    {field.name === "universityCard" ? (
                      <FileUpload
                        type="image"
                        accept="image/*"
                        placeholder="Upload your ID"
                        folder="ids"
                        variant="dark"
                        onFileChange={field.onChange}
                      />
                    ) : (
                      <Input
                        required
                        type={
                          FIELD_TYPES[field.name as keyof typeof FIELD_TYPES]
                        }
                        {...field}
                        className="form-input"
                      />
                    )}
                     </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )
                
            })
        }
        
        <Button className='form-btn' type="submit">
          {isSignIn?"Sign in":"Sign up"}
        </Button>
      </form>
    </Form>
    <p className="text-center text-base font-medium">
        {isSignIn?"Don't have an account?":"Already have an account?"}
    </p>
    <Link className='font-bold text-primary' href={isSignIn?"/sign-up":"/sign-in"}>
        {isSignIn?"Sign up":"Sign in"}
    </Link>
    </div>
  )
}

export default AuthForm