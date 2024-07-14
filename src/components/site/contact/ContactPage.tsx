"use client"
import Carregando from "@/components/template/Carregando";
import { useEffect, useState } from "react";
// import MapaMundiImg from '../../../../public/backgrounds/bio-img-farol-barra.png';
// import FarolBgIstock from '../../../../public/backgrounds/bio-farol-salvador-istock.jpg';
import bgSalvador from '../../../../public/backgrounds/bio-elevador-lacerda-salvador.jpg';
import mapsCover from '../../../../public/banners/map-filial.png';
import GoogleMaps from "../GoogleMaps";
import { ContactUs } from "./ContactUs";
import Image from "next/image";
import Link from "next/link";
import Contact from "./Contact";
import { SimpleGrid, Text, Title } from "@mantine/core";
import AboutPageCarousel from "../about/AboutPageCarousel";

export default function ContactPage() {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simule o carregamento de conteúdo da página, por exemplo, com um setTimeout
    setTimeout(() => {
      setLoading(false); // Defina loading para false quando o conteúdo estiver pronto
    }, 1000); // Tempo de simulação de carregamento (2 segundos)
  }, []);


    return (
    <>
  {loading ? (
        <Carregando />
      ) : (
        // Renderize o conteúdo da página aqui quando o carregamento estiver concluído
        <div>
          <section className="text-gray-600 mt-32 bg-[#1B1A1A]- relative z-0">

            <div   className="bg-cover w-full"
          style={{
            backgroundImage: `url(${bgSalvador.src})`,
          }}>


            <div className=" flex h-full justify-center relative z-0 bg-[#1B1A1A]/75">
              <div className="z-40 flex justify-center">
                  <div className="w-10/12  z-50">
                      <ContactUs />
                  </div>
              </div>
            </div>

            </div>

            {/* <div className=" flex justify-center relative z-0">
              <div>
              <div  className="-z-10 fixed- w-full h-full ">
                    <Image
                        src={bgSalvador.src} 
                        alt="mapa mundi" 
                        layout="fill"
                        objectFit="cover"
                        className="opacity-20 mt-32"
                    />
                </div>
              </div>
         
              <div className="lg:w-[1200px] z-50">
                  <ContactUs />
              </div>
            </div> */}

          </section>

          <section className="flex flex-col w-full  justify-center items-center content-center py-8 ">
           
       
        <div className='flex justify-center w-full max-w-7xl  px-12'>

        <SimpleGrid  cols={2} spacing={50} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
            <div className="mt-8">
            <Title className={'text-[#0FB268] text-4xl z-20'} >COMO PODEMOS TE AJUDAR?</Title>
      <Text className={`z-20 text-md`} mt="sm" mb={30}>
        Ficou interessado em nossos serviços? Use o formulário para solicitar um orçamento.
      </Text>

      <div className="w-12/12  md:w-[600px] bg-gray-950-">
                   <AboutPageCarousel />
                   </div>
            </div>

            <div className='flex w-6/12- rounded-lg py-4 px-6 bg-[#0e0d0d] shadow-lg '>
    
    <Contact />
  
</div>
          </SimpleGrid>

 

</div>
          
          </section>
        </div>
      )}


    
    </>

    );
  }
  