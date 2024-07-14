"use client";
import useAxiosAuth from '@/lib/hooks/useAxiosAuth';
import { ReactNode, useCallback, useEffect, useState } from 'react';
import { createContext } from 'use-context-selector';

interface ICustomer {
  id?: string;
  name?: string;
  email?: string;
  password?: string;
  businessName: string;
  isAdmin?: string;
}

interface CreateCustomerInput {
  name: string;
  email: string;
  password: string;
  businessName: string;
  isAdmin?: string;
}

export interface UpdateCustomerInput {
  id?: string;
  name?: string;
  email?: string;
  password?: string;
  businessName?: string;
  isAdmin?: boolean;
}


interface CustomersContextType {
  customers: ICustomer[]
  fetchCustomers: (query?: string) => Promise<void>
  createCustomer: (data: CreateCustomerInput) => Promise<void>
  updateCustomer: (data: UpdateCustomerInput) => Promise<void>
  deleteCustomer: (customerId: string) => Promise<void>
  editCustomer: (data: UpdateCustomerInput) => Promise<void>
  handleEdit : (data: UpdateCustomerInput) => Promise<void>
}

interface TransactionsProviderProps {
  children: ReactNode
}

export const CustomersContext = createContext({} as CustomersContextType)

export  function CustomersProvider({ children }: TransactionsProviderProps) {
  const axiosAuth = useAxiosAuth()
  const [customers, setCustomers] = useState<ICustomer[]>([])


  const fetchCustomers= useCallback(async (query?: string) => {
    const response = await axiosAuth.get('/api/users', {
      params: {
        _sort: 'createdAt',
        _order: 'desc',
        q: query,
      },
    })
// console.log(response.data)
setCustomers(response.data)
  }, [axiosAuth])

  const createCustomer = useCallback(
    async (data: CreateCustomerInput) => {
      const {   name, email, password, isAdmin, businessName  } = data
      const isAdminBoolean = JSON.parse(isAdmin.toLowerCase());
         
  console.log('adminToBoolean', isAdminBoolean)

      const response = await axiosAuth.post('/api/users', {
        name, 
        email,
        password, 
        businessName,
        isAdmin: isAdminBoolean
      })

      setCustomers((state) => [response.data, ...state])
    },
    [axiosAuth]
  )


  const updateCustomer = useCallback(
    async (data: UpdateCustomerInput) => {
      const { id, name, email, password, businessName, isAdmin } = data;
  console.log('CONTEXTO - ID AQUI:', id)
      try {
        // Verificar se o cliente existe
        const getUserToUpdate = await axiosAuth.get(`/api/users/${id}`);
        // console.log('CONTEXTO - ACHOU NO BANCO:', getUserToUpdate)

        if (!getUserToUpdate) {
          throw new Error('O cliente não foi encontrado');
        }
        // const isAdminBoolean = JSON.parse(isAdmin.toLowerCase());
        // Fazer a atualização no banco de dados

        const response = await axiosAuth.patch(`/api/users/${id}`, {
          name,
          email,
          password,
          businessName,
          isAdmin,
        });
  
        // Atualizar o estado dos clientes com os dados atualizados
        setCustomers((state) =>
          state.map((customer) =>
            customer.id === id ? { ...customer, ...response.data } : customer
          )
        );
      } catch (error) {
        console.error('Erro ao atualizar o cliente:', error);
        // Tratar o erro de acordo com sua necessidade
      }
    },
    [axiosAuth, setCustomers]
  );
  

  const deleteCustomer = useCallback(
    async (customerId: string) => {
      // console.log('deleteCustomer---RECEBIDO MEU FI:', customerId)
      await axiosAuth.delete(`/api/users/${customerId}`);
  
      setCustomers((state) => state.filter((customer) => customer.id !== customerId));
    },
    [axiosAuth, setCustomers]
  );

  
  const editCustomer = useCallback(

    async (data: UpdateCustomerInput) => {
      const { id } = data

      const response = await axiosAuth.put(`/api/users/${id}`, {})

      setCustomers((state) => [response.data, ...state])
    },
    [axiosAuth],
  )

  const handleEdit = async (data: UpdateCustomerInput) => {
    const customer = customers.find((customer) => customer.id === data.id);
    const { name, email, password, businessName, isAdmin } = customer;
    const isAdminBoolean = JSON.parse(isAdmin.toLowerCase());
  console.log('UPADATEEE', data.id)
    const updatedCustomer: UpdateCustomerInput = {
      id: data.id,
      name,
      email,
      password,
      businessName,
      isAdmin: isAdminBoolean,
    };
  
    updateCustomer(updatedCustomer)
      .then(async () => {
       
      const response = await axiosAuth.patch(`/api/users/${data.id}`, {})

      setCustomers((state) => [response.data, ...state])
      })
      .catch((error) => {
        console.error('Erro ao atualizar o cliente:', error);
        // Lógica para tratar o erro, se necessário
      });
  };
  
  
  

  useEffect(() => {
    fetchCustomers()
  }, [fetchCustomers])

  return (
    <CustomersContext.Provider
      value={{
        handleEdit,
        editCustomer,
        customers,
        deleteCustomer,
        fetchCustomers,
        createCustomer,
        updateCustomer,
      }}
    >
      {children}
    </CustomersContext.Provider>
  )
}
