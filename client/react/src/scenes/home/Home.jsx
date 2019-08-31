import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LabelList, Bar, BarChart, CartesianGrid, XAxis, Tooltip, YAxis, Legend } from 'recharts'

import { scoreService } from 'services'
import { toDateFormat,AppTexts } from 'helpers'
import { Title, SubTitle, Container } from './styles'
import { showToastError } from 'store/sagas/actions'

const styles = {
  label: { fontSize: '12px', fontFamily: 'Arial, Helvetica, sans-serif', color: '#666' },
  tooltip: { fontSize: '12px', fontFamily: 'Arial, Helvetica, sans-serif' }
}

export default function UserAccount() {
  const [scores, setScores] = useState([])
  const [totalScores, setTotalScores] = useState(0)
  const [totalPoints, setTotalPoints] = useState(0)

  const dispatch = useDispatch()
  const language = useSelector(state => state.appState.language)

  useEffect(() => {
    scoreService.getScoreGraph()
      .then(res => {
        let totScores = 0, totPoints = 0
        res.forEach(p => {
          totPoints += p.points
          totScores += p.score
          p.date = toDateFormat(p.endedAt)
        })
        setTotalScores(totScores)
        setTotalPoints(totPoints)
        setScores(res)
      })
      .catch(err => dispatch(showToastError(err.message)))
  }, [])

  return (
    <Container>
      <Title> {AppTexts.Home.Participations[language]}: {scores.length}</Title>
      <SubTitle>{AppTexts.Home.Scores[language]}: {totalScores}/{totalPoints} </SubTitle>
      <BarChart width={800} height={500} data={scores} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis style={styles.label} dataKey="date" />
        <YAxis style={styles.label} />
        <Tooltip itemStyle={styles.tooltip} labelStyle={styles.tooltip} />
        <Legend verticalAlign="bottom" wrapperStyle={styles.label} />
        <Bar name={AppTexts.Home.ScorePossible[language]} dataKey="points" fill="#7cb5ec">
          <LabelList dataKey="points" position="top" style={styles.label} />
        </Bar>
        <Bar name={AppTexts.Home.ScoreMade[language]} dataKey="score" fill="#4a4">
          <LabelList dataKey="score" position="top" style={styles.label} />
        </Bar>
      </BarChart>
    </Container>
  )
}