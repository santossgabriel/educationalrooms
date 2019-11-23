import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Radio, IconButton } from '@material-ui/core'
import { Delete, Add } from '@material-ui/icons'

import IconTextInput from '../main/IconTextInput'
import { AppTexts } from '../../helpers/appTexts'

export default function EditQuestionAlternatives(props) {

  const classifications = ['A', 'B', 'C', 'D', 'E', 'F']
  const defaultAlternatives = [
    { correct: true, classification: 'A' },
    { correct: false, classification: 'B' }
  ]

  const [alternatives, setAlternatives] = useState((props.alternatives || []).length ? props.alternatives : defaultAlternatives)
  const [correct, setCorrect] = useState(alternatives.filter(p => p.correct)[0].classification)
  const language = useSelector(state => state.appState.language)

  useEffect(() => {
    props.onAlternativeChange(alternatives)
  }, [])

  function removeAlternative(alt) {
    const alts = alternatives.filter(p => p.classification !== alt.classification)
    alts.forEach((v, i) => v.classification = classifications[i])
    setAlternatives(alts)
    setCorrect(classifications[0])
    props.onAlternativeChange(alts)
  }

  function addAlternative() {
    const alts = alternatives.concat([{ classification: classifications[alternatives.length] }])
    setAlternatives(alts)
    props.onAlternativeChange(alts)
  }

  function descriptionChanged(alternative, value) {
    alternative.description = value
    props.onAlternativeChange(alternatives)
  }

  function setCorrectAlternative(classification) {
    alternatives.forEach(p => p.correct = false)
    alternatives.find(p => p.classification === classification).correct = true
    setCorrect(classification)
    props.onAlternativeChange(alternatives)
  }

  return (
    <div>
      <div style={{ textAlign: 'right', fontSize: '8px', fontWeight: 'bold' }}>
        <span>{AppTexts.Root.Correct[language]}</span>
        <span style={{ marginLeft: '5px' }}>{AppTexts.Root.Remove[language]}</span>
      </div>
      {alternatives.map((p, i) => (
        <div key={i}>
          <IconTextInput required label={p.classification} defaultValue={p.description}
            onChange={e => descriptionChanged(p, e.value)} />
          <Radio color="primary" style={{ marginTop: '15px' }} checked={p.classification === correct}
            onChange={() => setCorrectAlternative(p.classification)} />
          <IconButton color="secondary" style={{ marginTop: '15px' }} size="small" aria-label="Delete"
            onClick={() => removeAlternative(p)}
            disabled={alternatives.length < 3}>
            <Delete />
          </IconButton>
        </div>))
      }
      <div style={{ textAlign: 'center', marginTop: '10px' }}
        hidden={alternatives.length > 5}>
        <IconButton color="primary" aria-label="Add" onClick={() => addAlternative()}>
          <Add />
        </IconButton>
      </div>
    </div>
  )
}
