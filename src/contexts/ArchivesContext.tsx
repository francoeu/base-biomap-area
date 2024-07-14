"use client";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import { IArchive } from "@/lib/types/interfaces";
import { ReactNode, useCallback, useEffect, useState } from 'react';
import { createContext } from 'use-context-selector';

interface CreateInput {
  name: string;
  description: string;
  projectId: string;
  archiveUrl: string;
}

interface UpdateInput {
  id: string;
  name?: string;
  description?: string;
  projectId?: string;
  archiveUrl?: string;
}

interface ContextType {
  archives: IArchive[]
  fetchArchives: (query?: string) => Promise<void>
  createArchive: (data: CreateInput) => Promise<void>
  updateArchive: (data: UpdateInput) => Promise<void>
  deleteArchive: (archiveId: string) => Promise<void>
}

interface TransactionsProviderProps {
  children: ReactNode
}

export const ArchivesContext = createContext({} as ContextType)

export default function ArchivesProvider({ children }: TransactionsProviderProps) {
    const axiosAuth = useAxiosAuth()
  const [archives, setArchives] = useState<IArchive[]>([])

  const fetchArchives = useCallback(async (query?: string) => {
    const response = await axiosAuth.get('/api/archives', {
      params: {
        _sort: 'createdAt',
        _order: 'desc',
        q: query,
      },
    })

    setArchives(response.data)
  }, [axiosAuth])

  const createArchive = useCallback(
    async (data: CreateInput) => {
      console.log('ArchivesContext/createArchive', data)
      const { projectId, name, description, archiveUrl  } = data

 

      const response = await axiosAuth.post('/api/archives', {
        projectId, name, description, archiveUrl 
      })

      setArchives((state) => [response.data, ...state])
    },
    [axiosAuth],
  )

  const updateArchive = useCallback(
    async (data: UpdateInput) => {
      const { id, projectId, name, description, archiveUrl  } = data;
  console.log('CONTEXTO - ID AQUI:', id)
      try {
        // Verificar se o projeto existe
        const getArchiveToUpdate = await axiosAuth.get(`/api/archives/${id}`);
        // console.log('CONTEXTO - ACHOU NO BANCO:', getUserToUpdate)

        if (!getArchiveToUpdate) {
          throw new Error('O arquivo não foi encontrado');
        }
  
        // Fazer a atualização no banco de dados
        const response = await axiosAuth.patch(`/api/archives/${id}`, {
          projectId, name, description, archiveUrl 
        });
  
        // Atualizar o estado dos clientes com os dados atualizados
        setArchives((state) =>
          state.map((archive) =>
          archive.id === id ? { ...archive, ...response.data } : archive
          )
        );
      } catch (error) {
        console.error('Erro ao atualizar o archive:', error);
        // Tratar o erro de acordo com sua necessidade
      }
    },
    [axiosAuth, setArchives]
  );
  

  const deleteArchive = useCallback(
    async (archiveId: string) => {
      // console.log('deleteCustomer---RECEBIDO MEU FI:', customerId)
      await axiosAuth.delete(`/api/archives/${archiveId}`);
  
      setArchives((state) => state.filter((archive) => archive.id !== archiveId));
    },
    [axiosAuth, setArchives]
  );

  

  useEffect(() => {
    fetchArchives()
  }, [fetchArchives])

  return (
    <ArchivesContext.Provider
      value={{
        archives,
        fetchArchives,
        createArchive,
        updateArchive,
        deleteArchive

      }}
    >
      {children}
    </ArchivesContext.Provider>
  )
}
