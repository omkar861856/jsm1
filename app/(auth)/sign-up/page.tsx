"use client"

import React from 'react'
import AuthForm from '@/components/AuthForm'
import { signUpSchema } from '@/lib/validations'
import { signUp } from '@/lib/actions/auth'

const page = () => {
  return (
    
        <AuthForm type='SIGN_UP' schema={signUpSchema} defaultValues={
            {
                fullName: '',
                email: '',
                password: '',
                universityId: 0,
                universityCard:""
            }
        } 
        onSubmit={signUp}
        />
    
  )
}

export default page