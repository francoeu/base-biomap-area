'use client'
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Image from "next/image";
import { FormEventHandler, useState } from 'react';
import logo from '../../../public/logotipo-biomap.png';
export function Login1() {
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
    return (
      <div className="h-screen flex">
      <div className="flex w-1/2 bg-gradient-to-tr from-black via-green-900  to-slate-950 justify-around items-center">
        <div>
         
          <h1 className="text-white font-bold text-4xl font-sans mt-5">Biomap Area</h1>
          <p className="text-white mt-1">Uma área de membros exclusiva para nossos clientes</p>
          {/* <button type="submit" className="block  bg-black text-white mt-4 p-2 rounded-lg font-bold mb-2">Ainda não trabalha conosco? Clique aqui.</button> */}
        </div>
      </div>



      <div className="flex flex-col w-1/4  m-auto justify-center items-center ">
        <Image src={logo} width={250} className='mb-5' alt="logo biomap" />
        {/* <h1 className="text-gray-800 font-bold text-2xl mb-1">Biomap Área</h1> */}
        <p className="text-sm font-normal text-gray-600 text-center mb-7">Seja bem-vindo.</p>
        <form
              action=""
              method="post"
              autoComplete='off'
              className="flex flex-col gap-2 w-[100%] max-w-[100%]"
              onSubmit={handleSubmit}
            >
              <div className="flex flex-col gap-2">
                <label htmlFor="email">E-mail</label>
                <input
                  type="text"
                  name='email'
                  className="p-[10px] bg-slate-900 outline-0 rounded"
                  onChange={InputValue}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name='password'
                  className="p-[10px] bg-slate-900 outline-0 rounded"
                  onChange={InputValue}
                />
              </div>
             {/* <div>
                <p>Não tem conta? <span>Cadastre-se!</span></p>
              </div> */}
              <button
                type="submit"
                className="bg-green-800 p-[10px] text-gray-50 font-medium rounded"
              >Fazer Login</button>
    
            </form>  
      </div>
    </div>
    
  )


   
}

