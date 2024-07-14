import { Card } from '@mantine/core';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
// import { IconChevronLeft, IconChevronRight } from '@tabler/icons';
import "@/components/CarouselStyle.css";
import slide05 from '../../../public/slide-hero-images/bio-img-biomap-tour-slide05.png';
import slide01 from '../../../public/slide-hero-images/bio-img-slide-hero-01.jpg';
// import slide02 from '../../../public/slide-hero-images/bio-img-slide-hero-02.jpg';
import slide03 from '../../../public/slide-hero-images/bio-img-slide-hero-03.jpg';
import slide04 from '../../../public/slide-hero-images/bio-img-slide-hero-04.jpg';
import slide06 from '../../../public/slide-hero-images/bio-img-slide-hero-06.jpeg';

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

const HeroCarousel = () => {
  const data = [
    {
      title: 'TOPOGRAFIA CONVENCIONAL',
      text: 'Planialtimétrica, inspeção de estruturas, cálculo de volume e acompanhamento de obras.',
      image: slide06.src,
    },
    {
      title: 'MAPEAMENTO COM DRONES',
      text: 'Nossas metodologias modernas de trabalho reduz o custo e acelera a entrega do serviço.',
      image: slide01.src,
    },
    {
      title: 'PROJETOS DE ENGENHARIA',
      text: 'Prestamos consultoria técnica, realizando diagnósticos e elaborando projetos de engenharia.',
      image: slide04.src,
    },
    {
      title: 'MAPEAMENTO COM SCANNERS 3D',
      text: 'Trabalhamos com a exclusiva tecnologia do Laser Scanner 3D Matterport PRO3.',
      image: slide03.src,
    },
    {
      title: 'TOUR VIRTUAIS EM 360º',
      text: 'Conheça nosso mais novo serviço especial de tour virtuais em 360º. Aéreo e térreo, para áreas internas e externas.',
      image: slide05.src,
    },
  ];

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-8 sm:py-12 sm:px-6 lg:py-16- lg:px-8 bg-gray-800- ">
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
          <div key={index} className="carousel-item bg-gray-800- w-full min-h-[260px] ">
            <Card
              style={{
                backgroundImage: `url(${item.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '100%',
                width:'100%',
                padding: 0 ,
              }}
              shadow="xs"
              padding="xl"
              radius="lg"
            >
              <div className="flex w-full min-h-[260px]  justify-center lg:justify-end items-center lg:h-[472px] lg:mr-8- bg-black/50 rounded-lg">
                <div className="max-w-lg m-4 lg:m-0 ">
                  <h2 className="text-2xl lg:text-5xl font-black text-[#0FB268]">
                    {item.title}
                  </h2>
                  <p className="text-sm md:text-lg text-white mt-2 ">{item.text}</p>
                </div>
              </div>
            </Card>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default HeroCarousel;
