import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const caseStudies = await prisma.caseStudy.findMany({
      orderBy: { order: 'asc' },
    })

    return NextResponse.json(caseStudies)
  } catch (error) {
    console.error('Error fetching case studies:', error)
    return NextResponse.json({ error: 'Failed to fetch case studies' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()

    const caseStudy = await prisma.caseStudy.create({
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

    return NextResponse.json(caseStudy, { status: 201 })
  } catch (error) {
    console.error('Error creating case study:', error)
    return NextResponse.json({ error: 'Failed to create case study' }, { status: 500 })
  }
}