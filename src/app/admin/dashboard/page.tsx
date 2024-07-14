"use client"
import FoldersList from "@/components/FoldersList";
import { AdminFoldersHeader } from "@/components/Header";
// import ProjectList from "@/components/projects/ProjectList";
import ContentArea from "@/components/template/ContentArea";
import HeaderLayout from "@/components/template/Header";
import NaoEncontrado from "@/components/template/NaoEncontrado";
import Pagina from "@/components/template/Pagina";
import { FoldersContext } from "@/contexts/FoldersContext";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import { useSession } from "next-auth/react";
import { useContextSelector } from "use-context-selector";


export default function Dashboard() {


  const folders = useContextSelector(
    FoldersContext,
    (context) => {
      return context.folders
    },
  )

const { data: session } = useSession();
// const [folders, setFolders] = useState([]);

const axiosAuth = useAxiosAuth()

    return (
      <Pagina>  
      <HeaderLayout />
      <ContentArea className="m-auto">
        <AdminFoldersHeader />
        <div className="lg:min-w-[900px] p-3 border border-gray-600 border-dashed rounded-md">

        {folders.length > 0 ? (
        <>
           <h2>Pastas dos Clientes</h2>
           <FoldersList data={folders} />
        </>

        ) : 
     <>
        <NaoEncontrado>
          Não há nenhuma pasta de cliente criada.
        </NaoEncontrado>
     
         </>

        }

       
      </div>
      </ContentArea>
      </Pagina>

    )


}
