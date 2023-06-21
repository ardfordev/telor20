import React, { FC } from 'react'
import Image from 'next/image'
import eastjavaMap from '@/public/map.png'
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { LogIn } from 'lucide-react'
import { auth } from "@/auth/lucia";
import { cookies } from "next/headers"

interface pageProps {}

const page: FC<pageProps> = async ({  }) => {
  const authRequest = auth.handleRequest({ cookies });
	const { session } = await authRequest.validateUser();
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          SITELOR.20
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          Sistem Informasi Technical Losses Realtime 20 KV
        </p>
      </div>
      <Link href='/auth/login' className={(session) ? "hidden" : ""}>
        <Button className='w-32' variant="outline">
          <LogIn className="mr-2 h-4 w-4" />
          Login
        </Button>
      </Link>
      <div className="w-full">
          <AspectRatio ratio={16 / 9}>
            <Image
              src={eastjavaMap}
              alt="UP2D JATIM"
              className="rounded-md object-cover"
              priority
            />
          </AspectRatio>
        </div>
    </section>
  )
}

export default page;