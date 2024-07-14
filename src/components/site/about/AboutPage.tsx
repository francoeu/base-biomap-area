"use client"
import { IconRocket, IconScanEye, IconStars } from "@tabler/icons-react";
import Image from "next/image";
// import BannerIllustration from '../../../public/bio-illustration-banner.svg';
// import MapaMundiImg from '../../../../public/backgrounds/bio-mapa-mundi-bg.png';
import Carregando from "@/components/template/Carregando";
import { useEffect, useState } from "react";
import WavesBg from '../../../../public/backgrounds/bio-waves-bg.png';
import fotoAllan from '../../../../public/other-images/bio-allan-brasilia.jpg';
import fotoEdvaldo from '../../../../public/other-images/bio-edvaldo-brasilia.jpg';
import FeaturedCard from "../FeaturedCard";
import TeamMember from "../TeamMember";
import AboutPageCarousel from "./AboutPageCarousel";

export default function AboutPage() {
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
                  {/* <section className="mt-32 flex justify-center">
           
           <PageIntroBanner bgImage={FarolBarraImg.src} title={"SOBRE A BIOMAP"} />
   
          
       </section> */}
           <section className="text-gray-600 mt-32 md:mt-32 relative ">
               {/* <div className="-z-10 fixed- w-full h-full ">
                   <Image
                       src={MapaMundiImg.src} 
                       alt="mapa mundi" 
                       layout="fill"
                       objectFit="cover"
                   />
               </div> */}
               <div className="flex justify-center bg-[#1B1A1A]/75">
                   <div className="max-w-[1200px] p-4 w-full flex  flex-col-reverse md:flex-row justify-between items-center content-center gap-8 py-8">
                       <div>
                           <h1 className="text-3xl font-bold text-white pb-4">QUEM SOMOS</h1>
                           <p className="text-white font-light"> A Biomap Topografia & Locações Ltda é uma empresa que nasce da necessidade do mercado em ter empresas que atendam suas exigências garantindo a celeridade e qualidade no serviço prestado.
                           Que vem aprimorando com versatilidade o atendimento a seus clientes, tendo como princípios: ética, profissionalismo e respeito com o próximo e ao meio ambiente.
                           Contamos com uma equipe multidisciplinar com vasta experiência técnica em segmentos de engenharia, topografia e meio ambiente.
                           Desenvolvemos ações de forma rápida e assertiva, no diagnóstico, análise e implantação das soluções mais adequadas para o empreendimento.
                           Trabalhamos de forma integrada, com qualidade e agilidade, oferecendo suporte decisório e acompanhamento em todo o processo para agregar valores e resultados ao cliente.</p>
                       </div>
          

                   <div className="flex  w-full justify-center md:justify-start  ">
                   <div className="w-11/12  md:w-[500px] bg-gray-950-">
                   <AboutPageCarousel />
                   </div>

                   </div>
                   </div>
               </div>
           </section>

           <section className="flex flex-col justify-center pt-10 gap-4 relative bg-[#1B1A1A]  z-0">
               <div className="-z-10 w-full h-full flex justify-center ">
                   <Image
                       src={WavesBg.src} 
                       alt="waves background" 
                       layout="fill"
                       objectFit="cover"
                   />
               </div>

               <div className="max-w-[1200px] mx-auto pb-14 lg:h-[450px] grid grid-cols-1 md:grid-cols-3 gap-5">
                   <FeaturedCard
                       className="z-50-"
                       icon={<IconRocket width={64} height={64} className="text-[#0FB268] mb-6"/>}
                       title="MISSÃO"  
                       description="Promover inovações na disciplina de topografia para elaboração de projetos em conformidade com as normas e requisitos técnicos, contribuindo para o desenvolvimento de forma colaborativa nos projetos dos nossos clientes."
                   />

                   <FeaturedCard
                       className="z-50-"
                       icon={<IconScanEye width={64} height={64} className="text-[#0FB268] mb-6" />}
                       title="VISÃO"  
                       description="Crescer de forma inovadora, organizada para ser a maior empresa de topografia do norte e nordeste, agregando conhecimento e rentabilidade, valorizando os colaboradores e clientes."
                   />

                   <FeaturedCard
                       className="z-50-"
                       icon={<IconStars width={64} height={64} className="text-[#0FB268] mb-6" />}
                       title="VALORES"  
                       description="Satisfação do Cliente;
                       Soluções Inovadoras;
                       Melhoria contínua;
                       Compromisso;
                       Qualidade;
                       Sustentabilidade;
                       Ética;
                       Cidadania;
                       Confiança;
                       Profissionalismo;
                       Parceria;
                       Integridade;
                       Comprometimento;
                       Superação de Resultados."
                   />
               </div>
           </section>
           {/* bg-gradient-to-r from-[#1B1A1A] via-[#292929] to-black */}
           <section className="flex flex-col w-full  justify-center items-center content-center py-4    ">

           <div className="bg-gray-800- max-w-[1000px] flex flex-col- justify-center text-center">
           <h2 className="text-[#0FB268]  text-3xl md:text-6xl font-extrabold py-14">Conheça nossos fundadores</h2>
           </div>
               
<div className="bg-gray-800- max-w-[1000px] w-10/12 md:w-full flex flex-col md:flex-row  justify-between  gap-4 pb-14 md:pb-24">
                   <TeamMember name={"Edvaldo Lima"} role={"Gerente de Projetos & Co-founder"} photoUrl={fotoEdvaldo.src} description={`

Edvaldo é um profissional apaixonado pela área de Engenharia de Produção, com mais de 15 
anos de trajetória dedicada à construção civil e a projetos `}> 

<p className="mb-2 text-white text-sm font-light">Edvaldo é um profissional apaixonado pela área de Engenharia de Produção, com mais de 15 
anos de trajetória dedicada à construção civil e a projetos de infraestrutura de grande porte.
<br /><br />
Sua jornada permitiu a ele atuar em empreendimentos diversos, incluindo estradas, barragens, 
portos, metrô, VLT e aeroportos, onde ele tem tido a oportunidade de contribuir de forma 
significava para os projetos dos clientes da BIOMAP. 
<br /><br />
Sua expertise se destaca na utilização de sofisticados softwares de engenharia e topografia, 
que são ferramentas essenciais moldando a modernidade das construções, principalmente 
com a implementação da tecnologia BIM. Sua habilidade em extrair o máximo dessas 
ferramentas tem causado um impacto positivo nos projetos em que a BIOMAP atua, 
contribuindo para a otimização de processos, a redução de custos e a maximização dos lucros.
<br /><br />
A liderança é uma característíca que o define. Com sua habilidade em construir e liderar 
equipes, ele transforma metas em realidade. Seu foco é sempre voltado para a obtenção de 
resultados tangíveis, como a implementação de ideias inovadoras que reformulam abordagens 
tradicionais e resultam em notáveis melhorias operacionais.
<br /><br />
A amplitude do conhecimento dele em projetos e gestão de obras complementa sua jornada. 
Sua abordagem pragmática e orientada para resultados se baseia em sólidos conhecimentos 
teóricos e em uma rica experiência prática. Ao longo dos anos, ele acumulou um histórico de 
sucessos que reforçam sua paixão por impulsionar projetos e equipes em direção ao sucesso 
dos clientes da BIOMAP!</p>
                   
                   
                   </TeamMember>


<TeamMember name={"Allan Patrick"} role={"Gerente de Projetos & Co-founder"} photoUrl={fotoAllan.src} description={`

Com uma carreira de sucesso como Engenheiro de Agrimensura, Allan Vilhena é um profissional altamente experiente 
e dedicado, acumulando 18 anos de..`} >


<p className="mb-2 text-white text-sm font-light">
Com uma carreira de sucesso como Engenheiro de Agrimensura, Allan Vilhena é um profissional altamente experiente 
e dedicado, acumulando 18 anos de vivência na área de topografia. 
<br /><br />
Sua paixão pela disciplina o levou a 
conquistar uma sólida formação acadêmica, incluindo pós-graduações em BIM para Projeto de Infraestrutura e 
em Gestão Executiva. Como diretor da renomada empresa Biomap Topografia, Allan é reconhecido por sua liderança 
e habilidade em oferecer resultados excepcionais aos clientes.
<br /><br />
Sua atuação se destaca pela aplicação de técnicas da topografia modernas, domínio das geotecnologias de ponta, 
refletindo seu compromisso com a atualização constante na área. A combinação de sua formação, vasta experiência 
e visão estratégica de gestão o tornam um profissional completo, capaz de enfrentar desafios complexos e otimizar
processos. 
<br /><br />
Através da Biomap Topografia, Allan e sua equipe oferecem soluções inovadoras e precisas, alinhadas 
com as demandas do mercado e as necessidades dos clientes. Sua trajetória é um testemunho inspirador de 
dedicação à excelência e constante aprimoramento nas Geotecnologias, Engenharia e Topografia voltada para 
grandes projetos de Infraestrutura.
</p>


                   </TeamMember>
               </div>

     
           </section>

   
   {/* <div className="mb-20-">
       <ResponsiveBanner 
         illustration={BannerIllustration} 
         title={'Agenda aberta para projetos Executivos Personalizados'} 
         text={`
         Tenha os melhores engenheiros e especialistas na chamada Topografia do Futuro. 
         ${<b>O que isso significa para o seu projeto?</b>} 
         Muito mais do que cabe aqui. Nos chame para uma conversa.

         `} 
         buttonText={'Fazer aplicação'}  />
   </div> */}
        </div>
      )}

        </>
    );
}
