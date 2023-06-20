import React, { FC } from 'react'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { auth } from "@/auth/lucia";
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import Form from '@/components/FormSignIn'

interface pageProps {}

const page: FC<pageProps> = async ({  }) => {
  const authRequest = auth.handleRequest({ cookies });
	const { session } = await authRequest.validateUser();
	if (session) redirect("/");
  return (
    <div className='container flex justify-center'>
      <Card className='w-full md:w-1/2 mt-10'>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form action='/api/auth/login' >
            <div className='grid gap-4'>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name='email' type="email" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" name='password' type="password" />
              </div>
              <Button className="w-full">Login</Button>
            </div>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}

export default page;