"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function BlogPage() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [likes, setLikes] = useState(0);

  useEffect(() => {
    async function fetchBlog() {
      try {
        const res = await fetch(`/api/blog/${slug}`);
        const data = await res.json();

        if (res.ok) {
          setBlog(data);
          setLikes(data.likes || 0);
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

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (!blog) return <p className="text-center text-red-500">Blog not found</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">{blog.title}</h1>
      <div className="text-gray-600 mb-4">Views: {blog.views}</div>
      <p className="text-lg text-gray-700 leading-relaxed">{blog.content}</p>

      {/* Like Button */}
      <button
        onClick={() => setLikes(likes + 1)}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
      >
        👍 Like {likes}
      </button>
    </div>
  );
}
