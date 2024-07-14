import { FoldersContext } from '@/contexts/FoldersContext';
import { ProjectsContext } from '@/contexts/ProjectsContext';
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import { isBrowser } from '@/utils/ssr';
import { Popover, Transition } from '@headlessui/react';
import { Button, Input, MultiSelect, Select } from '@mantine/core';
import { IconEyeEdit, IconTrash } from '@tabler/icons-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Folder } from 'react-iconly';
import { useContextSelector } from 'use-context-selector';
import { ICustomer } from './UsersList';


interface ListProps {
  data: {
    id: string;
    name: string;
    description?: string;
    businessName?: string;
    userId?: string;
    customerFolderId?: string;
    selectedUserIds?: string[];
    selectedUserIdsToDelete?: string[];
    UsersProjects?: {
      user?: ICustomer
    }[];
  }[];
}

interface IProject {
  id: string;
  name: string;
  customerFolderId?: string;
  description?: string;
  businessName?: string;
  userId?: string;
  selectedUserIds?: string[];
  selectedUserIdsToDelete?: string[];
  UsersProjects?: {
    user?: ICustomer
  }[];
}
const ProjectsList = ({ data }: ListProps) => {
  const [editingItem, setEditingItem] = useState<IProject | null>(null);
  const [openPopoverIndex, setOpenPopoverIndex] = useState<number | null>(null);
  const router = useRouter();

  const [users, setUsers] = useState([]);

  const folders = useContextSelector(
    FoldersContext,
    (context) => {
      return context.folders
    },
  )

  const projects = useContextSelector(
    ProjectsContext,
    (context) => {
      return context.projects
    },
  )
// Estado para armazenar os nomes dos usuários
const [userNames, setUserNames] = useState([]);

  // Mapeia o array UsersProjects para extrair os nomes dos usuários
  useEffect(() => {
    const names = editingItem?.UsersProjects?.map(
      (userProject) => userProject?.user?.name
    );
    setUserNames(names);
  }, [editingItem?.UsersProjects]); // Atualiza quando os dados do projeto mudam
  


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
  
  const editProject = useContextSelector(ProjectsContext, (context) => {
    return context.updateProject;
  });
  // console.log('-------------------')
  // console.log('editingItem', editingItem)

  const handleUpdate = async (project: IProject) => {
    if (!project.id) {
      throw new Error('O projeto não foi encontrado');
    }
  
  //   console.log('-------------------')
  // console.log('handleUpdate', project)
    await editProject(project);
    handleClosePopover();
    window.location.reload(); // Recarrega a página (opcional)
    // router.back()
  };
  

  const deleteProject = useContextSelector(
    ProjectsContext,
    (context) => {
      return context.deleteProject;
    },
  );

  const handleDelete = (id: string) => {
    const project = data.find((item) => item.id === id);
    console.log('handleDelete', project)
    
    if (!project) {
      throw new Error('Pasta não foi encontrado');
    }
    // console.log('ID DO PROJETO PARA DELETAR', project.id)
    deleteProject(project.id);
    router.back()
    // window.location.reload(); // Recarrega a página
  };


// console.log('Folders List/', folders)
  const handleOpenPopover = (index: number) => {
    setEditingItem(data[index]);
    setOpenPopoverIndex(index);

    // Atualize o valor de `isAdmin` para um booleano
    setEditingItem((prev) => ({
      ...prev
    }));

    // console.log('---------projects list----------')
    // console.log('selectedUserIdsToDelete ', editingItem.selectedUserIdsToDelete)
  };

  const handleClosePopover = () => {
    setEditingItem(null);
    setOpenPopoverIndex(null);
  };

  return (
    <section className="text-gray-400 body-font min-h-[15rem] container py-4 bg-slate-900- ">
       <div className="grid grid-cols-1  lg:grid lg:grid-cols-2 gap-4 ">
       {data.map((project: IProject, index: number) => (

<div 
key={project.id} 
className="h-full w-full flex items-center border-gray-800 border p-4 rounded-lg bg-[#171622]">

  <Link href={`projects/${project.id}`} 
  className="p-2  w-full flex justify-items-center justify-center items-center">
    <div className="mb-2 w-12 h-12 flex justify-center p-3 justify-items-center bg-gray-800 rounded-full mr-4">
    <Folder set="bold" primaryColor="#0fb269b2"/>
    </div>
    <div className="flex-grow">
      <h2 className="text-white title-font font-medium">{project.name}</h2>
      <p className="text-gray-400">{project.businessName}</p>
    </div>
  </Link>

            <div className='flex gap-2 mt-3'>
              
            <button
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800"
              onClick={() => handleOpenPopover(index)}
            >
              <IconEyeEdit />
            </button>
            <button onClick={() => handleDelete(project.id)} className="p-2 rounded-xl bg-red-950 hover:bg-red-900">
              <IconTrash />
            </button>

            </div>

            {openPopoverIndex === index && (
              <Popover contentEditable className={'flex justify-center justify-items-center items-center'}>
                <Transition
                  show={openPopoverIndex === index}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Popover.Panel className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 w-[20rem] max-w-xs p-4 bg-[#201F2D] rounded shadow-lg">
                    <div className="space-y-4">
                    <Input.Wrapper 
                  id={editingItem.id} 
                  label="Nome do Projeto" 
                  maw={320} 
                  mx="auto"
                  
                  >
                      <Input
                      //  className='mt-2'
                       value={editingItem?.name}
                       onChange={(e) => setEditingItem((prev) => ({ ...prev, name: e.target.value }))}
                       placeholder="Nome"
                      /> 
                      </Input.Wrapper> 
                   
                                <Input.Wrapper 
                  id={editingItem.id} 
                  label="Descrição" 
                  maw={320} 
                  mx="auto"
                  
                  >
                      <Input
                      //  className='mt-2'
                       value={editingItem?.description}
                       onChange={(e) => setEditingItem((prev) => ({ ...prev, description: e.target.value }))}
                       placeholder="Descrição"
                      /> 
                      </Input.Wrapper> 
                 
                  <Input.Wrapper 
                  id={editingItem.id} 
                  label="Nome da Empresa" 
                  maw={320} 
                  mx="auto"
                  >
                      <Input
                      //  className='mt-2'
                        value={editingItem?.businessName}
                        onChange={(e) => setEditingItem((prev) => ({ ...prev, businessName: e.target.value }))}
                        placeholder="Empresa"
                      /> 
                      </Input.Wrapper> 

          {/* <select
            required
            value={editingItem?.userId || ''}
            onChange={(e) => setEditingItem((prev) => ({ ...prev, userId: e.target.value }))}
            className='w-full h-10 rounded-md  bg-[#171622] p-2'
          >
            <option value="" disabled>
              Alterar usuário relacionado
            </option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select> */}

<p>Usuários com acesso a este projeto</p>
 <div className='flex gap-4'>

        {userNames?.map((name, index) => (
          <div className='p-2 text-xs bg-[#11a54a2f] text-white rounded-lg' key={index}>{name}</div>
        ))}
      </div>
      
          <Select
      // required
      value={editingItem?.userId || ''}
      onChange={(value) => setEditingItem((prev) => ({ ...prev, userId: value }))}
      data={users.map((user) => ({ value: user.id, label: user.name }))}
      label="Usuário Principal"
      placeholder='Selecionar usuário'
      styles={(theme) => ({
        item: {
          // applies styles to selected item
          '&[data-selected]': {
            '&, &:hover': {
              backgroundColor:
                theme.colorScheme === 'dark' ? theme.colors.teal[9] : theme.colors.teal[1],
              color: theme.colorScheme === 'dark' ? theme.white : theme.colors.teal[9],
            },
          },

          // applies styles to hovered item (with mouse or keyboard)
          '&[data-hovered]': {},
        },
      })}
    />

<MultiSelect
  data={users.map((user) => ({ value: user.id, label: user.name }))}
  label="Conceder acesso à outros usuários"
  placeholder="Selecione aqui os novos usuários"
  value={
    editingItem && editingItem.selectedUserIds
      ? editingItem.selectedUserIds
      : userNames
  }
  onChange={(value) =>
    setEditingItem((prev) => ({ ...prev, selectedUserIds: value }))
  }
/>

<MultiSelect
  data={users.map((user) => ({ value: user.id, label: user.name }))}
  label="Excluir acesso de usuários"
  placeholder="Selecione aqui os usuários para excluir acesso deste projeto."
  value={
    editingItem && editingItem.selectedUserIdsToDelete
      ? editingItem.selectedUserIdsToDelete
      : userNames
  }
  onChange={(value) =>
    setEditingItem((prev) => ({ ...prev, selectedUserIdsToDelete: value }))
  }
/>


<Select
      // required
      value={editingItem?.customerFolderId || ''}
      onChange={(value) => setEditingItem((prev) => ({ ...prev, customerFolderId: value }))}
      data={folders.map((folder) => ({ value: folder.id, label: folder.name }))}
      // Adicione classes de estilização diretamente ao componente
      label="Selecionar Pasta"
      placeholder='Confirme a pasta do cliente'
      styles={(theme) => ({
        item: {
          // applies styles to selected item
          '&[data-selected]': {
            '&, &:hover': {
              backgroundColor:
                theme.colorScheme === 'dark' ? theme.colors.teal[9] : theme.colors.teal[1],
              color: theme.colorScheme === 'dark' ? theme.white : theme.colors.teal[9],
            },
          },

          // applies styles to hovered item (with mouse or keyboard)
          '&[data-hovered]': {},
        },
      })}
    />

          {/* <select
            required
            value={editingItem?.customerFolderId || ''}
            onChange={(e) => setEditingItem((prev) => ({ ...prev, customerFolderId: e.target.value }))}
          >
            <option value="" disabled>
              Alterar pasta
            </option>
            {folders.map((folder) => (
              <option key={folder.id} value={folder.id}>
                {folder.name}
              </option>
            ))}
          </select> */}
 

                      <div className="flex gap-2 justify-end">
                        <Button
                          className="px-4 py-2 text-white bg-green-950 hover:bg-green-900 rounded "
                          onClick={() => {
                            if (editingItem) {
                              handleUpdate(editingItem);
                              handleClosePopover();
                            }
                          }}
                        >
                          Salvar
                        </Button>
                        <Button
                          className="px-4 py-2 text-white bg-red-950 hover:bg-red-900 rounded"
                          onClick={handleClosePopover}
                        >
                          Cancelar
                        </Button>
                      </div>
                    </div>
                  </Popover.Panel>
                </Transition>
              </Popover>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProjectsList;
