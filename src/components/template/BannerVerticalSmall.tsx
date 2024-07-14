// https://unicode-table.com/en/1F44B/
"use client"
import Image from 'next/image';
import bannerImg from '../../../public/biomap-vert-mobile-banner.svg';

export default function BannerVerticalSmall() {
  return <div className='justify-center flex mb-5'>
    <Image width={360} src={bannerImg} alt="x" />
    </div>
}
