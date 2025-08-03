"use client";
import Image from "next/image";
import backIcon from "../../../../public/icons/back.png";
import dummyImage from "../../../../public/images/blog1.jpg";
import { useState } from "react";
export default function ConsultantPage() {
  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null);

  return (
    <main className="w-full h-full relative min-h-screen bg-gray-100 overflow-hidden ">
      <div className="flex gap-2.5 w-full mt-40 px-40 h-4/5">
        <div className="w-1/4 min-h-[720px] bg-white rounded-2xl  p-5">
          <div className="flex gap-4 items-center">
            <div className="bg-[#F0F0F0] rounded-full w-fit p-2 cursor-pointer">
              <Image src={backIcon} alt="back-icon" className="h-6 w-6" />
            </div>
            <h2 className="text-[#016A70] font-semibold text-xl">Category</h2>
          </div>

          {/* category */}
          <div className="mt-8 flex flex-col gap-4">
            {[1, 2].map((_, index) => (
              <div key={index} className={`relative transition-all duration-300 ease-in-out`} onMouseEnter={() => setHoveredCategory(index)} onMouseLeave={() => setHoveredCategory(null)}>
                <Image src={dummyImage} alt="dummy image" className={`rounded-xl h-32 w-full object-cover ${hoveredCategory !== null && hoveredCategory !== index ? "grayscale" : ""}`} />
                <div className="absolute bottom-2 left-2">
                  <h3 className="font-semibold">Analisi AMDAL</h3>
                  <p className="text-xs text-slate-300">3 Consultant</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="w-3/4 min-h-[720px] bg-white rounded-2xl p-5">
          <h2 className="text-xl font-semibold text-[#016A70]">Konsultan</h2>
          {/* consultant */}
          <div className="mt-8 flex flex-col gap-6">
            <div className="flex justify-between items-center ">
              <div className="flex gap-4  items-center">
                <Image src={dummyImage} alt="dummy" className="h-24 w-36 rounded-2xl" />
                <div>
                  <h3 className="font-semibold text-[#016A70]">Nurhayati</h3>
                  <p className="text-sm text-slate-500">Pakar Lingkungan</p>
                </div>
              </div>
              <div className="flex items-center px-8">
                <button className="px-4 py-2 bg-[#016A70] rounded-lg  cursor-pointer">Detail</button>
              </div>
            </div>
            <div className="flex justify-between items-center ">
              <div className="flex gap-4  items-center">
                <Image src={dummyImage} alt="dummy" className="h-24 w-36 rounded-2xl" />
                <div>
                  <h3 className="font-semibold text-[#016A70]">Nurhayati</h3>
                  <p className="text-sm text-slate-500">Pakar Lingkungan</p>
                </div>
              </div>
              <div className="flex items-center px-8">
                <button className="px-4 py-2 bg-[#016A70] rounded-lg  cursor-pointer">Detail</button>
              </div>
            </div>
            <div className="flex justify-between items-center ">
              <div className="flex gap-4  items-center">
                <Image src={dummyImage} alt="dummy" className="h-24 w-36 rounded-2xl" />
                <div>
                  <h3 className="font-semibold text-[#016A70]">Nurhayati</h3>
                  <p className="text-sm text-slate-500">Pakar Lingkungan</p>
                </div>
              </div>
              <div className="flex items-center px-8">
                <button className="px-4 py-2 bg-[#016A70] rounded-lg  cursor-pointer">Detail</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
