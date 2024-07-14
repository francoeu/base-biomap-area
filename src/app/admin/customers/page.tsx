"use client"
import { AdminCustomersPageHeader } from "@/components/Header";
// import ProjectList from "@/components/projects/ProjectList";
import ContentArea from "@/components/template/ContentArea";
import HeaderLayout from "@/components/template/Header";
import Pagina from "@/components/template/Pagina";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import UsersList from "@/components/UsersList";
import Carregando from "@/components/template/Carregando";
import NaoEncontrado from "@/components/template/NaoEncontrado";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import { isBrowser } from "@/utils/ssr";
import { useSession } from "next-auth/react";

export default function Customers() {
  const { data: session, status } = useSession();
  const [users, setUsers] = useState([]);
  const axiosAuth = useAxiosAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isBrowser) {
      // console.log('isBrowser', isBrowser)
      // console.log('***Não é browser***')
      return () => undefined;
  
    }
    const fetchUsers = async () => {
      try {
        const res = await axiosAuth.get(`/api/users/`);
        setUsers(res.data);
      } catch (error) {
        console.error('Erro ao buscar os projectos:', error);
      }
    };
  
    // console.log('isBrowser', isBrowser)
    // console.log('***É browser***')
    fetchUsers();
   
    //  return () => undefined;
  }, [axiosAuth]);

  if (status === 'loading') {
    return <Carregando />;
  }

  if (!session || !session.user.isAdmin) {
    // Lidar com o caso em que a sessão não existe ou o usuário não é um administrador
    // Exibir mensagem de erro ou redirecionar para uma página adequada
    return (
      <Pagina>
        <HeaderLayout />
        <ContentArea className="m-auto">
          <p>Você não tem permissão para acessar esta página.</p>
        </ContentArea>
      </Pagina>
    );
  }

  return (
    <Pagina>
      <HeaderLayout />
      <ContentArea className="m-auto">
        <AdminCustomersPageHeader />
        <div className="lg:min-w-[900px] p-3 border border-gray-600 border-dashed rounded-md">

          
        {users.length > 0 ? (
        <>
          <h2>Clientes & Usuários</h2>
          <UsersList data={users} />
        </>

        ) : 
     <>
        <NaoEncontrado>
          Não há usuários ou clientes cadastrados.
        </NaoEncontrado>
     
         </>

        }

    
        </div>
      </ContentArea>
    </Pagina>
  );
}

