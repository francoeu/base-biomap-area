"use client";

import ArchiveList from "@/components/ArchiveList";
import BannerTop from "@/components/template/BannerTop";
import BannerVerticalSmall from "@/components/template/BannerVerticalSmall";
import ContentArea from "@/components/template/ContentArea";
import HeaderLayout from "@/components/template/Header";
import Pagina from "@/components/template/Pagina";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import { IArchive } from "@/lib/types/interfaces";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const UserPage = () => {
  const id = useParams().id;
  const [archives, setArchives] = useState<IArchive[]>();
  // console.log("ARCHIVES", archives)
  const axiosAuth = useAxiosAuth()
  const { data: session } = useSession();

  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      // The user is not authenticated, handle it here.
    },
  })


  useEffect(() => {
    const fetchProjectArchives = async () => {
      try {
        const res = await axiosAuth.get(`/api/projects/${id}`);
        // console.log("fetchProjectArchives ", res.data.archives)
        setArchives(res.data.archives);
      } catch (error) {
        console.error('Erro ao buscar os arquivos:', error);
      }
    };
   
    fetchProjectArchives();
  }, [axiosAuth, session?.user?.id, id]);


    if(archives){

      return (
        <Pagina>
        <HeaderLayout />
        <ContentArea className="m-auto">
        <Link target="_blank" href={'https://api.whatsapp.com/send/?phone=557193671611&text=Ol%C3%A1+BIOMAP+Engenharia%21+Preciso+de+or%C3%A7amento+de+servi%C3%A7o+de+Topografia%2FAerofotogrametria+com+Drone%21&type=phone_number&app_absent=0'}>
      
      <div className="hidden sm:block">
      <BannerTop />
      </div>
      
      <div className=" sm:hidden">
      <BannerVerticalSmall />
      </div>
 
      </Link>
        
        <div className="lg:min-w-[900px] p-3 border border-gray-600 border-dashed rounded-md">
          <h2>Meus Arquivos</h2>
          <ArchiveList data={archives}  />
         
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
        <p>Nenhum aquivo por aqui!</p>
        {/* <Carregando /> */}
       
      </div>
      </ContentArea>
      </Pagina>
      );
}

export default UserPage;

