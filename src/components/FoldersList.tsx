import { FoldersContext } from "@/contexts/FoldersContext";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import { isBrowser } from '@/utils/ssr';
import { Popover, Transition } from '@headlessui/react';
import { Button, Input } from '@mantine/core';
import { IconEyeEdit, IconTrash } from "@tabler/icons-react";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Folder } from 'react-iconly';
import { useContextSelector } from 'use-context-selector';

interface ListProps {
  data: {
    id: string;
    name: string;
    description?: string;
    businessName?: string;
    customerId?: string;
  }[];
}

interface IFolder {
  id: string;
  name: string;
  description?: string;
  businessName?: string;
  customerId?: string;
}

const FoldersList = ({ data }: ListProps) => {
  const [editingItem, setEditingItem] = useState<IFolder | null>(null);
  const [openPopoverIndex, setOpenPopoverIndex] = useState<number | null>(null);
  const router = useRouter();

  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState('');

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
  
  const editFolder = useContextSelector(FoldersContext, (context) => {
    return context.updateFolder;
  });

  const handleUpdate = async (folder: IFolder) => {
    if (!folder.id) {
      throw new Error('O projeto não foi encontrado');
    }
  
    const updatedFolder: IFolder = {
      ...folder,
    };
  
    await editFolder(updatedFolder);
    handleClosePopover();
    // window.location.reload(); // Recarrega a página
  };
  

  const deleteFolder = useContextSelector(
    FoldersContext,
    (context) => {
      return context.deleteFolder;
    },
  );

  const handleDelete = (id: string) => {
    const folder = data.find((item) => item.id === id);
    if (!folder) {
      throw new Error('Pasta não foi encontrado');
    }

    deleteFolder(folder.id);
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
  };

  const handleClosePopover = () => {
    setEditingItem(null);
    setOpenPopoverIndex(null);
  };

  return (
    <section className="text-gray-400 body-font min-h-[15rem] container py-4 bg-slate-900- ">
       <div className="grid grid-cols-1  lg:grid lg:grid-cols-2 gap-4 ">
       {data.map((folder: IFolder, index: number) => (

<div 
key={folder.id} 
className="h-full w-full flex items-center border-gray-800 border p-4 rounded-lg bg-[#171622]">

  <Link href={`folders/${folder.id}`} 
  className="p-2  w-full flex justify-items-center justify-center items-center">
    <div className="mb-2 w-12 h-12 flex justify-center p-3 justify-items-center bg-gray-800 rounded-full mr-4">
    <Folder set="bold" primaryColor="#0fb269b2"/>
    </div>
    <div className="flex-grow">
      <h2 className="text-white title-font font-medium">{folder.name}</h2>
      <p className="text-gray-400">{folder.businessName}</p>
    </div>
  </Link>

            <div className='flex gap-2 mt-3'>
              
            <button
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800"
              onClick={() => handleOpenPopover(index)}
            >
              <IconEyeEdit />
            </button>
            <button onClick={() => handleDelete(folder.id)} className="p-2 rounded-xl bg-red-950 hover:bg-red-900">
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
                      {/* <div>{editingItem?.name ? <p>Nome</p> : ''}</div> */}
                      <Input
                        value={editingItem?.name}
                        onChange={(e) => setEditingItem((prev) => ({ ...prev, name: e.target.value }))}
                        placeholder="Nome"
                      />
                      {/* <div>{editingItem?.description ? <p>Descrição</p> : ''}</div> */}
                      <Input
                        value={editingItem?.description}
                        onChange={(e) => setEditingItem((prev) => ({ ...prev, description: e.target.value }))}
                        placeholder="Email"
                      />  

                      <Input
                        value={editingItem?.businessName}
                        onChange={(e) => setEditingItem((prev) => ({ ...prev, businessName: e.target.value }))}
                        placeholder="Empresa"
                      />  

        {/* <select
            required
            // value={selectedUserId}
            value={editingItem?.businessName}
            onChange={(e) => setSelectedUserId(e.target.value)}
          >
            <option value="" disabled>
              Selecione um usuário
            </option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
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

export default FoldersList;
