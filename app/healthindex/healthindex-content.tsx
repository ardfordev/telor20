/* eslint-disable */
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

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface pageProps {}

const HealthIndexContent: FC<pageProps> = ({}) => {
  const [date, setDate] = React.useState<Date>()

  return (
    <div className='container items-center pb-8 pt-6'>
      <Tabs defaultValue="penyulang" className="w-full">
      <TabsList className="grid w-full md:w-[400px] grid-cols-4">
        <TabsTrigger value="penyulang">Penyulang</TabsTrigger>
        <TabsTrigger value="ULP">ULP</TabsTrigger>
        <TabsTrigger value="UP3">UP3</TabsTrigger>
        <TabsTrigger value="UID">UID</TabsTrigger>
      </TabsList>
      <TabsContent value="penyulang">
      <div className='grid gap-5'>
      <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="font-medium">
              Filter
            </CardTitle>
            <Filter className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className='grid gap-5'>
            <div className='grid gap-5 md:grid-cols-2'>
              <div className="flex items-center space-x-2">
                <Input type="text" placeholder="Nama Unit " />
                <Button type="submit">Search</Button>
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
            </div>
          </CardContent>
      </Card>
      </div>
      <div className='my-6'>
        <Card>
          <CardHeader className="flex pb-2">
            <CardTitle>Health Index</CardTitle>
            <CardDescription>
            </CardDescription>
          </CardHeader>
          <CardContent className='grid grid-cols-3 gap-5'>
            <div className='text-3xl font-semibold'>Energi Produksi</div><div> : </div><div className='text-end'> kWh</div>
            <div>Segmen 1</div><div> : </div><div className='text-end'> kWh</div>
            <div>Segmen 2</div><div> : </div><div className='text-end'> kWh</div>
            <div className='text-2xl font-semibold'>Energi Penjualan (TUL 309)</div><div> : </div><div className='text-end'> kWh</div>
          </CardContent>
          <CardFooter className='border-t grid grid-cols-2 pt-2'>
            <div>RESUME HEALTH INDEX PENYULANG : <span className='text-3xl text-green-500'>SEHAT</span></div>
            <div className='grid grid-cols-3 gap-2'>
              <div className='text-end'>GAP LOSS</div><div> : </div><div className='text-end'> kWh</div>
              <div className='text-end'>GAP PERCENT</div><div> : </div><div className='text-end'> %</div>
            </div>
          </CardFooter>
        </Card>
      </div>
      </TabsContent>
      <TabsContent value="ULP">
      <div className='grid gap-5'>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="font-medium">
              Filter
            </CardTitle>
            <Filter className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className='grid gap-5'>
            <div className='grid gap-5 md:grid-cols-2'>
              <div className="flex items-center space-x-2">
                <Input type="text" placeholder="Nama Unit " />
                <Button type="submit">Search</Button>
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
            </div>
          </CardContent>
      </Card>
      </div>
      <div className='my-6'>
        <Card>
          <CardHeader className="flex pb-2">
            <CardTitle>Health Index</CardTitle>
            <CardDescription>
            </CardDescription>
          </CardHeader>
          <CardContent className='grid grid-cols-3 gap-5'>
            <div className='text-3xl font-semibold'>Energi Beli Unit Layanan</div><div> : </div><div className='text-end'> kWh</div>
            <div className='text-3xl font-semibold'>Energi Jual (&Sigma; SEGMEN)</div><div> : </div><div className='text-end'> kWh</div>
          </CardContent>
          <CardFooter className='border-t grid grid-cols-2 pt-2'>
            <div>
              <div>RESUME HEALTH INDEX ULP : </div>
              <div className='flex justify-between items-centers'>
                <p><span className='text-green-500'>SEHAT : </span>xx</p>
                <p><span className='text-yellow-500'>SAKIT : </span>xx</p>
                <p><span className='text-red-500'>KRONIS : </span>xx</p>
              </div>
            </div>
            <div className='grid grid-cols-3 gap-2'>
              <div className='text-end'>GAP LOSS TOTAL</div><div> : </div><div className='text-end'> kWh</div>
            </div>
          </CardFooter>
        </Card>
      </div>
      </TabsContent>
      <TabsContent value="UP3">
      <div className='grid gap-5'>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="font-medium">
              Filter
            </CardTitle>
            <Filter className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className='grid gap-5'>
            <div className='grid gap-5 md:grid-cols-2'>
              <div className="flex items-center space-x-2">
                <Input type="text" placeholder="Nama Unit " />
                <Button type="submit">Search</Button>
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
            </div>
          </CardContent>
      </Card>
      </div>
      <div className='my-6'>
        <Card>
          <CardHeader className="flex pb-2">
            <CardTitle>Health Index</CardTitle>
            <CardDescription>
            </CardDescription>
          </CardHeader>
          <CardContent className='grid grid-cols-3 gap-5'>
            <div className='text-3xl font-semibold'>Energi Beli UP3</div><div> : </div><div className='text-end'> kWh</div>
            <div className='text-3xl font-semibold'>Energi Jual (&Sigma; SEGMEN)</div><div> : </div><div className='text-end'> kWh</div>
          </CardContent>
          <CardFooter className='border-t grid grid-cols-2 pt-2'>
            <div>
              <div>RESUME HEALTH INDEX UP3 : </div>
              <div className='flex justify-between items-centers'>
                <p><span className='text-green-500'>SEHAT : </span>xx</p>
                <p><span className='text-yellow-500'>SAKIT : </span>xx</p>
                <p><span className='text-red-500'>KRONIS : </span>xx</p>
              </div>
            </div>
            <div className='grid grid-cols-3 gap-2'>
              <div className='text-end'>GAP LOSS TOTAL</div><div> : </div><div className='text-end'> kWh</div>
            </div>
          </CardFooter>
        </Card>
      </div>
      </TabsContent>
      <TabsContent value="UID">
      <div className='my-6'>
        <Card>
          <CardHeader className="flex pb-2">
            <CardTitle>Health Index</CardTitle>
            <CardDescription>
            </CardDescription>
          </CardHeader>
          <CardContent className='grid grid-cols-3 gap-5'>
            <div className='text-3xl font-semibold'>Energi Beli UID</div><div> : </div><div className='text-end'> kWh</div>
            <div className='text-3xl font-semibold'>Energi Jual (&Sigma; SEGMEN)</div><div> : </div><div className='text-end'> kWh</div>
          </CardContent>
          <CardFooter className='border-t grid grid-cols-2 pt-2'>
            <div>
              <div>RESUME HEALTH INDEX UID : </div>
              <div className='flex justify-between items-centers'>
                <p><span className='text-green-500'>SEHAT : </span>xx</p>
                <p><span className='text-yellow-500'>SAKIT : </span>xx</p>
                <p><span className='text-red-500'>KRONIS : </span>xx</p>
              </div>
            </div>
            <div className='grid grid-cols-3 gap-2'>
              <div className='text-end'>GAP LOSS TOTAL</div><div> : </div><div className='text-end'> kWh</div>
            </div>
          </CardFooter>
        </Card>
      </div>
      </TabsContent>
    </Tabs>
    </div>
  )
}

export default HealthIndexContent;