import Image from "next/image";
import pin from "../../public/pin.svg";
import drop from "../../public/drop.svg";

const TopBar = () => {
  return (
    <nav className="bg-[#EDF2EE]">
      <div className="mx-4 sm:mx-[10%] py-2 flex justify-between items-center">
        <div className="flex justify-center items-center  space-x-2.5">
          <Image src={pin} alt="pin-icon" />
          <span className="text-xs text-[#2B572E]">
            Store Location: Lincoln- 344, Illinois, Chicago, USA
          </span>
        </div>
        <div className="flex justify-center items-center space-x-3">
          <div className="flex justify-center items-center space-x-3">
            <span className="text-xs text-[#2B572E]">
              ENG
            </span>
            <Image src={drop} alt="pin-icon" />
          </div>
          <div className="flex justify-center items-center space-x-3">
            <span className="text-xs text-[#2B572E]">
              USD
            </span>
            <Image src={drop} alt="pin-icon" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TopBar;
