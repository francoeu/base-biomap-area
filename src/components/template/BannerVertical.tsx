// https://unicode-table.com/en/1F44B/
"use client"
import Image from 'next/image';
import bannerImg from '../../../public/biomap-vert-banner.svg';

export default function BannerVertical() {
  return <div className='justify-center flex mb-5'>
    <Image width={500} src={bannerImg} alt="" />
    </div>
}
