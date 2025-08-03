"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { IoChevronDown } from "react-icons/io5";

export default function DropdownNav() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        closeDropdown();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-1 focus:outline-none hover:text-gray-200 cursor-pointer transition-all duration-200"
      >
        Resources
        <IoChevronDown
          className={`w-4 h-4 ml-1 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      <div
        className={`absolute top-full left-0 mt-2 w-48 bg-white/90 backdrop-blur-md rounded-xl shadow-lg border border-white/20 transition-all duration-300 ease-in-out ${
          isOpen
            ? "opacity-100 visible translate-y-0"
            : "opacity-0 invisible -translate-y-2"
        }`}
      >
        <div className="py-2">
          <Link
            href="/blog"
            className="block px-4 py-3 text-gray-700 hover:bg-tosca/10 hover:text-tosca transition-colors duration-200 rounded-lg mx-2"
            onClick={closeDropdown}
          >
            Blog
          </Link>
          <Link
            href="/tutorial"
            className="block px-4 py-3 text-gray-700 hover:bg-tosca/10 hover:text-tosca transition-colors duration-200 rounded-lg mx-2"
            onClick={closeDropdown}
          >
            Tutorial
          </Link>
          <Link
            href="/leaderboard"
            className="block px-4 py-3 text-gray-700 hover:bg-tosca/10 hover:text-tosca transition-colors duration-200 rounded-lg mx-2"
            onClick={closeDropdown}
          >
            Leaderboard
          </Link>
        </div>
      </div>
    </div>
  );
}
