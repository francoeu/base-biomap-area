import HeroSection from "@/components/site/HeroSection";
import { NavbarHeader } from "@/components/site/Navbar";
import AboutPage from "@/components/site/about/AboutPage";
import Contact from "@/components/site/contact/Contact";
import CardSection from "@/components/site/home/CardsSection";
import FeaturedServicesSection from "@/components/site/home/FeaturedServicesSection";
import Footer from "@/components/template/Footer";
import Pagina from "@/components/template/Pagina";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
    metadataBase: new URL("https://biomapengenharia.com/"),
    title: {
      default: "Orçamento",
      template: `%s | Biomap Topografia & Locações`,
      absolute: "Orçamento | Biomap Topografia & Locações "
    },
  
  }

export default function OnePage() {

 return (
    <Pagina externa>

        <div className="flex w-full justify-center">
        <a href="/" className="mb-6 mt-24 inline-block max-w-[300px]">
                  <Image
                    src="/logotipo-biomap.png"
                    alt="logo"
                    className="max-w-full"
                    width={218}
                    height={37}
                  />
                </a>
        </div>
      
      <div className="w-full mx-auto flex justify-center flex-col  bg-[#121212]-">
      <HeroSection>
        <div className="max-w-5xl mx-auto flex justify-center flex-col p-4 ">
          <h1 className="text-3xl font-black md:text-6xl text-white text-center font-4 lh-6 ld-04  ">
                ECONOMIZE ATÉ <span className="text-[#0FB268]">70% EM CUSTOS DE PROJETOS</span> TOPOGRÁFICOS COM A BIOMAP!
          </h1>
          <h2 className="text-lg md:text-2xl pt-4 font-4 font-light lh-6 ld-04 pb-11 text-white text-center">
          Descubra como nossa metodologia de execução pode transformar seus projetos e maximizar seus resultados.
          </h2>
        </div>
        </HeroSection>

        <div className="flex flex-col justify-center mb-4 ">
        <CardSection />
        </div>
    </div>


    <div className='flex w-full mt-20 justify-center items-center rounded-lg py-4 px-6 bg-[#0e0d0d96] shadow-lg '>
    
    <Contact />
  
</div>

<div className='bg-[#111111]- py-8'>
      <FeaturedServicesSection />
</div>

  

    </Pagina>
 )

    
}
