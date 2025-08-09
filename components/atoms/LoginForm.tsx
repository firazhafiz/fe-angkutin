"use client";
import { ChangeEvent, FormEvent } from "react";
interface LoginFormProps {
  formData: {
    email: string;
    password: string;
  };
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: FormEvent) => void;
  loading?: boolean; // tambahkan
  error?: string | null;
}

export default function LoginForm({ error, formData, onChange, onSubmit, loading }: LoginFormProps) {
  return (
    <form onSubmit={onSubmit} className="w-full space-y-4">
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
      <div>{error && <p className="text-red-500">{error}</p>}</div>
      <button
        type="submit"
        disabled={loading}
        className={`w-full bg-tosca text-white font-semibold py-3 rounded-md transition-colors mt-6 flex items-center justify-center gap-2 ${loading ? "opacity-70 cursor-not-allowed" : "hover:bg-tosca/90"}`}>
        {loading && (
          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
          </svg>
        )}
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}
