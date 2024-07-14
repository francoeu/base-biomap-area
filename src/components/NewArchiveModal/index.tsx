"use client";
import { ArchivesContext } from '@/contexts/ArchivesContext';
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import { uploadFile } from '@/lib/r2';
import { zodResolver } from '@hookform/resolvers/zod';
import * as Dialog from '@radix-ui/react-dialog';
import { useParams, useRouter } from 'next/navigation';
import { X } from 'phosphor-react';
import { useState } from 'react';
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
    archiveUrl: z.string(),
})

type NewFormInputs = z.infer<typeof newFormSchema>

export function NewArchiveModal() {

  const [file, setFile] = useState<File | null>(null)

  const projectId = useParams().id;
  // console.log('Modal params', projectId)
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  const router = useRouter();
  const axiosAuth = useAxiosAuth();
  // useEffect(() => {
  //   if (!isBrowser) {
  //     return () => undefined;
  //   }
  //   const fetchUsers = async () => {
  //     try {
  //       const res = await axiosAuth.get(`/api/users/`);
  //       setUsers(res.data);
  //     } catch (error) {
  //       console.error('Erro ao buscar os projectos:', error);
  //     }
  //   };
  //   fetchUsers();
  // }, [axiosAuth]);

  // const handleFileUpload = (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault()
  //   if (!file) return
  //   uploadFile({ name: file.name }).then(res => {
  //     const url = res.url
  //     return fetch(url, {
  //       method: "PUT",
  //       body: file
  //     })
  //   }).then((res) => {
  //     console.log(res.status)
  //     console.log(res.statusText)
  //   })
  // }

  const createArchive = useContextSelector(
    ArchivesContext,
    (context) => {
      return context.createArchive
    },
  )

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<NewFormInputs>({
    resolver: zodResolver(newFormSchema),
  })
  // console.log('Peguei o ID do archive:', selectedUserId)

  async function handleCreateNewArchive(data: NewFormInputs) {
    const { name, description, archiveUrl   } = data
// console.log('Peguei o ID do archive:', selectedUserId)
// const bucket = 'D7kVgXyGZSZ_h7oUi8KsnceeKIdNnZ6ndlALk3dw'
// let urlArquivo = `https://pub-580c2e5171a4455eae0c2226fc0f4fb7.r2.dev/${bucket}/${file.name}`

      // if (!file) return
      // await  uploadFile({ name: file.name }).then(res => {
      //   const url = res.url
      //   return fetch(url, {
      //     method: "PUT",
      //     body: file
      //   })
      // }).then((res) => {
      //   console.log(res.status)
      //   console.log(res.statusText)
      // })

    
     await createArchive({
      projectId: projectId as string, 
      name, 
      description,
      archiveUrl,
    })
    window.location.reload(); // Recarrega a página
    reset()
    router.back()
   
  }

  return (
    <Dialog.Portal>
      <Overlay />

      <Content className='py-[2.5rem] px-[2rem] w-96 md:w-6/12 md:max-w-lg'>
        <Dialog.Title>Novo Arquivo</Dialog.Title>

        <CloseButton>
          <X size={24} />
        </CloseButton>

        <form onSubmit={handleSubmit(handleCreateNewArchive)}>

            {/* <FileUpload /> */}

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
{/* <label htmlFor="file-upload">Upload</label>
<input
          multiple={false}
          id="file-upload" type="file" onChange={(e) => {
            if (!e.target.files || e.target.files.length === 0) return
            setFile(e.target.files[0])
          }} />
          <span className='text-sm text-gray-300'>O Link do arquivo será gerado automaticamente após upload.</span> */}

        <input
            type="text"
            placeholder="URL do Arquivo"
            required
            className='h-14 text-sm '
            {...register('archiveUrl')}
          />


          <button type="submit" disabled={isSubmitting}>
            Cadastrar
          </button>
        </form>
      </Content>
    </Dialog.Portal>
  )
}
