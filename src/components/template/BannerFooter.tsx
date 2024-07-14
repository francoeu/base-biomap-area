// https://unicode-table.com/en/1F44B/
"use client"
import Image from 'next/image';
import bannerImg from '../../../public/biomap-footer-banner.svg';

export default function BannerFooter() {
  return <div className='justify-center flex mb-5'>
    <Image width={1080} src={bannerImg} alt="" />
    </div>
}
