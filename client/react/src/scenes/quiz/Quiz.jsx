import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import { LinearProgress } from '@material-ui/core'

import { Wrong, Sent, Correct, TimeOver, STATUS } from './Feedbacks'
import { Container, Title, TextPoints, TextQuestion, ContainerAnswers, AnswerButton } from './styles'
import { QuizStatus } from 'helpers'
import { roomService } from 'services'

const question = {
  'id': 1,
  'order': 1,
  'points': 50,
  'description': 'SSD é um',
  'area': 'TI',
  'difficulty': 2,
  'answers': [{
    'id': 1,
    'description': 'Dispositivo de armazenamento de dados',
    'classification': 'A'
  }, {
    'id': 2,
    'description': 'Um processador de última geração',
    'classification': 'B'
  }],
  'roomId': 1,
  'changedAt': '2019-07-24T03:41:33.240Z',
  'time': 17280000,
  'answered': false
}

// ["questionReceived",
//   {
//     "id": 1, "order": 1, "points": 50, "description": "SSD é um", "area": "TI", "difficulty": 2, "answers":
//       [{ "id": 1, "description": "Dispositivo de armazenamento de dados", "classification": "A" }
//         , { "id": 2, "description": "Um processador de última geração", "classification": "B" }], "roomId": 1,
//     "changedAt": "2019-07-24T03:41:33.240Z", "time": 17280000, "answered": false
//   }]

export default function Quiz(props) {

  const [status, setStatus] = useState(STATUS.ANSWER)
  const [room, setRoom] = useState({})
  const id = Number(props.match.params.id.replace(':', ''))

  useEffect(() => {
    loadRoom()
  }, [])

  async function loadRoom() {
    const room = await roomService.getQuiz(id)
    setRoom(room)
  }

  function changeStatus() {
    switch (status) {
      case STATUS.TIME_OVER:
        setStatus(STATUS.SENT)
        break
      case STATUS.SENT:
        setStatus(STATUS.CORRECT)
        break
      case STATUS.CORRECT:
        setStatus(STATUS.WRONG)
        break
      default:
        setStatus(STATUS.TIME_OVER)
        break
    }
  }

  return (
    <Container onClick={() => changeFeedBack()}>
      <Title>{room.name}</Title>
      {
        status === STATUS.ANSWER &&
        <div>
          <LinearProgress variant="indeterminate" style={{ marginBottom: 10 }} />
          <TextPoints>Valendo {question.points} pontos</TextPoints>
          <TextQuestion>{question.description}</TextQuestion>
          <ContainerAnswers>
            {question.answers.map(a => <AnswerButton key={a.id}>{a.description}</AnswerButton>)}
          </ContainerAnswers>
        </div>
      }

      {status === STATUS.TIME_OVER && <TimeOver />}
      {status === STATUS.SENT && <Sent />}
      {status === STATUS.CORRECT && <Correct />}
      {status === STATUS.WRONG && <Wrong />}
    </Container >
  )
}

Quiz.propTypes = {
  match: PropTypes.object
}