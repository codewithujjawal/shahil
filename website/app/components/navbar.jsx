"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login"); // "login" or "signup"
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    rememberMe: false,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <nav className="invisible"></nav>; // Prevents hydration mismatch

  const handleAuthToggle = (mode) => {
    setAuthMode(mode);
    setIsAuthOpen(true);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = authMode === "login" ? "/api/login" : "/api/signup";
    try {
      let res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      let response = await res.json();

      if (res.ok && response.success) {
        if (formData.rememberMe) {
          localStorage.setItem("token", response.token);
        }
        toast.success(`${authMode === "login" ? "Welcome back" : "Account created"}!`, {
          position: "top-right",
          autoClose: 3000,
          theme: "light",
          transition: Bounce,
        });

        setTimeout(() => {
          window.location.href = "/";
        }, 3000);
      } else {
        toast.error(response.error || "Something went wrong", {
          position: "top-right",
          autoClose: 5000,
          theme: "light",
          transition: Bounce,
        });
      }
    } catch (error) {
      toast.error("Network error. Try again later.", {
        position: "top-right",
        autoClose: 5000,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  return (
    <>
      <ToastContainer />
      <nav className="sticky top-0 bg-white shadow-md px-8 py-4 w-full mx-auto border-b border-gray-200 z-50">
        {/* Logo */}
        <div className="sm:mx-20 flex justify-between items-center">
        <Link href="/" className="text-2xl font-semibold tracking-wide text-gray-800 hover:text-gray-900">
          Shahil Sharma
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex space-x-6">
          <li><Link href="/blog" className="text-lg text-gray-600 hover:text-gray-900">Blog</Link></li>
          <li><Link href="/video" className="text-lg text-gray-600 hover:text-gray-900">Video</Link></li>
          <li><Link href="/shop" className="text-lg text-gray-600 hover:text-gray-900">Shop</Link></li>
        </ul>

        {/* Account Button */}
        <button className="hidden md:block px-6 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100" onClick={() => setIsAuthOpen(true)}>
          Account
        </button>

        {/* Mobile Hamburger Menu */}
        <button className="md:hidden flex items-center" onClick={() => setIsOpen(true)}>
          <svg className="w-8 h-8 text-gray-800 hover:text-gray-900" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button></div>

        {/* Mobile Sidebar */}
        {isOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={() => setIsOpen(false)}>
            <div className="w-3/4 max-w-sm bg-white h-full shadow-lg flex flex-col p-6 absolute right-0">
              <button className="self-end" onClick={() => setIsOpen(false)}>✕</button>
              <nav className="mt-6 space-y-4">
                <Link href="/blog" className="block text-lg text-gray-700 hover:text-blue-500">Blog</Link>
                <Link href="/video" className="block text-lg text-gray-700 hover:text-blue-500">Video</Link>
                <Link href="/shop" className="block text-lg text-gray-700 hover:text-blue-500">Shop</Link>
              </nav>
              <button className="mt-auto w-full py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100" onClick={() => setIsAuthOpen(true)}>
                Account
              </button>
            </div>
          </div>
        )}

        {/* Auth Modal */}
        {isAuthOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
              <button className="absolute top-3 right-3 text-gray-700" onClick={() => setIsAuthOpen(false)}>✕</button>
              <div className="flex justify-center space-x-6 mb-4">
                <button className={`px-4 py-2 rounded ${authMode === "login" ? "bg-blue-500 text-white" : "bg-gray-200"}`} onClick={() => handleAuthToggle("login")}>Login</button>
                <button className={`px-4 py-2 rounded ${authMode === "signup" ? "bg-blue-500 text-white" : "bg-gray-200"}`} onClick={() => handleAuthToggle("signup")}>Sign Up</button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                {authMode === "signup" && <input type="text" name="userName" placeholder="Username" className="w-full px-4 py-2 border rounded" onChange={handleChange} />}
                <input type="email" name="email" placeholder="Email" className="w-full px-4 py-2 border rounded" onChange={handleChange} />
                <input type="password" name="password" placeholder="Password" className="w-full px-4 py-2 border rounded" onChange={handleChange} />
                <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">{authMode === "login" ? "Login" : "Sign Up"}</button>
              </form>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
