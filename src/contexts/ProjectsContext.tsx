"use client";
import { ICustomer } from "@/components/UsersList";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import { ReactNode, useCallback, useEffect, useState } from 'react';
import { createContext } from 'use-context-selector';

export interface IProject {
    id: string
    customerFolderId: string
    name: string
    description: string
    businessName: string
    userId?: string;
    selectedUserIds?: string[];
    selectedUserIdsToDelete?: string[];
    UsersProjects?: {
      user?: ICustomer
    }[];
  }

interface CreateProjectInput {
    name: string
    customerFolderId: string
    description: string
    businessName?: string,
    userId?: string;
    selectedUserIds?: string[];
    selectedUserIdsToDelete?: string[];
    // UsersProjects?: ICustomer[];
    UsersProjects?: {
      user?: ICustomer
    }[];
}

interface UpdateProjectInput {
  id: string;
  name?: string
  customerFolderId?: string
  description?: string
  businessName?: string
  userId?: string;
  selectedUserIds?: string[];
  selectedUserIdsToDelete?: string[];
  // UsersProjects?: {
  //   user?: ICustomer
  // }[];
}

interface ProjectsContextType {
  projects: IProject[]
  fetchProjects: (query?: string) => Promise<void>
  createProject: (data: CreateProjectInput) => Promise<void>
  updateProject: (data: UpdateProjectInput) => Promise<void>
  deleteProject: (projectId: string) => Promise<void>
}

interface TransactionsProviderProps {
  children: ReactNode
}

export const ProjectsContext = createContext({} as ProjectsContextType)

export default function ProjectsProvider({ children }: TransactionsProviderProps) {
    const axiosAuth = useAxiosAuth()
  const [projects, setProjects] = useState<IProject[]>([])
  console.log('Projects', projects)
  const fetchProjects = useCallback(async (query?: string) => {
    const response = await axiosAuth.get('/api/projects', {
      params: {
        _sort: 'createdAt',
        _order: 'desc',
        q: query,
      },
    })

    setProjects(response.data)
  }, [axiosAuth])

  const createProject = useCallback(
    async (data: CreateProjectInput) => {
      const { name, businessName, description, customerFolderId, userId  } = data

      const response = await axiosAuth.post('/api/projects', {
        customerFolderId,
        name,
        businessName,
        description,
        userId
      })



      setProjects((state) => [response.data, ...state])
    },
    [axiosAuth],
  )

  const updateProject = useCallback(
    async (data: UpdateProjectInput) => {
      const { id, customerFolderId,  name, description, businessName, userId, selectedUserIds, selectedUserIdsToDelete } = data;
  // console.log('CONTEXTO - ID do PROJETO AQUI:', id)
  // console.log('CONTEXTO - ID do USUÁRIO AQUI:', userId)
  // console.log('CONTEXTO - ID da PASTA AQUI:', customerFolderId)
      try {
        // Verificar se o projeto existe
        const getProjectToUpdate = await axiosAuth.get(`/api/projects/${id}`);
        // console.log('CONTEXTO - ACHOU NO BANCO:', getUserToUpdate)

        if (!getProjectToUpdate) {
          throw new Error('O projeto não foi encontrado');
        }

        const getFolder = await axiosAuth.get(`api/folders/${customerFolderId}`)
        // console.log('CONTEXTO - getFolderBusinessName ACHOU NO BANCO:', getFolderBusinessName)
        console.log('CONTEXTO - selectedUserIds :', selectedUserIds)
        console.log('CONTEXTO - selectedUserIds :', selectedUserIdsToDelete)
  
        // Fazer a atualização no banco de dados
        const response = await axiosAuth.patch(`/api/projects/${id}`, {
          customerFolderId,
          name,
          businessName: getFolder.data.businessName,
          description,
          userId,
          selectedUserIds,
          selectedUserIdsToDelete
        });
  
        // Atualizar o estado dos clientes com os dados atualizados
        setProjects((state) =>
          state.map((project) =>
          project.id === id ? { ...project, ...response.data } : project
          )
        );
      } catch (error) {
        console.error('Erro ao atualizar o projeto:', error);
        // Tratar o erro de acordo com sua necessidade
      }
    },
    [axiosAuth, setProjects]
  );
  

  const deleteProject = useCallback(
    async (projectId: string) => {
      // console.log('CONTEXT - deleteProject---RECEBIDO MEU FI:', projectId)
      
      await axiosAuth.delete(`/api/projects/${projectId}`);
  
      setProjects((state) => state.filter((project) => project.id !== projectId));
    },
    [axiosAuth, setProjects]
  );
  

  useEffect(() => {
    fetchProjects()
  }, [fetchProjects])

  return (
    <ProjectsContext.Provider
      value={{
        projects,
        deleteProject,
        updateProject,
        fetchProjects,
        createProject,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  )
}
