"use client"
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import Carregando from "../template/Carregando";

interface ForcarAutenticacaoProps {
  children: any
}

export default function ForcarAutenticacao(props: ForcarAutenticacaoProps) {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <Carregando />;
  }

  if (!session) {
    router.replace('/login');
    return <Carregando />;
  }
  return props.children;
}
