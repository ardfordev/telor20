"use client"
import React, { FC } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Filter } from "lucide-react"
import Image from 'next/image'
import penyulangImg from '@/public/penyulang1.jpg'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { OverviewUnit } from '@/components/overview-unit'



interface pageProps {}

const FeederContent: FC<pageProps> = ({}) => {
  const [date, setDate] = React.useState<Date>()

  return (
    <div className='container items-center pb-8 pt-6'>
      <div className='grid gap-5'>
      <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="font-medium">
              Filter
            </CardTitle>
            <Filter className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className='grid gap-5 md:grid-cols-2'>
            <div>
              <form action='/api/feeder'>
                <div className="flex space-x-4">
                <Select name='Search'>
                    <SelectTrigger className="flex">
                      <SelectValue placeholder="Feeder"/>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="Pandanlandung">Pandanlandung</SelectItem>
                        <SelectItem value="Sitirejo">Sitirejo</SelectItem>
                        <SelectItem value="Kenarok">Kenarok</SelectItem>
                        <SelectItem value="Gadang">Gadang</SelectItem>
                        <SelectItem value="Bumiayu">Bumiayu</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <Button type="submit" className='w-1/4'>Search</Button>
                </div>
              </form>
            </div>

            <div className='md:text-end'>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Tanggal</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              </div>
          </CardContent>
      </Card>
      </div>
      <div className='my-6'>
        <Card>
          <CardHeader className="flex pb-2">
            <CardTitle>Nama Penyulang</CardTitle>
            <CardDescription>
            </CardDescription>
          </CardHeader>
          <CardContent className='w-full flex justify-center items-center'>
            <div className='grid'>
            <div>
              <Image
                src={penyulangImg}
                alt="Penyulang 1"
                width={939}
                className="rounded-md object-cover"
              />
            </div>
            <div className='flex justify-between p-3'>
              <div className='w-5 h-5 bg-red-500'></div>
              <div className='w-5 h-5 bg-yellow-500'></div>
              <div className='w-5 h-5 bg-green-500'></div>
            </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className='my-6 grid md:grid-cols-3 gap-5'>
        <div>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle>Titik Pangkal</CardTitle>
              <div className='w-5 h-5 bg-red-500'></div>
            </CardHeader>
            <CardContent>
              <div className='grid grid-cols-2 gap-2'>
                <div>V1 : </div><div>16 Kv</div>
                <div>I1 : </div><div>16 A</div>
                <div>Cos Q1 : </div><div>...</div>
              </div>
              <div className='w-full text-center'>Perbedaan Tegangan</div>
              <OverviewUnit />
            </CardContent>
          </Card>
        </div>
        <div>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle>Titik Tengah</CardTitle>
              <div className='w-5 h-5 bg-yellow-500'></div>
            </CardHeader>
            <CardContent>
              <div className='grid grid-cols-2 gap-2'>
                <div>V1 : </div><div>16 Kv</div>
                <div>I1 : </div><div>16 A</div>
                <div>Cos Q1 : </div><div>...</div>
              </div>
              <div className='w-full text-center'>Perbedaan Tegangan</div>
              <OverviewUnit />
            </CardContent>
          </Card>
        </div>
        <div>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle>Titik Ujung</CardTitle>
              <div className='w-5 h-5 bg-green-500'></div>
            </CardHeader>
            <CardContent>
              <div className='grid grid-cols-2 gap-2'>
                  <div>V1 : </div><div>16 Kv</div>
                  <div>I1 : </div><div>16 A</div>
                  <div>Cos Q1 : </div><div>...</div>
              </div>
              <div className='w-full text-center'>Perbedaan Tegangan</div>
              <OverviewUnit />
            </CardContent>
          </Card>
        </div>
      </div>
      
    </div>
  )
}

export default FeederContent;