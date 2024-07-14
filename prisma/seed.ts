import { PrismaClient } from '@prisma/client';
import * as bcrypt from "bcrypt";
const prisma = new PrismaClient()
// Obtenha a senha do usuário
const adminPassword = '#biomap@23';
const demoUserPass = 'braskem@biomapengenharia.com';
// Faça o hash da senha
const hashedAdminPassword = bcrypt.hash(adminPassword, 10);
const hashedDemoUserPass = bcrypt.hash(demoUserPass, 10);

async function main() {
const adminPasswordString = await hashedAdminPassword.then(password => password);
const hashedDemoUserPassString = await hashedDemoUserPass.then(password => password);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@biomapengenharia.com' },
    update: {},
    create: {
        name:  "Admin",
        email: "admin@biomapengenharia.com",
        password: adminPasswordString,
        isAdmin: true,
    },
  })

  const braskem = await prisma.user.upsert({
    where: { email: 'braskem@biomapengenharia.com' },
    update: {},
    create: {
        name:  "Braskem",
        email: "braskem@biomapengenharia.com",
        password: hashedDemoUserPassString,
        isAdmin: false,
        customerFolders: {
          create: [
            {
              name: "Braskem",
              businessName: "Braskem",
              description: "Projetos Braskem.",
              // projects: {
              //   create: [
              //       {
              //           name: "MEDIÇÕES JOSÉ LOPES", 
              //           businessName: "Braskem",
              //           description: "Aqui você acessa seus arquivos de medição.",
              //           archives:{
              //               create: 
              //                   {
              //                       name: "Medição - 15/07/23",
              //                       description:  "Arquivos de medição, projeto CAD e etc...",
              //                       archiveUrl:  "https://www.area.biomapengenharia.com/wp-content/uploads/2023/05/16.-Medicao-braskem.rar"
              //                   },
                            
              //           }
              //         },
              //         {
              //           name: "MEDIÇÕES CSA", 
              //           businessName: "Braskem",
              //           description: "Aqui você acessa seus arquivos de medição.",
              //           archives:{
              //               create: 
              //                   {
              //                       name: "Medição - 15/06/23",
              //                       description:  "Arquivos de medição, projeto CAD e etc...",
              //                       archiveUrl:  "https://www.area.biomapengenharia.com/wp-content/uploads/2023/05/16.-Medicao-braskem.rar"
              //                   },
                            
              //           }
              //         },
              //         {
              //           name: "Vistorias Aéreas e Tours Virtuais",
              //           businessName: "Braskem",
              //           description: "Aqui você acessa seus arquivos de vistoria e tours.",
              //           archives:{
              //               create: 
              //                   {
              //                       name: "Tour Aereo Drone - 17/07/23",
              //                       description:  "Vistoria aerea da obra XYZ.",
              //                       archiveUrl:  "https://area.biomapengenharia.com/tour/"
              //                   },
            
                            
              //           }
              //         },
              //   ]
              // },
            },
          ]
        },
    },
  })

  console.log({ admin, braskem })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })