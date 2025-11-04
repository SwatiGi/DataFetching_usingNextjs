"use client"
import Link from "next/link"
import { useState } from "react"
import {useRouter} from "next/navigation"
export default function LoginPage() {
    let [formValues, setFormValues] = useState({ email: "", password: "" })
     const router = useRouter()
    let validation = () => {
        let err = {}
        if (!formValues.email) {
         err.email = "Value for email is require"
        }
        if (!formValues.password) {
         err.password = "password is require"
        } else {
            if (formValues.password.length < 6) {
            err.password="Password length should 6 or <"
            }
        }
        return err
    }
    
    let  onSubmitHandler = async(e) => {
        e.preventDefault();
        let err = validation()
        if (Object.keys(err).length > 0) {
            return;
        }
        let res = await fetch("/api/login", {
            method: "POST",
            body: JSON.stringify({ email: formValues.email, password: formValues.password }),
            headers: {
            "Content-Type":"application/josn"
            }
        })
        if (res.ok) {
        router.push("/product")
        } else {
        alert("Login failed")
        }
    }
    return <div>
        <h1 className="text-4xl text-pink-500 text-center p-2">Login page</h1>
        
       <form
  onSubmit={onSubmitHandler}
  className="max-w-sm mx-auto mt-10 p-6 bg-pink-50 dark:bg-pink-900 rounded-2xl shadow-lg flex flex-col gap-4 transition-all duration-300"
>
  <h2 className="text-2xl font-semibold text-center text-pink-600 dark:text-pink-300 mb-2">
    Login
  </h2>

  <div className="flex flex-col">
    <label className="text-pink-700 dark:text-pink-200 mb-1">Email:</label>
    <input
      type="email"
      value={formValues.email}
      onChange={(e) =>
        setFormValues({ ...formValues, email: e.target.value })
      }
      className="border border-pink-300 dark:border-pink-700 rounded-lg p-2 bg-white dark:bg-pink-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
      placeholder="Enter your email"
      required
    />
  </div>

  <div className="flex flex-col">
    <label className="text-pink-700 dark:text-pink-200 mb-1">Password:</label>
    <input
      type="password"
      value={formValues.password}
      onChange={(e) =>
        setFormValues({ ...formValues, password: e.target.value })
      }
      className="border border-pink-300 dark:border-pink-700 rounded-lg p-2 bg-white dark:bg-pink-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
      placeholder="Enter your password"
      required
    />
  </div>

       
        <button
    type="submit"
    className="mt-4 bg-pink-500 hover:bg-pink-600 dark:bg-pink-700 dark:hover:bg-pink-600 text-white font-semibold py-2 rounded-lg transition-all duration-200 cursor-pointer" 
  >
    Login
  </button>
        
</form>

    </div>
}