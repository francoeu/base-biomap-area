
interface ButtonProps {
    text: string;
    className?: string
  }

export default function Button({ text, className }: ButtonProps) {
    return (
      <button 

    className={`
     border border-[#0FB268] px-4 py-2 rounded-xl hover:font-bold hover:bg-[#0FB268]
      ${className ?? ''}
  `}
    
> 
    <p className="text-white">{text}</p>

 </button>

     
)
}