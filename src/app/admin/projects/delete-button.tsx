"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function DeleteProjectButton({ id }: { id: string }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    if (!confirm("Delete this project?")) return
    setLoading(true)
    try {
      const res = await fetch(`/api/admin/projects/${id}`, { method: "DELETE" })
      if (!res.ok) throw new Error("Failed")
      router.refresh()
    } catch (err) {
      alert("Failed to delete")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <button onClick={handleDelete} disabled={loading} className="px-2 py-1 text-sm rounded bg-red-600 text-white">
      {loading ? "Deleting..." : "Delete"}
    </button>
  )
}
