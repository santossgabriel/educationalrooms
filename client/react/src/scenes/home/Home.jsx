import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { LabelList, Bar, BarChart, CartesianGrid, XAxis, Tooltip, YAxis, Legend } from 'recharts'
import { Card } from '@material-ui/core'

import { scoreService } from 'services'
import CardMain from 'components/main/CardMain'
import { AppTexts } from 'helpers/appTexts'
import { toDateFormat } from 'helpers'
import { Title, SubTitle } from './styles'

const styles = {
  label: { fontSize: '12px', fontFamily: 'Arial, Helvetica, sans-serif', color: '#666' },
  tooltip: { fontSize: '12px', fontFamily: 'Arial, Helvetica, sans-serif' }
}

export default function UserAccount() {
  const [scores, setScores] = useState([])
  const [totalScores, setTotalScores] = useState(0)
  const [totalPoints, setTotalPoints] = useState(0)
  useEffect(() => {
    scoreService.getScoreGraph()
      .then(res => {
        let totScores = 0, totPoints = 0
        res.forEach(p => {
          totPoints += p.points
          totScores += p.score
          p.date = toDateFormat(p.endedAt)
          console.log(p.date)
        })
        setTotalScores(totScores)
        setTotalPoints(totPoints)
        setScores(res)
      })
      .catch(err => console.log(err))
  }, [])

  console.log(scores)

  return (
    <Card>
      <Title> Participações: {scores.length}</Title>
      <SubTitle>Total de pontos já realizados: {totalScores}/{totalPoints} </SubTitle>
      <BarChart width={1000} height={500} data={scores} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis style={styles.label} dataKey="date" />
        <YAxis style={styles.label} />
        <Tooltip itemStyle={styles.tooltip} labelStyle={styles.tooltip} />
        <Legend verticalAlign="bottom" wrapperStyle={styles.label} />
        <Bar name="Pontos possíveis" dataKey="points" fill="#7cb5ec">
          <LabelList dataKey="points" position="top" style={styles.label} />
        </Bar>
        <Bar name="Pontos realizados" dataKey="score" fill="#4a4">
          <LabelList dataKey="score" position="top" style={styles.label} />
        </Bar>
      </BarChart>
    </Card>
  )
}