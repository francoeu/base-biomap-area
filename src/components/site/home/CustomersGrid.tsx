
import brandAG from '../../../../public/brands/logo-andrade-gut.svg';
import brandBrask from '../../../../public/brands/logo-braskem.png';
import brandCCInfra from '../../../../public/brands/logo-ccinfra.png';
import brandMRV from '../../../../public/brands/logo-mrv.png';

import brandCCR from '../../../../public/brands/logo-CCR.png';
import brandGeoData from '../../../../public/brands/logo-geodata.png';
import brandMakro from '../../../../public/brands/logo-makro.png';
import brandOdebrecht from '../../../../public/brands/logo-odebrecht.png';
import brandSelfit from '../../../../public/brands/logo-selfit.png';
import brandUltragaz from '../../../../public/brands/logo-ultragaz.png';

import CustomerBrandsCarousel from "./CustomerBrandsCarousel";


export default function CustomersGrid() {
    const sliderImageUrl = [
        //First image url
        {
          url:
            "https://i2.wp.com/www.geeksaresexy.net/wp-content/uploads/2020/04/movie1.jpg?resize=600%2C892&ssl=1"
        },
        {
          url:
            "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/best-kids-movies-2020-call-of-the-wild-1579042974.jpg?crop=0.9760858955588091xw:1xh;center,top&resize=480:*"
        },
        //Second image url
        {
          url:
            "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/best-movies-for-kids-2020-sonic-the-hedgehog-1571173983.jpg?crop=0.9871668311944719xw:1xh;center,top&resize=480:*"
        },
        //Third image url
        {
          url:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQS82ET2bq9oTNwPOL8gqyoLoLfeqJJJWJmKQ&usqp=CAU"
        },
      
        //Fourth image url
      
        {
          url:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTdvuww0JDC7nFRxiFL6yFiAxRJgM-1tvJTxA&usqp=CAU"
        }
      ];

    const brandImagesPack1 = [
        brandAG.src,
        brandBrask.src,
        brandCCInfra.src,
        brandMRV.src,
        brandOdebrecht.src,
      ];

      const brandImagesPack2 = [
        brandCCR.src,
        brandGeoData.src,
        brandMakro.src,
        brandSelfit.src,
        brandUltragaz.src,
        // Adicione mais URLs de logos aqui
      ];

    return (
        <div
        className={`
                flex flex-col w-full  relative bg-black- 
       
            `}
      >
                  {/* <div className="-z-10 fixed- w-full h-full">
          <Image
            src={customerGridImg.src} 
            alt="logos de clientes" 
            layout="fill"
            objectFit="cover"
            // className="opacity-40"
            />
        </div> */}

        <CustomerBrandsCarousel images={brandImagesPack1} />
        <CustomerBrandsCarousel images={brandImagesPack2} />
 
        </div>
    )
}