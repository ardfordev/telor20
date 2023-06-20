import React, { FC } from 'react'
import BarChart from '@/components/barchart'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Activity, CalendarIcon, Filter, Download, Sheet } from "lucide-react"
import { ChartData } from '@/types/chart'
import { auth } from "@/auth/lucia";
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ScrollArea } from "@/components/ui/scroll-area"
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
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { Calendar } from '@/components/ui/calendar'

const getData = async () => {
  const authRequest = auth.handleRequest({ cookies });
	const { user } = await authRequest.validateUser();

  const res = await fetch(process.env.BASE_URL + '/api/dashboard', { 
    next: { 
      revalidate: 0
    },
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
		body: JSON.stringify({
			"unit": user.unit,
	    "wilayah": user.wilayah
		})
  });
  const json = await res.json();
  return json;
}

interface pageProps {}

const page: FC<pageProps> = async ({  }) => {
  const authRequest = auth.handleRequest({ cookies });
	const { session } = await authRequest.validateUser();
	if (!session) redirect("/");
  const data = await getData();

  const chartBarData: ChartData[] = [
    { name: 'Sehat', value: data.SEHAT[0].count },
    { name: 'Sakit', value: data.SAKIT[0].count },
    { name: 'Kronis', value: data.KRONIS[0].count },
  ];

  return (
    <div className='container items-center pb-8 pt-6'>
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
                <div className='w-full'>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        <span>Tanggal</span>
                        {/* {date ? format(date, "PPP") : } */}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        // selected={date}
                        // onSelect={setDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  </div>
                  <Button type="submit" className='w-1/4'>Search</Button>
                </div>
              </form>
            </div>
            <div className='w-full md:text-end'>
            <Button>
                <Download className="mr-2 h-4 w-4" />
                Download
                <Sheet className="ml-2 h-4 w-4 text-green-500"/>
              </Button>
            </div>
          </CardContent>
      </Card>
      <div className="my-6 h-[400px]">
        <ScrollArea className="h-[400px] w-full p-2 rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead>Penyulang</TableHead>
                <TableHead>GI</TableHead>
                <TableHead>GAP Persen %</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.allData.map((data : any, index : number) => (
                <TableRow key={data.id}>
                  <TableCell className="font-medium">{index+1}</TableCell>
                  <TableCell>{data.PENYULANG}</TableCell>
                  <TableCell>{data.GI}</TableCell>
                  <TableCell>{data.GAP_PERSEN}%</TableCell>
                  <TableCell><span className={
                    (data.STATUS === 'sehat') ? "bg-green-500 py-1 px-3 rounded-full" : (data.STATUS === 'sakit') ? "bg-yellow-500 py-1 px-3 rounded-full" : "bg-red-500 py-1 px-3 rounded-full"
                  }>{data.STATUS}</span></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </div>
    </div>
  )
}

export default page;