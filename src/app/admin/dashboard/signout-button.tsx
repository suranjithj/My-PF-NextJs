// "use client"

// import { signOut } from "next-auth/react"
// import { useState } from "react"

// export default function SignOutButton() {
//   const [loading, setLoading] = useState(false)

//   const handleSignOut = async () => {
//     setLoading(true)
//     await signOut({ callbackUrl: "/admin/login" })
//     setLoading(false)
//   }

//   return (
//     <button
//       onClick={handleSignOut}
//       className="px-3 py-2 rounded-lg bg-red-600 text-white text-md hover:bg-red-700 transition"
//       disabled={loading}
//     >
//       {loading ? "Signing out..." : "Sign out"}
//     </button>
//   )
// }

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
      disabled={loading}
      className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed border"
      style={{
        backgroundColor: "rgba(239,68,68,0.1)",
        borderColor: "rgba(239,68,68,0.3)",
        color: "#fca5a5",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLButtonElement).style.backgroundColor = "rgba(239,68,68,0.2)"
        ;(e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(239,68,68,0.6)"
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.backgroundColor = "rgba(239,68,68,0.1)"
        ;(e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(239,68,68,0.3)"
      }}
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full border border-red-300/30 border-t-red-300 animate-spin" />
          Signing out...
        </span>
      ) : (
        "Sign Out"
      )}
    </button>
  )
}