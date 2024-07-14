import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import React from 'react';

interface VerticalListWithImageProps {
    items: {
        number: string;
        title: string;
        content: string;
    }[];
    imageSrc?: StaticImport;
}

const VerticalListWithImage: React.FC<VerticalListWithImageProps> = ({ items, imageSrc }) => {
    return (
        <div className="flex bg-black- z-50- flex-wrap justify-center items-center content-center m-auto">
            <div className="w-full md:w-3/4-">
                <ul className="space-y-8">
                    {items.map((item) => (
                        <li
                            key={item.number}
                            className="relative p-4  hover:bg-[#1B1A1A] cursor-pointer transition-colors duration-300"
                        >
                            <div className="absolute- bg-white/50- w-3- h-full md:left-[-13px] md:top-1/2 transform -translate-y-1/2" />
                            <span className="text-xl font-thin text-white mb-2">{item.number}</span>
                            <h3 className="text-lg font-semibold text-white hover:text-[#0FB268]  mb-4">{item.title}</h3>
                            <p className="text-white">{item.content}</p>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="w-full flex z-20 my-10 md:my-0 justify-center md:w-1/5">
                {/* <Image src={imageSrc} alt="Image" className="max-w-[275px] h-auto" /> */}
                
            </div>
        </div>
    );
};

export default VerticalListWithImage;
