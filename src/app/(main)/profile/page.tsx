import Image from "next/image";
import dummyImage from "../../../../public/images/blog1.jpg";

import SidebarLayout from "../../../../components/layouts/SidebarLayout";

export default function ProfilePage() {
  return (
    <SidebarLayout>
      <h2 className="text-xl font-semibold text-[#016A70]">User Profile</h2>
      <div className="flex h-full gap-4 mt-6">
        <div className="w-2/5 h-full border rounded-2xl p-5 flex flex-col justify-center items-center">
          <Image src={dummyImage} alt="dummy image" className=" h-[150px] w-[150px] rounded-full object-cover" />
          <div className="mt-3 text-center">
            <h2 className="font-semibold text-[#016A70]">Alexander</h2>
            <h3 className="font-medium text-slate-500">+62 8123 4567 890</h3>
          </div>
        </div>
        <div className="w-full h-full border rounded-2xl p-5">
          <h2 className="text-xl font-semibold text-[#016A70]">General Information</h2>
          <div className="mt-2 text-md">
            <p className="font-medium text-slate-500">Fullname</p>
            <input type="text" className="w-full p-2 border rounded-lg mt-1" />
          </div>
          <div className="mt-2 text-md">
            <p className="font-medium text-slate-500">Email</p>
            <input type="email" className="w-full p-2 border rounded-lg mt-1" />
          </div>
          <div className="mt-2 text-md">
            <p className="font-medium text-slate-500">Password</p>
            <input type="password" className="w-full p-2 border rounded-lg mt-1" />
          </div>
          <div className="mt-4">
            <button className="rounded-lg bg-[#016A70]  px-4 py-2 cursor-pointer">Update</button>
          </div>
        </div>
      </div>
    </SidebarLayout>
  );
}
