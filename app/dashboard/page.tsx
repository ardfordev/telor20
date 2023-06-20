import React, { FC } from 'react'
import BarChart from '@/components/barchart'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Activity, UtilityPole, Warehouse } from "lucide-react"
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
      <div className='grid gap-5 lg:grid-cols-3'>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Gardu Induk
            </CardTitle>
            <Warehouse className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.countGI[0].count}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Feeder
            </CardTitle>
            <UtilityPole className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.countPenyulang[0].count}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Energi Beli/Jam
            </CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.countEnergi[0].sum}</div>
          </CardContent>
        </Card>
      </div>
      <div className='my-6'>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className='w-full'>
            <BarChart data={chartBarData} />
          </CardContent>
        </Card>
      </div>
      <div className="my-6 h-[400px]">
        <ScrollArea className="h-[400px] w-full p-2 rounded-md border">
          <div className='w-full px-4 py-2 text-lg font-semibold'>Details</div>
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