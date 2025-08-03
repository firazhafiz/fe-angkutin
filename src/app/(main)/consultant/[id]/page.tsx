import Image from "next/image";
import backIcon from "../../../../../public/icons/back.png";
import emailIcon from "../../../../../public/icons/email.png";
import phoneIcon from "../../../../../public/icons/phone.png";

import dummyImage from "../../../../../public/images/blog-hero.jpg";
export default function DetailConsultantPage() {
  return (
    <main className="w-full h-full relative min-h-screen bg-gray-100 overflow-hidden ">
      <div className=" w-full mt-40 px-40 ">
        <div className="bg-white p-8 rounded-2xl">
          {/* header */}
          <div className="flex justify-between items-center">
            <div className="bg-[#F0F0F0] rounded-full w-fit p-2 cursor-pointer">
              <Image src={backIcon} alt="back-icon" className="h-6 w-6" />
            </div>
            <h1 className="text-2xl font-semibold text-[#016A70]">Profile Consultant</h1>
            <div></div>
          </div>

          {/* content */}
          <div className="mt-8 flex gap-8">
            <div>
              <Image src={dummyImage} alt="dummy" className="h-40 w-44 object-cover rounded-lg" />
              {/* <h2>Nurhayi</h2> */}
              <h3 className="text-2xl font-semibold text-[#016A70] mt-4">Nurhayati</h3>
              <div className="mt-4 flex flex-col gap-2">
                <p className="text-lg text-slate-600">Pakar Lingkungan</p>
                <div className="flex items-center gap-2">
                  <Image src={emailIcon} alt="email icon" className="h-5 w-5" /> <p className="text-slate-500"> : example@gmail.com</p>
                </div>
                <div className="flex items-center gap-2">
                  <Image src={phoneIcon} alt="phone icon" className="h-5 w-5" /> <p className="text-slate-500"> : 0812 3456 7890</p>
                </div>
              </div>
              <button className="mt-4 px-4 py-2 bg-[#016A70] rounded-lg">Start now</button>
            </div>
            <div>
              <h3 className="text-xl text-[#016A70] font-semibold ">About</h3>
              <p className="max-w-4xl mt-4 text-slate-500">
                Nurhayati adalah seorang profesional di bidang Teknik Lingkungan yang telah memiliki pengalaman lebih dari 10 tahun dalam merancang, mengembangkan, dan mengelola berbagai program pengelolaan Sumber Daya Alam (SDA) yang
                berkelanjutan. Latar belakang akademiknya yang kuat dipadukan dengan keahlian praktis di lapangan menjadikannya sosok yang kompeten dalam menyusun strategi konservasi, pengelolaan limbah, serta pemanfaatan sumber daya alam
                secara efisien dan ramah lingkungan.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
