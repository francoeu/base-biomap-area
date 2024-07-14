"use client"
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { Brand } from './Brand';
import TopBar from './TopBar';

export const NavbarHeader = () => {
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  const [scrolled, setScrolled] = useState(false);

  // Função para lidar com o evento de scroll
  const handleScroll = () => {
    if (window.scrollY > 0) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  // Adicionar o evento de scroll quando o componente monta
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  
  return (
    <div   className={`flex w-full justify-center z-50 `}> 
    <div   className={`fixed top-0 w-full max-w-5xl clearNav z-50  ${
      scrolled
        ? "bg-gradient-to-b rounded-xl mt-6 transform translate-x-1  from-zinc-200 backdrop-blur-md- dark:border-neutral-800 dark:bg-zinc-900/75 dark:from-inherit"
        : "bg-transparent mt-6" // Define o background transparente quando não há scroll
    }`}>

<div className='flex justify-between items-center h-24 max-w-5xl mx-auto- px-4  text-white bg-gray-900-'>
      {/* <h1 className='w-full text-3xl font-bold text-[#00df9a]'>REACT.</h1> */}
      

      <Brand />


      <div className='hidden md:flex'>
      <TopBar />
      </div>

      <div className='w-full- hidden md:block bg-gray-800-'>
        <Link href='/login' target='_blank' >
      <button className="text-xs border border-green-600 hover:bg-[#0FB268] hover:font-bold px-4 py-2 rounded-lg "> ÁREA DO CLIENTE </button>
      </Link>
      
      </div>
    
      {/* <ul className='hidden md:flex'>
        <li className='p-4'>Home</li>
        <li className='p-4'>Company</li>
        <li className='p-4'>Resources</li>
        <li className='p-4'>About</li>
        <li className='p-4'>Contact</li>
      </ul> */}
      <div onClick={handleNav} className='block md:hidden'>
          {nav ? <AiOutlineClose size={20}/> : <AiOutlineMenu size={20} />}
      </div>

      <div className={nav ? 'fixed left-0 top-0 w-[80%] p-8 -mt-4  z-50 h-screen bg-[#111010] ease-in-out duration-500' : 'ease-in-out duration-500 fixed left-[-100%]'}>

      <div className='flex justify-center w-full bg-black- mt-4'>
      <Brand />
      </div>
      <ul className='bg-black- text-2xl flex flex-col gap-4 mt-6 justify-center text-center '>
        {/* <h1 className='w-full text-3xl font-bold text-[#00df9a] m-4'>REACT.</h1> */}
     
      <li className=' p-2 hover:bg-green-700  rounded-md hover:font-bold '>
              <a
                className="text-gray-500  transition hover:text-white  dark:text-white dark:hover:text-white/75 "
                href="/home"
              >
                Home
              </a>
            </li>

            <li className=' p-2 hover:bg-green-700  rounded-md hover:font-bold '>
              <a
                className="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
                href="/sobre"
              >
                A Biomap
              </a>
            </li>

            <li className=' p-2 hover:bg-green-700  rounded-md hover:font-bold '>
              <a
                className="text-gray-500  transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
                href="/servicos"
              >
                Serviços
              </a>
            </li>

            <li className=' p-2 hover:bg-green-700  rounded-md hover:font-bold '>
              <a
                className="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
                href="/contato"
              >
                Contato
              </a>
            </li>

            <li className=' p-2 hover:bg-green-700  rounded-md hover:font-bold '>
            <a
              className="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
                href="http://www.lojabiomap.com.br/wp-content/uploads/2024/02/BIOMAP_PORTIFOLIO-2.pdf"
                target="_blank"
              >
                Portfólio
              </a>
          
            </li>

            
            {/* <li>
              <a
                className="text-gray-500 transition hover:text-[#0FB268] dark:text-white dark:hover:text-[#0FB268]"
                href="https://blog.biomapengenharia.com/"
                target="_blank"
              >
                Blog
              </a>
            </li> */}

            <li>
              <a
                className="text-gray-500 transition hover:text-[#0FB268] dark:text-white dark:hover:text-[#0FB268]"
                href="https://www.lojabiomap.com.br/"
                target="_blank"
              >
                Loja
              </a>
            </li>
            <div className='w-full- bg-gray-800- mt-4'>

<Link href='/login' target='_blank' >
  <button className="text-xs border border-green-600 hover:bg-[#0FB268] hover:font-bold px-4 py-2 rounded-lg "> ÁREA DO CLIENTE </button>
</Link>

</div>

      </ul>

      </div>

    </div>
</div>
    </div>

  );
};
