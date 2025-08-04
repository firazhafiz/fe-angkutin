"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import SidebarLayout from "../../../../components/layouts/SidebarLayout";
import dummyImage from "../../../../public/images/blog1.jpg";

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
  const [user, setUser] = useState<User | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [avatar, setAvatar] = useState("");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [password, setPassword] = useState(""); // Optional jika ingin mengubah
  const [token, setToken] = useState("");

  useEffect(() => {
    const userData = localStorage.getItem("user");
    const userToken = localStorage.getItem("token");

    if (userToken) {
      setToken(userToken);
    }
    if (userData) {
      const parsed: User = JSON.parse(userData);
      setUser(parsed);
      setName(parsed.name);
      setEmail(parsed.email);
      setPhone(parsed.phone || "");
      setAvatar(parsed.avatar);
    }
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file); // Simpan file untuk upload
      const imageUrl = URL.createObjectURL(file);
      setAvatar(imageUrl); // Untuk preview
    }
  };

  const handleAvatarUpdate = async () => {
    if (!user || !avatarFile) return;
    const formData = new FormData();
    formData.append("file", avatarFile);

    try {
      const res = await fetch(`https://angkutin-omega.vercel.app/v1/user/${user.id}/update-avatar`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: "PUT",
        body: formData,
        // Jangan set Content-Type, browser akan set otomatis untuk FormData
      });
      if (res.ok) {
        const updated = await res.json();
        localStorage.setItem("user", JSON.stringify(updated));
        alert("Avatar berhasil diperbarui!");
        setUser(updated);
        setAvatar(updated.avatar); // Update preview
        setAvatarFile(null);
      } else {
        const err = await res.text();
        alert("Gagal memperbarui avatar: " + err);
      }
    } catch (error) {
      alert("Terjadi kesalahan saat mengupdate avatar.");
      console.error(error);
    }
  };

  const handleUpdate = async () => {
    if (!user) return;
    // Jika ada file avatar baru, update avatar dulu
    if (avatarFile) {
      await handleAvatarUpdate();
    }

    // Update data lain (name, email, phone, password)
    const updatedUser = {
      name,
      email,
      phone,
      ...(password && { password }),
    };

    try {
      const res = await fetch(`https://angkutin-omega.vercel.app/v1/user/${user.id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedUser),
      });

      if (res.ok) {
        const updated = await res.json();
        localStorage.setItem("user", JSON.stringify(updated));
        alert("Profil berhasil diperbarui!");
        setUser(updated);
      } else {
        const err = await res.text();
        alert("Gagal memperbarui: " + err);
      }
    } catch (error) {
      alert("Terjadi kesalahan saat mengupdate profil.");
      console.error(error);
    }
  };

  if (!user) return null;

  return (
    <SidebarLayout>
      <h2 className="text-xl font-semibold text-[#016A70]">User Profile</h2>
      <div className="flex h-full gap-4 mt-6">
        {/* Bagian Kiri */}
        <div className="w-2/5 h-full border rounded-2xl p-5 flex flex-col justify-center items-center">
          <Image src={avatar || dummyImage} alt="User Avatar" width={150} height={150} className="h-[150px] w-[150px] rounded-full object-cover" />
          <label className="mt-3 cursor-pointer text-sm text-blue-500 hover:underline">
            Ganti Foto
            <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
          </label>
          <div className="mt-3 text-center">
            <h2 className="font-semibold text-[#016A70]">{name}</h2>
            <h3 className=" text-slate-500 text-sm">{phone || "Belum ada nomor telepon"}</h3>
          </div>
        </div>
        {/* Bagian Kanan */}
        <div className="w-full h-full border rounded-2xl p-5">
          <h2 className="text-xl font-semibold text-[#016A70]">General Information</h2>
          <div className="mt-2 text-md">
            <p className="font-medium text-slate-500">Fullname</p>
            <input type="text" className="w-full p-2 border rounded-lg mt-1" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="mt-2 text-md">
            <p className="font-medium text-slate-500">Email</p>
            <input type="email" className="w-full p-2 border rounded-lg mt-1" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="mt-2 text-md">
            <p className="font-medium text-slate-500">Phone</p>
            <input type="text" className="w-full p-2 border rounded-lg mt-1" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>
          <div className="mt-2 text-md">
            <p className="font-medium text-slate-500">Password (opsional)</p>
            <input type="password" className="w-full p-2 border rounded-lg mt-1" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className="mt-4">
            <button className="rounded-lg bg-[#016A70] px-4 py-2 text-white" onClick={handleUpdate}>
              Update
            </button>
          </div>
        </div>
      </div>
    </SidebarLayout>
  );
}
