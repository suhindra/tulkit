export type SupportedAlg = 'HS256' | 'HS384' | 'HS512'

export const SUPPORTED_ALGS: SupportedAlg[] = ['HS256', 'HS384', 'HS512']
export const SAMPLE_SECRET = 'a-string-secret-at-least-256-bits-long'
export const DEFAULT_HEADER = '{\n  "alg": "HS256",\n  "typ": "JWT"\n}'
export const DEFAULT_PAYLOAD = '{\n  "sub": "1234567890",\n  "name": "John Doe",\n  "admin": true,\n  "iat": 1516239022\n}'

export function textToBytes(value: string): Uint8Array{
  return new TextEncoder().encode(value)
}

export function bytesToText(bytes: Uint8Array): string{
  try{
    return new TextDecoder('utf-8', { fatal: false }).decode(bytes)
  }catch{
    return ''
  }
}

export function base64UrlEncode(bytes: Uint8Array): string{
  let binary = ''
  for(let i=0;i<bytes.length;i+=1){
    binary += String.fromCharCode(bytes[i])
  }
  return btoa(binary).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'')
}

export function base64UrlDecode(value: string): Uint8Array{
  let normalized = value.replace(/-/g,'+').replace(/_/g,'/')
  const pad = normalized.length % 4
  if(pad === 2){
    normalized += '=='
  }else if(pad === 3){
    normalized += '='
  }else if(pad === 1){
    throw new Error('Invalid Base64URL length')
  }
  const binary = atob(normalized)
  const bytes = new Uint8Array(binary.length)
  for(let i=0;i<binary.length;i+=1){
    bytes[i] = binary.charCodeAt(i)
  }
  return bytes
}

export async function importHmacKey(secret: string, alg: SupportedAlg): Promise<CryptoKey>{
  if(typeof crypto === 'undefined' || !crypto.subtle){
    throw new Error('Web Crypto is unavailable in this browser.')
  }
  const hash: Record<SupportedAlg,string> = {
    HS256: 'SHA-256',
    HS384: 'SHA-384',
    HS512: 'SHA-512'
  }
  return crypto.subtle.importKey('raw', textToBytes(secret), { name: 'HMAC', hash: { name: hash[alg] } }, false, ['sign','verify'])
}

export async function signHmac(data: string, secret: string, alg: SupportedAlg): Promise<string>{
  const key = await importHmacKey(secret, alg)
  const signature = await crypto.subtle.sign('HMAC', key, textToBytes(data))
  return base64UrlEncode(new Uint8Array(signature))
}

export async function verifyHmac(data: string, signatureSegment: string, secret: string, alg: SupportedAlg): Promise<boolean>{
  const key = await importHmacKey(secret, alg)
  const signatureBytes = base64UrlDecode(signatureSegment)
  return crypto.subtle.verify('HMAC', key, signatureBytes, textToBytes(data))
}

export function tryParseJson<T>(bytes: Uint8Array): T | null{
  try{
    return JSON.parse(bytesToText(bytes)) as T
  }catch{
    return null
  }
}
