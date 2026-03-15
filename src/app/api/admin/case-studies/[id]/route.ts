import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params

    const caseStudy = await prisma.caseStudy.findUnique({
      where: { id },
    })

    if (!caseStudy) {
      return NextResponse.json({ error: 'Case study not found' }, { status: 404 })
    }

    return NextResponse.json(caseStudy)
  } catch (error) {
    console.error('Error fetching case study:', error)
    return NextResponse.json({ error: 'Failed to fetch case study' }, { status: 500 })
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
    const body = await request.json()

    const caseStudy = await prisma.caseStudy.update({
      where: { id },
      data: {
        title:     body.title,
        client:    body.client,
        industry:  body.industry,
        challenge: body.challenge,
        solution:  body.solution,
        result:    body.result,
        tags:      body.tags || [],
        active:    body.active !== undefined ? body.active : true,
        order:     body.order || 0,
      },
    })

    return NextResponse.json(caseStudy)
  } catch (error) {
    console.error('Error updating case study:', error)
    return NextResponse.json({ error: 'Failed to update case study' }, { status: 500 })
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params

    await prisma.caseStudy.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting case study:', error)
    return NextResponse.json({ error: 'Failed to delete case study' }, { status: 500 })
  }
}