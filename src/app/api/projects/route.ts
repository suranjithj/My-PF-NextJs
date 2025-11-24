import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth' 
import { prisma } from '@/lib/prisma'
import { saveFile } from '@/lib/upload'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const featured = searchParams.get('featured')

    const where = featured === 'true' ? { featured: true } : {}

    const projects = await prisma.project.findMany({
      where,
      orderBy: { order: 'asc' }
    })

    return NextResponse.json(projects)
  } catch (error) {
    console.error('GET projects error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const formData = await request.formData()
    const title = formData.get('title') as string
    const description = formData.get('description') as string
    const category = formData.get('category') as string
    const technologies = JSON.parse(formData.get('technologies') as string)
    const githubUrl = formData.get('githubUrl') as string
    const liveUrl = formData.get('liveUrl') as string
    const featured = formData.get('featured') === 'true'
    const image = formData.get('image') as File

    let imagePath = ''
    if (image && image.size > 0) {
      imagePath = await saveFile(image, 'projects')
    }

    const project = await prisma.project.create({
      data: {
        title,
        description,
        image: imagePath,
        category,
        technologies,
        githubUrl,
        liveUrl,
        featured
      }
    })

    return NextResponse.json(project)
  } catch (error) {
    console.error('POST project error:', error)
    return NextResponse.json(
      { error: 'Failed to create project' },
      { status: 500 }
    )
  }
}