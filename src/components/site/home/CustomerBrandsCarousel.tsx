import "@/components/CarouselStyle.css";
import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
interface CarouselProps {
  images: string[]; // Array de URLs das imagens
}

const CustomerBrandsCarousel: React.FC<CarouselProps> = ({ images }) => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 5,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
    },
  };

  return (
    <Carousel
        additionalTransfrom={0}
        responsive={responsive}
        arrows={false}
        autoPlay={true}
        autoPlaySpeed={3000}
        centerMode
        pauseOnHover
        swipeable={true}
        draggable={true}
        // showDots={true}
        infinite={true}
        // partialVisible={true}
        // dotListClass="custom-dot-list-style"
    >
      {images.map((image, index) => (
        <div key={index} className="slider bg-[#1B1A1A] flex max-h-60  justify-center rounded-lg ">
            <img className='p-4' src={image} alt={`Imagem ${index}`} />
          </div>
   
      ))}
    </Carousel>
  );
};

export default CustomerBrandsCarousel;
