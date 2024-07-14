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

  // Busque todos os projetos relacionados ao usuário usando a tabela UsersProjects
  const userProjects = await prisma.usersProjects.findMany({
    where: {
      fkUserId: params.id,
    },
    include: {
      project: true, // Isso trará todos os detalhes do projeto
    },
    skip: skip ? parseInt(skip, 10) : undefined,
    take: take ? parseInt(take, 10) : undefined,
  });

  // Extraia apenas os projetos da resposta
  const projects = userProjects.map(userProject => userProject.project);

  return new NextResponse(JSON.stringify(projects), { status: 200 });
}
