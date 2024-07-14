"use client";

import { AdminProjectsHeader } from "@/components/Header";
import ProjectsList from "@/components/ProjectsList";
import ContentArea from "@/components/template/ContentArea";
import HeaderLayout from "@/components/template/Header";
import NaoEncontrado from "@/components/template/NaoEncontrado";
import Pagina from "@/components/template/Pagina";
import { IProject, ProjectsContext } from "@/contexts/ProjectsContext";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useContextSelector } from "use-context-selector";

interface IFolder {
  id: string;
  name: string;
  description?: string;
  businessName?: string;
  customerId?: string;
  projects: IProject[]
}

const FolderProjectsPage = () => {
  const projectsOnDb = useContextSelector(
    ProjectsContext,
    (context) => {
      return context.projects
    },
  )

  const id = useParams().id;
  const [filteredProjects, setFilteredProjects] = useState<IProject[]>([]);
  // console.log("filteredProjects", filteredProjects)

    // Filtrar os projetos com base no customerFolderId
    useEffect(() => {
      const filteredProjects = projectsOnDb.filter(
        (project) => project.customerFolderId === id
      );
      setFilteredProjects(filteredProjects);
    }, [projectsOnDb, id]);

  const [folder, setFolder] = useState<IFolder>();
  // console.log("ARCHIVES", archives)
  const axiosAuth = useAxiosAuth()


    if(filteredProjects?.length > 0){

      return (
        <Pagina>
        <HeaderLayout />
        <ContentArea className="m-auto">
          <AdminProjectsHeader />      
          <div className="lg:min-w-[900px] p-3 border border-gray-600 border-dashed rounded-md">
          <h2>Projetos deste cliente</h2>
          <ProjectsList data={filteredProjects}  />
         
        </div>  
        </ContentArea>
        </Pagina>
        );

    }
    return (
      <Pagina>
      <HeaderLayout />
      <ContentArea className="m-auto">
        <AdminProjectsHeader />  
        <div className=" lg:min-w-[1080px] mx-auto p-3 border border-gray-600 border-dashed rounded-md">
        <h2>Projetos deste cliente</h2>
        <>
        <NaoEncontrado>
          Não há projetos cadastrados.
        </NaoEncontrado>
     
         </>
       
      </div>
      </ContentArea>
      </Pagina>
      );
}

export default FolderProjectsPage;

