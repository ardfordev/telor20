import React, { FC } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { auth } from '@/auth/lucia'
import { cookies } from 'next/headers'
import { redirect } from "next/navigation"
import Form from '@/components/FormSignUp'
// import { Combobox } from '@/components/Combobox'
import prisma from '@/lib/prisma'

interface pageProps {}

const page: FC<pageProps> = async ({  }) => {
	// const allData = await prisma.$queryRaw`SELECT * FROM public."Unit" ORDER BY id ASC`

  const authRequest = auth.handleRequest({ cookies });
	const { session } = await authRequest.validateUser();
	if (session) redirect("/");

  return (
    <div className='container flex justify-center'>
      <Card className='w-full md:w-1/2 my-10'>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Signup</CardTitle>
          <CardDescription>
            Enter your email below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form action='api/auth/signup'>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name='email' type="email" autoComplete='email'/>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" name='name' type="text" autoComplete='name'/>
              </div>
              <div className="grid gap-2">
                <Label>Unit</Label>
                <Select name='unit'>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Unit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="UID">Unit Induk Distribusi</SelectItem>
                      <SelectItem value="UP3">Unit Pelaksana Pelayanan Pelanggan</SelectItem>
                      <SelectItem value="ULP">Unit Layanan Pelanggan</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label>Wilayah</Label>
                {/* <Combobox data={allData} /> */}
                <Select name='wilayah'>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Wilayah" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>UID</SelectLabel>
                      <SelectItem value="Jawa Timur">Jawa Timur</SelectItem>
                    </SelectGroup>
                    <SelectGroup>
                      <SelectLabel>UP3</SelectLabel>
                      <SelectItem value="Malang">Malang</SelectItem>
                    </SelectGroup>
                    <SelectGroup>
                      <SelectLabel>ULP</SelectLabel>
                      <SelectItem value="Kebonagung">Kebonagung</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" name='password' type="password" />
              </div>
              <Button type='submit' className="w-full">Signup</Button>
            </div>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}

export default page;