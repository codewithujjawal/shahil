"use client"; // Ensures this runs only on the client-side

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Prevents hydration mismatch

  return (
    <nav className="flex justify-between items-center px-8 py-4 max-w-screen-xl mx-auto border-b border-gray-200">
      {/* Logo */}
      <Link href="/" className="text-2xl font-semibold tracking-wide text-gray-800 hover:text-gray-900">
        Shahil Sharma
      </Link>

      {/* Desktop Navigation */}
      <ul className="hidden md:flex space-x-6">
        <li>
          <Link href="/blog" className="transform hover:scale-90 text-lg text-gray-600 hover:text-gray-900 transition-all duration-300">
            Blog
          </Link>
        </li>
        <li>
          <Link href="/video" className="transform hover:scale-90 text-lg text-gray-600 hover:text-gray-900 transition-all duration-300">
            Video
          </Link>
        </li>
        <li>
          <Link href="/shop" className="transform hover:scale-90 text-lg text-gray-600 hover:text-gray-900 transition-all duration-300">
            Shop
          </Link>
        </li>
      </ul>

      {/* Account Button (Desktop Only) */}
      <button className="hidden md:block transform hover:scale-90 px-6 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100 transition-all duration-300">
        Account
      </button>

      {/* Hamburger Icon (Mobile Only) */}
      <button className="md:hidden flex items-center" onClick={() => setIsOpen(true)}>
        <svg className="w-8 h-8 text-gray-800 hover:text-gray-900 transition" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </button>

      {/* Mobile Sidebar Menu */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={() => setIsOpen(false)}>
          <div className="w-3/4 max-w-sm bg-white h-full shadow-lg flex flex-col p-6 absolute right-0" onClick={(e) => e.stopPropagation()}>
            <button className="self-end text-gray-800 hover:text-gray-900" onClick={() => setIsOpen(false)}>✕</button>

            <nav className="mt-6 space-y-4">
              <Link href="/blog" className="block text-lg text-gray-700 hover:text-blue-500 transition">
                Blog
              </Link>
              <Link href="/video" className="block text-lg text-gray-700 hover:text-blue-500 transition">
                Video
              </Link>
              <Link href="/shop" className="block text-lg text-gray-700 hover:text-blue-500 transition">
                Shop
              </Link>
            </nav>

            <button className="mt-auto w-full py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100 transition">
              Account
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
