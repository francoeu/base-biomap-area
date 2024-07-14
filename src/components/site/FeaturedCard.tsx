import { ReactNode } from "react";


interface FeaturedCardProps {
    title: string;
    description: string;
    className?: string
    icon?: ReactNode
  }

export default function FeaturedCard({ title, description, icon, className }:FeaturedCardProps) {
    return (
      <div  className={`
      flex flex-col max-w-[280px] h-[350px] bg-[#292929] p-4 justify-center items-center text-center 
      rounded-md
      ${className ?? ''}
  `}>
      <div>
        {icon}
      </div>

      <h2 className="text-xl font-black text-white mb-2">{title}</h2>
      <p className="text-gray-400">{description}</p>
      </div>
    )
  }
  