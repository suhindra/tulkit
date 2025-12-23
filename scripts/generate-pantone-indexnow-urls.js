/* Generate IndexNow GET URLs for every Pantone catalog page (EN + ID) */
const fs = require('fs')
const path = require('path')

const ROOT = path.join(__dirname, '..')
const SOURCE = path.join(ROOT, 'src', 'data', 'pantoneColors.ts')
const OUTPUT = path.join(ROOT, 'public', 'pantone-indexnow-urls.txt')

const HOST = 'https://tulkit.online'
const KEY = '74756c6b69742e6f6e6c696e65'

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

function buildIndexNowUrl(pathname){
  const url = `${HOST}${pathname}`
  return `https://api.indexnow.org/indexnow?url=${encodeURIComponent(url)}&key=${encodeURIComponent(KEY)}`
}

function main(){
  const colors = extractColors()
  if(colors.length === 0){
    throw new Error('No Pantone colors parsed from source data.')
  }
  const lines = []
  colors.forEach(color=>{
    const enPath = `/pantone/pantone-to-hex/${color.slug}`
    const idPath = `/id-ID${enPath}`
    lines.push(`# ${color.code} — ${color.name}`)
    lines.push(buildIndexNowUrl(enPath))
    lines.push(buildIndexNowUrl(idPath))
    lines.push('')
  })
  fs.writeFileSync(OUTPUT, lines.join('\n'))
  console.log(`Generated ${colors.length * 2} IndexNow URLs at ${OUTPUT}`)
}

main()
