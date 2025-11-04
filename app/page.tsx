"use client";


import Link from "next/link";
// import React, { useEffect, useState } from "react";

import Dashboard from "./dashboard/page"
import Product from "./product/page";
interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
}

export default function Home() {

  return <div >
    <p className="text-4xl text-pink-600 text-center m-4 p-4">This is Home page</p>
    <Link href="/login">
      <button className="border border-pink-600 p-2 px-8 rounded ml-[40%]" >Login</button>
    </Link>
    {/* <Product /> */}
  </div>

}


// export default function Home() {
//   return (
//     <Dashboard />
//   )
// }