import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { sendEmail, getContactEmailTemplate } from '@/lib/email'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const unreadOnly = searchParams.get('unread') === 'true'

    const where = unreadOnly ? { read: false } : {}

    const contacts = await prisma.contact.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(contacts)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch contacts' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, subject, message } = body

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      )
    }

    // Save to database
    const contact = await prisma.contact.create({
      data: {
        name,
        email,
        subject: subject || 'No subject',
        message
      }
    })

    // Send email notification
    await sendEmail({
      to: process.env.EMAIL_USER!,
      subject: `New Contact: ${subject || 'No subject'}`,
      html: getContactEmailTemplate(name, email, message)
    })

    return NextResponse.json({ 
      success: true, 
      message: 'Message sent successfully',
      contact 
    })
  } catch (error) {
    console.error('Contact error:', error)
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    )
  }
}