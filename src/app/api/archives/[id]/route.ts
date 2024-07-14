import { verifyJwt } from "@/lib/jwt";
import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    const accessToken = request.headers.get("authorization");
    // console.log('api/users/id: HEADERAUTH', accessToken)
  
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
  
    const project = await prisma.archive.findFirst({
      where: { 
          id: params.id,
      },
    });
    return new NextResponse(JSON.stringify(project))
  
  }


export async function PATCH(
    request: Request,
    { params }: { params: { id: string } }
  ) {
 
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
  
    const id = params.id
    const json = await request.json()
  
    const updated = await prisma.archive.update({
      where: {
        id: id,
      },
      data: {
        projectId: json.projectId || null,
        name: json.name || null,
        description: json.description || null,
        archiveUrl: json.archiveUrl || null,
      }
    })
  
    return NextResponse.json(updated)
  }
  
  export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
  ) {
    
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
      if (!decodedToken ) {
        return new NextResponse(
          JSON.stringify({
            error: "unauthorized",
          }),
          {
           status: 401,
          }
        );
      }
  
    const id = params.id
    const json = await request.json()
  
    const updated = await prisma.archive.update({
      where: {
        id: id
      },
      data: json
    })
  
    return NextResponse.json(updated)
  }
  
  export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
  ) {
  
    
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
      
    const id = params.id
  
    const deleted = await prisma.archive.delete({
      where: {
        id: id
      }
    })
  
    return NextResponse.json(deleted)
  }
  