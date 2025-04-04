import ImageWithPlaceholder from "./ImageWithPlaceholder";
import arrow from "../../public/arrowwhite.svg";
import Image from "next/image";

export default function Hero() {
  const bgImage = "/background.svg";
  const heroImage = "/hero1.svg";

  return (
    <div className="w-full relative max-sm:bg-[#EDF2EE] sm:bg-none">
      <div className="w-full hidden sm:block">
        <Image
          src={bgImage}
          alt="hero-background"
          width={1920}
          height={1080}
          className="w-full h-auto object-cover"
        />
      </div>

      <div className="sm:absolute inset-0 w-full">
        <div className="container mx-auto h-full">
          <div className="flex flex-col sm:flex-row items-center justify-center w-full h-full px-4 py-8 md:py-12 lg:py-16 gap-4 md:gap-8 lg:gap-16">
            <div className="w-full md:w-1/2 flex justify-center">
              <ImageWithPlaceholder
                src={heroImage}
                alt="Fresh organic vegetables"
                width={700}
                height={500}
                className=""
                loading="lazy"
                quality={2}
              />
            </div>

            <div className="w-full md:w-1/2 flex flex-col items-center md:items-start justify-start space-y-2 md:space-y-4 text-center md:text-left">
              <p className="text-xs md:text-sm text-[#00B207] font-medium">
                Welcome to FarmBox
              </p>
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-black">
                Fresh & Healthy <br />
                Organic Food
              </h1>
              <h2 className="text-sm md:text-md text-black">
                Sale up to{" "}
                <span className="text-[#FF8A00] font-bold">30% OFF</span>
              </h2>
              <p className="text-xs md:text-md text-[#808080] max-w-md">
                Free shipping on all your order. we deliver, you enjoy
              </p>
              <button className="bg-[#00B207] hover:bg-[#008a05] text-white py-2 md:py-3 px-4 md:px-6 rounded-full flex items-center gap-2 md:gap-3.5 text-xs md:text-sm font-medium mt-2 md:mt-4 transition-colors duration-300">
                Shop now
                <Image src={arrow} alt="arrow" className="inline-block" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
