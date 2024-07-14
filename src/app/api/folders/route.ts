import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {

  const skip = request.nextUrl.searchParams.get('skip')
  const take = request.nextUrl.searchParams.get('take')

  // console.log("DECODED", decodedToken.id)

  const folders = await prisma.customerFolder.findMany({
   skip: skip ? parseInt(skip, 10) : undefined,
   take: take ? parseInt(take, 10) : undefined
  })
  // console.log('Api/Log: ', projects)
  return new NextResponse(JSON.stringify(folders), { status: 200 })
}

export async function POST(request: Request) {

  const json = await request.json()

const userFromDb = await prisma.user.findUnique({
  where: {
    id: json.customerId
  }
})
// console.log('userFromDb', userFromDb.businessName)
if(!userFromDb){
  return new NextResponse(
    JSON.stringify({
      error: "not found",
    }),
    {
     status: 404,
    }
  );
}

  const created = await prisma.customerFolder.create({
    data: {
      customerId: json.customerId,
      name: json.name,
      businessName: userFromDb.businessName || null,
      description: json.description || null
    }
  })

  return new NextResponse(JSON.stringify(created), { status: 201 })
}
