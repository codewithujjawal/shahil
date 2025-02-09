"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import parse from "html-react-parser"; // Import the parser

export default function BlogPage() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    async function fetchBlog() {
      try {
        const res = await fetch(`/api/blog/${slug}`);
        const data = await res.json();

        if (res.ok) {
          setBlog(data);
          setLikes(data.likes || 0);
          setLiked(localStorage.getItem(`liked_${slug}`) === "true");
        } else {
          console.error("Error fetching blog:", data.error);
        }
      } catch (error) {
        console.error("Network error:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchBlog();
  }, [slug]);

  async function handleLike() {
    if (liked) return;

    try {
      const res = await fetch(`/api/blog/${slug}`, { method: "POST" });
      const data = await res.json();

      if (res.ok) {
        setLikes(data.likes);
        setLiked(true);
        localStorage.setItem(`liked_${slug}`, "true");
      } else {
        console.error("Error liking blog:", data.error);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  }

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (!blog) return <p className="text-center text-red-500">Blog not found</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">{blog.title}</h1>
      <div className="text-gray-600 mb-4">Views: {blog.views}</div>

      {/* ✅ Fix: Use `parse(blog.content)` instead of dangerouslySetInnerHTML */}
      <div className="text-lg text-gray-700 leading-relaxed">
        {parse(blog.content)}
      </div>

      {/* Like Button */}
      <button
        onClick={handleLike}
        disabled={liked}
        className={`mt-4 px-4 py-2 rounded-lg transition ${
          liked ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600 text-white"
        }`}
      >
        👍 Like {likes}
      </button>
    </div>
  );
}
