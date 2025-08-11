"use client";
import Image from "next/image";
import Link from "next/link";
import DropdownNav from "../atoms/DropdownNav";
import defaultProfile from "../../public/images/defaultProfile.jpg";
import { useAuth } from "@/app/context/AuthContext";
import { useState } from "react";

export default function Header() {
  const { user } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-4 left-0 w-full z-50 flex justify-center pointer-events-none">
      <nav className="w-full max-w-7xl mx-auto px-4 sm:px-8 md:px-16 flex items-center justify-between backdrop-blur-xs bg-tosca/70 rounded-full py-3 shadow-lg pointer-events-auto relative">
        {/* Logo */}
        <div className="w-[90px] flex items-center flex-shrink-0">
          <Link href="/" className="flex items-center gap-2 select-none">
            <Image src="/assets/angkutin_white.png" alt="Angkutin Logo" width={1000} height={1000} priority className="object-contain" />
          </Link>
        </div>

        {/* Hamburger for mobile */}
        <button className="lg:hidden ml-auto mr-2 flex items-center justify-center h-10 w-10 rounded-full hover:bg-tosca/80 transition-colors" onClick={() => setMenuOpen((v) => !v)} aria-label="Open menu">
          <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 8h16M4 16h16"} />
          </svg>
        </button>

        {/* Desktop Nav */}
        <ul className="hidden lg:flex flex-1 justify-center gap-12 text-white font-normal text-sm">
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

        {/* Desktop Auth */}
        <div className="hidden lg:flex items-center gap-6">
          {user ? (
            <Link href="/profile" className="flex items-center gap-2 font-semibold text-sm">
              <span>{user.name.split(" ")[0]}</span>
              <Image src={user.avatar || defaultProfile} alt={user.name || "User profile"} width={40} height={40} className="h-10 w-10 rounded-full object-cover" />
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

        {/* Mobile Nav */}
        {menuOpen && (
          <div className="lg:hidden absolute top-18  left-0   w-full bg-tosca/95 rounded-2xl shadow-lg py-4 z-50 animate-fadeIn transition-all ease-in-out  ">
            <ul className="flex flex-col items-center gap-4 text-white font-normal text-base">
              <li>
                <Link href="/order" className="hover:text-gray-200" onClick={() => setMenuOpen(false)}>
                  Order
                </Link>
              </li>
              <li>
                <Link href="/consultant" className="hover:text-gray-200" onClick={() => setMenuOpen(false)}>
                  Consultant
                </Link>
              </li>
              <li>
                <Link href="/contest" className="hover:text-gray-200" onClick={() => setMenuOpen(false)}>
                  Contest
                </Link>
              </li>
              <li>
                <DropdownNav />
              </li>
            </ul>
            <div className="flex flex-col items-center gap-4 mt-4">
              {user ? (
                <Link href="/profile" className="flex items-center gap-2 font-semibold text-base" onClick={() => setMenuOpen(false)}>
                  <Image src={user.avatar || defaultProfile} alt={user.name || "User profile"} width={36} height={36} className="h-9 w-9 rounded-full object-cover" />
                </Link>
              ) : (
                <>
                  <Link href="/login" className="text-white font-semibold text-base hover:text-gray-200" onClick={() => setMenuOpen(false)}>
                    Login
                  </Link>
                  <Link href="/register" className="bg-white text-[#016a70] font-semibold text-base px-6 py-2 rounded-full shadow hover:bg-gray-100 transition-colors" onClick={() => setMenuOpen(false)}>
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
