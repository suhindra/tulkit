/* Generate a single IndexNow POST payload + curl for all Pantone catalog URLs (EN + ID) */
const fs = require('fs')
const path = require('path')

const ROOT = path.join(__dirname, '..')
const SOURCE = path.join(ROOT, 'src', 'data', 'pantoneColors.ts')
const PAYLOAD_OUT = path.join(ROOT, 'public', 'pantone-indexnow-payload.json')
const CURL_OUT = path.join(ROOT, 'public', 'pantone-indexnow-curl.sh')

const HOST = 'https://tulkit.online'
const HOSTNAME = 'tulkit.online'
const KEY = '74756c6b69742e6f6e6c696e65'
const KEY_LOCATION = `${HOST}/74756c6b69742e6f6e6c696e65.txt`

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

function main(){
  const colors = extractColors()
  if(colors.length === 0){
    throw new Error('No Pantone colors parsed from source data.')
  }

  const paths = colors.flatMap(color=>[
    `/pantone/pantone-to-hex/${color.slug}`,
    `/id-ID/pantone/pantone-to-hex/${color.slug}`
  ])
  const urlList = paths.map(pathname=>`${HOST}${pathname}`)

  const payload = {
    host: HOSTNAME,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList
  }

  fs.writeFileSync(PAYLOAD_OUT, JSON.stringify(payload, null, 2))

  const curl = [
    'curl -X POST "https://api.indexnow.org/indexnow" \\',
    '  -H "Content-Type: application/json" \\',
    "  -d @'./pantone-indexnow-payload.json'"
  ].join('\n')
  fs.writeFileSync(CURL_OUT, `${curl}\n`)

  console.log(`Wrote payload with ${urlList.length} URLs to ${PAYLOAD_OUT}`)
  console.log(`Wrote curl helper to ${CURL_OUT}`)
}

main()
