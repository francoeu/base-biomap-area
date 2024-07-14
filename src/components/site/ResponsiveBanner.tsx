
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface ResponsiveBannerProps {
    illustration: StaticImport;
    title: string;
    text: string;
    buttonText: string;
    buttonUrl: string;
}

const ResponsiveBanner: React.FC<ResponsiveBannerProps> = ({ illustration, title, text, buttonText, buttonUrl }) => {
    return (
        <div className="bg-[#2C2B2B] py-12 px-4 md:px-8 lg:px-16 flex gap-8 flex-col-reverse md:flex-row md:row-reverse items-center justify-center">
            <div className="order-1 md:order-2 mb-6 md:mb-0 md:w-1/3 md:text-center">
                <Image src={illustration} alt="Illustration" className="w-64 h-auto mx-auto md:mx-0 md:w-full" />
            </div>
            <div className="flex flex-col order-2 md:order-2 md:w-1/3 md:text-left">
                <h2 className="text-2xl text-[#0FB268] md:text-4xl font-bold mb-2">{title}</h2>
                <p className="text-white mb-4 md:mb-8">{text}</p>
                <Link href={buttonUrl} target='_blank'>
                <button className="bg-[#0FB268] text-white w-full px-4 py-2 rounded-md hover:bg-green-800 focus:outline-none focus:ring focus:ring-indigo-300">
                    {buttonText}
                </button>
                </Link>
            </div>
        </div>
    );
};

export default ResponsiveBanner;
