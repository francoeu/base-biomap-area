"use client"
import { Avatar, Menu } from '@mantine/core';
import { IconFileUpload, IconFolders, IconHome, IconUser, IconUsers } from '@tabler/icons-react';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Logout } from 'react-iconly';
// import SigninButton from '../SigninButton';

export default function UserMenu() {

  const router = useRouter()
  async function handleSignOut() {
   
    router.push('/login')
    await signOut()
    
  }
  // const { usuario, logout } = useContext(AutenticacaoContext)
  const { data: session } = useSession();
   if(session.user.isAdmin === true) {
    return (
      
<div className='flex gap-6'>
      <Menu>
         
        <Menu.Target>
          <div className="flex items-center gap-3 cursor-pointer">
            <div className="hidden md:flex flex-col select-none">
              <span className="text-sm font-bold text-zinc-200">
                {session?.user.name}
              </span>
              <span className="text-xs text-zinc-400">{session?.user.email}</span>
            </div>
            <Avatar
              size={40}
              radius="xl"
              src={
                // session?.user.image ??
                'https://source.unsplash.com/random/100x100/?abstract'
              }
            />

     
          </div>
        </Menu.Target>
 
        <Menu.Dropdown>
          <Menu.Label>Admin Area</Menu.Label>
          <Link href={`/profile/${session?.user.id}`}>
          <Menu.Item icon={<IconUser size={14} />}>Meu Perfil</Menu.Item>
        </Link>
          <Link href="/panel">
            <Menu.Item icon={<IconHome size={14} />}>
              Painel
            </Menu.Item>
          </Link>
          <Link href="/admin/customers">
            <Menu.Item icon={<IconUsers size={14} />}>
              Usuários e Clientes
            </Menu.Item>
          </Link>
          <Link href="/admin/dashboard">
            <Menu.Item icon={<IconFolders size={14} />}>
              Pastas dos Clientes
            </Menu.Item>
          </Link>
          <Link href="/admin/upload">
            <Menu.Item icon={<IconFileUpload size={14} />}>
              Upload Área
            </Menu.Item>
          </Link>
          
          {/* <Menu.Divider />
          <Menu.Item color="red" icon={<IconLogout size={14} />}>
          <button onClick={() => signOut()} className="text-red-600">
            Sair
          </button>
          </Menu.Item> */}
          
        </Menu.Dropdown>
      </Menu>

<button 
    className='bg-black- w-10 h-10 rounded-full
    flex justify-center items-center 
    hover:bg-[#2F2E41]'
    onClick={() => handleSignOut()}
    >
<Logout set="bulk" primaryColor="white" />
</button>

</div>
    )
   }


   return (
    <div className='flex gap-6'>
    <Menu>
      <Menu.Target>
        <div className="flex items-center gap-3 cursor-pointer">
          <div className="hidden md:flex flex-col select-none">
            <span className="text-sm font-bold text-zinc-200">
              {session?.user.name}
            </span>
            <span className="text-xs text-zinc-400">{session?.user.email}</span>
          </div>
          <Avatar
            size={40}
            radius="xl"
            src={
              // session?.user.image ??
              'https://source.unsplash.com/random/100x100/?abstract'
            }
          />
          
        
        </div>
      </Menu.Target>

      <Menu.Dropdown>
        
        <Menu.Label>Usuário</Menu.Label>
        <Link href={`/panel`}>
            <Menu.Item icon={<IconHome size={14} />}>
              Meus Projetos
            </Menu.Item>
          </Link>

        <Link href={`/profile/${session?.user.id}`}>
          <Menu.Item icon={<IconUser size={14} />}>Meu Perfil</Menu.Item>
        </Link>
        
        {/* <Menu.Divider />
        <Menu.Item color="red" icon={<IconLogout size={14} />}>
        <button onClick={() => handleSignOut()} className="text-red-600">
          Sair
        </button>
        </Menu.Item> */}

      </Menu.Dropdown>
    </Menu>

    <button 
    className='bg-black- w-10 h-10 rounded-full
    flex justify-center items-center 
    hover:bg-[#2F2E41]'
    onClick={() => handleSignOut()}
    >
<Logout set="bulk" primaryColor="white" />
</button>

</div>
  )
}
