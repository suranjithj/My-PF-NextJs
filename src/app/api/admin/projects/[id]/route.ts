import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { saveFile, deleteFile } from '@/lib/upload'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params

    const project = await prisma.project.findUnique({
      where: { id }
    })

    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 })
    }

    return NextResponse.json(project)
  } catch (error) {
    console.error('GET admin project error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch project' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    const formData = await request.formData()
    
    const title = formData.get('title') as string
    const description = formData.get('description') as string
    const category = formData.get('category') as string
    const githubUrl = formData.get('githubUrl') as string | null
    const liveUrl = formData.get('liveUrl') as string | null
    const featured = formData.get('featured') === 'true'
    const image = formData.get('image') as File | null

    const technologiesStr = formData.get('technologies') as string
    const technologies = technologiesStr ? JSON.parse(technologiesStr) : []

    // Get existing project
    const existingProject = await prisma.project.findUnique({
      where: { id }
    })

    if (!existingProject) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 })
    }

    let imagePath = existingProject.image

    // Handle new image upload 
    if (image && image.size > 0) {
      if (existingProject.image) {
        await deleteFile(existingProject.image)
      }
      // Upload new image
      imagePath = await saveFile(image, 'projects')
    }

    // Update project
    const project = await prisma.project.update({
      where: { id },
      data: {
        title,
        description,
        image: imagePath,
        category,
        technologies,
        githubUrl,
        liveUrl,
        featured,
      }
    })

    return NextResponse.json(project)
  } catch (error) {
    console.error('PUT admin project error:', error)
    return NextResponse.json(
      { error: 'Failed to update project' },
      { status: 500 }
    )
  }
}

// DELETE project
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params

    const project = await prisma.project.findUnique({
      where: { id }
    })

    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 })
    }

    if (project.image) {
      await deleteFile(project.image)
    }

    await prisma.project.delete({
      where: { id }
    })

    return NextResponse.json({ message: 'Project deleted successfully' })
  } catch (error) {
    console.error('DELETE admin project error:', error)
    return NextResponse.json(
      { error: 'Failed to delete project' },
      { status: 500 }
    )
  }
}