"use client"
// import ProjectList from "@/components/projects/ProjectList";
import ContentArea from "@/components/template/ContentArea";
import HeaderLayout from "@/components/template/Header";
import Pagina from "@/components/template/Pagina";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { ICustomer } from "@/components/UsersList";
import UsersProjectsList from "@/components/UsersProjectsList";
import BannerFooter from "@/components/template/BannerFooter";
import BannerTop from "@/components/template/BannerTop";
import BannerVerticalSmall from "@/components/template/BannerVerticalSmall";
import Footer from "@/components/template/Footer";
import NaoEncontrado from "@/components/template/NaoEncontrado";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import { isBrowser } from "@/utils/ssr";
import { useSession } from "next-auth/react";
import Link from "next/link";


interface IProject {
  id: string
  name: string
  description: string
  businessName: string
  customerId: string
  customerFolderId?: string
  userId?: string;
  selectedUserIds?: string[];
  UsersProjects?: ICustomer[];
}

export default function Panel() {

const { data: session } = useSession();
const [projects, setProjects] = useState([]);

const axiosAuth = useAxiosAuth()

  const router = useRouter()



  useEffect(() => {
    if (!isBrowser) {
      console.log('isBrowser', isBrowser)
      console.log('***Não é browser***')
      return () => undefined;
  
    }
    const fetchProjects = async () => {
      try {
        const res = await axiosAuth.get(`/api/users/${session?.user.id}/projects`);
        // console.log("fetchProjects", res.data)
        setProjects(res.data);
      } catch (error) {
        console.error('Erro ao buscar os projectos:', error);
      }
    };
  
    console.log('isBrowser', isBrowser)
    console.log('***É browser***')
    fetchProjects();
   
    //  return () => undefined;
  }, [axiosAuth, session?.user.id]);

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
      <div className="lg:min-w-5xl p-3 border border-gray-600 border-dashed rounded-md">
        
        {projects.length > 0 ? (
        <>
          <h2>Meus Projetos</h2>
          <UsersProjectsList data={projects} />
        </>

        ) : 
        
        <NaoEncontrado>
          Você não tem nenhum projeto disponível no momento.
        </NaoEncontrado>

        }
        
      </div>
      <Link className="mt-20" target="_blank" href={'https://api.whatsapp.com/send/?phone=557193671611&text=Ol%C3%A1+BIOMAP+Engenharia%21+Preciso+de+or%C3%A7amento+de+servi%C3%A7o+de+Topografia%2FAerofotogrametria+com+Drone%21&type=phone_number&app_absent=0'}>
      <div className="hidden md:block">
      <BannerFooter  />
      </div>
      </Link>
      </ContentArea>

      <Footer />
      </Pagina>

    )

   }
