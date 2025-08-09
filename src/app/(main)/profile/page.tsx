"use client";

import { useState } from "react";
import Image from "next/image";
import SidebarLayout from "../../../../components/layouts/SidebarLayout";
import { User } from "../../../../types/user";
import { useAuth } from "@/app/context/AuthContext";

function SuccessModal({ open, onClose, message }: { open: boolean; onClose: () => void; message: string }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg p-6 shadow-lg min-w-[300px] text-center">
        <h3 className="text-lg font-semibold text-green-600 mb-2">Sukses!</h3>
        <p className="mb-4 text-slate-500">{message}</p>
        <button className="bg-[#016A70] text-white px-4 py-2 rounded-lg" onClick={onClose}>
          Tutup
        </button>
      </div>
    </div>
  );
}

export default function ProfilePage() {
  const { user, token, setUser } = useAuth(); // ambil user & token langsung dari context
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [imageError, setImageError] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFieldChange = (key: keyof User, value: string) => {
    if (!user) return;
    setUser({ ...user, [key]: value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    setAvatarFile(file);
    const preview = URL.createObjectURL(file);
    setUser({ ...user, avatar: preview });
    setImageError(false);
  };

  const handleAvatarUpload = async () => {
    if (!avatarFile) return;
    const formData = new FormData();
    formData.append("file", avatarFile);

    setLoading(true);
    try {
      const res = await fetch(`https://angkutin.vercel.app/v1/user/${user?.id}/update-avatar`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (!res.ok) throw new Error(await res.text());

      const updated = await res.json();
      setUser(updated);
      setAvatarFile(null);
      setImageError(false);
      setSuccessMessage("Avatar berhasil diperbarui!");
      setShowSuccessModal(true);
      setLoading(false);
    } catch (error) {
      console.error("Error uploading avatar:", error);
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    setLoading(true);
    try {
      if (avatarFile) await handleAvatarUpload();

      const res = await fetch(`https://angkutin.vercel.app/v1/user/${user?.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: user?.name,
          email: user?.email,
          phone: user?.phone,
        }),
      });

      if (!res.ok) throw new Error(await res.text());

      const updated = await res.json();
      setUser(updated.data);
      setSuccessMessage("Profil berhasil diperbarui!");
      setShowSuccessModal(true);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <>
      <SuccessModal open={showSuccessModal} onClose={() => setShowSuccessModal(false)} message={successMessage} />
      <SidebarLayout>
        <h2 className="text-xl font-semibold text-[#016A70]">User Profile</h2>
        <div className="flex h-full gap-4 mt-6">
          {/* Sidebar kiri */}
          <div className="w-2/5 h-full border rounded-2xl p-5 flex flex-col justify-center items-center">
            {user?.avatar && !imageError ? (
              <Image src={user?.avatar} alt="User Avatar" width={150} height={150} className="h-[150px] w-[150px] rounded-full object-cover" onError={() => setImageError(true)} unoptimized />
            ) : (
              <div className="h-[150px] w-[150px] rounded-full bg-gray-200 flex items-center justify-center text-sm text-gray-500">{imageError ? "Error Loading" : "No Avatar"}</div>
            )}

            <label className="mt-3 cursor-pointer text-sm text-blue-500 hover:underline">
              Ganti Foto
              <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
            </label>
            <div className="mt-3 text-center">
              <h2 className="font-semibold text-[#016A70]">{user?.name}</h2>
              <h3 className="text-slate-500 text-sm">{user?.phone || "Belum ada nomor telepon"}</h3>
            </div>
          </div>

          {/* Form kanan */}
          <div className="w-full h-full border rounded-2xl p-5">
            <h2 className="text-xl font-semibold text-[#016A70]">General Information</h2>

            <div className="mt-2">
              <label className="text-slate-500 font-medium">Fullname</label>
              <input type="text" value={user?.name ?? ""} onChange={(e) => handleFieldChange("name", e.target.value)} className="w-full p-2 border rounded-lg mt-1 text-slate-600" />
            </div>
            <div className="mt-2">
              <label className="text-slate-500 font-medium">Email</label>
              <input type="email" value={user?.email} onChange={(e) => handleFieldChange("email", e.target.value)} className="w-full p-2 border rounded-lg mt-1 text-slate-600" />
            </div>
            <div className="mt-2">
              <label className="text-slate-500 font-medium">Phone</label>
              <input type="text" value={user?.phone ?? ""} onChange={(e) => handleFieldChange("phone", e.target.value)} className="w-full p-2 border rounded-lg mt-1 text-slate-600" />
            </div>

            <div className="mt-4">
              <button onClick={handleUpdate} className="rounded-lg bg-[#016A70] px-4 py-2 flex gap-4 justify-center items-center text-white">
                {loading && (
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                  </svg>
                )}
                {loading ? "Updating..." : "Update"}
              </button>
            </div>
          </div>
        </div>
      </SidebarLayout>
    </>
  );
}
