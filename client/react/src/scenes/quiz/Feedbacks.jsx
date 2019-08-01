import React, { useState, useEffect } from 'react'
import { Check, Close, SentimentDissatisfied, Send } from '@material-ui/icons'
import { CircularProgress } from '@material-ui/core'
import PropTypes from 'prop-types'
import { Languages } from 'helpers'

import { Feedback as FeedbackContainer } from './styles'

function Feedback({ children, style }) {
  const [opacity, setOpacity] = useState(0)
  useEffect(() => setOpacity(1), [])
  return (
    <FeedbackContainer style={{ ...style, opacity: opacity }}>{children}</FeedbackContainer>
  )
}

export const TimeOver = () => (
  <Feedback style={{ color: '#5f9ed4' }}>
    <div>
      <SentimentDissatisfied fontSize="inherit" />
    </div>
    <span>tempo acabou!</span>
  </Feedback>
)

export const Sent = () => (
  <Feedback style={{ color: '#666' }}>
    <div>
      <Send fontSize="inherit" />
    </div>
    <span>resposta enviada!</span>
  </Feedback>
)

export const Correct = () => (
  <Feedback style={{ color: '#38d244' }}>
    <div>
      <Check fontSize="inherit" />
    </div>
    <span>correto!</span>
  </Feedback>
)

export const Wrong = () => (
  <Feedback style={{ color: '#F00' }}>
    <div>
      <Close fontSize="inherit" />
    </div>
    <span>errado!</span>
  </Feedback>
)

export const Loading = () => (
  <div style={{
    textAlign: 'center',
    height: '150px',
    marginTop: '80px'
  }}>
    <CircularProgress size={80} variant="indeterminate" />
  </div>
)

export const Ended = ({ score, lang }) => (
  <Feedback style={{
    fontSize: '40px',
    marginBottom: '30px',
    color: '#555'
  }}>
    {lang === Languages.EN_US ?
      <>
        <div>This room was finished</div>
        <div style={{ fontSize: '30px' }}>You scored <small style={{ color: '#4b9372', fontSize: '32px' }}>{score}</small> points.</div>
      </> :
      <>
        <div>Esta sala foi finalizada</div>
        <div style={{ fontSize: '30px' }}>Você fez <small style={{ color: '#4b9372', fontSize: '32px' }}>{score}</small> pontos.</div>
      </>
    }
  </Feedback>
)

Ended.propTypes = {
  score: PropTypes.number,
  lang: PropTypes.string
}

Feedback.propTypes = {
  children: PropTypes.node,
  style: PropTypes.object
}