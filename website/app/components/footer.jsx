"use client"
import { useState, useEffect } from "react";

export default function footer() {
  const [year, setYear] = useState(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);
    return (
        <footer className="bg-gray-900 text-gray-400 body-font">
  <div className="container px-5 py-16 mx-auto">
    <div className="flex flex-wrap md:text-left text-center">
      {/* Blog Section */}
      <div className="lg:w-1/4 md:w-1/2 w-full px-4 py-2">
        <h2 className="title-font font-medium text-white tracking-widest text-sm mb-3">BLOG</h2>
        <nav className="list-none space-y-1">
          <li>
            <a href="/blog" className="hover:text-blue-400 transition">Latest Posts</a>
          </li>
          <li>
            <a href="/blog/categories" className="hover:text-blue-400 transition">Categories</a>
          </li>
          <li>
            <a href="/blog/popular" className="hover:text-blue-400 transition">Popular Reads</a>
          </li>
        </nav>
      </div>

      {/* Video Section */}
      <div className="lg:w-1/4 md:w-1/2 w-full px-4 py-6">
        <h2 className="title-font font-medium text-white tracking-widest text-sm mb-3">VIDEOS</h2>
        <nav className="list-none space-y-1">
          <li>
            <a href="/video" className="hover:text-blue-400 transition">Watch Now</a>
          </li>
          <li>
            <a href="/video/categories" className="hover:text-blue-400 transition">Categories</a>
          </li>
          <li>
            <a href="/video/trending" className="hover:text-blue-400 transition">Trending</a>
          </li>
        </nav>
      </div>

      {/* Shop Section */}
      <div className="lg:w-1/4 md:w-1/2 w-full px-4 py-6">
        <h2 className="title-font font-medium text-white tracking-widest text-sm mb-3">SHOP</h2>
        <nav className="list-none space-y-1">
          <li>
            <a href="/shop" className="hover:text-blue-400 transition">Visit Store</a>
          </li>
          <li>
            <a href="/shop/new-arrivals" className="hover:text-blue-400 transition">New Arrivals</a>
          </li>
          <li>
            <a href="/shop/best-sellers" className="hover:text-blue-400 transition">Best Sellers</a>
          </li>
        </nav>
      </div>

      {/* Newsletter Section */}
      <div className="lg:w-1/4 md:w-1/2 w-full px-4 py-6">
        <h2 className="title-font font-medium text-white tracking-widest text-sm mb-3">NEWSLETTER</h2>
        <p className="text-gray-500 text-sm mb-3">Stay updated with the latest blogs, videos, and exclusive offers.</p>
        <div className="flex">
          <input type="email" placeholder="Your Email" className="w-full px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded focus:ring-2 focus:ring-blue-400 focus:outline-none" />
          <button className="ml-2 px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 transition">Subscribe</button>
        </div>
      </div>
    </div>
  </div>

  {/* Bottom Section */}
  <div className="border-t border-gray-800 mt-8 py-6 lg:mx-8">
    <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
      <a href="/" className="flex items-center text-white">
        <span className="text-lg font-semibold">Shahil Sharma</span>
      </a>
      <p className="text-sm text-gray-500 mt-4 sm:mt-0">©{year} shahilsharma.com All rights reserved.</p>
      <div className="flex mt-4 sm:mt-0 space-x-4">
        <a href="#" className="text-gray-400 hover:text-blue-400 transition">
          <i className="fab fa-facebook"></i>
        </a>
        <a href="#" className="text-gray-400 hover:text-blue-400 transition">
          <i className="fab fa-twitter"></i>
        </a>
        <a href="#" className="text-gray-400 hover:text-blue-400 transition">
          <i className="fab fa-instagram"></i>
        </a>
      </div>
    </div>
  </div>
</footer>

    )}