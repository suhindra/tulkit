import React from 'react'
import type { LanguageCode } from '../types'
import Encoder from './Encoder'

type Props = {
  language: LanguageCode
}

export default function Decoder({ language }: Props){
  return (
    <Encoder
      language={language}
      initialInputEncoding="base64"
      initialOutputEncoding="text-utf8"
    />
  )
}

