import Link from "next/link";


interface FeaturedSectionTagProps {
  title: string;
  text?: string;
  tagName: string;
  buttonText: string;
  buttonUrl: string;
}

export  function FeaturedSectionCTA({ title, text, tagName, buttonText, buttonUrl }:FeaturedSectionTagProps) {

    return (
<section>
  <div className="mx-auto max-w-screen-xl px-4 py-8- sm:py-12- sm:px-6 lg:pb-8 lg:px-8 bg-gray-900- z-20">

    <div className="grid grid-cols-1 gap-2 lg:grid-cols-2 lg:gap-16">

      <div className="flex bg-gray-300-">

      <div className="transform rotate-90 origin-left flex items-center h-full bg-gray-300- -mt-20">
      <span className="whitespace-nowrap transform rotate-180 bg-gray-800 p-4 text-[#0FB268] ">
            {tagName}
        </span>    
    </div>
 
    <div className="-ml-14">
    <h2 className="text-xl font-bold sm:text-3xl text-white">{title}</h2>
    </div>
      
   
      </div>

      <div className="z-20">
        <p className="text-gray-400">
        {text}
        </p>

        <Link
          target="_blank"
          href={buttonUrl}
          className="mt-8 inline-block rounded-lg border border-[#0FB268] md:px-12 px-4 py-3 text-sm font-medium text-white transition hover:bg-[#0FB268] hover:font-bold focus:outline-none focus:ring focus:ring-green-[#0FB268]"

        >
          {buttonText}
        </Link>
      </div>

    </div>
  </div>
</section>

)

   
  }
  


