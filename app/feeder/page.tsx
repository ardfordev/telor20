import React, { FC } from 'react'
// import prisma from "@/lib/prisma";
import FeederContent from './feeder-content';

interface pageProps {
  
}

const page: FC<pageProps> = async({  }) => {
  // const data = await prisma.$queryRaw`SELECT * FROM public."Main" ORDER BY id ASC LIMIT 1`
  
  return (
    <>
      <FeederContent />
    </>
  )
}

export default page;