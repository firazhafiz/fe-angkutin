"use client";
import Image from "next/image";
import Link from "next/link";
import DropdownNav from "../atoms/DropdownNav";
import defaultProfile from "../../public/images/defaultProfile.jpg";
import { useAuth } from "@/app/context/AuthContext";

export default function Header() {
  const { user } = useAuth(); // ambil user dari context

  return (
    <header className="fixed top-8 left-0 w-full z-50 flex justify-center pointer-events-none">
      <nav className="px-8 gap-24 md:px-16 lg:px-16 flex items-center justify-between backdrop-blur-xs bg-tosca/70 rounded-full py-3 shadow-lg pointer-events-auto">
        <div className="w-[100px] flex items-center">
          <Link href="/" className="flex items-center gap-2 select-none">
            <Image src="/assets/angkutin_white.png" alt="Angkutin Logo" width={1000} height={1000} priority className="object-contain" />
          </Link>
        </div>
        <ul className="flex-1 flex justify-center gap-12 text-white font-normal text-sm">
          <li>
            <Link href="/order" className="hover:text-gray-200">
              Order
            </Link>
          </li>
          <li>
            <Link href="/consultant" className="hover:text-gray-200">
              Consultant
            </Link>
          </li>
          <li>
            <Link href="/contest" className="hover:text-gray-200">
              Contest
            </Link>
          </li>
          <li>
            <DropdownNav />
          </li>
        </ul>
        <div className="flex items-center gap-6">
          {user ? (
            <Link href="/profile" className="flex items-center gap-2 font-semibold text-sm">
              <Image src={user.avatar || defaultProfile} alt={user.name || "User profile"} width={40} height={40} className="h-10 w-10 rounded-full object-cover" />
              <span>{user.name}</span>
            </Link>
          ) : (
            <>
              <Link href="/login" className="text-white font-semibold text-sm hover:text-gray-200">
                Login
              </Link>
              <Link href="/register" className="bg-white text-[#016a70] font-semibold text-sm px-6 py-2 rounded-full shadow hover:bg-gray-100 transition-colors">
                Register
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
