import Image from "next/image";

import { StaticImport } from "next/dist/shared/lib/get-img-props";

interface ContectSectionWithImageProps {
  title: string;
  text: string;
  tagName?: string;
  buttonText?: string;
  buttonUrl?: string;
  image: StaticImport;
  listItems?: string[];
}

export function ContectSectionWithImage({
  title,
  text,
  tagName,
  image,
  buttonText,
  buttonUrl,
  listItems,

}: ContectSectionWithImageProps) {
  return (
    <section>
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:py-12 sm:px-6 lg:py-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
          <div className="relative h-72- overflow-hidden rounded-lg sm:h-80 lg:order-last lg:h-full">
            <Image
              alt="Party"
              src={image}
              className="absolute inset-0  h-full w-full object-contain"
              width={472}
        
            />
          </div>

          <div className="lg:py-24">
            <div className="flex">
              {tagName && (
                <div className="transform rotate-90 origin-left flex items-center h-full">
                  <span className="whitespace-nowrap transform rotate-180 shrink-0 bg-gray-800 p-4 text-[#0FB268]">
                    {tagName}
                  </span>
                </div>
              )}

              <div>
                <h2 className="text-3xl font-bold sm:text-4xl text-white">
                  {title}
                </h2>
                <p className="mt-4 text-gray-400">{text}</p>

                      {/* Renderizar a lista de itens */}
                      {listItems && (
                  <ul className="mt-4 px-4 text-gray-400">
                    {listItems.map((item, index) => (
                      <li className="list-disc" key={index}>{item}</li>
                    ))}
                  </ul>
                )}

                {buttonText && buttonUrl && (
                 <a
                 href={buttonUrl}
                 className="mt-8 inline-block rounded-lg border border-[#0FB268] md:px-12 px-4 py-3 text-sm font-medium text-white transition hover:bg-[#0FB268] hover:font-bold focus:outline-none focus:ring focus:ring-yellow-400"
               >
                 {buttonText}
               </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
