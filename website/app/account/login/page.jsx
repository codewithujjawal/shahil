"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  // State initialization
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);  // This state is important for the checkbox

  // Handle input changes correctly
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "userName") setUserName(value);
    else if (name === "email") setEmail(value);
    else if (name === "password") setPassword(value);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = { userName, email, password };

    try {
      let res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      let response = await res.json();

      if (res.ok && response.success) {
        const name = response.user?.name || "User";

        // Clear input fields
        setUserName("");
        setEmail("");
        setPassword("");

        // Save the token based on the remember me option
        if (rememberMe) {
          localStorage.setItem("token", response.token);
        }

        // Show success toast
        toast.success(`Welcome back, ${name}!`, {
          position: "top-right",
          autoClose: 3000,
          theme: "light",
          transition: Bounce,
        });

        // Redirect after 3 seconds
        setTimeout(() => {
          window.location.href = "/";
        }, 3000);
      } else {
        toast.error(response.error || "Oops! Something went wrong", {
          position: "top-right",
          autoClose: 5000,
          theme: "light",
          transition: Bounce,
        });
      }
    } catch (error) {
      console.error("Error during submission:", error.message || error);
      toast.error("Network error. Please try again later.", {
        position: "top-right",
        autoClose: 5000,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  return (
    <section className="bg-white dark:bg-gray-50 min-h-screen flex items-center justify-center">
      <ToastContainer />
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">
          Sign in to your account
        </h1>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="userName" className="block mb-2 text-sm font-medium text-gray-700">
              Enter your username
            </label>
            <input
              onChange={handleChange}
              value={userName}
              type="text"
              name="userName"
              id="userName"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Choose a username"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">
              Your email
            </label>
            <input
              onChange={handleChange}
              value={email}
              type="email"
              name="email"
              id="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Type your Email"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              onChange={handleChange}
              value={password}
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember"
                type="checkbox"
                className="w-4 h-4 border border-gray-300 rounded"
                onChange={(e) => setRememberMe(e.target.checked)}  // Update the state correctly
                checked={rememberMe}  // Bind the state to the checkbox
              />
              <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
                Remember me
              </label>
            </div>
            <Link href="/account/forgot-password" className="text-sm text-blue-500 hover:underline">
              Forgot password?
            </Link>
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
          >
            Sign in
          </button>
          <p className="text-sm text-center text-gray-600 mt-4">
            Don’t have an account?{" "}
            <Link href="/account/signup" className="text-blue-500 hover:underline">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
}
