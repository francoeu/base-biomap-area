import Image from "next/image";

export default function MembersLogosLogin() {

    return (
        <div className="flex -space-x-2 overflow-hidden z-40 mb-4">
        <Image
          width={56}
          height={56}
          className="inline-block rounded-full ring-2- ring-white-"
          src="/logo-mrv.svg"
          alt=""
        />
         <Image
              width={56}
              height={56}
          className="inline-block rounded-full ring-2- ring-white-"
          src="/logo-braskem.svg"
          alt=""
        />
          <Image
              width={56}
              height={56}
          className="inline-block rounded-full ring-2- ring-white-"
          src="/logo-camargo-correa.svg"
          alt=""
        />
          <Image
              width={56}
              height={56}
          className="inline-block rounded-full ring-2- ring-white-"
          src="/logo-andrade-gut.svg"
          alt=""
        />
    
        <Image
          width={56}
          height={56}
          className="inline-block rounded-full ring-2- ring-white-"
          src="/logo-voce.svg"
          alt=""
        />

      </div>
    )

}