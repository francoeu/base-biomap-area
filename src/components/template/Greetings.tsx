// https://unicode-table.com/en/1F44B/
"use client"
import { useSession } from 'next-auth/react';
export  function BoasVindas() {
  // const { usuario } = useContext(AutenticacaoContext)
  const { data: session } = useSession();
  function renderizarNome() {
    return (
      <>
      <span className="hidden sm:inline">{session?.user.name}</span>
      </>
      
    )
  }

  return <div className={`md:text-3xl sm:text-xl font-black`}>
    Bem-vindo, {renderizarNome()} 👋
    </div>
}
