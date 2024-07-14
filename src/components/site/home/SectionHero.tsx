// import MapaMundiImg from '../../../../public/backgrounds/bio-mapa-mundi-bg.png';

import HeroCarousel from "../HeroCarousel";

function SectionHero() {
    return ( 
    <div className=" mt-20 bg-black- ">
        {/* <div className="-z-10 fixed- w-full h-full ">
            <Image
                src={MapaMundiImg.src} 
                alt="mampa mundi" 
                layout="fill"
                objectFit="cover"
                // className="opacity-40"
                />
        </div> */}
            <HeroCarousel />
    </div>
     );
}

export default SectionHero;