"use client";
import { FoldersContext } from '@/contexts/FoldersContext';
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import { isBrowser } from '@/utils/ssr';
import { zodResolver } from '@hookform/resolvers/zod';
import { Select } from '@mantine/core';
import * as Dialog from '@radix-ui/react-dialog';
import { useRouter } from 'next/navigation';
import { X } from 'phosphor-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useContextSelector } from 'use-context-selector';
import * as z from 'zod';
import {
  CloseButton,
  Content,
  Overlay
} from './styles';

const newFormSchema = z.object({
    name: z.string(),
    // customerId: z.string().nonempty()
    description: z.string(),
    // businessName: z.string(),
})

type NewFormInputs = z.infer<typeof newFormSchema>

export function NewFolderModal() {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  const router = useRouter();
  const axiosAuth = useAxiosAuth();
  
  useEffect(() => {
    if (!isBrowser) {
      return () => undefined;
    }
    const fetchUsers = async () => {
      try {
        const res = await axiosAuth.get(`/api/users/`);
        setUsers(res.data);
      } catch (error) {
        console.error('Erro ao buscar os projectos:', error);
      }
    };
    fetchUsers();
  }, [axiosAuth]);


  const createFolder = useContextSelector(
    FoldersContext,
    (context) => {
      return context.createFolder
    },
  )

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<NewFormInputs>({
    resolver: zodResolver(newFormSchema),
    // defaultValues: async () => {
    //   const response =  await axiosAuth.get(`/api/folders/${selectedUserId}`)
    //   const data = await response.data()
    //   return {
    //     name: data.name,
    //     description: data.description
    //   }
    // }
  })
  // console.log('Peguei o ID do User:', selectedUserId)
  async function handleCreateNewFolder(data: NewFormInputs) {
    const { name, description  } = data
// console.log('Peguei o ID do User:', selectedUserId)
     await createFolder({
        customerId: selectedUserId, // Usando o valor selecionado do select
        name, 
        description,
    })
    reset()
     window.location.reload(); // Recarrega a página
  //  router.refresh()
  }

  return (
    <Dialog.Portal>
      <Overlay />

      <Content className='py-[2.5rem] px-[2rem] w-80 md:w-6/12 md:max-w-lg'>
        <Dialog.Title>Nova Pasta</Dialog.Title>

        <CloseButton>
          <X size={24} />
        </CloseButton>

        <form onSubmit={handleSubmit(handleCreateNewFolder)}>
          <input
            type="text"
            placeholder="Nome"
            required
            className="h-14 text-sm"
            {...register('name')}
          />
          <input
            type="text"
            placeholder="Descrição"
            required
            className='h-14 text-sm'
            {...register('description')}
          />
        {/* <input
            type="text"
            placeholder="Cliente"
            required
            {...register('businessName')}
          /> */}
        {/* <input
            type="text"
            placeholder="ID do Cliente"
            required
            {...register('customerId')}
          /> */}
    

    {/* <Select
      required
      value={selectedUser}
      onChange={(value) => setSelectedUser(value)}
      data={users.map((user) => ({ value: user.name, label: user.name }))}
      // Adicione classes de estilização diretamente ao componente
      className="h-14 pt-2 bg-[#121214] rounded-md"
      // label="Selecionar Cliente"
      placeholder='Selecione um cliente'
    /> */}

          <Select
            required
            value={selectedUserId}
            onChange={(value) => setSelectedUserId(value)}
            data={users.map((user) => ({ value: user.id, label: user.name }))}
            // label="Selecione um usuário"
            placeholder='Selecione um cliente'
            className="h-14 pt-2 bg-[#121214] rounded-md"
          />

          <button type="submit" disabled={isSubmitting}>
            Cadastrar
          </button>
        </form>
      </Content>
    </Dialog.Portal>
  )
}
