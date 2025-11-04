"use client"

import { useRouter } from 'next/navigation'
import React from 'react'
import { useSession,signIn,signOut } from "next-auth/react"
export default function Dashboard() {
  const { data: session, status } = useSession();
  if (status === "loading") {
  return <p>Loading...</p>
  }
  if (session) {
    return <div>
      <p>The user is logged in</p>
      <p>Signed in as : {session.user.name || session.user.email}</p>
      <button onClick={()=>signOut()}>Sign out</button>
      
    </div>
  }
    // let router = useRouter()
    // async function logoutHandler(e) {
    //     e.preventDefault();
    //     let res =await fetch("/api/logout", {
    //     method:"POST",
    //     })
    //     if (res.ok) {
    //     router.push("/login")
    //     } else {
    //     alert("Logout successful🥳🥳")
    //     }
  // }
  
  return (
    <div>
      <p>Not signed in</p>
    <button onClick={()=>signIn("github")}>Sign in</button>
    </div>
      // <div>
      //     <h1>This is a dashboard page</h1>
      //   <button onClick={logoutHandler}>Log out</button>
      // </div>
  )
}

