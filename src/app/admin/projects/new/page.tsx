import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import ProjectForm from "../_components/project-form"

export default async function NewProjectPage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect("/admin/login")

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">Create Project</h1>
      <ProjectForm />
    </div>
  )
}
