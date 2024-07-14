import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {

  const skip = request.nextUrl.searchParams.get('skip')
  const take = request.nextUrl.searchParams.get('take')


  // console.log("DECODED", decodedToken.id)

  const subs = await prisma.subscriber.findMany({
  //  where:{
  //   customerId: decodedToken?.id,
  //  },
   skip: skip ? parseInt(skip, 10) : undefined,
   take: take ? parseInt(take, 10) : undefined
  })
  // console.log('Api/Log: ', projects)
  return new NextResponse(JSON.stringify(subs), { status: 200 })
}

export async function POST(request: Request) {

  const json = await request.json()


  const created = await prisma.subscriber.create({
    data: {
      firstName: json.firstName || null,
      lastName: json.lastName || null,
      email: json.email
    }
  })

  return new NextResponse(JSON.stringify(created), { status: 201 })
}
