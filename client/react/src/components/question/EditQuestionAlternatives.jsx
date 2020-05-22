import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Radio, IconButton } from '@material-ui/core'
import { Delete, Add } from '@material-ui/icons'
import PropTypes from 'prop-types'

import IconTextInput from '../main/IconTextInput'
import { AppTexts } from '../../helpers/appTexts'

const classifications = ['A', 'B', 'C', 'D', 'E', 'F']

export function EditQuestionAlternatives({ defaultAlternatives, onAlternativeChange }) {

  const [alternatives, setAlternatives] = useState([])
  const [correct, setCorrect] = useState('')

  const language = useSelector(state => state.appState.language)

  useEffect(() => {
    setAlternatives(defaultAlternatives)
    setCorrect((defaultAlternatives.find(p => p.correct) || {}).classification || '')
  }, [])

  function removeAlternative(alt) {
    const alts = alternatives.filter(p => p.classification !== alt.classification)
    alts.forEach((v, i) => {
      v.classification = classifications[i]
      v.correct = i === 0
    })

    setCorrect(classifications[0])
    setAlternatives(alts)
    onAlternativeChange(alts)
  }

  function addAlternative() {
    const alts = alternatives.concat([{ classification: classifications[alternatives.length] }])
    setAlternatives(alts)
    onAlternativeChange(alts)
  }

  function descriptionChanged(alternative, value) {
    alternative.description = value
    setAlternatives(alternatives)
    onAlternativeChange(alternatives)
  }

  function setCorrectAlternative(classification) {
    alternatives.forEach(p => p.correct = false)
    alternatives.find(p => p.classification === classification).correct = true
    setCorrect(classification)
    setAlternatives(alternatives)
    onAlternativeChange(alternatives)
  }

  return (
    <div>
      <div style={{ textAlign: 'right', marginRight: '4px', fontSize: '8px', fontWeight: 'bold' }}>
        <span>{AppTexts.Root.Correct[language]}</span>
        <span style={{ marginLeft: '5px' }}>{AppTexts.Root.Remove[language]}</span>
      </div>
      {
        alternatives.map((p, i) => (
          <div key={i}>
            <IconTextInput required label={p.classification} defaultValue={p.description}
              onChange={e => descriptionChanged(p, e.value)} />
            <Radio color="primary" style={{ marginTop: '15px', marginLeft: '10px' }}
              checked={p.classification === correct}
              onChange={() => setCorrectAlternative(p.classification)} />
            <IconButton color="secondary" style={{ marginTop: '15px', marginLeft: '10px' }}
              size="small" aria-label="Delete"
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

EditQuestionAlternatives.propTypes = {
  onAlternativeChange: PropTypes.func,
  defaultAlternatives: PropTypes.array
}