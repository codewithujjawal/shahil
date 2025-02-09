"use client"

import { useEffect, useState } from "react";
import { FaYoutube } from "react-icons/fa";

export default function VideoGallery() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetch("/api/getvideos") // Adjust the endpoint as needed
      .then((response) => response.json())
      .then((data) => setVideos(data.videos)) // Assuming the API returns an array
      .catch((error) => console.error("Error fetching videos:", error));
  }, []);

  return (
    <section className="text-gray-700 body-font">
      <div className="container px-6 py-10 mx-auto">
        {/* Header Section */}
        <div className="flex flex-col">
          <div className="flex flex-wrap flex-col py-6 mb-12 text-center">
            <h1 className=" text-gray-900 text-center font-medium title-font text-2xl mb-2 sm:mb-0">
              Videos
            </h1>
            <p className="leading-relaxed text-base sm:pl-10 pl-0">
              Watch my latest insightful videos, which is crafted for breaking
              myths and exploring deep truths.
            </p>
          </div>
        </div>

        {/* Video Cards */}
        <div className="flex flex-wrap -m-4">
          {videos.length > 0 ? (
            videos.map((video, index) => (
              <div key={index} className="p-4 md:w-1/3 sm:mb-0 mb-6">
                <div className="rounded-lg overflow-hidden aspect-video">
                  {/* Embed YouTube Video - Hide recommendations */}
                  <iframe
                    className="w-full h-full"
                    src={`${video.url}&rel=0&showinfo=0&modestbranding=1`}
                    title={video.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                {/* Video Title */}
                <h2 className="text-xl font-medium title-font text-gray-900 mt-5">
                  {video.title}
                </h2>
                {/* Watch on YouTube Button */}
                <a
                  href={video.url.replace("/embed/", "/watch?v=")} // Convert to watch URL
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 inline-flex items-center mt-3 hover:text-blue-600"
                >
                  Watch on YouTube
                  <FaYoutube className="ml-2 text-red-500 text-lg" />
                </a>
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
      </div>
    </section>
  );
}
