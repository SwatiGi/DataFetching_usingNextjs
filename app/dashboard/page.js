"use client"

import { useRouter } from 'next/navigation'
import React from 'react'

export default  function Dashboard() {
    let router = useRouter()
    async function logoutHandler(e) {
        e.preventDefault();
        let res =await fetch("/api/logout", {
        method:"POST",
        })
        if (res.ok) {
        router.push("/login")
        } else {
        alert("Logout successful🥳🥳")
        }
    }
  return (
      <div>
          <h1>This is a dashboard page</h1>
        <button onClick={logoutHandler}>Log out</button>
      </div>
  )
}

