"use client";

import { zodResolver } from '@hookform/resolvers/zod';
import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'phosphor-react';
import { Controller, useForm } from 'react-hook-form';
import { useContextSelector } from 'use-context-selector';
import * as z from 'zod';

import { CustomersContext } from '@/contexts/CustomersContext';
import { IconLockAccess, IconUserStar } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import {
  CloseButton,
  Content,
  Overlay,
  TransactionType,
  TransactionTypeButton
} from './styles';

const NewFormInputsSchema = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string(),
  businessName: z.string(),
  isAdmin: z.string(),
})

type NewFormInputs = z.infer<typeof NewFormInputsSchema>

export function NewCustomerModal() {

  
  const createCustomer = useContextSelector(
    CustomersContext,
    (context) => {
      return context.createCustomer
    },
  )

  const {
    control,
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<NewFormInputs>({
    resolver: zodResolver(NewFormInputsSchema),
    defaultValues: {
      isAdmin: 'false',
    },
  })

  const router = useRouter();

  async function handleCreateNew(data: NewFormInputs) {
    const {  name, email, password, businessName, isAdmin } = data
    await createCustomer({
        name, 
        email,
        password,
        businessName,
        isAdmin
    })
    window.location.reload(); // Recarrega a página
    reset()
    
  }

  return (
    <Dialog.Portal>
      <Overlay />

      <Content className='py-[2.5rem] px-[2rem] w-80 md:w-6/12 md:max-w-lg'>
        <Dialog.Title>Novo Usuário</Dialog.Title>

        <CloseButton>
          <X size={24} />
        </CloseButton>

        <form onSubmit={handleSubmit(handleCreateNew)}>
          <input
            type="text"
            placeholder="Nome"
            required
            {...register('name')}
          />
          <input
            type="text"
            placeholder="Nome da empresa do cliente"
            required
            {...register('businessName')}
          />
          <input
            type="text"
            placeholder="Email"
            required
            {...register('email')}
          />
        <input
            type="password"
            placeholder="Senha"
            required
            {...register('password')}
          />

<Controller
            control={control}
            name="isAdmin"
            render={({ field }) => {
              return (
                <TransactionType
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <TransactionTypeButton variant="income" value={'true'}>
                  <IconLockAccess  size={24} />
                    Admin
                  </TransactionTypeButton>
                  <TransactionTypeButton variant="outcome" value={'false'}>
                  <IconUserStar size={24} />
                    Cliente
                  </TransactionTypeButton >
                </TransactionType>
              )
            }}
          />


          <button type="submit" disabled={isSubmitting}>
            Cadastrar
          </button>
        </form>
      </Content>
    </Dialog.Portal>
  )
}

