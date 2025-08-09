"use client";
import { useState } from "react";
import LoginForm from "../atoms/LoginForm";
import GoogleAuth from "../atoms/GoogleAuth";
import Link from "next/link";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";



interface FormData {
  email: string;
  password: string;
}

export default function LoginContent() {
  const router = useRouter();
  const { login, loading } = useAuth();
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(formData.email, formData.password);
    if (success) {
      router.push("/"); // redirect ke home
    }
  };

  return (
    <div className="w-[500px] h-auto bg-white rounded-lg shadow-sm p-8">
      <h1 className="text-3xl font-bold text-black-100 text-center mb-8 font">Login</h1>
      <LoginForm formData={formData} onChange={handleChange} onSubmit={handleSubmit} loading={loading} />
      <div className="flex items-center justify-center my-6">
        <div className="flex-1 border-t border-gray-300"></div>
        <span className="px-4 text-gray-500 text-sm">OR</span>
        <div className="flex-1 border-t border-gray-300"></div>
      </div>
      <GoogleAuth text="Sign up with Google" />
      <p className="text-center mt-6 text-gray-600">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="text-tosca font-semibold hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  );
}
