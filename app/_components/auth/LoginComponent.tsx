"use client";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import googleIcon from "../../../public/google.svg";
import { signInAction } from "../../_lib/actions";

const LoginComponent = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <div className="w-fit min-w-[520px] h-fit my-10 flex flex-col  gap-4 p-4 border border-gray-100 rounded-md shadow-md">
        <p className="text-2xl font-semibold text-center">Sign In</p>
        <form className="flex flex-col  ">
          <div className="flex flex-col gap-4 w-full">
            <label htmlFor="email" className="hidden">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              className="border border-gray-200 rounded-md p-2 w-full focus:outline-1"
            />
            <label htmlFor="password" className="hidden">
              Password
            </label>
            <div className="mt-1 relative rounded-md ">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="block w-full rounded-md border-gray-300 focus:outline-1 p-2 border pr-10"
                placeholder="Password"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOffIcon className="h-5 w-5 text-gray-400" />
                ) : (
                  <EyeIcon className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
          </div>
          <div className="flex justify-between mt-4">
            <div className="flex items-center ">
              <input
                type="checkbox"
                name="remember"
                id="remember"
                className="mr-2 border border-gray-100/50 outline-none"
              />
              <label
                htmlFor="remember"
                className="flex items-center gap-2 text-gray-500"
              >
                <span className="text-sm">Remember Me</span>
              </label>
            </div>
            <a href="#" className="text-sm text-gray-500 ml-2">
              Forgot Password?
            </a>
          </div>
          <button
            type="submit"
            className="bg-[#00B207] text-white py-2 px-4 w-full rounded-4xl mt-4 cursor-pointer"
          >
            Login
          </button>
          <p className="text-xs text-gray-500 text-center mt-5 mb-2">
            Don&#39;t have an account?{" "}
            <a
              href="/register"
              className="text-black hover:underline hover:text-[#00B207]"
            >
              Register
            </a>
          </p>
        </form>
        <form action={signInAction}>
          <div className="w-full max-w-md mx-auto space-y-4 ">
            <button className="w-full flex items-center justify-center gap-2 text-md font-medium text-[#808080] py-4 border border-gray-200 rounded-md shadow-md cursor-pointer">
              <Image src={googleIcon} alt="Login" width={30} height={30} />
              <p>Continue With Google</p>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginComponent;
