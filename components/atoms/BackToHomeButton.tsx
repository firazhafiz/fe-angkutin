"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
export default function BackToHomeButton() {
  const router = useRouter();

  const handleBackToHome = () => {
    router.push("/");
  };

  return (
    <div>
      <Link href="/">
        <button
          onClick={handleBackToHome}
          className="bg-[#016A70] text-gray-100 font-semibold py-3 px-6 rounded-md hover:bg-[#015a60] transition-colors duration-200 shadow-md"
        >
          Back to Home
        </button>
      </Link>
    </div>
  );
}
