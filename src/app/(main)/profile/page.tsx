"use client";
import { useState, useEffect } from "react";
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
  const { user, token, setUser } = useAuth();
  const [formData, setFormData] = useState<User | null>(null);
  const [imageError, setImageError] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [loadingAvatar, setLoadingAvatar] = useState(false);
  const [loading, setLoading] = useState(false);

  // Saat user berubah, isi formData
  useEffect(() => {
    if (user) {
      setFormData({ ...user });
    }
  }, [user]);

  const formatPhoneNumber = (value: string) => {
    if (!value) return "";
    let digits = value.replace(/\D/g, ""); // hanya angka
    if (digits.startsWith("0")) {
      digits = "+62" + digits.slice(1);
    } else if (!digits.startsWith("+62")) {
      digits = "+62" + digits;
    }
    return digits;
  };

  const handleFieldChange = (key: keyof User, value: string) => {
    if (!formData) return;
    setFormData({ ...formData, [key]: value });
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    setImageError(false);
    const formDataUpload = new FormData();
    formDataUpload.append("file", file);


    

    setLoadingAvatar(true);
    try {
      const res = await fetch(`https://angkutin.vercel.app/v1/user/${user.id}/update-avatar`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: formDataUpload,
      });

      if (!res.ok) throw new Error(await res.text());

      const updated = await res.json();
      setUser(updated.data);
      setSuccessMessage("Avatar berhasil diperbarui!");
      setShowSuccessModal(true);
    } catch (error) {
      console.error("Error uploading avatar:", error);
      setImageError(true);
    } finally {
      setLoadingAvatar(false);
    }
  };

  const handleUpdate = async () => {
    if (!formData) return;
    setLoading(true);
    try {
      const res = await fetch(`https://angkutin.vercel.app/v1/user/${user?.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
        }),
      });

      if (!res.ok) throw new Error(await res.text());

      const updated = await res.json();
      setUser(updated.data);
      setSuccessMessage("Profil berhasil diperbarui!");
      setShowSuccessModal(true);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SuccessModal open={showSuccessModal} onClose={() => setShowSuccessModal(false)} message={successMessage} />
      <SidebarLayout>
        <h2 className="text-xl font-semibold text-[#016A70]">User Profile</h2>
        <div className="flex w-full gap-4 mt-6">
          {/* Sidebar kiri */}
          <div className="w-2/5   rounded-2xl p-5 flex flex-col justify-start items-center relative">
            {loadingAvatar ? (
              <div className="flex items-center justify-center bg-black/50 rounded-full w-[150px] h-[150px]">
                <svg className="animate-spin h-8 w-8 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                </svg>
              </div>
            ) : (
              <Image src={user?.avatar || "/assets/angkutin_white.png"} alt="User Avatar" width={150} height={150} className="h-[150px] w-[150px] rounded-full object-cover" onError={() => setImageError(true)} unoptimized />
            )}

            <label className="cursor-pointer text-sm mt-8 bg-[#016A70] text-white py-2 px-4 rounded-full">
              Ganti Foto
              <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
            </label>
            <div className="mt-6 text-center">
              <h2 className="font-semibold text-[#016A70]">{user?.name}</h2>
              <h3 className="text-slate-500 text-sm">{formatPhoneNumber(user?.phone as string) || "Belum ada nomor telepon"}</h3>
              {/* <h3 className="text-slate-500 text-sm">{user?.phone || "Belum ada nomor telepon"}</h3> */}
            </div>
          </div>

          {/* Form kanan */}
          <div className="w-full h-full  rounded-2xl p-5">
            <h2 className="text-xl font-semibold text-[#016A70]">General Information</h2>

            <div className="mt-2">
              <label className="text-slate-500 font-medium">Fullname</label>
              <input type="text" value={formData?.name ?? ""} onChange={(e) => handleFieldChange("name", e.target.value)} className="w-full p-2 border rounded-lg mt-1 text-slate-600" />
            </div>
            <div className="mt-2">
              <label className="text-slate-500 font-medium">Email</label>
              <input type="email" value={formData?.email || ""} onChange={(e) => handleFieldChange("email", e.target.value)} className="w-full p-2 border rounded-lg mt-1 text-slate-600" />
            </div>
            <div className="mt-2">
              <label className="text-slate-500 font-medium">Phone</label>
              <input type="text" value={formData?.phone ?? ""} onChange={(e) => handleFieldChange("phone", e.target.value)} className="w-full p-2 border rounded-lg mt-1 text-slate-600" />
            </div>

            <div className="mt-4">
              <button onClick={handleUpdate} className="cursor-pointer rounded-lg bg-[#016A70] px-4 py-2 flex gap-4 justify-center items-center text-white">
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
