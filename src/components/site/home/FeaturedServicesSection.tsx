"use client"
import ServicesCarousel from "@/components/site/ServicesCarousel";
import VerticalListWithImage from "@/components/site/VerticalListWithImage";

const items = [
    {
        number: '01',
        title: 'ENGENHARIA',
        content: 'Somos uma empresa especializada na área de projetos...',
    },
    {
        number: '02',
        title: 'TOPOGRAFIA COM DRONES / VANTS / 3D SCANNER',
        content: 'Quando se fala no uso de tecnologia avançada aliada...',
    },
    {
        number: '03',
        title: 'TOPOGRAFIA CONVENCIONAL',
        content: 'Topografia convencional ainda é bastante requisitada...',
    },
  ];

function FeaturedServicesSection() {
    return ( 
        
<section className="flex max-w-5xl  justify-center items-center content-center m-auto">
<div className="flex flex-col md:grid md:grid-cols-2 justify-between- w-full  px-4- py-8- sm:py-12- sm:px-6- lg:py-16- lg:px-8-">
  <div className="w-full bg-gray-800-">
    <VerticalListWithImage items={items} />
  </div>
  <div className="flex  w-full justify-center md:justify-start  bg-gray-900-">
  <div className="w-11/12 md:w-[500px] bg-gray-950-">
  <ServicesCarousel />
  </div>

  </div>


</div>
</section>
     );
}

export default FeaturedServicesSection;