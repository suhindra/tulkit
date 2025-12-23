import React from 'react'
import type { LanguageCode } from '../types'
import { getTranslations } from '../i18n'
import { buildPathWithLanguage } from '../routing'

type Props = {
  language: LanguageCode
}

export default function PantoneLanding({ language }: Props){
  const { pantoneLanding } = getTranslations(language)
  const hexHref = buildPathWithLanguage('/pantone/hex-to-pantone', language)
  const catalogHref = buildPathWithLanguage('/pantone/pantone-to-hex', language)

  return (
    <div className="pantone-tool pantone-landing">
      <div className="pantone-header">
        <h2>{pantoneLanding.title}</h2>
        <p>{pantoneLanding.description}</p>
      </div>
      <div className="pantone-landing-intro">
        <p>{pantoneLanding.intro}</p>
      </div>
      <div className="pantone-landing-grid">
        <article className="pantone-landing-card">
          <div className="pantone-landing-card-header">
            <h3>{pantoneLanding.hexTitle}</h3>
            <p>{pantoneLanding.hexDescription}</p>
          </div>
          <ul className="pantone-landing-list">
            {pantoneLanding.hexFeatures.map(feature=>(
              <li key={feature}>{feature}</li>
            ))}
          </ul>
          <a className="toolbar-button" href={hexHref}>
            {pantoneLanding.hexCta}
          </a>
        </article>
        <article className="pantone-landing-card">
          <div className="pantone-landing-card-header">
            <h3>{pantoneLanding.catalogTitle}</h3>
            <p>{pantoneLanding.catalogDescription}</p>
          </div>
          <ul className="pantone-landing-list">
            {pantoneLanding.catalogFeatures.map(feature=>(
              <li key={feature}>{feature}</li>
            ))}
          </ul>
          <a className="toolbar-button secondary" href={catalogHref}>
            {pantoneLanding.catalogCta}
          </a>
        </article>
      </div>
    </div>
  )
}
