// https://unicode-table.com/en/1F44B/
"use client"

import Image from 'next/image';
import Link from 'next/link';
import Img from '../../public/arrou-down-btn.svg';

export  function ArrowDownBtn() {

  return   <Link href="#sobre" scroll={true}>
 <div className={`text-3xl font-black`}>
    <Image width={44} src={Img} alt="" />
    </div>
  </Link>
 
}
