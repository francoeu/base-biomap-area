import { Card } from '@mantine/core';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
// import { IconChevronLeft, IconChevronRight } from '@tabler/icons';
import "@/components/CarouselStyle.css";
import slideServico01 from '../../../../public/slide-about-page/bio-img-slide-about-01.jpg';
import slideServico03 from '../../../../public/slide-about-page/bio-img-slide-about-02.jpg';
import slideServico02 from '../../../../public/slide-about-page/bio-img-slide-about-03.jpg';
import slideServico04 from '../../../../public/slide-about-page/bio-img-slide-about-04.jpg';
import slideServico05 from '../../../../public/slide-about-page/bio-img-slide-about-05.jpg';


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

const AboutPageCarousel = () => {
  
  const data = [
    {
      title: 'TOPOGRAFIA CONVENCIONAL',
      text: 'Planialtimétrica, inspeção de estruturas, cálculo de volume e acompanhamento de obras.',
      image: slideServico03.src,
    },
    {
      title: 'MAPEAMENTO COM DRONES',
      text: 'Nossas metodologias modernas de trabalho reduz o custo e acelera a entrega do serviço.',
      image: slideServico01.src,
    },
    {
      title: 'ENGENHARIA ESPECIALIZADA',
      text: 'Prestamos consultoria técnica, realizando diagnósticos e elaborando projetos de engenharia.',
      image: slideServico02.src,
    },
    {
      title: 'MAPEAMENTO COM SCANNERS 3D',
      text: 'Trabalhamos com a exclusiva tecnologia do Laser Scanner 3D Matterport PRO3.',
      image: slideServico04.src,
    },
    {
      title: 'MAPEAMENTO COM SCANNERS 3D',
      text: 'Trabalhamos com a exclusiva tecnologia do Laser Scanner 3D Matterport PRO3.',
      image: slideServico05.src,
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
                height: '300px',
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

export default AboutPageCarousel;
