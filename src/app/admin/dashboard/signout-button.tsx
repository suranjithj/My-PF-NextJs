"use client"

import { signOut } from "next-auth/react"
import { useState } from "react"

export default function SignOutButton() {
  const [loading, setLoading] = useState(false)

  const handleSignOut = async () => {
    setLoading(true)
    await signOut({ callbackUrl: "/admin/login" })
    setLoading(false)
  }

  return (
    <button
      onClick={handleSignOut}
      className="px-3 py-2 rounded-lg bg-red-600 text-white text-md hover:bg-red-700 transition"
      disabled={loading}
    >
      {loading ? "Signing out..." : "Sign out"}
    </button>
  )
}
