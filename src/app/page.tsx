"use client"
import { isBrowser } from "@/utils/ssr";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import SiteHome from "./home/page";

export default function Home() {

  const router = useRouter();

  useEffect(() => {
  
    if (!isBrowser) {
      // console.log('isBrowser', isBrowser)
      // console.log('***Não é browser***')
      return () => undefined;
    }
    // console.log('isBrowser', isBrowser)
    // console.log('***É browser***')
    return
  }, []);


 return (
  <SiteHome />
 )

    
}
