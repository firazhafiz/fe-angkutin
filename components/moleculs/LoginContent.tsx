"use client";

import { useState } from "react";
import LoginForm from "../atoms/LoginForm";
import GoogleAuth from "../atoms/GoogleAuth";
import Link from "next/link";

interface FormData {
  email: string;
  password: string;
}

export default function LoginContent() {
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
    try {
      const response = await fetch(
        `https://angkutin.vercel.app/v1/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Login failed");
      console.log(data.data.user);
      localStorage.setItem("user", JSON.stringify(data.data.user));

      localStorage.setItem("token", data.data.tokens.access.token);
      window.location.href = "/";
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Login failed";
      console.error("Login error:", errorMessage);
    }
  };

  return (
    <div className="w-[500px] h-auto bg-white rounded-lg shadow-sm p-8">
      <h1 className="text-3xl font-bold text-black-100 text-center mb-8 font">
        Login
      </h1>

      <LoginForm
        formData={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />

      {/* OR Separator */}
      <div className="flex items-center justify-center my-6">
        <div className="flex-1 border-t border-gray-300"></div>
        <span className="px-4 text-gray-500 text-sm">OR</span>
        <div className="flex-1 border-t border-gray-300"></div>
      </div>

      {/* Google Auth */}
      <GoogleAuth text="Sign up with Google" />

      {/* Sign Up Link */}
      <p className="text-center mt-6 text-gray-600">
        Don&apos;t have an account?{" "}
        <Link
          href="/register"
          className="text-tosca font-semibold hover:underline"
        >
          Sign up
        </Link>
      </p>
    </div>
  );
}
