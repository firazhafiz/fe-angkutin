"use client";

import RegisterForm from "../atoms/RegisterForm";
import GoogleAuth from "../atoms/GoogleAuth";
import Link from "next/link";
import { useState } from "react";

export default function RegisterContent() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Password and confirmation do not match.");
      return;
    }
    try {
      const res = await fetch(`http://localhost:4000/v1/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Registration failed");
      }

      window.location.href = "/login"; // atau gunakan router.push jika pakai next/navigation
    } catch (error: any) {
      console.error("Registration error:", error.message);
    }
  };

  return (
    <div className="w-[570px] bg-white rounded-lg shadow-sm p-8">
      <h1 className="text-2xl font-bold text-gray-900 text-center mb-6">Register</h1>

      <RegisterForm formData={formData} onChange={handleChange} />

      <button onClick={handleRegister} className="w-full bg-tosca text-white font-semibold py-3 rounded-md hover:bg-tosca/90 transition-colors mt-4">
        Register
      </button>

      <div className="flex items-center justify-center my-4">
        <div className="flex-1 border-t border-gray-300"></div>
        <span className="px-4 text-gray-500 text-sm">OR</span>
        <div className="flex-1 border-t border-gray-300"></div>
      </div>

      <GoogleAuth text="Sign up with Google" />

      <p className="text-center mt-4 text-gray-600">
        Already have an account?{" "}
        <Link href="/login" className="text-tosca font-semibold hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
