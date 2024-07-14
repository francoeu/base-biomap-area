import Image from "next/image"
import ForcarAutenticacao from "../authentication/ForcarAutenticacao"

interface PaginaProps {
  externa?: boolean
  children: any
  className?: string
}
// bg-gradient-to-r from-zinc-900 via-black to-zinc-900
export default function Pagina(props: PaginaProps) {
  function renderizar() {

    
    return (
      <div
        className={`
                flex flex-col min-h-screen
                ${props.className ?? ''}
            `}
      >
        <div className="-z-10 fixed w-full h-full">
          <Image 
            src={'/pattern-malha.svg'} 
            alt="mampa mundi" 
            layout="fill"
            objectFit="cover"
            />
        </div>
        {props.children}
      </div>
    )
  }

  return props.externa ? (
       renderizar()
  ) : (
    <ForcarAutenticacao>{renderizar()}</ForcarAutenticacao>
    // <p>aqui</p>
  )
}
