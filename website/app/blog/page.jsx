"use client"

import { useEffect, useState } from 'react';
import { FaEye } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import Link from 'next/link';

export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    // Fetch blogs data from your API
    fetch('/api/getblogs') // Adjust the endpoint as needed
      .then((response) => response.json())
      .then((data) => setBlogs(data.blogs))
      .catch((error) => console.error("Error fetching blogs:", error));
  }, []);

  return (
    <section className="text-gray-700 body-font">
      {/* Header Section */}
      <div className="flex flex-col">
        <div className="flex flex-wrap flex-col py-6 mb-12 text-center">
          <h1 className="text-gray-900 text-center font-medium title-font text-2xl mb-2 sm:mb-0">
            Blog
          </h1>
          <p className="leading-relaxed text-base sm:pl-10 px-5">
            Read my latest thought-provoking blogs where I dive deep into topics that matter and challenge perspectives.
          </p>
        </div>
      </div>


      <div className="container px-5 py-16 mx-auto">
        {blogs.length > 0 ? (
          blogs.map((blog, index) => (
            <div
              key={index}
              className="flex flex-col lg:w-3/5 mx-auto border-b pb-10 mb-10 border-gray-300 sm:flex-row"
            >
              <div className="flex-grow sm:text-left text-center mt-6 sm:mt-0">
                <h2 className="text-gray-900 text-xl font-semibold mb-2">{blog.title}</h2>

                {/* Blog Metrics Section */}
                <div className="flex items-center space-x-6 text-gray-500 text-sm mb-2 ml-4">
                  <div className="flex items-center gap-1">
                    <FaEye className="text-blue-500" />
                    <span>{blog.views}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FaHeart className="text-red-500" />
                    <span>{blog.likes}</span>
                  </div>
                </div>

                <p className="leading-relaxed text-base text-gray-600">{blog.description}</p>

                <Link href={`/blogpost/${blog.slug}`}><span className="mt-3 text-blue-500 inline-flex items-center hover:underline">
                  Read More
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 ml-2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                  </svg>
                </span></Link>
              </div>
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
              <p className="w-full text-center text-gray-300 text-sm mt-20">
                Loading...
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

