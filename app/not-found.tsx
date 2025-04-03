import Image from "next/image";
import Link from "next/link";
import notfound from "../public/notfound.png";
export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center mt-10 space-y-10">
      <Image
        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
        src={notfound}
        alt="404"
        width={400}
        height={400}
      />
      <h1 className="text-2xl md:text-3xl font-bold mb-5">
        Oops! page not found
      </h1>
      <p className="text-xs  text-[#808080]">
        Ut consequat ac tortor eu vehicula. Aenean accumsan purus eros. Maecenas
        sagittis tortor at metus mollis
      </p>
      <Link
        href="/"
        className="bg-[#00B207] text-white py-2 md:py-3 px-4 md:px-6 rounded-full flex items-center gap-2 md:gap-3.5 text-xs md:text-sm font-medium mt-2 md:mt-4"
      >
        Back to Home
      </Link>
    </div>
  );
}
