import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

import { serveStatic } from 'hono/serve-static'

// Helper function to determine content type
function getContentType(path: string): string {
  const ext = path.split('.').pop()?.toLowerCase()
  const contentTypes: Record<string, string> = {
    html: 'text/html',
    css: 'text/css',
    js: 'application/javascript',
    json: 'application/json',
    png: 'image/png',
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    gif: 'image/gif',
    svg: 'image/svg+xml',
    ico: 'image/x-icon',
    woff: 'font/woff',
    woff2: 'font/woff2',
    ttf: 'font/ttf',
    eot: 'application/vnd.ms-fontobject',
    otf: 'font/otf',
  }
  return contentTypes[ext || ''] || 'application/octet-stream'
}

export function staticContent() {
  return serveStatic({
    root: './public',
    getContent: async (path) => {
      try {
        // Extract the file path after /public/
        const filePath = path.split('/public/')[1]
        if (!filePath) {
          console.error('Invalid path format:', path)
          return null
        }

        const fullPath = join(process.cwd(), 'public', filePath)

        const file = await readFile(fullPath)
        const contentType = getContentType(filePath)
        return new Response(file, {
          headers: {
            'Content-Type': contentType,
            'Cache-Control': 'public, max-age=31536000', // 1 year cache for static assets
            'X-Content-Type-Options': 'nosniff',
            'X-Frame-Options': 'DENY',
            'X-XSS-Protection': '1; mode=block',
          },
        })
      } catch (error) {
        console.error(`Error serving static file: ${path}`, error)
        return null
      }
    },
  })
}
