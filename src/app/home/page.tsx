"use client"
import { NavbarHeader } from "@/components/site/Navbar";
import Main from "@/components/site/home/Main";
import Carregando from "@/components/template/Carregando";
import Footer from "@/components/template/Footer";
import Pagina from "@/components/template/Pagina";
import { useEffect, useState } from "react";

export default function SiteHome() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      // Simule o carregamento de conteúdo da página, por exemplo, com um setTimeout
      setTimeout(() => {
        setLoading(false); // Defina loading para false quando o conteúdo estiver pronto
      }, 500); // Tempo de simulação de carregamento (2 segundos)
    }, []);
  
    return (
        <>
      {loading ? (
            <Carregando />
          ) : ( 
            <Pagina externa>
            <NavbarHeader />
            <Main />
            <Footer />
        </Pagina>
          )}
        </>
  
 )

    
}
