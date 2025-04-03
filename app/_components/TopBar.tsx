import Image from "next/image";
import pin from "../../public/pin.svg";
import drop from "../../public/drop.svg";

const TopBar = () => {
  return (
    <nav className="bg-[#EDF2EE]">
      <div className="mx-4 sm:mx-[5%] md:mx-[10%] py-2 flex flex-col sm:flex-row justify-between items-center">
        <div className="flex justify-center items-center space-x-2.5 mb-2 sm:mb-0">
          <Image
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
            src={pin}
            alt="pin-icon"
            className="w-3 h-auto"
          />
          <span className="text-xs text-[#2B572E] text-center sm:text-left">
            Store Location: Lincoln- 344, Illinois, Chicago, USA
          </span>
        </div>
        <div className="flex justify-center items-center space-x-6">
          <div className="flex justify-center items-center space-x-1">
            <span className="text-xs text-[#2B572E]">ENG</span>
            <Image
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
              src={drop}
              alt="dropdown-icon"
              className="w-3 h-auto"
            />
          </div>
          <div className="flex justify-center items-center space-x-1">
            <span className="text-xs text-[#2B572E]">USD</span>
            <Image
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
              src={drop}
              alt="dropdown-icon"
              className="w-3 h-auto"
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TopBar;
