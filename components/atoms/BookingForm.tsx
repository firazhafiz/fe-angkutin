"use client";

import { useState } from "react";

export default function BookingForm() {
  const [formData, setFormData] = useState({
    scheduleDate: "",
    scheduleTime: "",
    email: "",
    notes: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="space-y-4">
      {/* Schedule Pickup and Email Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Schedule Pickup */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Schedule Pickup
          </label>
          <div className="space-y-3">
            {/* Date Input */}
            <div className="relative">
              <input
                type="date"
                value={formData.scheduleDate}
                onChange={(e) =>
                  handleInputChange("scheduleDate", e.target.value)
                }
                className="w-full px-3 py-3 border text-sm text-black-100 placeholder:text-gray-400 placeholder:text-sm border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-tosca focus:border-transparent"
              />
            </div>
            {/* Time Input */}
            <div className="relative">
              <input
                type="time"
                value={formData.scheduleTime}
                onChange={(e) =>
                  handleInputChange("scheduleTime", e.target.value)
                }
                className="w-full px-3 py-3 border text-sm text-black-100 placeholder:text-gray-400 placeholder:text-sm border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-tosca focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <div className="relative">
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              placeholder="Enter your email address"
              className="w-full px-3 py-3 border text-sm text-black-100 placeholder:text-gray-400 placeholder:text-sm border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-tosca focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Notes Textarea */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Notes
        </label>
        <textarea
          value={formData.notes}
          onChange={(e) => handleInputChange("notes", e.target.value)}
          placeholder="Describe your notes here..."
          rows={4}
          className="w-full px-3 py-2 border text-sm text-black-100 placeholder:text-gray-400 placeholder:text-sm border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-tosca focus:border-transparent"
        />
      </div>
    </div>
  );
}
