// app/(main)/components/layouts/SidebarLayout.tsx

"use client";

import Image from "next/image";
import backIcon from "../../public/icons/back.png";
import signOutIcon from "../../public/icons/signout.png";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarLayoutProps {
  children: React.ReactNode;
}

export default function SidebarLayout({ children }: SidebarLayoutProps) {
  const pathname = usePathname();

  const navItems = [
    { name: "Profile", href: "/profile" },
    { name: "Address", href: "/profile/address" },
    { name: "Orders", href: "/profile/orders" },
  ];

  return (
    <main className="w-full h-full relative min-h-screen bg-gray-100 overflow-hidden">
      <div className="flex gap-2.5 w-full mt-40 px-40 h-4/5">
        {/* Sidebar */}
        <div className="w-1/4 h-fit bg-white rounded-2xl p-5">
          <div className="flex gap-4 items-center">
            <Link href="/" className="bg-[#F0F0F0] rounded-full w-fit p-2 cursor-pointer">
              <Image src={backIcon} alt="back-icon" className="h-6 w-6" />
            </Link>
            <h2 className="text-[#016A70] font-semibold text-xl">Profile</h2>
          </div>

          <div className="mt-8 flex flex-col gap-2 border-b border-slate-700 pb-4">
            {navItems.map((item) => (
              <Link key={item.name} href={item.href} className={`text-slate-700 ${pathname === item.href ? "font-semibold text-[#016A70]" : ""}`}>
                {item.name}
              </Link>
            ))}
          </div>

          <div className="mt-4 flex gap-2">
            <Image src={signOutIcon} alt="sign out icon" className="h-6 w-6" />
            <a href="" className="text-[#D27267]">
              Sign Out
            </a>
          </div>
        </div>

        {/* Main Content */}
        <div className="w-3/4 h-full bg-white rounded-2xl p-5">{children}</div>
      </div>
    </main>
  );
}
