import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import ProjectForm from "../_components/project-form"

type Props = { 
  params: Promise<{ id: string }> 
}

export default async function EditProjectPage({ params }: Props) {
  const session = await getServerSession(authOptions)
  if (!session) redirect("/admin/login")

  const { id } = await params

  const project = await prisma.project.findUnique({ 
    where: { id } 
  })
  
  if (!project) redirect("/admin/projects")

  const serializedProject = {
    id: project.id,
    title: project.title,
    description: project.description,
    category: project.category,
    technologies: project.technologies,
    image: project.image,
    githubUrl: project.githubUrl,
    liveUrl: project.liveUrl,
    featured: project.featured,
    order: project.order
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">Edit Project</h1>
      <ProjectForm existing={serializedProject} />
    </div>
  )
}