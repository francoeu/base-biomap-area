
// import MountainBg from '../../../public/backgrounds/bio-mountains-bg.png';

interface HeroSectionProps {
    children: any
    className?: string
  }

export default function HeroSection(props: HeroSectionProps) {
    return (
        <div
        className={`
                flex flex-col w-full
                ${props.className ?? ''}
            `}
      >
                  {/* <div className="-z-10 fixed- w-full h-full">
          <Image
            src={MountainBg} 
            alt="mountains" 
            layout="fill"
            className="opacity-40 object-cover"
            />
        </div> */}
        {props.children}
        </div>
    )
}