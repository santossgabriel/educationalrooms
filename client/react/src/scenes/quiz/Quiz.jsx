import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { LinearProgress } from '@material-ui/core'
import PropTypes from 'prop-types'
import openSocket from 'socket.io-client'


import { Wrong, Sent, Correct, TimeOver, STATUS } from './Feedbacks'
import { Container, Title, TextPoints, TextQuestion, ContainerAnswers, AnswerButton } from './styles'
import { QuizStatus, SocketEvents } from 'helpers'
import { roomService, storageService } from 'services'
import { onlineChanged } from '../../actions'

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

export default function Quiz(props) {

  const [status, setStatus] = useState(STATUS.ANSWER)
  const [room, setRoom] = useState({})
  const id = Number(props.match.params.id.replace(':', ''))

  useEffect(() => {
    loadRoom()
    return function cleanup() {
      dispatch(onlineChanged(false))
    }
  }, [])

  const dispatch = useDispatch()

  async function loadRoom() {
    const room = await roomService.getQuiz(id)
    setRoom(room)
    const token = storageService.getToken()
    const socket = openSocket({ query: `token=${token}` })
    socket.on('connect', () => {
      socket.emit('subscribe', token)
      socket.on('onError', (message) => console.error('Erro Socket', message))
      dispatch(onlineChanged(true))
      console.log('me conectei!')
    })
    socket.on('disconnect', () => console.log('fui disconectado!'))
  }



  function changeStatus() {

    // switch (status) {
    //   case STATUS.TIME_OVER:
    //     setStatus(STATUS.SENT)
    //     break
    //   case STATUS.SENT:
    //     setStatus(STATUS.CORRECT)
    //     break
    //   case STATUS.CORRECT:
    //     setStatus(STATUS.WRONG)
    //     break
    //   default:
    //     setStatus(STATUS.TIME_OVER)
    //     break
    // }
  }

  // onInit(){
  // this.room = res
  //       if (this.room && !this.room.endedAt) {
  //         this.step = 10 / this.room.time
  //         this.socket = Globals.getSocket()
  //         if (this.socket)
  //           this.initSocket()
  //       } else if (this.room.endedAt)
  //         this.mode = this.ENDED
  //       else
  //         this.mode = this.UNAVAILABLE
  //     }

  // answer(a: Answer) {
  //   this.answered = true
  //   this.mode = this.SENT
  //   this.socket.emit(SocketEvents.Server.SEND_ANSWER, {
  //     roomId: this.room.id,
  //     questionId: this.question.id,
  //     answerId: a.id
  //   })
  // }

  // initSocket() {

  //   if (this.room && this.room.id > 0) {
  //     this.socket.emit(SocketEvents.Server.IN_ROOM, this.room.id)

  //     this.socket.on(SocketEvents.Client.QUESTION_RECEIVED, (q) => {
  //       if (q.roomId == this.room.id) {
  //         this.question = q
  //         this.mode = q.answered ? this.SENT : this.ANSWER
  //         this.runTimer()
  //         this.progress = 0
  //       }
  //     })

  //     this.socket.on(SocketEvents.Client.FEEDBACK_ANSWER, (q) => {
  //       if (q.roomId == this.room.id) {
  //         this.question = q
  //         this.mode = q.feedback
  //       }
  //     })

  //     this.socket.on(SocketEvents.Client.FINISH_ROOM, res => {
  //       if (res.roomId == this.room.id) {
  //         this.room.score = res.score || 0
  //         this.mode = this.ENDED
  //       }
  //     })
  //   }
  // }

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