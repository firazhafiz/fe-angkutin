"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import SidebarLayout from "../../../../components/layouts/SidebarLayout";

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  avatar: string;
  bio: string | null;
  categoryId: number | null;
  role: "user" | "admin" | "driver";
  specialization: string | null;
  created_at: string;
}

export default function ProfilePage() {
  const [userData, setUserData] = useState<User | null>(null);
  const [token, setToken] = useState("");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedToken) setToken(storedToken);
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      setUserData(parsed);
    }
  }, []);

  const handleFieldChange = (key: keyof User, value: string) => {
    setUserData((prev) => (prev ? { ...prev, [key]: value } : prev));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setAvatarFile(file);
    const preview = URL.createObjectURL(file);
    setUserData((prev) => (prev ? { ...prev, avatar: preview } : prev));
    setImageError(false); // Reset error state when new image is selected
  };

  const handleAvatarUpload = async () => {
    if (!userData || !avatarFile) return;
    const formData = new FormData();
    formData.append("file", avatarFile);

    try {
      const res = await fetch(`https://angkutin.vercel.app/v1/user/${userData.id}/update-avatar`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) {
        const err = await res.text();
        throw new Error(err);
      }

      const updated = await res.json();
      localStorage.setItem("user", JSON.stringify(updated));
      setUserData(updated);
      setAvatarFile(null);
      setImageError(false);
    } catch (error) {
      console.error("Error uploading avatar:", error);
    }
  };

  const handleUpdate = async () => {
    if (!userData) return;

    try {
      if (avatarFile) {
        await handleAvatarUpload();
      }

      const res = await fetch(`https://angkutin.vercel.app/v1/user/${userData.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: userData.name,
          email: userData.email,
          phone: userData.phone,
        }),
      });

      if (!res.ok) {
        const err = await res.text();
        throw new Error(err);
      }

      const updated = await res.json();
      localStorage.setItem("user", JSON.stringify(updated.data));
      setUserData(updated.data);
    } catch (error) {
      console.error(error);
    }
  };

  if (!userData) return null;

  return (
    <SidebarLayout>
      <h2 className="text-xl font-semibold text-[#016A70]">User Profile</h2>
      <div className="flex h-full gap-4 mt-6">
        {/* Sidebar kiri */}
        <div className="w-2/5 h-full border rounded-2xl p-5 flex flex-col justify-center items-center">
          {userData.avatar && !imageError ? (
            <Image
              src={userData.avatar}
              alt="User Avatar"
              width={150}
              height={150}
              className="h-[150px] w-[150px] rounded-full object-cover"
              onError={() => setImageError(true)}
              unoptimized // Add this to bypass Next.js image optimization for external URLs
            />
          ) : (
            <div className="h-[150px] w-[150px] rounded-full bg-gray-200 flex items-center justify-center text-sm text-gray-500">{imageError ? "Error Loading" : "No Avatar"}</div>
          )}

          <label className="mt-3 cursor-pointer text-sm text-blue-500 hover:underline">
            Ganti Foto
            <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
          </label>
          <div className="mt-3 text-center">
            <h2 className="font-semibold text-[#016A70]">{userData.name}</h2>
            <h3 className="text-slate-500 text-sm">{userData.phone || "Belum ada nomor telepon"}</h3>
          </div>
        </div>
        {/* Form kanan */}
        <div className="w-full h-full border rounded-2xl p-5">
          <h2 className="text-xl font-semibold text-[#016A70]">General Information</h2>

          <div className="mt-2">
            <label className="text-slate-500 font-medium">Fullname</label>
            <input type="text" value={userData?.name ?? ""} onChange={(e) => handleFieldChange("name", e.target.value)} className="w-full p-2 border rounded-lg mt-1 text-slate-600" />
          </div>
          <div className="mt-2">
            <label className="text-slate-500 font-medium">Email</label>
            <input type="email" value={userData.email} onChange={(e) => handleFieldChange("email", e.target.value)} className="w-full p-2 border rounded-lg mt-1 text-slate-600" />
          </div>
          <div className="mt-2">
            <label className="text-slate-500 font-medium">Phone</label>
            <input type="text" value={userData.phone ?? ""} onChange={(e) => handleFieldChange("phone", e.target.value)} className="w-full p-2 border rounded-lg mt-1 text-slate-600" />
          </div>

          <div className="mt-4">
            <button onClick={handleUpdate} className="rounded-lg bg-[#016A70] px-4 py-2 text-white">
              Update
            </button>
          </div>
        </div>
      </div>
    </SidebarLayout>
  );
}
