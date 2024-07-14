"use client"
import ImgAbout from '../../../../public/other-images/bio-about-section-img-2.jpg';
// import BiomapTourBanner from '../../public/biomaptour-banner.svg';

import 'react-multi-carousel/lib/styles.css';
import { FeaturedSectionCTA } from "../FeaturedSectionCTA";
import HeroSection from "../HeroSection";
import { ContactUs } from "../contact/ContactUs";
import Blogsection from './BlogSection';
import CardSection from "./CardsSection";
import { ContectSectionWithImage } from './ContectSectionWithImage';
import CustomerSection from "./CustomerSection";
import FeaturedServicesSection from "./FeaturedServicesSection";
import NewsLetterSection from './NewsLetterSection';
import OctagonDetails from "./Octagon";
import SectionHero from './SectionHero';


export default function Main() {

return (
  <>

    <section className="text-gray-600 body-font ">
      
        <SectionHero />
        <div className="flex flex-col justify-center mb-4 ">
        <CardSection />
        </div>

        <div id="sobre" className='bg-[#121212]'>
          <div className='flex flex-col gap-24 pb-10'>
          <ContectSectionWithImage 
          title={"UM POUCO SOBRE NÓS"} 
          text={"A BIOMAP Engenharia é uma empresa que nasce da necessidade do mercado em ter empresas que atendam suas exigências garantindo a celeridade e qualidade no serviço prestado. Que vem aprimorando com versatilidade o atendimento a seus clientes, tendo como princípios: ética, profissionalismo e respeito com o próximo e ao meio ambiente."} 
          tagName={"A BIOMAP"} 
          buttonText={"MAIS SOBRE NÓS"} 
          buttonUrl={"/sobre"} 
          image={ImgAbout}  />
        

      <FeaturedSectionCTA 
          title={"Nossos Serviços Totalmente Personalizados Para Você"} 
          text={"Planialtimétrica, inspeção de estruturas, cálculo de volume e acompanhamento de obras."} 
          tagName={"SERVIÇOS"} 
          buttonText={"QUERO FALAR SOBRE UM PROJETO"} 
          buttonUrl={"https://api.whatsapp.com/send/?phone=557193671611&text=Ol%C3%A1+BIOMAP+Engenharia%21+Preciso+de+or%C3%A7amento+de+servi%C3%A7o+de+Topografia%2FAerofotogrametria+com+Drone%21&type=phone_number&app_absent=0"} 
      />
          </div>
        

<OctagonDetails />
</div>
      

<div className='bg-[#111111] py-8'>
      <FeaturedServicesSection />
</div>


<div id="orcamento"  className=" flex w-full justify-center mb-4">
  <div className="w-10/12">
  <ContactUs />  
  </div>
     
</div>

  <div className="w-full mx-auto flex justify-center flex-col pt-20 bg-[#121212]">
      <HeroSection>
        <div className="max-w-5xl mx-auto flex justify-center flex-col p-4 ">
          <h1 className="text-3xl font-black md:text-6xl text-[#0FB268] text-center font-4 lh-6 ld-04  ">
                AQUI FAZEMOS  TOPOGRAFIA COM ALTA TECNOLOGIA
          </h1>
          <h2 className="text-lg md:text-2xl pt-4 font-4 font-light lh-6 ld-04 pb-11 text-white text-center">
          Faça como esses e outros clientes e tenha a Biomap e nossas tecnologias trabalhando a favor do seu projeto.
          </h2>
            {/* <div className="flex flex-col justify-center items-center text-center gap-4 z-10 mb-4-">
     
                 <ArrowDownBtn /> 
                <Image width={590} src={CustomerBrands} alt="" />
            </div> */}

        </div>
        </HeroSection>
    </div>

<CustomerSection />

<div className='flex flex-col sm:grid sm:grid-cols-2 '>

<div className='flex flex-col justify-center  content-normal  sm:text-start p-8 bg-gradient-to-r from-[#1B1A1A] via-[#292929] to-black '>
  <h2 className='text-[#0FB268]  text-2xl sm:text-7xl font-black leading-6 uppercase'>Faça parte do Mundo Biomap</h2>
  <p className='text-white text-lg'>Inscreva-se em nossa Newsletter.</p>
</div>
  <div className='flex gap-4 flex-col bg-black p-8'>
  {/* <Blogsection /> */}
  <NewsLetterSection />
  </div>
</div>
      </section>
    
    </>

    );
  }
  