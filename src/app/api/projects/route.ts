import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {

  const skip = request.nextUrl.searchParams.get('skip')
  const take = request.nextUrl.searchParams.get('take')


  const projects = await prisma.project.findMany({
   skip: skip ? parseInt(skip, 10) : undefined,
   take: take ? parseInt(take, 10) : undefined,
    select: {
      id: true,
      userId: true,
      customerFolderId: true,
      name: true,
      description: true,
      businessName: true,
      imageUrl: true,
        UsersProjects: {
          include: {
            user: true
          }
        },
        archives: true
}
  })
  // console.log('Api/Log: ', projects)
  return new NextResponse(JSON.stringify(projects), { status: 200 })
}

export async function POST(request: Request) {

  const json = await request.json()

const folderFromDb = await prisma.customerFolder.findUnique({
  where: {
    id: json.customerFolderId
  }
})

if(!folderFromDb){
  return new NextResponse(
    JSON.stringify({
      error: "not found",
    }),
    {
     status: 404,
    }
  );
}

  const created = await prisma.project.create({
    
    data: {
      userId: json.userId,
      customerFolderId: json.customerFolderId,
      name: json.name,
      businessName: folderFromDb.businessName || null,
      description: json.description || null,
    }
  })

// Criar registros UsersProjects para relacionar usuários ao projeto
const selectedUserIds = json.selectedUserIds; // Array de IDs de usuários selecionados
const usersProjects = selectedUserIds.map((userId) => {
  return prisma.usersProjects.create({
    data: {
      fkUserId: userId,
      fkProjectId: created.id,
    },
  });
});

// Aguardar a criação dos registros UsersProjects
await Promise.all(usersProjects);

return new NextResponse(JSON.stringify(created), { status: 201 });
}
