"use client";

import Image from "next/image";
import { IoArrowBack } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { FiPhone } from "react-icons/fi";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { User } from "../../types/user";
import { useAuth } from "@/app/context/AuthContext";

export default function ProfileConsultant() {
  const { user, token } = useAuth();
  const [consultant, setConsultant] = useState<User>();
  const router = useRouter();
  const params = useParams();
  const consultantId = params?.id; // ini akan ambil "11" dari /consultant/11

  // Ambil data consultant pertama sebagai dummy

  useEffect(() => {
    const getConsultant = async () => {
      try {
        const res = await fetch(`https://angkutin.vercel.app/v1/consultant/${consultantId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        console.log(data.data);
        setConsultant(data.data);
      } catch (err) {
        console.error(err);
      }
    };

    if (consultantId) {
      getConsultant();
    }
  }, [consultantId]);

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
        <div className="bg-[#F0F0F0] rounded-full w-fit p-2 cursor-pointer hover:bg-gray-200 transition-colors" onClick={handleBackClick}>
          <IoArrowBack className="h-6 w-6 text-gray-700" />
        </div>
        <h1 className="text-2xl font-semibold text-[#016A70]">Profile Consultant</h1>
        <div></div>
      </div>

      {/* content */}
      <div className="mt-8 flex gap-8">
        <div>
          <Image src={consultant.avatar || "/default-avatar.png"} alt={consultant.name || "avatar"} width={1000} height={1000} className="h-40 w-44 object-cover rounded-lg" />

          <h3 className="text-2xl font-semibold text-[#016A70] mt-4">{consultant.name}</h3>
          <div className="mt-4 flex flex-col gap-3">
            <p className="text-lg text-slate-600">{consultant.specialization}</p>
            <div className="flex items-center gap-3">
              <MdEmail className="h-5 w-5 text-[#016A70] flex-shrink-0" />
              <p className="text-slate-500">{consultant.email}</p>
            </div>
            <div className="flex items-center gap-3">
              <FiPhone className="h-5 w-5 text-[#016A70] flex-shrink-0" />
              <p className="text-slate-500">{consultant.phone}</p>
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-xl text-[#016A70] font-semibold">About</h3>
          <p className="max-w-4xl mt-4 text-slate-500 leading-relaxed">{consultant.description}</p>
        </div>
      </div>
    </div>
  );
}
