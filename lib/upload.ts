import { createClient } from '@supabase/supabase-js'
import sharp from 'sharp'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function saveFile(file: File, folder: string = 'general'): Promise<string> {
  try {
    const bytes = await file.arrayBuffer()
    let buffer = Buffer.from(bytes)

    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`
    const sanitizedName = file.name.replace(/\s/g, '-')
    const filename = `${uniqueSuffix}-${sanitizedName}`
    const filepath = `${folder}/${filename}`

    let contentType = file.type
    if (file.type.startsWith('image/')) {
      const optimizedBuffer = await sharp(buffer)
        .resize(1920, 1080, { fit: 'inside', withoutEnlargement: true })
        .jpeg({ quality: 85 })
        .toBuffer()
      buffer = Buffer.from(optimizedBuffer)
      contentType = 'image/jpeg'
    }

    const { data, error } = await supabase.storage
      .from('uploads')
      .upload(filepath, buffer, {
        contentType: contentType,
        upsert: false,
        cacheControl: '3600'
      })

    if (error) {
      console.error('Supabase upload error:', error)
      throw new Error(`Failed to upload file: ${error.message}`)
    }

    const { data: { publicUrl } } = supabase.storage
      .from('uploads')
      .getPublicUrl(filepath)

    return publicUrl
  } catch (error) {
    console.error('Save file error:', error)
    throw error
  }
}

export async function deleteFile(fileUrl: string): Promise<void> {
  try {
    const match = fileUrl.match(/\/uploads\/(.+)$/)
    
    if (!match) {
      console.warn('Invalid file URL format:', fileUrl)
      return
    }

    const filePath = match[1]

    const { error } = await supabase.storage
      .from('uploads')
      .remove([filePath])

    if (error) {
      console.error('Supabase delete error:', error)
      throw new Error(`Failed to delete file: ${error.message}`)
    }

    console.log('File deleted successfully:', filePath)
  } catch (error) {
    console.error('Delete file error:', error)
  }
}