"use client";
import { ChangeEvent, FormEvent } from "react";

interface LoginFormProps {
  formData: {
    email: string;
    password: string;
  };
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: FormEvent) => void;
}

export default function LoginForm({ formData, onChange, onSubmit }: LoginFormProps) {
  return (
    <form onSubmit={onSubmit} className="w-full space-y-4">
      {/* Email Field */}
      <div>
        <label htmlFor="email" className="block text-md font-medium text-gray-700 mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={onChange}
          placeholder="Input your email"
          required
          className="w-full px-3 py-2 border text-sm text-black-100 placeholder:text-gray-400 border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-tosca"
        />
      </div>

      {/* Password Field */}
      <div>
        <label htmlFor="password" className="block text-md font-medium text-gray-700 mb-2">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={onChange}
          placeholder="Input your password"
          required
          className="w-full px-3 py-2 border text-sm text-black-100 placeholder:text-gray-400 border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-tosca"
        />
      </div>

      <button type="submit" className="w-full bg-tosca text-white font-semibold py-3 rounded-md hover:bg-tosca/90 transition-colors mt-6">
        Login
      </button>
    </form>
  );
}
