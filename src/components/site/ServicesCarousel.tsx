import { Card } from '@mantine/core';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
// import { IconChevronLeft, IconChevronRight } from '@tabler/icons';
import "@/components/CarouselStyle.css";
// import slideServico01 from '../../../public/slide-services-images/bio-img-slide-servicos-01.jpg';
// import slideServico03 from '../../../public/slide-services-images/bio-img-slide-servicos-02.jpg';
// import slideServico02 from '../../../public/slide-services-images/bio-img-slide-servicos-03.jpg';
// import slideServico04 from '../../../public/slide-services-images/bio-img-slide-servicos-04.jpg';
// import slideServico05 from '../../../public/slide-services-images/bio-img-slide-servicos-05.jpg';

import slideServico09 from '../../../public/slide-services-images/bio-img-slide-servicos-08.jpg';
import slideServico10 from '../../../public/slide-services-images/bio-img-slide-servicos-09.jpg';
import slideServico11 from '../../../public/slide-services-images/bio-img-slide-servicos-10.jpg';
import slideServico12 from '../../../public/slide-services-images/bio-img-slide-servicos-11.jpg';
import slideServico08 from '../../../public/slide-services-images/bio-img-slide-servicos-12.jpg';

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const ServicesCarousel = () => {
  
  const data = [
    {
      title: 'TOPOGRAFIA CONVENCIONAL',
      text: 'Planialtimétrica, inspeção de estruturas, cálculo de volume e acompanhamento de obras.',
      image: slideServico08.src,
    },
    {
      title: 'MAPEAMENTO COM DRONES',
      text: 'Nossas metodologias modernas de trabalho reduz o custo e acelera a entrega do serviço.',
      image: slideServico09.src,
    },
    {
      title: 'ENGENHARIA ESPECIALIZADA',
      text: 'Prestamos consultoria técnica, realizando diagnósticos e elaborando projetos de engenharia.',
      image: slideServico10.src,
    },
    {
      title: 'MAPEAMENTO COM SCANNERS 3D',
      text: 'Trabalhamos com a exclusiva tecnologia do Laser Scanner 3D Matterport PRO3.',
      image: slideServico11.src,
    },
    {
      title: 'MAPEAMENTO COM SCANNERS 3D',
      text: 'Trabalhamos com a exclusiva tecnologia do Laser Scanner 3D Matterport PRO3.',
      image: slideServico12.src,
    },
  ];

  return (

      <Carousel 
        responsive={responsive} 
        showDots={true}
        arrows={false}
        autoPlay={true}
        autoPlaySpeed={5000}
        pauseOnHover={false}
        swipeable={true}
        infinite={true}
        dotListClass="custom-dot-list-style"
        >
          
        {data.map((item, index) => (
          <div key={index} className="carousel-item">
            <Card
              style={{
                backgroundImage: `url(${item.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '500px',
                width: '100%',
                
              }}
              shadow="xs"
              padding="xl"
              radius="lg"
            >
          
            </Card>
          </div>
        ))}
      </Carousel>

  );
};

export default ServicesCarousel;
