import Image from "next/image"
import bg from "../../public/background.svg"
import hero from "../../public/hero1.svg"
import arrow from "../../public/arrowwhite.svg"

const Hero = () => {
  return (
    <div className="relative">
        <div className="flex items-center justify-center w-full ">
            <Image src={bg} alt="hero" />
        </div>
        <div className="absolute top-0 left-0 flex items-center justify-center gap-15 w-full h-full">
            <div>
                <Image src={hero} alt="hero-img" width={600} />
            </div>
            <div className="flex flex-col items-start justify-start space-y-4">
                <p className="text-sm text-[#00B207] ">Welcome to FarmBox</p>
                <h1 className=" text-6xl font-bold text-black">Fresh & Healthy <br />Organic Food</h1>
                <h1 className=" text-md text-black">Sale up to <span className="text-[#FF8A00]">30% OFF</span></h1>
                <p className=" text-md text-[#808080]">Free shipping on all your order. we deliver, you enjoy</p>
                <button className="bg-[#00B207] text-white py-3 px-6 rounded-full flex items-center gap-3.5 text-sm font-medium">Shop now <Image src={arrow} alt="shop-arrow" width={15} height={12}/> </button>
            </div>
        </div>
    </div>
  )
}

export default Hero