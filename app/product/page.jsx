"use client"
import React from 'react'
import { useState, useEffect } from 'react';
import Link from "next/link"
const Product = () => {
  
  
  
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
  
  
    useEffect(() => {
      async function fetchData() {
        try {
          const res = await fetch("https://dummyjson.com/product");
          const data = await res.json();
          setProducts(data.products);
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setLoading(false);
        }
      }
  
      fetchData();
    }, []);
  
  
    return (
      <>
  
  
        <img src='banner.jpg' className="w-full absolute h-[40%]" alt='girlImage' />
        <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black font-sans text-black dark:text-white mt-[300] p-6">
          {loading ? (
            <h1 className="text-2xl text-pink-500 font-semibold">Loading...</h1>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((item) => (
                <Link href={`/product/${item.id}`} key={item.id}>
                  <div className="p-4 border border-pink-500 rounded-2xl shadow-md hover:shadow-pink-400 transition-all duration-300">
                    <h2 className="text-lg font-semibold mb-2">
                      {item.id} — {item.title} (${item.price})
                    </h2>
  
  
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
      </>
    );
  }
  


export default Product