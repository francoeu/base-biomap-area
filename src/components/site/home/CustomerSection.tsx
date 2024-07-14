import { FeaturedSectionCTA } from "@/components/site/FeaturedSectionCTA";
import CustomersGrid from "@/components/site/home/CustomersGrid";
import Image from "next/image";
import WavesBg from '../../../../public/backgrounds/bio-waves-bg.png';

function CustomerSection() {
    return (  
        <section className="flex flex-col justify-center   gap-4 relative bg-[#121212] ">
        <div className="z-0 w-full h-full flex justify-center">
            <Image
                src={WavesBg.src} 
                alt="waves background" 
                layout="fill"
                objectFit="contain"
            />
        </div>
<div >
<FeaturedSectionCTA 
  title={"Nossos Clientes"} 
  text={"Estão abertas as aplicações para projetos de engenharia e topografia do segundo semestre de 2023."} 
  tagName={"CLIENTES"} 
  buttonText={"QUERO FALAR SOBRE UM PROJETO"} 
  buttonUrl={"https://api.whatsapp.com/send/?phone=557193671611&text=Ol%C3%A1+BIOMAP+Engenharia%21+Preciso+de+or%C3%A7amento+de+servi%C3%A7o+de+Topografia%2FAerofotogrametria+com+Drone%21&type=phone_number&app_absent=0"} 
/>
</div>


<div className="mb-10 ">
<CustomersGrid />
</div>
</section>
    );
}

export default CustomerSection;