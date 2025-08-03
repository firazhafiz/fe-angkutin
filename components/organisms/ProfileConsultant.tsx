"use client";

import Image from "next/image";
import { IoArrowBack } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { FiPhone } from "react-icons/fi";
import { consultantData } from "../../data/consultantData";
import { useRouter } from "next/navigation";

export default function ProfileConsultant() {
  const router = useRouter();

  // Ambil data consultant pertama sebagai dummy
  const consultant = consultantData[0]?.[0];

  if (!consultant) {
    return <div className="text-center">Consultant not found</div>;
  }

  const handleBackClick = () => {
    router.back();
  };

  return (
    <div className="bg-white p-8 rounded-2xl">
      {/* header */}
      <div className="flex justify-between items-center">
        <div
          className="bg-[#F0F0F0] rounded-full w-fit p-2 cursor-pointer hover:bg-gray-200 transition-colors"
          onClick={handleBackClick}
        >
          <IoArrowBack className="h-6 w-6 text-gray-700" />
        </div>
        <h1 className="text-2xl font-semibold text-[#016A70]">
          Profile Consultant
        </h1>
        <div></div>
      </div>

      {/* content */}
      <div className="mt-8 flex gap-8">
        <div>
          <Image
            src={consultant.image}
            alt={consultant.name}
            width={1000}
            height={1000}
            className="h-40 w-44 object-cover rounded-lg"
          />
          <h3 className="text-2xl font-semibold text-[#016A70] mt-4">
            {consultant.name}
          </h3>
          <div className="mt-4 flex flex-col gap-3">
            <p className="text-lg text-slate-600">{consultant.category.name}</p>
            <div className="flex items-center gap-3">
              <MdEmail className="h-5 w-5 text-[#016A70] flex-shrink-0" />
              <p className="text-slate-500">{consultant.email}</p>
            </div>
            <div className="flex items-center gap-3">
              <FiPhone className="h-5 w-5 text-[#016A70] flex-shrink-0" />
              <p className="text-slate-500">{consultant.phone}</p>
            </div>
          </div>
          <button className="mt-4 px-4 py-2 bg-[#016A70] rounded-lg text-white hover:bg-[#015a60] transition-colors">
            Start now
          </button>
        </div>
        <div>
          <h3 className="text-xl text-[#016A70] font-semibold">About</h3>
          <p className="max-w-4xl mt-4 text-slate-500 leading-relaxed">
            {consultant.description}
          </p>
        </div>
      </div>
    </div>
  );
}
