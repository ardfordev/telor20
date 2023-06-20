import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient()

export const POST = async (req: NextRequest) => {
  const { unit, wilayah } = (await req.json()) as Partial<{
		unit: string;
		wilayah: string;
	}>;

  if (unit === "UID") {
    const allData = await prisma.$queryRaw`SELECT * FROM public."Main" WHERE "UID" = ${wilayah} ORDER BY id ASC`
    const countGI = await prisma.$queryRaw`SELECT COUNT(DISTINCT "GI")::integer FROM public."Main" WHERE "UID" = ${wilayah}`
    const countPenyulang = await prisma.$queryRaw`SELECT COUNT(DISTINCT "PENYULANG")::integer FROM public."Main" WHERE "UID" = ${wilayah}`
    const countEnergi = await prisma.$queryRaw`SELECT SUM("KW_PANGKAL")::float FROM public."Main" WHERE "UID" = ${wilayah}`
    const SEHAT = await prisma.$queryRaw`SELECT COUNT(DISTINCT "PENYULANG")::integer FROM public."Main" WHERE "UID" = ${wilayah} AND "STATUS" = 'sehat'`
    const SAKIT = await prisma.$queryRaw`SELECT COUNT(DISTINCT "PENYULANG")::integer FROM public."Main" WHERE "UID" = ${wilayah} AND "STATUS" = 'sakit'`
    const KRONIS = await prisma.$queryRaw`SELECT COUNT(DISTINCT "PENYULANG")::integer FROM public."Main" WHERE "UID" = ${wilayah} AND "STATUS" = 'kronis'`
    return NextResponse.json({ allData, countGI, countPenyulang, countEnergi, SEHAT, SAKIT, KRONIS })
  }
  
  if (unit === "UP3") {
    const allData = await prisma.$queryRaw`SELECT * FROM public."Main" WHERE "UP3" = ${wilayah} ORDER BY id ASC`
    const countGI = await prisma.$queryRaw`SELECT COUNT(DISTINCT "GI")::integer FROM public."Main" WHERE "UP3" = ${wilayah}`
    const countPenyulang = await prisma.$queryRaw`SELECT COUNT(DISTINCT "PENYULANG")::integer FROM public."Main" WHERE "UP3" = ${wilayah}`
    const countEnergi = await prisma.$queryRaw`SELECT SUM("KW_PANGKAL")::float FROM public."Main" WHERE "UP3" = ${wilayah}`
    const SEHAT = await prisma.$queryRaw`SELECT COUNT(DISTINCT "PENYULANG")::integer FROM public."Main" WHERE "UP3" = ${wilayah} AND "STATUS" = 'sehat'`
    const SAKIT = await prisma.$queryRaw`SELECT COUNT(DISTINCT "PENYULANG")::integer FROM public."Main" WHERE "UP3" = ${wilayah} AND "STATUS" = 'sakit'`
    const KRONIS = await prisma.$queryRaw`SELECT COUNT(DISTINCT "PENYULANG")::integer FROM public."Main" WHERE "UP3" = ${wilayah} AND "STATUS" = 'kronis'`
    return NextResponse.json({ allData, countGI, countPenyulang, countEnergi, SEHAT, SAKIT, KRONIS })
  }
  
  if (unit === "ULP") {
    const allData = await prisma.$queryRaw`SELECT * FROM public."Main" WHERE "ULP" = ${wilayah} ORDER BY id ASC`
    const countGI = await prisma.$queryRaw`SELECT COUNT(DISTINCT "GI")::integer FROM public."Main" WHERE "ULP" = ${wilayah}`
    const countPenyulang = await prisma.$queryRaw`SELECT COUNT(DISTINCT "PENYULANG")::integer FROM public."Main" WHERE "ULP" = ${wilayah}`
    const countEnergi = await prisma.$queryRaw`SELECT SUM("KW_PANGKAL")::float FROM public."Main" WHERE "ULP" = ${wilayah}`
    const SEHAT = await prisma.$queryRaw`SELECT COUNT(DISTINCT "PENYULANG")::integer FROM public."Main" WHERE "ULP" = ${wilayah} AND "STATUS" = 'sehat'`
    const SAKIT = await prisma.$queryRaw`SELECT COUNT(DISTINCT "PENYULANG")::integer FROM public."Main" WHERE "ULP" = ${wilayah} AND "STATUS" = 'sakit'`
    const KRONIS = await prisma.$queryRaw`SELECT COUNT(DISTINCT "PENYULANG")::integer FROM public."Main" WHERE "ULP" = ${wilayah} AND "STATUS" = 'kronis'`
    return NextResponse.json({ allData, countGI, countPenyulang, countEnergi, SEHAT, SAKIT, KRONIS })
  }
}