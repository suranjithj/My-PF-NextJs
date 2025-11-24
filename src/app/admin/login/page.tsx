"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"

export default function AdminLoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = (searchParams?.get("callbackUrl") as string) ?? "/admin"

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!email || !password) {
      setError("Please enter both email and password.")
      return
    }

    setLoading(true)
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
        callbackUrl
      })

      if (res?.ok) {
        router.push("/admin/dashboard")
      } else {
        setError(res?.error ?? "Invalid credentials.")
      }
    } catch (err) {
      console.error("Sign in error:", err)
      setError("An unexpected error occurred. Try again.")
    } finally {
      setLoading(false)
    }
  }

  const nextAuthError = searchParams?.get("error")
  const nextAuthErrorMessage =
    nextAuthError === "CredentialsSignin"
      ? "Invalid email or password."
      : nextAuthError
      ? `Sign in error: ${nextAuthError}`
      : null

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-900 px-4">
      <div className="w-full max-w-md bg-white dark:bg-slate-800 rounded-2xl shadow-md p-8">
        <h1 className="text-2xl font-semibold mb-2 mt-5 text-slate-900 text-center dark:text-slate-100">
          Admin Sign in
        </h1>

        {(error || nextAuthErrorMessage) && (
          <div className="mb-4 text-sm text-red-700 bg-red-50 dark:bg-red-900/30 p-2 rounded">
            {error ?? nextAuthErrorMessage}
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-4 mt-10">
          <label className="block">
            <span className="text-sm text-slate-700 dark:text-slate-200">Email</span>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
              className="mt-1 block w-full rounded-md border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </label>

          <label className="block">
            <span className="text-sm text-slate-700 dark:text-slate-200">Password</span>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
              className="mt-1 block w-full rounded-md border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 rounded-md mt-2 bg-purple-600 text-white font-medium disabled:opacity-60 hover:bg-purple-700 transition"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <div className="mt-4 text-center text-sm mb-10 text-slate-500 dark:text-slate-400">
          <p>
            Forgot password?{" "}
            <a href="/auth/forgot" className="text-purple-600 hover:underline">
              Reset
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
