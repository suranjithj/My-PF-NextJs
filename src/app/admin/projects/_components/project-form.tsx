"use client"

import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

type Project = {
  id: string
  title: string
  description: string
  category: string
  technologies: string[]
  image: string
  githubUrl?: string | null
  liveUrl?: string | null
  featured: boolean
  order: number
}

type Props = {
  existing?: Project
}

export default function ProjectForm({ existing }: Props) {
  const router = useRouter()
  const isEditing = !!existing

  const [title, setTitle] = useState<string>(existing?.title || "")
  const [description, setDescription] = useState<string>(existing?.description || "")
  const [category, setCategory] = useState<string>(existing?.category || "")
  const [technologies, setTechnologies] = useState<string>(
    existing?.technologies?.join(", ") || ""
  )
  const [githubUrl, setGithubUrl] = useState<string>(existing?.githubUrl || "")
  const [liveUrl, setLiveUrl] = useState<string>(existing?.liveUrl || "")
  const [featured, setFeatured] = useState<boolean>(existing?.featured || false)
  const [order, setOrder] = useState<number>(existing?.order || 0)

  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(
    existing?.image || null
  )

  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  useEffect(() => {
    if (!imageFile) {
      if (existing?.image) {
        setImagePreview(existing.image)
      } else {
        setImagePreview(null)
      }
      return
    }
    const url = URL.createObjectURL(imageFile)
    setImagePreview(url)
    return () => URL.revokeObjectURL(url)
  }, [imageFile, existing])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] ?? null
    setImageFile(f)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)

    if (!title.trim() || !description.trim() || !category.trim()) {
      setError("Title, description and category are required.")
      return
    }

    if (!isEditing && !imageFile) {
      setError("Image is required for new projects.")
      return
    }

    setLoading(true)
    try {
      const form = new FormData()
      form.append("title", title.trim())
      form.append("description", description.trim())
      form.append("category", category.trim())
      form.append(
        "technologies",
        JSON.stringify(
          technologies
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean)
        )
      )
      form.append("githubUrl", githubUrl?.trim() || "")
      form.append("liveUrl", liveUrl?.trim() || "")
      form.append("featured", featured ? "true" : "false")
      form.append("order", String(order ?? 0))

      if (imageFile) {
        form.append("image", imageFile)
      }

      const url = isEditing
        ? `/api/admin/projects/${existing.id}`
        : "/api/admin/projects"
      
      const method = isEditing ? "PUT" : "POST"

      const res = await fetch(url, {
        method,
        body: form,
        credentials: "same-origin"
      })

      const contentType = res.headers.get("content-type") ?? ""
      let parsed: unknown = null
      if (contentType.includes("application/json")) {
        parsed = await res.json()
      } else {
        const text = await res.text()
        console.error("Non-JSON response:", text)
        setError("Server error — see console for details.")
        setLoading(false)
        return
      }

      if (!res.ok) {
        let message = "Something went wrong"
        if (typeof parsed === "object" && parsed !== null) {
          const d = parsed as Record<string, unknown>
          if (typeof d.error === "string" && d.error.length) message = d.error
          else if (typeof d.message === "string" && d.message.length)
            message = d.message
        }
        setError(message)
        setLoading(false)
        return
      }

      setSuccess(isEditing ? "Project updated." : "Project created.")
      setTimeout(() => router.push("/admin/projects"), 600)
    } catch (err) {
      console.error("submit error:", err)
      setError("An unexpected error occurred. See console.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 p-4 md:p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-sm"
    >
      {/* feedback */}
      <div className="col-span-1 md:col-span-2">
        {error && (
          <div className="mb-3 rounded-md bg-red-50 text-red-700 px-3 py-2 text-sm">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-3 rounded-md bg-green-50 text-green-700 px-3 py-2 text-sm">
            {success}
          </div>
        )}
      </div>

      {/* left column */}
      <div className="space-y-4">
        <label className="block">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
            Title
          </span>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Project title"
            className="mt-1 block w-full rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
            Category
          </span>
          <input
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="e.g. Web, Mobile, ML"
            className="mt-1 block w-full rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
            Technologies (comma separated)
          </span>
          <input
            value={technologies}
            onChange={(e) => setTechnologies(e.target.value)}
            placeholder="React, TypeScript, Tailwind"
            className="mt-1 block w-full rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
            Cover image {isEditing && "(leave empty to keep current)"}
          </span>
          <input
            accept="image/*"
            type="file"
            onChange={handleImageChange}
            className="mt-1 block w-full text-sm"
            required={!isEditing}
          />
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            {isEditing
              ? "Upload a new image to replace the current one"
              : "Select the project cover image"}
          </p>

          <div className="mt-2 w-full h-36 rounded-md border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 flex items-center justify-center overflow-hidden">
            {imagePreview ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={imagePreview}
                alt="cover preview"
                className="object-contain w-full h-full"
              />
            ) : (
              <div className="text-sm text-slate-500 dark:text-slate-400">
                No preview
              </div>
            )}
          </div>
        </label>

        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
              className="w-4 h-4 rounded border-slate-300 dark:border-slate-600"
            />
            <span className="text-slate-700 dark:text-slate-200">
              Featured
            </span>
          </label>

          <label className="flex items-center gap-2 ml-auto">
            <span className="text-sm text-slate-700 dark:text-slate-200">
              Order
            </span>
            <input
              type="number"
              value={order}
              onChange={(e) => setOrder(Number(e.target.value))}
              className="w-20 text-sm mt-0 rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-2 py-1"
            />
          </label>
        </div>
      </div>

      {/* right column */}
      <div className="space-y-4 md:col-span-1">
        <label className="block">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
            Description
          </span>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={8}
            placeholder="Describe the project..."
            className="mt-1 block w-full rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 resize-vertical"
            required
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
            GitHub URL (optional)
          </span>
          <input
            value={githubUrl}
            onChange={(e) => setGithubUrl(e.target.value)}
            placeholder="https://github.com/username/repo"
            className="mt-1 block w-full rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
            Live URL (optional)
          </span>
          <input
            value={liveUrl}
            onChange={(e) => setLiveUrl(e.target.value)}
            placeholder="https://example.com"
            className="mt-1 block w-full rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </label>
      </div>

      <div className="col-span-1 md:col-span-2 flex flex-col-reverse md:flex-row items-stretch md:items-center gap-3 mt-1">
        <button
          type="button"
          onClick={() => router.back()}
          className="w-full md:w-auto px-4 py-2 rounded-md border text-sm bg-white dark:bg-slate-700"
          disabled={loading}
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={loading}
          className="w-full md:w-auto px-4 py-2 rounded-md bg-purple-600 text-white text-sm hover:bg-purple-700 transition disabled:opacity-60"
        >
          {loading
            ? "Saving..."
            : isEditing
            ? "Update project"
            : "Create project"}
        </button>
      </div>
    </form>
  )
}