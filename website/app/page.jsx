"use client"
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiShoppingBag, FiVideo, FiBookOpen } from "react-icons/fi";

export default function Home() {
  const [blogs, setBlogs] = useState([]);
  const [videos, setVideos] = useState([]);
  const [shops, setShops] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const [blogRes, videoRes, shopRes] = await Promise.all([
          fetch("/api/getblogs").then((res) => res.json()),
          fetch("/api/getvideos").then((res) => res.json()),
          fetch("/api/getshops").then((res) => res.json()),
        ]);

        console.log("Blogs:", blogRes);
        console.log("Videos:", videoRes);
        console.log("Shops:", shopRes);

        setBlogs(blogRes.blogs || []);
        setVideos(videoRes.videos || []);
        setShops(shopRes.shops || []);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="container mx-auto px-6 py-16 space-y-16">
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-5xl font-bold text-gray-900">Welcome to My World</h1>
        <p className="text-lg text-gray-600 mt-4 max-w-3xl mx-auto">
          Explore insightful blogs, eye-opening videos, and curated products.
        </p>
      </motion.div>

      {/* Blogs Section */}
      <motion.div className="space-y-8" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <div className="flex items-center mb-6">
          <FiBookOpen className="text-3xl text-blue-500 mr-3" />
          <h2 className="text-3xl font-semibold text-gray-800">Latest Blogs</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {blogs.length > 0 ? (
            blogs.map((blog) => (
              <motion.div
                key={blog._id}
                className="p-6 bg-white shadow-lg rounded-xl hover:shadow-2xl transition duration-300"
                whileHover={{ scale: 1.05 }}
              >
                <h3 className="text-xl font-medium">{blog.title}</h3>
                <p className="text-md text-gray-500 mt-3">{blog.content.slice(0, 120)}...</p>
                <a href={`/blogpost/${blog.slug}`} className="text-blue-500 mt-4 inline-block font-semibold">
                  Read More →
                </a>
              </motion.div>
            ))
          ) : (
            <p className="text-gray-500">No blogs available</p>
          )}
        </div>
      </motion.div>

      {/* Videos Section */}
      <motion.div className="space-y-8" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <div className="flex items-center mb-6">
          <FiVideo className="text-3xl text-red-500 mr-3" />
          <h2 className="text-3xl font-semibold text-gray-800">Latest Videos</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {videos.length > 0 ? (
            videos.map((video) => (
              <motion.div
                key={video._id}
                className="p-6 bg-white shadow-lg rounded-xl hover:shadow-2xl transition duration-300"
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-full h-64">
                  <iframe
                    className="w-full h-full rounded-md"
                    src={video.url}
                    title={video.title}
                    allowFullScreen
                  ></iframe>
                </div>
                <h3 className="text-xl font-medium mt-4">{video.title}</h3>
                <a href={video.url} target="_blank" className="text-blue-500 mt-2 inline-block font-semibold">
                  Watch on YouTube →
                </a>
              </motion.div>
            ))
          ) : (
            <p className="text-gray-500">No videos available</p>
          )}
        </div>
      </motion.div>

      {/* Shops Section */}
      <motion.div className="space-y-8" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <div className="flex items-center mb-6">
          <FiShoppingBag className="text-3xl text-green-500 mr-3" />
          <h2 className="text-3xl font-semibold text-gray-800">Shop</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {shops.length > 0 ? (
            shops.map((shop) => (
              <motion.div
                key={shop._id}
                className="p-6 bg-white shadow-lg rounded-xl hover:shadow-2xl transition duration-300"
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-full h-64 flex items-center justify-center">
                  <img src={shop.image_url} alt={shop.title} className="w-auto h-full object-contain rounded-md" />
                </div>
                <h3 className="text-xl font-medium mt-4">{shop.title}</h3>
                <a href={shop.url} target="_blank" className="text-blue-500 mt-4 inline-block font-semibold">
                  Buy Now →
                </a>
              </motion.div>
            ))
          ) : (
            <p className="text-gray-500">No shops available</p>
          )}
        </div>
      </motion.div>
    </div>
  );
}
