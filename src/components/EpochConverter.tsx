import React, { useState, useEffect } from 'react'

type Mode = 'seconds' | 'milliseconds'
type TimeZoneId = string

const timeZoneSuggestions: string[] = [
  'UTC',
  'America/Edmonton',
  'America/New_York',
  'America/Chicago',
  'America/Los_Angeles',
  'Europe/London',
  'Europe/Berlin',
  'Europe/Paris',
  'Asia/Jakarta',
  'Asia/Singapore',
  'Asia/Tokyo',
  'Australia/Sydney'
]

function formatUtc(date: Date){
  const pad = (n:number)=>String(n).padStart(2,'0')
  const year = date.getUTCFullYear()
  const month = pad(date.getUTCMonth()+1)
  const day = pad(date.getUTCDate())
  const hours = pad(date.getUTCHours())
  const mins = pad(date.getUTCMinutes())
  const secs = pad(date.getUTCSeconds())
  return `${year}-${month}-${day} ${hours}:${mins}:${secs} UTC`
}

function formatLocalForInput(date: Date){
  const pad = (n:number)=>String(n).padStart(2,'0')
  const year = date.getFullYear()
  const month = pad(date.getMonth()+1)
  const day = pad(date.getDate())
  const hours = pad(date.getHours())
  const mins = pad(date.getMinutes())
  return `${year}-${month}-${day}T${hours}:${mins}`
}

function formatGmtPretty(date: Date){
  const weekdays = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
  const months = [
    'January','February','March','April','May','June',
    'July','August','September','October','November','December'
  ]
  const d = new Date(Date.UTC(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds()
  ))
  const weekday = weekdays[d.getUTCDay()]
  const month = months[d.getUTCMonth()]
  const day = d.getUTCDate()
  const year = d.getUTCFullYear()

  let hours = d.getUTCHours()
  const minutes = d.getUTCMinutes()
  const seconds = d.getUTCSeconds()
  const ampm = hours >= 12 ? 'PM' : 'AM'
  hours = hours % 12
  if(hours === 0) hours = 12

  const pad2 = (n:number)=>String(n).padStart(2,'0')
  return `${weekday}, ${month} ${day}, ${year} ${hours}:${pad2(minutes)}:${pad2(seconds)} ${ampm}`
}

export default function EpochConverter(){
  const [mode, setMode] = useState<Mode>('seconds')
  const [epochValue, setEpochValue] = useState<string>('')
  const [dateInput, setDateInput] = useState<string>('')
  const [utcOutput, setUtcOutput] = useState<string>('')
  const [localOutput, setLocalOutput] = useState<string>('')
  const [gmtOutput, setGmtOutput] = useState<string>('')
  const [currentEpoch, setCurrentEpoch] = useState<number>(()=>Math.floor(Date.now()/1000))
  const [timeZone, setTimeZone] = useState<TimeZoneId>('')

  useEffect(()=>{
    const now = new Date()
    const seconds = Math.floor(now.getTime()/1000)
    setEpochValue(String(seconds))
    setDateInput(formatLocalForInput(now))
    updateFromEpoch(seconds, 'seconds')
  },[])

  useEffect(()=>{
    const id = window.setInterval(()=>{
      setCurrentEpoch(Math.floor(Date.now()/1000))
    },1000)
    return ()=>window.clearInterval(id)
  },[])

  useEffect(()=>{
    try{
      const detected = Intl.DateTimeFormat().resolvedOptions().timeZone
      if(detected){
        setTimeZone(detected)
      }
    }catch{
      // ignore
    }
  },[])

  function formatInZone(date: Date, zone: TimeZoneId){
    try{
      const baseOptions: Intl.DateTimeFormatOptions = {
        year:'numeric',
        month:'short',
        day:'2-digit',
        hour:'2-digit',
        minute:'2-digit',
        second:'2-digit',
        hour12:false,
        timeZoneName:'short'
      }
      const options =
        zone
          ? { ...baseOptions, timeZone: zone }
          : baseOptions
      return new Intl.DateTimeFormat(undefined, options).format(date)
    }catch{
      return date.toString()
    }
  }

  function updateFromEpoch(raw:number, m:Mode, zone?:TimeZoneId){
    if(!Number.isFinite(raw)) return
    const ms = m === 'seconds' ? raw*1000 : raw
    const date = new Date(ms)
    if(Number.isNaN(date.getTime())) return
    const effectiveZone = zone || timeZone
    setUtcOutput(formatUtc(date))
    setLocalOutput(formatInZone(date, effectiveZone))
    setGmtOutput(formatGmtPretty(date))
    setDateInput(formatLocalForInput(date))
  }

  function onEpochChange(next:string){
    setEpochValue(next)
    const value = Number(next)
    if(!next || !Number.isFinite(value)) return

    const inferredMode: Mode =
      value > 1e11
        ? 'milliseconds'
        : 'seconds'

    setMode(inferredMode)
    updateFromEpoch(value, inferredMode)
  }

  function onDateChange(next:string){
    setDateInput(next)
    if(!next) return
    const date = new Date(next)
    if(Number.isNaN(date.getTime())) return
    const ms = date.getTime()
    const seconds = Math.floor(ms/1000)
    setUtcOutput(formatUtc(date))
    setLocalOutput(formatInZone(date, timeZone))
    setGmtOutput(formatGmtPretty(date))
    setEpochValue(String(mode === 'seconds' ? seconds : ms))
  }

  function fillNow(){
    const now = new Date()
    const ms = now.getTime()
    const seconds = Math.floor(ms/1000)
    setDateInput(formatLocalForInput(now))
    setEpochValue(String(mode === 'seconds' ? seconds : ms))
    setUtcOutput(formatUtc(now))
    setLocalOutput(formatInZone(now, timeZone))
    setGmtOutput(formatGmtPretty(now))
  }

  async function copy(value:string){
    try{
      await navigator.clipboard.writeText(value)
      alert('Copied to clipboard')
    }catch(e){
      alert('Clipboard failed: '+String(e))
    }
  }

  return (
    <div className="epoch-card">
      <div className="epoch-current">
        <span>The current Unix epoch time is</span>
        <span className="epoch-current-badge">{currentEpoch}</span>
      </div>

      <div className="epoch-modes">
        <button
          type="button"
          className={`epoch-mode ${mode === 'seconds' ? 'active' : ''}`}
          onClick={()=>{
            setMode('seconds')
            if(epochValue){
              const num = Number(epochValue)
              if(Number.isFinite(num)){
                updateFromEpoch(num, 'seconds')
              }
            }
          }}
        >
          Unix seconds
        </button>
        <button
          type="button"
          className={`epoch-mode ${mode === 'milliseconds' ? 'active' : ''}`}
          onClick={()=>{
            setMode('milliseconds')
            if(epochValue){
              const num = Number(epochValue)
              if(Number.isFinite(num)){
                updateFromEpoch(num, 'milliseconds')
              }
            }
          }}
        >
          Unix milliseconds
        </button>
        <button
          type="button"
          className="toolbar-button epoch-now"
          onClick={fillNow}
        >
          Use current time
        </button>
      </div>

      <div className="epoch-grid">
        <div className="epoch-column">
          <h3>Epoch to date</h3>
          <label className="epoch-field">
            <span>Time zone for date output</span>
            <input
              type="text"
              list="epoch-timezone-list"
              value={timeZone}
              placeholder="Type or adjust your time zone, e.g. America/Edmonton"
              onChange={e=>{
                const raw = e.target.value.trim()
                const next: TimeZoneId = raw
                setTimeZone(next)
                const value = Number(epochValue)
                if(epochValue && Number.isFinite(value)){
                  updateFromEpoch(value, mode, next)
                }
              }}
            />
            <datalist id="epoch-timezone-list">
              {timeZoneSuggestions.map(z=>(
                <option key={z} value={z} />
              ))}
            </datalist>
          </label>
          <label className="epoch-field">
            <span>Epoch value (seconds or milliseconds)</span>
            <input
              type="number"
              value={epochValue}
              onChange={e=>onEpochChange(e.target.value)}
              placeholder={mode === 'seconds' ? 'e.g. 1732665600' : 'e.g. 1732665600000'}
            />
          </label>
          <div className="epoch-output">
            <div>
              <strong>UTC</strong>
              <div className="epoch-output-line">
                <span>{utcOutput || '—'}</span>
                {utcOutput && (
                  <button
                    type="button"
                    className="toolbar-button"
                    onClick={()=>copy(utcOutput)}
                  >
                    Copy
                  </button>
                )}
              </div>
            </div>
            <div>
              <strong>Local time</strong>
              <div className="epoch-output-line">
                <span>{localOutput || '—'}</span>
                {localOutput && (
                  <button
                    type="button"
                    className="toolbar-button"
                    onClick={()=>copy(localOutput)}
                  >
                    Copy
                  </button>
                )}
              </div>
            </div>
            <div>
              <strong>Date and time (GMT)</strong>
              <div className="epoch-output-line">
                <span>{gmtOutput || '—'}</span>
                {gmtOutput && (
                  <button
                    type="button"
                    className="toolbar-button"
                    onClick={()=>copy(gmtOutput)}
                  >
                    Copy
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="epoch-column">
          <h3>Date to epoch</h3>
          <label className="epoch-field">
            <span>Date and time (selected time zone)</span>
            <input
              type="datetime-local"
              value={dateInput}
              step="1"
              onChange={e=>onDateChange(e.target.value)}
            />
            <span className="epoch-tz-note">
              Time zone for this date: {timeZone || 'browser default'}
            </span>
          </label>
          <div className="epoch-output">
            <div>
              <strong>Unix seconds</strong>
              <div className="epoch-output-line">
                <span>
                  {dateInput
                    ? Math.floor(new Date(dateInput).getTime()/1000)
                    : '—'}
                </span>
                {dateInput && (
                  <button
                    type="button"
                    className="toolbar-button"
                    onClick={()=>{
                      const val = Math.floor(new Date(dateInput).getTime()/1000)
                      copy(String(val))
                    }}
                  >
                    Copy
                  </button>
                )}
              </div>
            </div>
            <div>
              <strong>Unix milliseconds</strong>
              <div className="epoch-output-line">
                <span>
                  {dateInput ? new Date(dateInput).getTime() : '—'}
                </span>
                {dateInput && (
                  <button
                    type="button"
                    className="toolbar-button"
                    onClick={()=>{
                      const val = new Date(dateInput).getTime()
                      copy(String(val))
                    }}
                  >
                    Copy
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
