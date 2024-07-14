
interface PageIntroBannerProps {
    bgImage: string,
    title: string
}

const PageIntroBanner = ({ bgImage, title }:PageIntroBannerProps) => {
  return (
    <div className="flex justify-center items-center w-full h-[240px] md:h-[340px] rounded-lg- bg-cover bg-center relative" style={{ backgroundImage: `url(${bgImage})` }}>
      <div className="absolute inset-0 bg-black opacity-75 rounded-lg- "></div>
      <h1 className="text-[#0FB268] text-5xl text-center font-bold z-10">{title}</h1>
    </div>
  );
};

export default PageIntroBanner;
