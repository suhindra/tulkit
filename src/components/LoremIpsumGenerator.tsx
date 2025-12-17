import React, { useState } from 'react'
import type { LanguageCode } from '../types'
import { getLoremCopy } from '../loremCopy'

type Props = {
  language: LanguageCode
}

const BASE_PARAGRAPHS = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.',
  'Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat.',
  'Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim. Pellentesque congue. Ut in risus volutpat libero pharetra tempor.',
  'Cras vestibulum bibendum augue. Praesent egestas leo in pede. Praesent blandit odio eu enim. Pellentesque sed dui ut augue blandit sodales.',
  'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Aliquam nibh. Mauris ac mauris sed pede pellentesque fermentum.',
  'Maecenas adipiscing ante non diam sodales hendrerit. Ut velit mauris, egestas sed, gravida nec, ornare ut, mi.'
]

function buildLorem(
  paragraphs: number,
  sentenceLength: 'short' | 'medium' | 'long',
  startWithClassic: boolean
): string{
  const clampedCount = Math.min(20, Math.max(1, paragraphs || 1))
  const allSentences = BASE_PARAGRAPHS.flatMap(p=>p.split('. ').map(s=>s.trim()).filter(Boolean))

  const lengthFactor =
    sentenceLength === 'short' ? 2
      : sentenceLength === 'long' ? 6
        : 4

  const result: string[] = []

  for(let i=0;i<clampedCount;i+=1){
    const start = (i*lengthFactor) % allSentences.length
    const slice = allSentences.slice(start, start+lengthFactor)
    let paragraph = slice.join('. ').replace(/\.+$/,'')+'.'
    if(i === 0 && startWithClassic && !paragraph.toLowerCase().startsWith('lorem ipsum')){
      paragraph = `Lorem ipsum dolor sit amet, ${paragraph}`
    }
    result.push(paragraph)
  }

  return result.join('\n\n')
}

export default function LoremIpsumGenerator({ language }: Props){
  const loremCopy = getLoremCopy(language)
  const [paragraphs, setParagraphs] = useState(3)
  const [sentenceLength, setSentenceLength] = useState<'short'|'medium'|'long'>('medium')
  const [startWithClassic, setStartWithClassic] = useState(true)
  const [output, setOutput] = useState(()=>buildLorem(3, 'medium', true))

  function regenerate(){
    setOutput(buildLorem(paragraphs, sentenceLength, startWithClassic))
  }

  async function copy(){
    try{
      await navigator.clipboard.writeText(output)
      alert(loremCopy.copySuccess)
    }catch(e){
      alert(loremCopy.copyErrorPrefix+String(e))
    }
  }

  return (
    <div className="lorem-card">
      <div className="lorem-controls">
        <div className="lorem-field">
          <label htmlFor="lorem-paragraphs">{loremCopy.paragraphCountLabel}</label>
          <input
            id="lorem-paragraphs"
            type="number"
            min={1}
            max={20}
            value={paragraphs}
            onChange={e=>{
              const value = Number(e.target.value) || 1
              setParagraphs(value)
            }}
          />
        </div>
        <div className="lorem-field">
          <label htmlFor="lorem-length">{loremCopy.lengthLabel}</label>
          <select
            id="lorem-length"
            value={sentenceLength}
            onChange={e=>setSentenceLength(e.target.value as any)}
          >
            <option value="short">{loremCopy.lengthShort}</option>
            <option value="medium">{loremCopy.lengthMedium}</option>
            <option value="long">{loremCopy.lengthLong}</option>
          </select>
        </div>
        <label className="lorem-checkbox">
          <input
            type="checkbox"
            checked={startWithClassic}
            onChange={e=>setStartWithClassic(e.target.checked)}
          />
          <span>{loremCopy.classicPrefixLabel}</span>
        </label>
        <div className="lorem-actions">
          <button
            type="button"
            className="toolbar-format"
            onClick={regenerate}
          >
            {loremCopy.generateLabel}
          </button>
          <button
            type="button"
            className="toolbar-button"
            onClick={copy}
            disabled={!output}
          >
            {loremCopy.copyLabel}
          </button>
        </div>
      </div>
      <div className="lorem-output">
        <textarea
          readOnly
          value={output}
          rows={10}
        />
      </div>
      <div className="lorem-reference">
        <h3>{loremCopy.referencesHeading}</h3>
        <div className="lorem-reference-block">
          <h4>{loremCopy.standardHeading}</h4>
          <p>{loremCopy.standardBody}</p>
        </div>
        <div className="lorem-reference-block">
          <h4>{loremCopy.cicero1Heading}</h4>
          <p>{loremCopy.cicero1Latin}</p>
          <h5>{loremCopy.cicero1TranslationHeading}</h5>
          <p>{loremCopy.cicero1Translation}</p>
        </div>
        <div className="lorem-reference-block">
          <h4>{loremCopy.cicero2Heading}</h4>
          <p>{loremCopy.cicero2Latin}</p>
          <h5>{loremCopy.cicero2TranslationHeading}</h5>
          <p>{loremCopy.cicero2Translation}</p>
        </div>
      </div>
    </div>
  )
}
