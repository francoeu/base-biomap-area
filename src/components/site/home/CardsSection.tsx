import { IconCurrencyDollar, IconPower, IconTargetArrow, IconUser } from "@tabler/icons-react";
import Link from "next/link";
import React from 'react';
import Button from "../Button";
import FeaturedCard from "../FeaturedCard";

const CardSection: React.FC = () => {
  return (
   <>
    <section className="flex flex-col items-center justify-center content-center mb-6 gap-4 md:flex-row z-30">
        <FeaturedCard
            icon={<IconCurrencyDollar width={64} height={64} className="text-[#0FB268] mb-6"/>}
            title="Redução de custos em até 70%"  
            description="Faça como esses e outros clientes e tenha a Biomap e nossas tecnologias trabalhando a favor do seu projeto."
            />

        <FeaturedCard
            icon={<IconTargetArrow width={64} height={64} className="text-[#0FB268] mb-6" />}
            title="Comprometimento com Precisão e Qualidade!"  
            description="A Biomap é comprometida em oferecer serviços topográficos com alto nível de precisão e qualidade."
            />

        <FeaturedCard
        icon={<IconUser width={64} height={64} className="text-[#0FB268] mb-6" />}
            title="Atendimento personalizado e ágil"  
            description="A Biomap entende que cada projeto é único e merece atenção individualizada."
            />

        <FeaturedCard
        icon={<IconPower width={64} height={64} className="text-[#0FB268] mb-6" />}
            title="Tecnologia avançada e inovação"  
            description="Mantenha-se à frente da concorrência com o uso de tecnologias avançadas e inovadoras em seus projetos."
            />
</section>

<div className="flex justify-center z-30">
    <Link target="_blank" href={'https://api.whatsapp.com/send/?phone=557193671611&text=Ol%C3%A1+BIOMAP+Engenharia%21+Preciso+de+or%C3%A7amento+de+servi%C3%A7o+de+Topografia%2FAerofotogrametria+com+Drone%21&type=phone_number&app_absent=0'}>
        <Button  className="text-lg" text="SOLICITAR ORÇAMENTO PERSONALIZADO" />
    </Link>

</div>
   </>
  )
}

export default CardSection;