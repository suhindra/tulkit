import React, { useMemo, useState } from 'react'
import { getTranslations } from '../i18n'
import type { LanguageCode } from '../types'

type FlagKey = 'g' | 'i' | 'm' | 's' | 'u' | 'y'

const FLAG_KEYS: FlagKey[] = ['g','i','m','s','u','y']

const DEFAULT_PATTERN = '(\\w+)@(\\w+\\.\\w+)'
const DEFAULT_SAMPLE = `Morning digest — new support tickets
- support@example.com needs a reply about billing
- lena@tulkit.dev asked for the API quota limits
- noreply@example.com bounced due to invalid domain

Other notes:
• "contact@another-site.com" is the forwarding inbox
• Text without an @ symbol should be ignored`

type RegexTesterProps = {
  language: LanguageCode
}

type MatchGroup = {
  label: string
  value: string
}

type MatchDetail = {
  index: number
  value: string
  groups: MatchGroup[]
}

export default function RegexTester({ language }: RegexTesterProps){
  const { regexTester: copy } = getTranslations(language)
  const [pattern, setPattern] = useState(DEFAULT_PATTERN)
  const [sample, setSample] = useState(DEFAULT_SAMPLE)
  const [flags, setFlags] = useState<Record<FlagKey,boolean>>({
    g: true,
    i: false,
    m: false,
    s: false,
    u: false,
    y: false
  })

  const flagString = useMemo(
    ()=>FLAG_KEYS.filter(key=>flags[key]).join(''),
    [flags]
  )

  const evaluation = useMemo(()=>{
    const trimmedPattern = pattern.trim()
    if(!trimmedPattern){
      return { matches: [] as MatchDetail[], error: '' }
    }
    try{
      const regex = new RegExp(trimmedPattern, flagString)
      const matches: MatchDetail[] = []
      const collectMatch = (match: RegExpExecArray)=>{
        const index = match.index ?? 0
        const numberedGroups = match.slice(1).map((value, idx)=>({
          label: copy.numberedGroupLabel.replace('{index}', String(idx + 1)),
          value: value ?? copy.emptyGroupValue
        }))
        const namedGroups = match.groups
          ? Object.entries(match.groups).map(([name, value])=>({
            label: copy.namedGroupLabel.replace('{name}', name),
            value: value ?? copy.emptyGroupValue
          }))
          : []
        matches.push({
          index,
          value: match[0],
          groups: [...numberedGroups, ...namedGroups]
        })
      }
      if(regex.global || regex.sticky){
        let match: RegExpExecArray | null
        while((match = regex.exec(sample)) !== null){
          collectMatch(match)
          if(match[0] === ''){
            regex.lastIndex += 1
            if(regex.lastIndex > sample.length){
              break
            }
          }
        }
      }else{
        const single = regex.exec(sample)
        if(single){
          collectMatch(single)
        }
      }
      return { matches, error: '' }
    }catch(err){
      return {
        matches: [] as MatchDetail[],
        error: err instanceof Error ? err.message : String(err)
      }
    }
  },[pattern, flagString, sample, copy])

  const highlightNodes = useMemo(()=>{
    if(!sample){
      return <span className="regex-muted">{copy.emptyPreviewLabel}</span>
    }
    if(!pattern.trim() || evaluation.error || evaluation.matches.length === 0){
      return sample
    }
    const parts: React.ReactNode[] = []
    let cursor = 0
    evaluation.matches.forEach((match, idx)=>{
      const start = match.index
      const end = start + match.value.length
      if(start > cursor){
        parts.push(
          <span key={`text-${idx}-${start}`}>{sample.slice(cursor, start)}</span>
        )
      }
      parts.push(
        <mark key={`mark-${idx}-${start}`}>{sample.slice(start, end)}</mark>
      )
      cursor = end
    })
    if(cursor < sample.length){
      parts.push(<span key={`tail-${cursor}`}>{sample.slice(cursor)}</span>)
    }
    return parts
  },[copy.emptyPreviewLabel, evaluation.error, evaluation.matches, pattern, sample])

  const summary = useMemo(()=>{
    if(!pattern.trim()){
      return { type: 'muted' as const, text: copy.emptyPatternHint }
    }
    if(evaluation.error){
      return { type: 'error' as const, text: `${copy.invalidPatternPrefix}${evaluation.error}` }
    }
    if(evaluation.matches.length === 0){
      return { type: 'muted' as const, text: copy.noMatchesLabel }
    }
    const text = copy.summaryLabel.replace('{count}', String(evaluation.matches.length))
    return { type: 'success' as const, text }
  },[copy.emptyPatternHint, copy.invalidPatternPrefix, copy.noMatchesLabel, copy.summaryLabel, evaluation.error, evaluation.matches, pattern])

  function toggleFlag(key: FlagKey){
    setFlags(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  const trimmedPattern = pattern.trim()
  const hasMatches = trimmedPattern.length > 0 && !evaluation.error && evaluation.matches.length > 0
  const showNoMatchesMessage = trimmedPattern.length > 0 && !evaluation.error && evaluation.matches.length === 0

  return (
    <div className="encode-card regex-card">
      <h2>{copy.heading}</h2>
      <p className="encode-card-subtitle">{copy.subheading}</p>
      <div className="regex-pattern">
        <label htmlFor="regex-pattern">{copy.patternLabel}</label>
        <input
          id="regex-pattern"
          type="text"
          value={pattern}
          onChange={event=>setPattern(event.target.value)}
          placeholder={copy.patternPlaceholder}
          spellCheck="false"
        />
      </div>
      <div className="regex-flags">
        <span className="regex-flags-label">{copy.flagsLabel}</span>
        <div className="regex-flag-buttons">
          {FLAG_KEYS.map(flagKey=>{
            const option = copy.flags[flagKey]
            return (
              <button
                key={flagKey}
                type="button"
                className={`regex-flag-button ${flags[flagKey] ? 'active' : ''}`}
                onClick={()=>toggleFlag(flagKey)}
                title={option.description}
                aria-pressed={flags[flagKey]}
              >
                <span className="regex-flag-key">/{flagKey}/</span>
                <span className="regex-flag-label">{option.label}</span>
              </button>
            )
          })}
        </div>
      </div>
      <div className="regex-editor-grid">
        <div className="regex-editor">
          <label htmlFor="regex-sample">{copy.sampleLabel}</label>
          <textarea
            id="regex-sample"
            value={sample}
            onChange={event=>setSample(event.target.value)}
            placeholder={copy.samplePlaceholder}
            spellCheck="false"
          />
        </div>
        <div className="regex-preview">
          <label>{copy.previewLabel}</label>
          <pre className="regex-preview-text">
            <code>{highlightNodes}</code>
          </pre>
        </div>
      </div>
      <div className={`regex-summary ${summary.type}`}>
        {summary.text}
      </div>
      <div className="regex-matches">
        <h3>{copy.matchesHeading}</h3>
        {showNoMatchesMessage && (
          <p className="regex-muted">{copy.noMatchesLabel}</p>
        )}
        {hasMatches && (
          <div className="regex-table-wrapper">
            <table className="regex-table">
              <thead>
                <tr>
                  <th>{copy.matchColumn}</th>
                  <th>{copy.indexColumn}</th>
                  <th>{copy.groupsColumn}</th>
                </tr>
              </thead>
              <tbody>
                {evaluation.matches.map((match, idx)=>(
                  <tr key={`${match.index}-${idx}`}>
                    <td>
                      <span className="regex-match-index">#{idx + 1}</span>
                      <code>{match.value || copy.emptyGroupValue}</code>
                    </td>
                    <td>{match.index}</td>
                    <td>
                      {match.groups.length === 0 ? (
                        <span className="regex-muted">{copy.noGroupsLabel}</span>
                      ) : (
                        <ul className="regex-group-list">
                          {match.groups.map((group, groupIndex)=>(
                            <li key={`${group.label}-${groupIndex}`}>
                              <span className="regex-group-label">{group.label}</span>
                              <code>{group.value || copy.emptyGroupValue}</code>
                            </li>
                          ))}
                        </ul>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
