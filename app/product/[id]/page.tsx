"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    images: string[];
}

export default function ProductPage() {
    const { id } = useParams<{ id: string }>(); // ✅ Get id from route params
    const [item, setItem] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;
        console.log("✅ ID check:", id);

        fetch(`https://dummyjson.com/product/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setItem(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Fetch error:", err);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <p className="text-center mt-10">Loading...</p>;

    if (!item) return <p className="text-center mt-10 text-red-500">Product not found</p>;

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-zinc-900 p-6">
            <div className="max-w-md w-full bg-white dark:bg-zinc-800 rounded-2xl shadow-lg p-6 text-center">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-3">
                    {item.id} — {item.title} (${item.price})
                </h1>

                {item.images?.length > 0 && (
                    <img
                        src={item.images[0]}
                        alt={item.title}
                        className="w-full h-64 object-cover rounded-lg mb-4"
                    />
                )}

                <p className="text-gray-600 dark:text-gray-300 mb-2">
                    {item.description}
                </p>

                <p className="text-sm text-gray-400 mt-2">Product ID: {item.id}</p>
            </div>
        </div>
    );
}
