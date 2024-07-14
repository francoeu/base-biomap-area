"use client";
import * as Dialog from '@radix-ui/react-dialog';
import { HeaderContainer, HeaderContent, NewTransactionButton } from '../Header/styles';

import { NewCustomerModal } from '../NewCustomerModal';
import { BoasVindas } from '../template/Greetings';


export function CustomerPageHeader() {
  return (
    <HeaderContainer>
      <HeaderContent>
        <BoasVindas />

        <Dialog.Root>
          <Dialog.Trigger asChild>
            <NewTransactionButton>Novo Cliente</NewTransactionButton>
          </Dialog.Trigger>

          <NewCustomerModal />
        </Dialog.Root>
      </HeaderContent>
    </HeaderContainer>
  )
}
