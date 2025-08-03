"use client";

import { useState } from "react";

export default function LoginForm() {
  const [formData, setFormData] = useState({
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log("Login form submitted:", formData);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-4">
      {/* Email Field */}
      <div>
        <label
          htmlFor="email"
          className="block text-md font-medium text-gray-700 mb-2"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Input your email"
          className="w-full px-3 py-2 border text-sm text-black-100 placeholder:text-gray-400 placeholder:text-sm border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-tosca focus:border-transparent"
          required
        />
      </div>

      {/* Password Field */}
      <div>
        <label
          htmlFor="password"
          className="block text-md font-medium text-gray-700 mb-2"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Input your password"
          className="w-full px-3 py-2 border text-sm text-black-100 placeholder:text-gray-400 placeholder:text-sm border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-tosca focus:border-transparent"
          required
        />
      </div>
    </form>
  );
}
