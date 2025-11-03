import React from "react";

// ✅ Type definition
interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    images: string[];
}

// ✅ Props type (Next.js gives params)
interface ProductPageProps {
    params: { id: string };
}

export default async function ProductPage({ params }: ProductPageProps) {
    const { id } = params;

    // ✅ Fetch product details
    const res = await fetch(`https://dummyjson.com/product/${id}`);
    if (!res.ok) throw new Error("Failed to fetch product");

    const item: Product = await res.json();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-zinc-900 p-6">
            <div className="max-w-md w-full bg-white dark:bg-zinc-800 rounded-2xl shadow-lg p-6 text-center">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-3">
                    {item.title}
                </h1>

                {/* ✅ Product image */}
                <img
                    src={item.images[0]}
                    alt={item.title}
                    className="w-full h-64 object-cover rounded-lg mb-4"
                />

                <p className="text-gray-600 dark:text-gray-300 mb-2">
                    {item.description}
                </p>

                <p className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                    ${item.price}
                </p>

                <p className="text-sm text-gray-400 mt-2">Product ID: {item.id}</p>
            </div>
        </div>
    );
}
