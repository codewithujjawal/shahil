"use client"

import { useEffect, useState } from "react";

export default function Shop() {
    const [shop, setShop] = useState([]);

    useEffect(() => {
        // Fetch blogs data from your API
        fetch('/api/getshops') // Adjust the endpoint as needed
            .then((response) => response.json())
            .then((data) => setShop(data.shops))
            .catch((error) => console.error("Error fetching blogs:", error));
    }, []);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
            {/* Header Section */}
            <div className="flex flex-col">
                <div className="flex flex-wrap flex-col py-6 mb-12 text-center">
                    <h1 className="text-gray-900 text-center font-medium title-font text-2xl mb-2 sm:mb-0">
                        Shop
                    </h1>
                    <p className="leading-relaxed text-base sm:pl-10 pl-0">
                        Discover handpicked products that I personally recommend, curated to add value and quality to your life.
                    </p>
                </div>
            </div>



            {shop.length > 0 ? (
                shop.map((item) => (
                    <div key={item._id} className="border p-4 rounded-lg shadow-md">
                        <img
                            src={item.image_url}
                            alt={item.title}
                            className="w-full h-48 object-cover rounded-md"
                        />
                        <h2 className="text-lg font-semibold mt-2 truncate">{item.title}</h2>
                        <a
                            href={item.link}
                            className="text-blue-500 hover:underline block mt-1"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            View Product
                        </a>
                    </div>
                ))) : (
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
    );
}
