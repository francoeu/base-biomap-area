"use client"
import ContentArea from '@/components/template/ContentArea';
import HeaderLayout from '@/components/template/Header';
import Pagina from '@/components/template/Pagina';
import { useEffect, useState } from 'react';

import { useSession } from 'next-auth/react';
import Image from 'next/image';
import * as z from 'zod';
import profileImage from '../../../../public/biomap-perfil.jpg';

import { CustomersContext } from '@/contexts/CustomersContext';
import useAxiosAuth from '@/lib/hooks/useAxiosAuth';
import { zodResolver } from '@hookform/resolvers/zod';
import { User } from '@prisma/client';
import { useParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useContextSelector } from 'use-context-selector';
const NewFormInputsSchema = z.object({
  name: z.string(),
  password: z.string(),
})

type NewFormInputs = z.infer<typeof NewFormInputsSchema>

export default function ProfilePage() {
  const id = useParams().id;
  const { data: session } = useSession();
  const [userData, setUserData] = useState<User>();

  const axiosAuth = useAxiosAuth()

  const updateCustomer = useContextSelector(
    CustomersContext,
    (context) => {
      return context.updateCustomer
    },
  )

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<NewFormInputs>({
    resolver: zodResolver(NewFormInputsSchema),
    defaultValues: userData
  })
  const router = useRouter()
  
  async function handleUpdate(data: NewFormInputs) {
    const {  name, password } = data

    await updateCustomer({
        id: id as string,
        name, 
        password
    })
    return router.forward()
    // reset()
  }

  useEffect(() => {
    const getUserData = async () => {
      try {
        const res = await axiosAuth.get(`/api/users/${id}`);
        // console.log("getUserData ", res)
        setUserData(res.data);
      } catch (error) {
        console.error('Erro ao buscar os clientes:', error);
      }
    };
   
    getUserData();
  }, [axiosAuth, session?.user?.id, id]);
  
    const InputValue = (e) => setUserData({
      ...userData, [e.target.name]: e.target.value
    });
  
  
  return (
    <Pagina>
      <HeaderLayout />
      <ContentArea className='justify-center items-center mt-10 '>
     


      <div className="lg:min-w-5xl p-3 border border-gray-600 border-dashed rounded-md">
      
      <div className="w-full bg-[#101a25] rounded-2xl py-6 mt-6 shadow-lg justify-center mb-5 ">

      <div className="flex justify-center">
        <Image src={profileImage} className="rounded-full w-28" alt="profile picture" />
      </div>
      <div className="mt-8 flex justify-center flex-col text-center ">
        <h2 className="text-white font-bold text-2xl tracking-wide">{userData?.name}</h2>
        <p className="text-emerald-400 font-semibold mt-2. text-xs sm:text-sm">
           {userData?.email}
      </p>
      </div>
      
    </div>

<div className='flex m-auto sm:w-full lg:w-128 justify-center justify-items-center'>

<form onSubmit={handleSubmit(handleUpdate)} className='flex flex-col gap-4'>
          <input
            type="text"
            value={userData?.name}
            onChange={InputValue}
            className="p-[10px] bg-slate-900 outline-0 rounded"
            {...register('name')}
            disabled
          />
          <input
            type="text"
            placeholder="Email"
            value={userData?.email}
            className="p-[10px] bg-slate-900 outline-0 rounded text-gray-600"
            disabled
          />

          <p className='text-gray-500'>*Por enquanto estas informações estão disponíveis apenas para visualização.</p>
        {/* <input
            type="password"
            placeholder=""
            onChange={InputValue}
            className="p-[10px] bg-slate-900 outline-0 rounded"
            {...register('password')}
          /> */}
{/* 
          <button type="submit" disabled={isSubmitting} className="bg-green-800 p-[10px] text-gray-50 font-medium rounded">
            Atualizar Perfil
          </button> */}
        </form>

{/* <form
              action=""
              method="post"
              autoComplete='off'
              className="flex flex-col gap-2 w-[100%] max-w-[100%] mt-5 "
              onSubmit={handleSubmit}
            >

<div className="flex flex-col gap-2">
                <label htmlFor="nome">Nome</label>
                <input
                  type="text"
                  name='nome'
                  value={userData?.name}
                  className="p-[10px] bg-slate-900 outline-0 rounded"
                  onChange={InputValue}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="email">E-mail</label>
                <input
                  disabled
                  type="text"
                  name='email'
                  value={userData?.email}
                  className="p-[10px] bg-slate-900 outline-0 rounded text-gray-600"
                  onChange={InputValue}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="password">Atualizar Senha</label>
                <input
                  type="password"
                  name='password'
                  placeholder=''
                  // value={userData?.password}
                  className="p-[10px] bg-slate-900 outline-0 rounded"
                  onChange={InputValue}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="tel">Celular/Whatsapp</label>
                <input
                  type="tel"
                  name='tel'
                  className="p-[10px] bg-slate-900 outline-0 rounded"
                  onChange={InputValue}
                />
              </div>
      
              <button
                type="submit"
                className="bg-green-800 p-[10px] text-gray-50 font-medium rounded"
              >Atualizar Perfil</button>
    
            </form> */}
</div>
  
        </div>
      </ContentArea>
    </Pagina>
  )
}
