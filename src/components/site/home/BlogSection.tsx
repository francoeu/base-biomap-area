import Image from "next/image";
// import blogCardBg from '../../../../public/backgrounds/blog-card-bg.png';
import Link from "next/link";
import gifMundoBio from '../../../../public/mundo-biomap-animation.gif';
function Blogsection() {
  // bg-gradient-to-r from-[#1B1A1A] via-[#292929] to-black 
    return ( 
        <section className="flex w-full items-center content-center justify-center pt-10- bg-[#000]- ">

<div
  className={`z-0   rounded-lg overflow-hidden-  relative-`}
>
<Link target='_blank' href={'https://blog.biomapengenharia.com/'}>
<div className="-z-10  w-full h-full ">
          <Image
            src={gifMundoBio.src} 
            alt="blog card" 
            // layout="fill"
            objectFit="contain"
            width={670}
            height={235}
            // className="opacity-40"
            />
        </div>
        </Link>
{/* 
  <div className="bg-black p-8 md:p-12 lg:px-16 lg:py-24 flex justify-center">
    <div className="text-center sm:text-left z-50">
      <h2 className="text-xl font-bold text-center text-white sm:text-3xl md:text-5xl">
      MUNDO BIOMAP
      </h2>

      <p className="hidden max-w-lg text-center text-white/90 md:mt-6 md:block md:text-lg md:leading-relaxed">
      Acompanhe o que acontece no universo da topografia moderna com nossa curadoria especial de conteúdo.
      </p>

      <div className="mt-4 sm:mt-8 flex justify-center">
        <Link
        target="_blank"
          href="https://biomapengenharia.com.br/noticias/"
          className="text-center  inline-block rounded-md bg-green-700 px-12 py-1 md:px-12 md:py-3 text-xs md:text-sm font-medium text-white transition hover:bg-green-800 focus:outline-none focus:ring"
        >
          ACESSAR NOSSO BLOG
        </Link>
      </div>
    </div>
  </div> */}
</div>


</section> 

     );
}

export default Blogsection;