const GA_MEASUREMENT_ID = 'G-4Y01FLJ73D'

declare global {
  interface Window {
    dataLayer: unknown[]
    gtag?: (...args: any[]) => void
    requestIdleCallback?: (callback: () => void, options?: { timeout?: number }) => void
  }
}

function bootstrapAnalytics(){
  if(typeof window === 'undefined') return
  if(window.gtag) return
  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag(){
    window.dataLayer.push(arguments)
  }
  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`
  script.onload = ()=> {
    window.gtag?.('js', new Date())
    window.gtag?.('config', GA_MEASUREMENT_ID)
  }
  document.head.appendChild(script)
}

function scheduleAnalyticsLoad(){
  if(typeof window === 'undefined') return
  let loaded = false
  const trigger = ()=>{
    if(loaded) return
    loaded = true
    cleanup()
    bootstrapAnalytics()
  }

  const events: Array<keyof WindowEventMap> = ['scroll', 'pointerdown', 'keydown']

  const cleanup = ()=>{
    events.forEach(event=>window.removeEventListener(event, trigger))
  }

  events.forEach(event=>window.addEventListener(event, trigger, { once: true }))

  if(window.requestIdleCallback){
    window.requestIdleCallback(()=>trigger(), { timeout: 4000 })
  }else{
    window.setTimeout(trigger, 4000)
  }
}

scheduleAnalyticsLoad()

export {}
