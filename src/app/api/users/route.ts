import { prisma } from "@/lib/prisma";
import * as bcrypt from "bcrypt";
import { NextRequest, NextResponse } from 'next/server';

interface RequestBody {
  name: string;
  email: string;
  businessName: string;
  password: string;
  isAdmin: boolean;
}

export async function POST(request: Request) {
  const body: RequestBody = await request.json();

  const isAdminToBoolean = body.isAdmin as boolean
  console.log('adminToBoolean 2', isAdminToBoolean)

  const user = await prisma.user.create({
    data: {
      name: body.name,
      email: body.email,
      businessName: body.businessName,
      password: await bcrypt.hash(body.password, 10),
      isAdmin: isAdminToBoolean,
    },
  });

  const { password, ...result } = user;

  return new NextResponse(JSON.stringify(result), { status: 201 })
}



export async function GET(request: NextRequest) {
  const skip = request.nextUrl.searchParams.get('skip');
  const take = request.nextUrl.searchParams.get('take');
  
  const users = await prisma.user.findMany({
    skip: skip ? parseInt(skip, 10) : undefined,
    take: take ? parseInt(take, 10) : undefined,
    include: {
      projects: {
        include: {
          project: true,
        },
      },
    },
  });

  return new NextResponse(JSON.stringify(users), { status: 200 });
}

