"use client"
import MembersLogosLogin from '@/components/MembersLogosLogin';
import Design from '@/components/Particle';
import { signIn, useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FormEventHandler, useState } from 'react';
import logo from '../../../public/logotipo-biomap.png';


export default function LoginPage() {
  const { data: session } = useSession();
  const { push } = useRouter();
  const [data, setData] = useState({
    email: '',
    password: ''
  });

  const InputValue = (e) => setData({
    ...data, [e.target.name]: e.target.value
  });

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const result = await signIn('credentials', {
      ...data,
      redirect: false,
      callbackUrl: '/'
    });

    if (result?.url) {
      return push(result?.url)
    }
  }

  if (!session) {
    return (
   <>
   <div className="h-screen flex">

      <div className="flex flex-col lg:w-1/4 w-[320px]  m-auto justify-center items-center z-1">
      <Image 
            src={'/pattern-malha.svg'} 
            alt="mampa mundi" 
            layout="fill"
            objectFit="contain"
            />
        <Image src={logo} width={250} className='mb-5 z-30' alt="logo biomap" />
        <p className="text-sm font-normal text-gray-300 text-center mb-7 z-30">Agora você faz parte de um grupo exclusivo. Seja bem-vindo a sua área.</p>

<MembersLogosLogin />

        <form
              action=""
              method="post"
              autoComplete='off'
              className="flex flex-col gap-2 w-[100%] max-w-[100%] z-30"
              onSubmit={handleSubmit}
            >
              <div className="flex flex-col gap-2">
                <label className='text-white' htmlFor="email">E-mail</label>
                <input
                  type="text"
                  name='email'
                  className="p-[10px] bg-gray-800  outline-0 rounded"
                  onChange={InputValue}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className='text-white' htmlFor="password">Senha</label>
                <input
                  type="password"
                  name='password'
                  className="p-[10px] bg-gray-800 outline-0 rounded"
                  onChange={InputValue}
                />
              </div>
              {/* <div>
                <p>Não tem conta? <span>Cadastre-se!</span></p>
              </div> */}
              <button
                type="submit"
                className="bg-green-800 hover:bg-green-900 p-[10px] text-gray-50 font-medium rounded"
              >Fazer Login</button>
    
            </form>

      </div>

      <div className="hidden lg:flex w-1/2 bg-gradient-to-tr from-black via-green-900  to-slate-950 justify-around items-center">
      <Image 
            width={604} 
            height={604}
            src={'/green-isotipo.svg'} 
            alt="mampa mundi" 
            />
        {/* <div>
       
         
          <h1 className="text-white font-bold text-4xl font-sans mt-5">Biomap Area</h1>
          <p className="text-white mt-1">Uma área de membros exclusiva para nossos clientes</p>
         
        </div> */}
      </div>
    </div>
   
  <div className=" md:hidden h-screen w-full absolute top-0 left-0 z-0">
      <Design  />
      </div> 
      </>
     
  
     

      )
  } else {
    push('/panel')
  }

}
