import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="fixed top-8 left-0 w-full z-50 flex justify-center pointer-events-none">
      <nav className="px-8 gap-24 md:px-16 lg:px-16 flex items-center justify-between bg-tosca rounded-full py-3 shadow-lg pointer-events-auto">
        <div className=" w-[100px] flex items-center">
          <Link href="/" className="flex items-center gap-2 select-none">
            <Image
              src="/assets/angkutin_white.png"
              alt="Angkutin Logo"
              width={1000}
              height={1000}
              priority
              className="object-contain"
            />
          </Link>
        </div>
        <ul className="flex-1 flex justify-center gap-12 text-white font-normal text-sm">
          <li>
            <Link href="#order" className="hover:underline">
              Order
            </Link>
          </li>
          <li>
            <Link href="#consultation" className="hover:underline">
              Consultation
            </Link>
          </li>
          <li>
            <Link href="#contest" className="hover:underline">
              Contest
            </Link>
          </li>
          <li className="relative group">
            <button className="flex items-center gap-1 focus:outline-none">
              Resources
              <svg
                className="w-4 h-4 ml-1"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </li>
        </ul>
        <div className="flex items-center gap-6">
          <Link
            href="#login"
            className="text-white font-semibold text-sm hover:underline"
          >
            Login
          </Link>
          <Link
            href="#register"
            className="bg-white text-[#016a70] font-semibold text-sm px-6 py-2 rounded-full shadow hover:bg-gray-100 transition-colors"
          >
            Register
          </Link>
        </div>
      </nav>
    </header>
  );
}
