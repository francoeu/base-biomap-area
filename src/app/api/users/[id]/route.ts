import { verifyJwt } from "@/lib/jwt";
import { prisma } from "@/lib/prisma";
import * as bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

interface UpdateRequestBody {
  name?: string;
  email?: string;
  password?: string;
  businessName?: string;
  isAdmin?: boolean;
}

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

  const user = await prisma.user.findUnique({
    where: { id: params.id },
    include: {
      projects:{
        select: {
          project: {
            select: {
              name: true,
              id: true,
              businessName: true,
              description: true,
              imageUrl: true,
              userId: true,
              archives: true,
            }
          }
        }
      },
     customerFolders: {
      select: {
        id: true,
        name: true,
        businessName: true,
        description: true,
        createdAt: true,
        _count: true,
      }
     }
    },
  });
  return new NextResponse(JSON.stringify(user));


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

  const id = params.id;
  const json = await request.json();

  const isAdminToBoolean = json.isAdmin as boolean
  // console.log('adminToBoolean', isAdminToBoolean)

  const updated = await prisma.user.update({
    where: {
      id: id,
    },
    data: {
      name: json.name || null,
      email: json.email || null,
      password: json.password || null,
      businessName: json.businessName || null,
      isAdmin: isAdminToBoolean || null,
    },
  });

  const { password, ...result } = updated;

  return new NextResponse(JSON.stringify(result), { status: 201 })
}



export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const body: UpdateRequestBody = await request.json();
  
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

  const isAdminToBoolean = body.isAdmin as boolean

  const userFromDB = await prisma.user.findUnique({
    where: {
      id: id
    },
  })

  if(userFromDB.password === body.password) {

    const updatedUser = await prisma.user.update({
      where: {
        id: id
      },
      data: {
        name: body.name,
        email: body.email,
        businessName: body.businessName,
        isAdmin: isAdminToBoolean,
      },
    });
  
    const { password, ...result } = updatedUser;
  
    return new NextResponse(JSON.stringify(result), { status: 201 })
  }


  const updatedUser = await prisma.user.update({
    where: {
      id: id
    },
    data: {
      name: body.name,
      email: body.email,
      isAdmin: body.isAdmin,
      businessName: body.businessName,
      password: await bcrypt.hash(body.password, 10),
    }
  });

  const {...result } = updatedUser;

  return new NextResponse(JSON.stringify(result), { status: 200 })



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

  const deleted = await prisma.user.delete({
    where: {
      id: id
    }
  })

  return NextResponse.json(deleted)
}
