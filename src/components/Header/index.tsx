"use client";
import * as Dialog from '@radix-ui/react-dialog';
import { HeaderContainer, HeaderContent } from './styles';

import { Button } from '@mantine/core';
import { NewArchiveModal } from '../NewArchiveModal';
import { NewCustomerModal } from '../NewCustomerModal';
import { NewFolderModal } from '../NewFolderModal';
import { NewProjectModal } from '../NewProjectModal';

export function AdminArchivesHeader() {
  return (
    <HeaderContainer className='mb-5 rounded-xl'>
      <HeaderContent>
        {/* <BoasVindas /> */}
        <div className=' w-full flex gap-2 justify-between '>
    <h1 className='text-lg md:text-3xl'>Arquivos Cadastrados</h1>

<Dialog.Root>
  <Dialog.Trigger asChild>
    <Button className='bg-[#00875F] hover:bg-[#015F43]' >Novo Arquivo</Button>
  </Dialog.Trigger>

  <NewArchiveModal />
</Dialog.Root>
    </div>
      </HeaderContent>
    </HeaderContainer>
  )
}

export function AdminFoldersHeader() {
  return (
    <HeaderContainer className='mb-5 rounded-xl'>
      <HeaderContent>
        {/* <BoasVindas /> */}
        <div className=' w-full flex gap-2 justify-between '>
        <h1 className='text-lg md:text-3xl'>Pastas dos Clientes</h1>

        <Dialog.Root>
          <Dialog.Trigger asChild>
            <Button className='bg-[#00875F] hover:bg-[#015F43]' >Nova Pasta</Button>
          </Dialog.Trigger>

          <NewFolderModal />
        </Dialog.Root>
        </div>
      </HeaderContent>
    </HeaderContainer>
  )
}

export function AdminProjectsHeader() {
  return (
    <HeaderContainer className='mb-5 rounded-xl'>
      <HeaderContent>
        {/* <BoasVindas /> */}
        <div className=' w-full flex gap-2 justify-between '>
        <h1 className='text-lg md:text-3xl'>Projetos Cadastrados</h1>

        <Dialog.Root>
          <Dialog.Trigger asChild>
            <Button className='bg-[#00875F] hover:bg-[#015F43]' >Novo Projeto</Button>
          </Dialog.Trigger>

          <NewProjectModal />
        </Dialog.Root>
        </div>
      </HeaderContent>
    </HeaderContainer>
  )
}

export function AdminCustomersPageHeader() {
  return (

    <HeaderContainer className='mb-5 rounded-xl sm:min-w-min md:max-w-full lg:max-w-full'>
    <HeaderContent>
    <div className=' w-full flex gap-2 justify-between '>
      {/* <BoasVindas /> */}
      <h1 className='text-lg md:text-3xl'>Usuários Cadastrados</h1>

      <Dialog.Root>
        <Dialog.Trigger asChild>
          <Button className='bg-[#00875F] hover:bg-[#015F43]' >Novo Usuário</Button>
        </Dialog.Trigger>

        <NewCustomerModal />
      </Dialog.Root>
      </div>
    </HeaderContent>
  </HeaderContainer>
  )
}
