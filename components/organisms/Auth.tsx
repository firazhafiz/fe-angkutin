import Image from "next/image";
import { ReactNode } from "react";
import Link from "next/link";

interface AuthProps {
  children: ReactNode;
}

export default function Auth({ children }: AuthProps) {
  return (
    <div className="h-screen bg-gray-100 flex overflow-hidden">
      {/* Left Side - Illustration */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        {/* Logo */}
        <div className="absolute w-[150px] h-[50px] top-12 left-8 z-10">
          <Link href="/" className="flex items-center gap-2 select-none">
            <Image
              src="/assets/angkutin_tosca.png"
              alt="Angkut.in"
              width={1000}
              height={1000}
              className="object-contain w-full h-full"
              priority
            />
          </Link>
        </div>

        {/* Auth Illustration */}
        <div className="absolute bottom-[-50px] left-0">
          <Image
            src="/assets/auth.svg"
            alt="Auth Illustration"
            width={610}
            height={500}
            className="object-contain"
          />
        </div>
      </div>

      {/* Right Side - Form Content */}
      <div className="w-full lg:w-2/3 flex items-center justify-center p-8">
        {children}
      </div>
    </div>
  );
}
