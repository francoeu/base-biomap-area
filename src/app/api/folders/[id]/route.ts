import { verifyJwt } from "@/lib/jwt";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

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
  const folder = await prisma.customerFolder.findFirst({
    where: { 
        id: params.id,
    },
    include: {
      projects: {
        select: {
          id: true,
          name: true,
          description: true,
          businessName: true,
          imageUrl: true,
          archives: true,
          userId: true,
          UsersProjects: true,

        }
      }
    }
  });
  return new NextResponse(JSON.stringify(folder))

}



export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {

  
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

  const id = params.id
  const json = await request.json()

  const updated = await prisma.customerFolder.update({
    where: {
      id: id
    },
    data: {
      customerId: json.customerId || null,
      name: json.name || null,
      businessName: json.businessName || null,
      description: json.description || null
    }
  })

  return NextResponse.json(updated)
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

  const updated = await prisma.customerFolder.update({
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

  const deleted = await prisma.customerFolder.delete({
    where: {
      id: id
    }
  })

  return NextResponse.json(deleted)
}
