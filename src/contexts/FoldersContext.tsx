"use client";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import { ReactNode, useCallback, useEffect, useState } from 'react';
import { createContext } from 'use-context-selector';

export interface IFolder {
    id: string
    customerId: string
    name: string
    description: string
    businessName: string
  }

interface CreateInput {
    name: string
    customerId: string
    description: string
    businessName?: string
}

interface UpdateInput {
  id: string;
  name?: string
  customerId?: string
  description?: string
  businessName?: string
}

interface FoldersContextType {
  folders: IFolder[]
  fetchFolders: (query?: string) => Promise<void>
  createFolder: (data: CreateInput) => Promise<void>
  updateFolder: (data: UpdateInput) => Promise<void>
  deleteFolder: (customerId: string) => Promise<void>
}

interface TransactionsProviderProps {
  children: ReactNode
}

export const FoldersContext = createContext({} as FoldersContextType)

export default function FoldersProvider({ children }: TransactionsProviderProps) {
    const axiosAuth = useAxiosAuth()
  const [folders, setFolders] = useState<IFolder[]>([])

  const fetchFolders = useCallback(async (query?: string) => {
    const response = await axiosAuth.get('/api/folders', {
      params: {
        _sort: 'createdAt',
        _order: 'desc',
        q: query,
      },
    })

    setFolders(response.data)
  }, [axiosAuth])

  const createFolder = useCallback(
    async (data: CreateInput) => {
      const { customerId, name, businessName, description  } = data

      const response = await axiosAuth.post('/api/folders', {
        customerId,
        name,
        businessName,
        description,
      })

      setFolders((state) => [response.data, ...state])
    },
    [axiosAuth],
  )

  const updateFolder = useCallback(
    async (data: UpdateInput) => {
      const { id, customerId,  name, description, businessName  } = data;
  console.log('CONTEXTO - ID AQUI:', id)
      try {
        // Verificar se o projeto existe
        const getFolderToUpdate = await axiosAuth.get(`/api/folders/${id}`);
        // console.log('CONTEXTO - ACHOU NO BANCO:', getUserToUpdate)

        if (!getFolderToUpdate) {
          throw new Error('O projeto não foi encontrado');
        }
  
        // Fazer a atualização no banco de dados
        const response = await axiosAuth.patch(`/api/folders/${id}`, {
          customerId,  
          name, 
          description, 
          businessName 
        });
  
        // Atualizar o estado dos clientes com os dados atualizados
        setFolders((state) =>
          state.map((folder) =>
          folder.id === id ? { ...folder, ...response.data } : folder
          )
        );
      } catch (error) {
        console.error('Erro ao atualizar o projeto:', error);
        // Tratar o erro de acordo com sua necessidade
      }
    },
    [axiosAuth, setFolders]
  );
  

  const deleteFolder = useCallback(
    async (customerId: string) => {
      // console.log('deleteCustomer---RECEBIDO MEU FI:', customerId)
      await axiosAuth.delete(`/api/folders/${customerId}`);
  
      setFolders((state) => state.filter((customer) => customer.id !== customerId));
    },
    [axiosAuth, setFolders]
  );

  useEffect(() => {
    fetchFolders()
  }, [fetchFolders])

  return (
    <FoldersContext.Provider
      value={{
        folders,
        createFolder,
        fetchFolders,
        updateFolder,
        deleteFolder
      }}
    >
      {children}
    </FoldersContext.Provider>
  )
}
