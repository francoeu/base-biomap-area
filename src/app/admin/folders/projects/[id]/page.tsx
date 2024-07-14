"use client";

import AdminArchivesList from "@/components/AdminArchiveList";
import { AdminArchivesHeader } from "@/components/Header";
import Carregando from "@/components/template/Carregando";
import ContentArea from "@/components/template/ContentArea";
import HeaderLayout from "@/components/template/Header";
import Pagina from "@/components/template/Pagina";
import { ArchivesContext } from "@/contexts/ArchivesContext";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import { IArchive } from "@/lib/types/interfaces";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useContextSelector } from "use-context-selector";

const ProjectArchivePage = () => {
  const id = useParams().id;
  const [archives, setArchives] = useState<IArchive[]>();

  const axiosAuth = useAxiosAuth()
  const { data: session } = useSession();

  const archivess = useContextSelector(
    ArchivesContext,
    (context) => {
      return context.archives
    },
  )

  useEffect(() => {
    const fetchArchives = async () => {
      try {
        const res = await axiosAuth.get(`/api/projects/${id}`);
        // console.log("fetchArchives ", res)
        setArchives(res.data.archives);
      } catch (error) {
        console.error('Erro ao buscar os clientes:', error);
      }
    };
   
    fetchArchives();
  }, [axiosAuth, id]);


    if(archives){

      return (
        <Pagina>
        <HeaderLayout />
        <ContentArea className="m-auto">
          <AdminArchivesHeader />      
          <div className="lg:min-w-[900px] p-3 border border-gray-600 border-dashed rounded-md">
          <h2>Arquivos Cadastrados</h2>
          <AdminArchivesList data={archives}  />
         
        </div>
            

       
        </ContentArea>
        </Pagina>
        );

    }
    return (
      <Pagina>
      <HeaderLayout />
      <ContentArea>
        {/* <Header /> */}
        <div className=" lg:min-w-[1080px] mx-auto p-3 border border-gray-600 border-dashed rounded-md">
        <h2>Meus Arquivos</h2>
        {/* <p>Nenhum aquivo por aqui!</p> */}
        <Carregando />
       
      </div>
      </ContentArea>
      </Pagina>
      );
}

export default ProjectArchivePage;

