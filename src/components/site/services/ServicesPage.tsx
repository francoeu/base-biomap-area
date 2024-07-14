"use client"

import ImgTour from '../../../../public/other-images/bio-finger-tour-img-1.png';
import ImgLeicaBLK from '../../../../public/other-images/leica-blk360-laser-scanner.jpg';
import ImgTopo from '../../../../public/slide-about-page/bio-img-slide-about-04.jpg';
import ImgEng from '../../../../public/slide-services-images/bio-img-bim-01.jpg';
import ImgDronesVants from '../../../../public/slide-services-images/bio-img-slide-servicos-07.jpg';
import { ContentImageSection } from '../ContentImageSection';
import { FeaturedSectionCTA } from '../FeaturedSectionCTA';
import { FeaturedSectionTag } from "../FeaturedSectionTag";
import HeroCarousel from '../HeroCarousel';
export default function ServicesPage() {
  const listText = [
    "Monitoramento e Fiscalização de Obras;", "Projetos de Micro/Macro Drenagem;", "Projeto Urbanístico e Paisagístico;",
    "Projetos de Canais e Redes de Drenagem;", "Projetos Ferrovias/Rodovias;", "Detalhamento Construtivo;",
    "Projetos de Terraplenagem;", "Apresentação e perspectiva de Projeto;", "Gerenciamento, controle e fiscalização de Projeto."
  ]

  const listTextTopoConvencional = [
    "Levantamentos Planimétricos;", "Levantamentos Altimétricos;", "Levantamentos Planialtimétricos;",
    "Georreferenciamento e Geoprocessamento;", "Implantação de Florestas.",
  ]

  const listTextDronesVants= [
    "Modelo Digital do Terreno;",
    "Geração de Ortofoto/Mosaico;",
   " Filmagem/Fotografia Técnica;",
   " Topografia – Planialtimetria, Inspeção de estruturas, Cálculo de volume e acompanhamento de Obras;",
    "Fiscalização e monitoramento ambiental;",
    "Mapeamentos de pequenas áreas;",
    "Acompanhamento de projetos de construção."
  
  ]
  const listTextLaserScanner= [
    "	Levantamento Topográfico em 3D: O laser scanner é capaz de capturar detalhes precisos da topografia de uma área em 3D, gerando modelos digitais de terreno e mapas de contorno.",
    "	Modelagem de Edificações: O laser scanner pode ser utilizado para criar modelos 3D altamente detalhados de edifícios, pontes, barragens, capturando sua geometria e características arquitetônicas com precisão.",
    "	Inspeção Industrial: Na indústria, o laser scanner é usado para inspecionar equipamentos, tubulações e estruturas complexas, identificando deformações, desgastes e outros problemas.",
    "	Arqueologia e Preservação do Patrimônio: O laser scanner é usado para criar registros digitais precisos de locais arqueológicos e patrimônios culturais, facilitando a preservação e análise.",
    "Mapeamento de Minas e Pedreiras: O laser scanner é aplicado na criação de mapas detalhados de minas e pedreiras, auxiliando na gestão de recursos e planejamento de operações.",
    "	Projetos de Engenharia e Construção: O laser scanner fornece dados precisos de uma área existente, permitindo que projetistas e construtores trabalhem com informações detalhadas e atualizadas.",
  
  ]

  const listTextBiomapTour= [
    "IMOBILIÁRIAS & CORRETORES",
    "CONSTRUTORAS",
    "ARQUITETOS",
    "DESIGNERS DE INTERIORES",
  
  ]
    return (
    <>
      <section className="flex- mt-48 mb-20- ">

            <FeaturedSectionCTA 
          title={"Nossos Serviços Totalmente Personalizados Para Você"} 
          text={"Planialtimétrica, inspeção de estruturas, cálculo de volume e acompanhamento de obras."} 
          tagName={"SERVIÇOS"} 
          buttonText={"QUERO FALAR SOBRE UM PROJETO"} 
          buttonUrl={"https://api.whatsapp.com/send/?phone=557193671611&text=Ol%C3%A1+BIOMAP+Engenharia%21+Preciso+de+or%C3%A7amento+de+servi%C3%A7o+de+Topografia%2FAerofotogrametria+com+Drone%21&type=phone_number&app_absent=0"} 
      />

     <FeaturedSectionTag
          title={"ENGENHARIA | MODELAGEM BIM"} 
          text={`

          Somos uma empresas especializada na área de projetos que conta com uma experiente equipe multidisciplinar de profissional especializados em planejar, projetar, assessorar e implementar todas as fases do empreendimento desde sua concepção, construção até sua completa operação.
          Estes são alguns serviços oferecidos pela Biomap Engenharia:
   
          
          `} 
          listItems={listText}
        //   tagName={"A BIOMAP"} 
          buttonText={"QUERO FALAR SOBRE UM PROJETO"} 
          buttonUrl={"https://api.whatsapp.com/send/?phone=557193671611&text=Ol%C3%A1+BIOMAP+Engenharia%21+Preciso+de+or%C3%A7amento+de+servi%C3%A7o+de+Topografia%2FAerofotogrametria+com+Drone%21&type=phone_number&app_absent=0"} 
          image={ImgEng} 
           />

           <ContentImageSection 
              title={"TOPOGRAFIA CONVENCIONAL"} 
              text={`
              Na área de topografia e agrimensura realizando diversos trabalhos com precisão utilizando os melhores equipamentos disponíveis no mercado, contando com o profissionais que participaram das maiores obras da atualidade.
              Estes são alguns serviços oferecidos pela Biomap Engenharia:
              `} 
              listItems={listTextTopoConvencional}
              //   tagName={"A BIOMAP"} 
              buttonText={"QUERO FALAR SOBRE UM PROJETO"} 
              buttonUrl={"https://api.whatsapp.com/send/?phone=557193671611&text=Ol%C3%A1+BIOMAP+Engenharia%21+Preciso+de+or%C3%A7amento+de+servi%C3%A7o+de+Topografia%2FAerofotogrametria+com+Drone%21&type=phone_number&app_absent=0"} 
              image={ImgTopo} 
           
           />

<FeaturedSectionTag
          title={"DRONES/VANTS"} 
          text={`
          Os Drones e Vants estão dia após dia ganhando força no mercado de trabalho, e é por isso que nossos clientes contam com uma das melhores tecnologias disponíveis no mercado, contando também com o custo/benefício e rapidez na hora de realizar seus empreendimentos.
          Estes são alguns serviços oferecidos pela Biomap Engenharia:
   
          
          `} 
          listItems={listTextDronesVants}
        //   tagName={"A BIOMAP"} 
          buttonText={"QUERO FALAR SOBRE UM PROJETO"} 
          buttonUrl={"https://api.whatsapp.com/send/?phone=557193671611&text=Ol%C3%A1+BIOMAP+Engenharia%21+Preciso+de+or%C3%A7amento+de+servi%C3%A7o+de+Topografia%2FAerofotogrametria+com+Drone%21&type=phone_number&app_absent=0"} 
          image={ImgDronesVants} 
           />

<ContentImageSection
          title={"LASER SCANNER 3D"} 
          text={`
          As tecnologias de Laser Scanner com nuvem de pontos estão ganhando cada vez mais destaque no mercado de trabalho. 
          Nossos clientes podem aproveitar o máximo dessa inovação para seus empreendimentos, beneficiando-se da qualidade superior e da eficiência proporcionadas. Na BIOMAP Topografia, disponibilizamos uma gama de serviços que incluem:
   
          
          `} 
          listItems={listTextLaserScanner}
        //   tagName={"A BIOMAP"} 
          buttonText={"QUERO FALAR SOBRE UM PROJETO"} 
          buttonUrl={"https://api.whatsapp.com/send/?phone=557193671611&text=Ol%C3%A1+BIOMAP+Engenharia%21+Preciso+de+or%C3%A7amento+de+servi%C3%A7o+de+Topografia%2FAerofotogrametria+com+Drone%21&type=phone_number&app_absent=0"} 
          image={ImgLeicaBLK} 
           />

<FeaturedSectionTag
          title={"BIOMAP TOUR"} 
          text={`
          Com o Biomap Tour, você pode proporcionar uma visita virtual 3D imersiva que permite que seus clientes explorem cada detalhe do imóvel sem sair do conforto de suas casas.
          Nosso serviço especial de tour virtual é perfeito para:
   
          
          `} 
          listItems={listTextBiomapTour}
        //   tagName={"A BIOMAP"} 
          buttonText={"QUERO FALAR SOBRE UM PROJETO"} 
          buttonUrl={"https://api.whatsapp.com/send/?phone=557193671611&text=Ol%C3%A1+BIOMAP+Engenharia%21+Preciso+de+or%C3%A7amento+de+servi%C3%A7o+de+Topografia%2FAerofotogrametria+com+Drone%21&type=phone_number&app_absent=0"} 
          image={ImgTour} 
           />
        </section>

        <div className=" mb-2 ">
{/* <CarrouselSlider /> */}
<HeroCarousel />
</div>
        
    </>

    );
  }
  