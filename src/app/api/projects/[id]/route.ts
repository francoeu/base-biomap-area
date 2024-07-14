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

  const project = await prisma.project.findFirst({
    where: { 
      id: params.id,
    },
    include: {
      archives: {
        select: {
          id: true,
          name: true,
          description: true,
          projectId: true,
          archiveUrl: true,
        }
      },
      UsersProjects: {
        select: {
          user: true
        }
      }
    }
  });
  return new NextResponse(JSON.stringify(project))

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

  const id = params.id
  const json = await request.json()

  const updated = await prisma.project.update({
    where: {
      id: id
    },
    data: {
      userId: json.userId,
      customerFolderId: json.customerFolderId,
      name: json.name || null,
      businessName: json.businessName || null,
      description: json.description || null,
    },
  })

// Criar registros UsersProjects para relacionar usuários ao projeto
const selectedUserIds = json.selectedUserIds; // Array de IDs de usuários selecionados

if(selectedUserIds){

  const userAlreadyGetAccss = selectedUserIds.map((userId) => {
    return prisma.usersProjects.findFirst({
      where: {
        fkUserId: userId,
        fkProjectId: updated.id,
      }
    });
  });

  if(userAlreadyGetAccss){
    console.log('userAlreadyGetAccss', userAlreadyGetAccss)

  }

 
    const usersProjects = selectedUserIds.map((userId) => {
      return prisma.usersProjects.create({
        data: {
          fkUserId: userId,
          fkProjectId: updated.id,
        },
      });
    });
    
    // Aguardar a criação dos registros UsersProjects
    await Promise.all(usersProjects);


}

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

  // Inicialize arrays para rastrear IDs existentes e IDs para excluir
  const existingRelationsIds = [];
  const idsToDelete = json.selectedUserIdsToDelete || [];

  // Verificar as relações existentes e adicionar os IDs à lista
  if (json.selectedUserIds) {
    for (const userId of json.selectedUserIds) {
      const existingRelation = await prisma.usersProjects.findFirst({
        where: {
          fkUserId: userId,
          fkProjectId: id,
        },
      });

      if (existingRelation) {
        existingRelationsIds.push(existingRelation.fkUserId);
      }
    }
  }

  // Excluir relacionamentos com base em idsToDelete
  if (idsToDelete.length > 0) {

    const relationsToDelete = await prisma.usersProjects.findMany({
      where: {
        fkUserId: {
          in: idsToDelete,
        },
        fkProjectId: id,
      },
    });

    if (relationsToDelete.length > 0) {
      // Exclua os relacionamentos encontrados
      for (const relation of relationsToDelete) {
        // console.log("ID DO RELACIONAMENTO: ", relation.id)
        await prisma.usersProjects.delete({
          where: {
            id: relation.id,
          },
        });
      }
    }
    // console.log('RELACIONAMENTOS EXCLUIDOS: ', relationsToDelete)
  }

  // Continue com a atualização e criação de relacionamentos
  const updated = await prisma.project.update({
    where: {
      id: id,
    },
    data: {
      userId: json.userId,
      customerFolderId: json.customerFolderId,
      name: json.name || null,
      businessName: json.businessName || null,
      description: json.description || null,
    },
  });

  // Crie os novos relacionamentos para usuários que não têm relações existentes
  if (json.selectedUserIds) {
    const usersProjects = json.selectedUserIds
      .filter((userId) => !existingRelationsIds.includes(userId))
      .map((userId) => {
        return prisma.usersProjects.create({
          data: {
            fkUserId: userId,
            fkProjectId: updated.id,
          },
        });
      });

    // Aguarde a criação dos registros UsersProjects
    await Promise.all(usersProjects);
  }

  return NextResponse.json(updated);
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

  const deleted = await prisma.project.delete({
    where: {
      id: id
    }
  })



  return NextResponse.json(deleted)
}
