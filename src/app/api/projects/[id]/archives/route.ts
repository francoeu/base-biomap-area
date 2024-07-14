import { verifyJwt } from '@/lib/jwt';
import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {

    const accessToken = request.headers.get("authorization");
    if (!accessToken || !accessToken.startsWith('Bearer ')) {
     
      return new NextResponse(
        JSON.stringify({
          error: "unauthorized",
        }),
        {
          status: 401,
        }
      );
    }
  
    const token = accessToken.split(' ')[1];
    const decodedToken = verifyJwt(token);
      if (!decodedToken) {
        return new NextResponse(
          JSON.stringify({
            error: "unauthorized",
          }),
          {
           status: 401,
          }
        );
      }

  const skip = request.nextUrl.searchParams.get('skip')
  const take = request.nextUrl.searchParams.get('take')


  const projectArchives = await prisma.archive.findMany({
   where:{
    projectId: params.id,
   },
   skip: skip ? parseInt(skip, 10) : undefined,
   take: take ? parseInt(take, 10) : undefined
  })

  return new NextResponse(JSON.stringify(projectArchives), { status: 200 })
}

