// https://unicode-table.com/en/1F44B/
"use client"

import Image from 'next/image';
import Link from 'next/link';
import logoImg from '../../../public/logotipo-biomap.png';

export  function Brand() {

  return   <Link href="/">
 <div className={`text-3xl font-black`}>
    <Image width={150} src={logoImg} alt="" />
    </div>
  </Link>
 
}
