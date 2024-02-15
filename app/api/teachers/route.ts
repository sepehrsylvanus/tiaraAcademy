import prisma from "@/utils/db"
import { NextResponse } from "next/server"

export const GET = async () => {
  try {
    const teachers = await prisma.instructure.findMany()
    console.log(teachers)
    return NextResponse.json(teachers,{ status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ mssg: 'There is an error', status: 500 })
  }
}
