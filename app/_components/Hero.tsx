import Image from "next/image"
import bg from "../../public/background.svg"
import hero from "../../public/hero1.svg"
import arrow from "../../public/arrowwhite.svg"

const Hero = () => {
  return (
    <div className="w-full relative max-sm:bg-[#EDF2EE] sm:bg-none">
      {/* Background image with proper aspect ratio */}
      <div className="w-full  hidden  sm:block">
        <Image 
          src={bg} 
          alt="hero-background" 
          className="w-full object-cover"
          priority
        />
      </div>
      
      {/* Content positioned over background */}
      <div className="sm:absolute inset-0 w-full">
        <div className="container mx-auto h-full">
          <div className="flex flex-col sm:flex-row items-center justify-center w-full h-full px-4 py-8 md:py-12 lg:py-16 gap-4 md:gap-8 lg:gap-16">
            {/* Hero image section - visible on all screens */}
            <div className="w-full  md:w-1/2 flex justify-center">
              <Image 
                src={hero} 
                alt="hero-img" 
                className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg"
                width={600}
                height={400}
                priority
              />
            </div>
            
            {/* Text content section */}
            <div className="w-full md:w-1/2 flex flex-col items-center md:items-start justify-start space-y-2 md:space-y-4 text-center md:text-left">
              <p className="text-xs md:text-sm text-[#00B207]">Welcome to FarmBox</p>
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-black">
                Fresh & Healthy <br />Organic Food
              </h1>
              <h2 className="text-sm md:text-md text-black">
                Sale up to <span className="text-[#FF8A00]">30% OFF</span>
              </h2>
              <p className="text-xs md:text-md text-[#808080] max-w-md">
                Free shipping on all your order. we deliver, you enjoy
              </p>
              <button className="bg-[#00B207] text-white py-2 md:py-3 px-4 md:px-6 rounded-full flex items-center gap-2 md:gap-3.5 text-xs md:text-sm font-medium mt-2 md:mt-4">
                Shop now <Image src={arrow} alt="shop-arrow" width={15} height={12} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero