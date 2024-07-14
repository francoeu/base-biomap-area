"use client";
import { FoldersContext } from '@/contexts/FoldersContext';
import { IProject, ProjectsContext } from '@/contexts/ProjectsContext';
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import { isBrowser } from '@/utils/ssr';
import { zodResolver } from '@hookform/resolvers/zod';
import { Select } from '@mantine/core';
import * as Dialog from '@radix-ui/react-dialog';
import { useParams, useRouter } from 'next/navigation';
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

const newProjectFormSchema = z.object({
    name: z.string(),
    description: z.string(),
})

type NewProjectFormInputs = z.infer<typeof newProjectFormSchema>

interface NewProjectModalProps {
  onClose?: () => void;
  project?: IProject; // Aqui incluímos a propriedade project do tipo IProject
}


export function  NewProjectModal({ onClose, project }: NewProjectModalProps) {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [selectedFolder, setSelectedFolder] = useState('');
  const folderId = useParams().id;
  const axiosAuth = useAxiosAuth();
  const router = useRouter();
  
  const folders = useContextSelector(
    FoldersContext,
    (context) => {
      return context.folders
    },
  )
  
  useEffect(() => {
    if (!isBrowser) {
      return () => undefined;
    }
    const fetchUsers = async () => {
      try {
        const res = await axiosAuth.get(`/api/users/`);
        setUsers(res.data);
      } catch (error) {
        console.error('Erro ao buscar users:', error);
      }
    };
    fetchUsers();
  }, [axiosAuth]);

  const createProject = useContextSelector(
    ProjectsContext,
    (context) => {
      return context.createProject
    },
  )

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<NewProjectFormInputs>({
    resolver: zodResolver(newProjectFormSchema),
  })
  // console.log('Peguei o ID do User:', selectedUserId)
  async function handleCreateNewProject(data: NewProjectFormInputs) {
    const { name, description } = data
// console.log('Peguei o ID da pasta:', selectedFolder)
     await createProject({
      customerFolderId: selectedFolder,
      name,
      description,
      userId: selectedUserId,
    })
    router.back()
  //  window.location.reload(); // Recarrega a página
   reset()
  }

  return (
    <Dialog.Portal>
      <Overlay />

      <Content className='py-[2.5rem] px-[2rem] w-80 md:w-6/12 md:max-w-lg'>
        <Dialog.Title>Novo Projeto</Dialog.Title>

        <CloseButton>
          <X size={24} />
        </CloseButton>

        <form onSubmit={handleSubmit(handleCreateNewProject)}>
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
    

    <Select
      required
      value={selectedFolder}
      onChange={(value) => setSelectedFolder(value)}
      data={folders.map((folder) => ({ value: folder.id, label: folder.name }))}
      // Adicione classes de estilização diretamente ao componente
      className="h-14 pt-2 bg-[#121214] rounded-md"
      // label="Selecionar Cliente"
      placeholder='Selecionar pasta do cliente'
    />

          <Select
            required
            value={selectedUserId}
            onChange={(value) => setSelectedUserId(value)}
            data={users.map((user) => ({ value: user.id, label: user.name }))}
            // label="Selecione um usuário"
            placeholder='Relacionar usuário'
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
