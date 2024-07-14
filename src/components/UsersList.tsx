import { CustomersContext } from '@/contexts/CustomersContext';
import { IProject } from '@/contexts/ProjectsContext';
import { Popover, Transition } from '@headlessui/react';
import { Input } from '@mantine/core';
import { IconEyeEdit, IconTrash } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { User } from 'react-iconly';
import { useContextSelector } from 'use-context-selector';

interface ListProps {
  data: {
    id: string;
    name: string;
    email: string;
    password: string;
    businessName?: string;
    isAdmin?: boolean;
    projects?: IProject[]
  }[];
}

export interface ICustomer {
  id?: string;
  name?: string;
  email?: string;
  businessName?: string;
  password?: string;
  isAdmin?: boolean;
  projects?: IProject[]
}

const UsersList = ({ data }: ListProps) => {
  const [editingItem, setEditingItem] = useState<ICustomer | null>(null);
  const [openPopoverIndex, setOpenPopoverIndex] = useState<number | null>(null);
  const router = useRouter();
  
  const editCustomer = useContextSelector(CustomersContext, (context) => {
    return context.updateCustomer;
  });

  const handleUpdate = async (customer: ICustomer) => {
    if (!customer.id) {
      throw new Error('O cliente não foi encontrado');
    }
  
    const updatedCustomer: ICustomer = {
      ...customer,
    };
  
    await editCustomer(updatedCustomer);
    handleClosePopover();
    window.location.reload(); // Recarrega a página
  };
  

  const deleteCustomer = useContextSelector(
    CustomersContext,
    (context) => {
      return context.deleteCustomer;
    },
  );

  const handleDelete = (id: string) => {
    const customer = data.find((item) => item.id === id);
    if (!customer) {
      throw new Error('O cliente não foi encontrado');
    }

    deleteCustomer(customer.id);
    window.location.reload(); // Recarrega a página
  };

  const handleOpenPopover = (index: number) => {
    setEditingItem(data[index]);
    setOpenPopoverIndex(index);

    // Atualize o valor de `isAdmin` para um booleano
    setEditingItem((prev) => ({
      ...prev,
      isAdmin: prev.isAdmin ?? false,
    }));
  };

  const handleClosePopover = () => {
    setEditingItem(null);
    setOpenPopoverIndex(null);
  };

  return (
    <section className="text-gray-400 body-font min-h-[15rem] container py-4 bg-slate-900- w-full ">
      <div className="grid grid-cols-1  lg:grid lg:grid-cols-2 gap-4 ">
        {data.map((item: ICustomer, index: number) => (
          <div 
          key={item.id} 
          className="flex-row h-full w-full items-center border-gray-800 border p-4 rounded-lg bg-[#171622]">
          <div className="mb-2 w-12 h-12 flex justify-center p-3 justify-items-center bg-gray-800 rounded-full mr-4">
              <User set="bold" primaryColor="#0fb269b2"/> 
              {/* <Avatar
              size={64}
              radius="xl"
              src={
                // session?.user.image ??
                '/biomap-perfil.jpg'
              } /> */}
              
            </div>
            <div className="flex-grow">
              <h2 className="text-white title-font font-medium">{item.name}</h2>
              <p className="text-gray-400">{item.email}</p>
            </div>

            <div className='flex gap-2 mt-3'>
            <button
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800"
              onClick={() => handleOpenPopover(index)}
            >
              <IconEyeEdit />
            </button>
            <button onClick={() => handleDelete(item.id)} className="p-2 rounded-xl bg-red-950 hover:bg-red-900">
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
                      <p>Nome</p>
                      <Input
                        value={editingItem?.name}
                        onChange={(e) => setEditingItem((prev) => ({ ...prev, name: e.target.value }))}
                        placeholder="Nome"
                      />
                         <p>Nome da Empresa</p>
                      <Input
                        value={editingItem?.businessName}
                        onChange={(e) => setEditingItem((prev) => ({ ...prev, businessName: e.target.value }))}
                        placeholder="Nome da empresa do cliente"
                      />
                    <p>Email</p>
                      <Input
                        value={editingItem?.email}
                        onChange={(e) => setEditingItem((prev) => ({ ...prev, email: e.target.value }))}
                        placeholder="Email"
                      />
                      <p>Senha</p>
                      <Input
                      
                      type='password'
                        value={editingItem?.password}
                        onChange={(e) => setEditingItem((prev) => ({ ...prev, password: e.target.value }))}
                        placeholder="Digite uma nova senha"
                      />
                      <span className='text-xs'>*Para alterar a senha, basta digitar acima. Se não quiser alterar, basta deixar como está.</span>
                     <div>
  <p className={'mb-4'}>Definir Como</p>
  <div className={'flex gap-4'}>
 
   
    <label className='p-2 bg-stone-800- rounded-md'>
      <input
        type="radio"
        name="isAdmin"
        value="true"
        checked={editingItem?.isAdmin === true}
        onChange={() => setEditingItem((prev) => ({ ...prev, isAdmin: true }))}
        className='cursor-pointer'
      />
      <span className='mx-2 text-sm font-semibold' >ADMIN</span>
    </label>
 
 <label className='p-2 bg-gray-700- rounded-md'>
      <input
        type="radio"
        name="isAdmin"
        value="false"
        checked={editingItem?.isAdmin === false}
        onChange={() => setEditingItem((prev) => ({ ...prev, isAdmin: false }))}
        className='cursor-pointer'
      />
      <span className='mx-2 text-sm font-semibold' >CLIENTE</span>
    </label>
  </div>
</div>



                      <div className="flex gap-2 justify-end">
                        <button
                          className="px-4 py-2 text-white bg-green-950 rounded"
                          onClick={() => {
                            if (editingItem) {
                              handleUpdate(editingItem);
                              handleClosePopover();
                            }
                          }}
                        >
                          Salvar
                        </button>
                        <button
                          className="px-4 py-2 text-white bg-red-950 rounded "
                          onClick={handleClosePopover}
                        >
                          Cancelar
                        </button>
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

export default UsersList;
