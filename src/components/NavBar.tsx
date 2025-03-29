"use client";

import Image from "next/image";
import dropblack from "../../public/dropblack.svg";
import dropgray from "../../public/dropgray.svg";
import leaf from "../../public/fav.svg";
import phone from "../../public/phone.svg";
import search from "../../public/Search.svg";
import heart from "../../public/heart.svg";
import user from "../../public/user.svg";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/pages", label: "Pages" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About Us" },
];

const iconLinks = [
  { src: search, alt: "search", size: 22 },
  { src: heart, alt: "heart", size: 22 },
  { src: user, alt: "user", size: 19 },
];

const NavBar = () => {
  const pathname = usePathname();

  return (
    <nav className="bg-white">
      <div className="mx-4 sm:mx-[10%] py-2 grid grid-cols-3 items-center">


        <div className="flex justify-start space-x-6">
          {navLinks.map(({ href, label }) => (
            <div key={href} className="flex items-center space-x-1 text-nowrap">
              <Link
                href={href}
                className={`text-sm ${
                  pathname === href ? "text-black" : "text-[#808080]"
                }`}
              >
                {label}
              </Link>
                <Image
                  src={pathname === href ? dropblack : dropgray}
                  alt="drop-icon"
                />
            </div>
          ))}
        </div>


        <div className="flex justify-center items-center space-x-2.5">
          <Image src={leaf} alt="icon" />
          <span className="text-black text-2xl font-bold">FarmBox</span>
        </div>


        <div className="flex justify-end space-x-3 items-center">
          <div className="flex items-center space-x-2.5">
            <Image src={phone} alt="phone" width={22} height={22} />
            <span className="text-black text-sm">(+20) 10-6188-1525</span>
          </div>
          {iconLinks.map(({ src, alt, size }) => (
            <Image key={alt} src={src} alt={alt} width={size} height={size} />
          ))}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
