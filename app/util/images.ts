  
'use server'
import sharp from 'sharp'
import { promises as fs } from 'fs'
import path from 'path'
import { cache } from 'react'

const placeholderCache = new Map<string, { src: string, placeholder: string }>()

function bufferToBase64(buffer: Buffer): string {
  return `data:image/png;base64,${buffer.toString('base64')}`
}

async function getFileBufferLocal(filepath: string) {
  try {
    const normalizedPath = filepath.startsWith('/') ? filepath.substring(1) : filepath
    const realFilepath = path.join(process.cwd(), 'public', normalizedPath)
    return await fs.readFile(realFilepath)
  } catch (error) {
    console.error(`Failed to read local file: ${filepath}`, error)
    throw error
  }
}

async function getFileBufferRemote(url: string) {
  try {
    const response = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0' },
      cache: 'force-cache'
    })
    
    if (!response.ok) throw new Error(`Failed to fetch image: ${response.status}`)
    return Buffer.from(await response.arrayBuffer())
  } catch (error) {
    console.error(`Failed to fetch remote image: ${url}`, error)
    throw error
  }
}

function getFileBuffer(src: string) {
  const isRemote = src.startsWith('http://') || src.startsWith('https://')
  return isRemote ? getFileBufferRemote(src) : getFileBufferLocal(src)
}

export const getPlaceholderImage = cache(async (filepath: string) => {
    
  if (process.env.NEXT_RUNTIME === 'edge') {
    return {
      src: filepath,
      placeholder: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII='
    }
  }

  if (placeholderCache.has(filepath)) {
    return placeholderCache.get(filepath)!
  }

  try {
    const originalBuffer = await getFileBuffer(filepath)
    const resizedBuffer = await sharp(originalBuffer)
      .resize(10, 10, { fit: 'inside' })
      .blur(1)
      .png({ quality: 50 })
      .toBuffer()
    
    const result = {
      src: filepath,
      placeholder: bufferToBase64(resizedBuffer),
    }
    
    placeholderCache.set(filepath, result)
    return result
  } catch (error) {
    console.error(`Failed to generate placeholder for: ${filepath}`, error)
    
    const result = {
      src: filepath,
      placeholder: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=',
    }
    
    placeholderCache.set(filepath, result)
    return result
  }
})