"use client"
import Link from "next/link";
import React from "react";
import { Brand } from "./Brand";
import TopBar from "./TopBar";

export default function Header() {
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  // Função para lidar com o evento de scroll
  const handleScroll = () => {
    if (window.scrollY > 0) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  // Adicionar o evento de scroll quando o componente monta
  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div   className={`flex w-full justify-center z-50`}>
    <header
      className={`fixed top-0 w-full max-w-5xl clearNav z-50  bg-gray-800- ${
        scrolled
          ? "bg-gradient-to-b rounded-xl mt-4 transform translate-x-1  from-zinc-200 backdrop-blur-md- dark:border-neutral-800 dark:bg-zinc-900/75 dark:from-inherit"
          : "bg-transparent-" // Define o background transparente quando não há scroll
      }`}
    >
      <div className="flex- flex-wrap- p-5 flex-col- md:flex-row">
        <div className="flex- flex-row- items-center- justify-between- p-3 md:p-1">
          <button
            className="text-white  pb-4 cursor-pointer leading-none px-3 py-1 md:hidden outline-none focus:outline-none content-end "
            type="button"
            aria-label="button"
            onClick={() => setNavbarOpen(!navbarOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-menu"
            >
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>

        <div
          className={
            "  md:flex items-center justify-between " +
            (navbarOpen ? " flex" : " hidden")
          }
        >
          <Brand />
          <TopBar />
          <Link href={'/login'} >
          <button className="text-xs border border-green-600 hover:bg-[#0FB268] hover:font-bold px-4 py-2 rounded-lg "> ÁREA DO CLIENTE </button>
          </Link>
        </div>
      </div>
    </header>
    </div>
  );
}
