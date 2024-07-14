import { useEffect, useState } from "react";

export default function TopBar() {
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
    <div
      className={`flex justify-center max-w-lg- border-b- border-gray-300 py-4 px-8 rounded-full
      from-zinc-200  dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit
      ${
        scrolled
          ? "bg-transparent "
          : "bg-gradient-to-b backdrop-blur-2xl " // Define o background transparente quando não há scroll
      }`}
    >
      <div className="flex items-center justify-between gap-5 ">
   
      <div className="hidden md:block">
        <nav aria-label="Global">
          <ul className="flex items-center gap-6 text-xs md:text-sm xl:text-md">
            <li>
              <a
                className="text-gray-500 transition hover:text-[#0FB268] dark:text-white dark:hover:text-[#0FB268]"
                href="/home"
              >
                Home
              </a>
            </li>

            <li>
              <a
                className="text-gray-500 transition hover:text-[#0FB268] dark:text-white dark:hover:text-[#0FB268]"
                href="/sobre"
              >
                A Biomap
              </a>
            </li>

            <li>
              <a
                className="text-gray-500 transition hover:text-[#0FB268] dark:text-white dark:hover:text-[#0FB268]"
                href="/servicos"
              >
                Serviços
              </a>
            </li>

            <li>
              <a
                className="text-gray-500 transition hover:text-[#0FB268] dark:text-white dark:hover:text-[#0FB268]"
                href="/contato"
              >
                Contato
              </a>
            </li>

            <li>
              <a
                className="text-gray-500 transition hover:text-[#0FB268] dark:text-white dark:hover:text-[#0FB268]"
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
          </ul>
        </nav>
      </div>


    </div>
  </div>


    )
}