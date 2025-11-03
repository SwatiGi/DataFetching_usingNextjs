import React from "react";

// ✅ Type definition for API data
interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
}

// ✅ Props type for Next.js dynamic route
interface ProductPageProps {
  params: { id: string };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = params;
  console.log("Id in params", id)
  // ✅ Fetch product details from API
  const res = await fetch(`https://dummyjson.com/product/${id}`, {
    cache: "no-store", // prevents caching (always fetches fresh data)
  });

  if (!res.ok) {
    // safer error handling
    throw new Error(`Failed to fetch product with id ${id}`);
  }

  const item: Product = await res.json();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-zinc-900 p-6">
      <div className="max-w-md w-full bg-white dark:bg-zinc-800 rounded-2xl shadow-lg p-6 text-center transition-transform duration-300 hover:scale-[1.02]">
        {/* ✅ Product Title */}
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-3">
          {item.title}
        </h1>

        {/* ✅ Product Image */}
        {item.images?.length > 0 ? (
          <img
            src={item.images[0]}
            alt={item.title}
            className="w-full h-64 object-cover rounded-lg mb-4 shadow-md"
          />
        ) : (
          <div className="w-full h-64 flex items-center justify-center bg-gray-200 dark:bg-zinc-700 rounded-lg mb-4 text-gray-500">
            No image available
          </div>
        )}

        {/* ✅ Product Description */}
        <p className="text-gray-600 dark:text-gray-300 mb-2 leading-relaxed">
          {item.description}
        </p>

        {/* ✅ Product Price */}
        <p className="text-lg font-semibold text-blue-600 dark:text-blue-400">
          ${item.price}
        </p>

        {/* ✅ Product ID */}
        <p className="text-sm text-gray-400 mt-3">Product ID: {item.id}</p>
      </div>
    </div>
  );
}
