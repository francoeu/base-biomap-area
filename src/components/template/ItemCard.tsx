import { IconFileDescription } from '@tabler/icons-react';
import Link from "next/link";

interface CardProps {
    url: string
    title: string
    subtitle?: string
    icone?: any
    className?: string
}

export function ItemCard(props: CardProps) {
    return (
        <div>
        <Link href={props.url} className="w-full gap-2 text-white rounded-md inline-flex items-center justify-between px-4 py-2.5 bg-gray-800 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300  dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700">
            
            <div className="-mt-1 font-sans ">
                <p className='text-sm font-semibold'>{props.title}</p>
                <span className='text-xs'>{props.subtitle}</span>
            </div>
            <IconFileDescription />
        </Link>
        </div>
    )
}