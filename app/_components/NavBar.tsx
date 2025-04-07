"use client";

import Image from "next/image";
import { useState } from "react";
import dropblack from "../../public/dropblack.svg";
import dropgray from "../../public/dropgray.svg";
import leaf from "../../public/fav.svg";
import phone from "../../public/phone.svg";
import search from "../../public/Search.svg";
import heart from "../../public/heart.svg";
import user from "../../public/user.svg";
import Link from "next/link";
import cart from "../../public/bag.svg";
import { usePathname } from "next/navigation";
import SessionType from "../types/Session";




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
  { src: cart, path: "/cart", alt: "cart", size: 21 },
];

const NavBar = ({ session }: { session: SessionType | null }) => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white sticky top-0 z-10">
      <div className="mx-4 sm:mx-[5%] md:mx-[10%] py-4 hidden xl:grid grid-cols-3">
        <div className="flex justify-start space-x-4 md:space-x-6">
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
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
                src={pathname === href ? dropblack : dropgray}
                alt="drop-icon"
              />
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center space-x-1 text-nowrap">
          <Image
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
            src={leaf}
            alt="icon"
          />
          <span className="text-black text-2xl font-bold">FarmBox</span>
        </div>

        <div className="flex items-center justify-end space-x-4 text-nowrap">
          <div className="hidden md:flex items-center space-x-2.5">
            <Image
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
              src={phone}
              alt="phone"
              width="22"
              height="22"
            />
            <span className="text-black text-sm">(+20) 10-6188-1525</span>
          </div>

          {/* First render non-user icon links */}
          {iconLinks.map(({ src, alt, size, path }) =>
            path ? (
              <Link href={path} key={alt} className="flex items-center">
                <Image
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
                  src={src}
                  alt={alt}
                  width={size}
                  height={size}
                  className="cursor-pointer"
                />
              </Link>
            ) : (
              <button
                key={alt}
                onClick={() => {
                  /* Handle action like opening search */
                }}
                className="p-0 border-0 bg-transparent cursor-pointer flex items-center"
              >
                <Image
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
                  src={src}
                  alt={alt}
                  width={size}
                  height={size}
                />
              </button>
            )
          )}

          {session?.user?.image ? (
            <Link href="/account" className="flex items-center">
              <Image
                src={session.user.image}
                alt="user profile"
                width={25}
                height={25}
                className="cursor-pointer rounded-full"
                referrerPolicy="no-referrer"
              />
              <span className="text-black text-sm ml-2">{session.user.name}</span>
            </Link>
          ) : (
            <Link href="/account" className="flex items-center">
              <Image
                src={user}
                alt="user profile"
                width={20}
                height={20}
                className="cursor-pointer rounded-full"
                referrerPolicy="no-referrer"
              />
            </Link>
          )}
        </div>
      </div>

      <div className="xl:hidden px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <Image
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
              src={leaf}
              alt="icon"
            />
            <span className="text-black text-xl font-bold">FarmBox</span>
          </div>

          <div className="flex items-center space-x-4">
            {iconLinks.slice(0, 2).map(({ src, alt, size }) => (
              <Image
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
                key={alt}
                src={src}
                alt={alt}
                width={size}
                height={size}
                className="cursor-pointer"
              />
            ))}

            <button
              onClick={toggleMenu}
              className="p-2 focus:outline-none"
              aria-label="Toggle menu"
            >
              <div className="w-6 flex flex-col items-end space-y-1.5">
                <span
                  className={`block h-0.5 bg-black transition-all duration-300 ease-out ${
                    isMenuOpen ? "w-6 -rotate-45 translate-y-2" : "w-6"
                  }`}
                ></span>
                <span
                  className={`block h-0.5 bg-black transition-all duration-300 ease-out ${
                    isMenuOpen ? "opacity-0" : "w-4"
                  }`}
                ></span>
                <span
                  className={`block h-0.5 bg-black transition-all duration-300 ease-out ${
                    isMenuOpen ? "w-6 rotate-45 -translate-y-2" : "w-5"
                  }`}
                ></span>
              </div>
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="mt-4 py-3 border-t border-gray-100">
            <ul className="space-y-4">
              {navLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className={`block py-2 ${
                      pathname === href
                        ? "text-black font-medium"
                        : "text-[#808080]"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {label}
                  </Link>
                </li>
              ))}
              <li className="pt-2 border-t border-gray-100">
                <div className="flex items-center space-x-2.5">
                  <Image
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
                    src={phone}
                    alt="phone"
                    width={18}
                    height={18}
                  />
                  <span className="text-black text-sm">(+20) 10-6188-1525</span>
                </div>
              </li>
              <li>
                <div className="flex items-center space-x-2.5">
                  {session?.user?.image ? (
                    <Image
                      src={session.user.image}
                      alt="user profile"
                      width={18}
                      height={18}
                      className="rounded-full"
                    />
                  ) : (
                    <Image
                      blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
                      src={user}
                      alt="user"
                      width={18}
                      height={18}
                    />
                  )}
                  <span className="text-[#808080] text-sm">My Account</span>
                </div>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
