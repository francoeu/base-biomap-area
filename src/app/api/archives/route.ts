import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {

  const skip = request.nextUrl.searchParams.get('skip')
  const take = request.nextUrl.searchParams.get('take')

  const archives = await prisma.archive.findMany({
   where:{
    projectId: params.id,
   },
   skip: skip ? parseInt(skip, 10) : undefined,
   take: take ? parseInt(take, 10) : undefined
  })
  console.log('API ARCHIVES', archives)
  return new NextResponse(JSON.stringify(archives), { status: 200 })
}

export async function POST(request: Request) {

  const json = await request.json()

//  console.log('API POST ARCHIVES', json)
  const created = await prisma.archive.create({
    data: {
        projectId: json.projectId,
        name: json.name,
        description: json.description,
        archiveUrl: json.archiveUrl
    },
    
  })

  return new NextResponse(JSON.stringify(created), { status: 201 })
}
