/* Generate a Pantone-only sitemap with per-color URLs (EN + ID) */
const fs = require('fs')
const path = require('path')

const ROOT = path.join(__dirname, '..')
const SOURCE = path.join(ROOT, 'src', 'data', 'pantoneColors.ts')
const OUTPUT = path.join(ROOT, 'public', 'sitemap-pantone.xml')
const HOST = 'https://tulkit.online'

function slugify(value){
  return value.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
}

function extractColors(){
  const content = fs.readFileSync(SOURCE, 'utf8')
  const regex = /{[^}]*name:\s*"([^"]+)"[^}]*hex:\s*"([^"]+)"[^}]*code:\s*"([^"]+)"[^}]*}/g
  const colors = []
  let match
  while((match = regex.exec(content)) !== null){
    const [, name, hex, code] = match
    colors.push({ name, hex, code, slug: slugify(code) })
  }
  return colors
}

function buildEntry({ slug }){
  const enPath = `/pantone/pantone-to-hex/${slug}`
  const idPath = `/id-ID${enPath}`
  const enUrl = `${HOST}${enPath}`
  const idUrl = `${HOST}${idPath}`
  const parts = []
  parts.push('  <url>')
  parts.push(`    <loc>${enUrl}</loc>`)
  parts.push('    <priority>0.6</priority>')
  parts.push('    <changefreq>weekly</changefreq>')
  parts.push(`    <xhtml:link rel="alternate" hreflang="en" href="${enUrl}"/>`)
  parts.push(`    <xhtml:link rel="alternate" hreflang="id-ID" href="${idUrl}"/>`)
  parts.push(`    <xhtml:link rel="alternate" hreflang="x-default" href="${enUrl}"/>`)
  parts.push('  </url>')
  parts.push('  <url>')
  parts.push(`    <loc>${idUrl}</loc>`)
  parts.push('    <priority>0.6</priority>')
  parts.push('    <changefreq>weekly</changefreq>')
  parts.push(`    <xhtml:link rel="alternate" hreflang="en" href="${enUrl}"/>`)
  parts.push(`    <xhtml:link rel="alternate" hreflang="id-ID" href="${idUrl}"/>`)
  parts.push(`    <xhtml:link rel="alternate" hreflang="x-default" href="${enUrl}"/>`)
  parts.push('  </url>')
  return parts.join('\n')
}

function main(){
  const colors = extractColors()
  if(colors.length === 0){
    throw new Error('No Pantone colors parsed from source data.')
  }
  const header = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
    '        xmlns:xhtml="http://www.w3.org/1999/xhtml">'
  ].join('\n')
  const body = colors.map(buildEntry).join('\n')
  const footer = '</urlset>\n'
  const xml = `${header}\n${body}\n${footer}`
  fs.writeFileSync(OUTPUT, xml)
  console.log(`Pantone sitemap written to ${OUTPUT} with ${colors.length * 2} URLs`)
}

main()
