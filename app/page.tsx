"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";

// ✅ Product type definition
interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[]; // added images property
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // ✅ Fetch data from API
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("https://dummyjson.com/product"); // ✅ correct endpoint
        const data = await res.json();
        setProducts(data.products); // ✅ correct key
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // ✅ UI
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black font-sans text-black dark:text-white p-6">
      {loading ? (
        <h1 className="text-2xl text-pink-500 font-semibold">Loading...</h1>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((item) => (
            <Link href={`/product/${item.id}`} key={item.id}>
              <div className="p-4 border border-pink-500 rounded-2xl shadow-md hover:shadow-pink-400 transition-all duration-300">
                <h2 className="text-lg font-semibold mb-2">
                  {item.id} — {item.title} (${item.price})
                </h2>

                {/* ✅ Show first image safely */}
                {item.images && item.images.length > 0 ? (
                  <img
                    src={item.images[0]}
                    alt={item.title}
                    className="w-full h-48 object-cover rounded-xl mb-2"
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-300 dark:bg-zinc-700 rounded-xl flex items-center justify-center">
                    <span>No Image</span>
                  </div>
                )}

                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                  {item.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
