// https://unicode-table.com/en/1F44B/
"use client"
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import logoImg from '../../../public/logotipo-biomap.png';

export  function Brand() {
  // const { usuario } = useContext(AutenticacaoContext)
  const { data: session } = useSession();
  function renderizarNome() {
    return (
      <>
      <span className="hidden sm:inline">{session?.user.name}</span>
      </>
      
    )
  }

  return   <Link href="/panel">
 <div className={`text-3xl font-black`}>
    <Image width={150} src={logoImg} alt="" />
    {/* Olá, {renderizarNome()} 👋 */}
    </div>
  </Link>
 
}
