import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { LinearProgress } from '@material-ui/core'
import PropTypes from 'prop-types'
import { ClientSocket } from 'store/client-socket'

import { Wrong, Sent, Correct, TimeOver, Loading, Ended } from './Feedbacks'
import {
  Container, Title, TextPoints,
  TextQuestion, ContainerAnswers, AnswerButton
} from './styles'
import { QuizStatus, SocketEvents } from 'helpers'
import { roomService } from 'services'
import { startQuiz, answerSent, SocketActions } from 'store/actions'

export default function Quiz(props) {

  const [room, setRoom] = useState({})
  const id = Number(props.match.params.id.replace(':', ''))

  const quiz = useSelector(state => state.quizState)
  const dispatch = useDispatch()

  useEffect(() => {
    loadRoom()
  }, [])

  async function loadRoom() {
    const room = await roomService.getQuiz(id)
    setRoom(room)
    if (room.endedAt) {
      dispatch(SocketActions.roomFinished())
    } else {
      dispatch(startQuiz(id))
      ClientSocket.send(SocketEvents.Server.IN_ROOM, id)
    }
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

  function sendAnswer(answer) {
    dispatch(answerSent(answer))
    ClientSocket.send(SocketEvents.Server.SEND_ANSWER, {
      roomId: quiz.roomId,
      questionId: quiz.question.id,
      answerId: answer.id
    })
  }

  return (
    <Container>
      <Title>{room.name}</Title>
      {
        quiz.status === QuizStatus.ANSWER &&
        <div>
          <LinearProgress variant="indeterminate" style={{ marginBottom: 10 }} />
          <TextPoints>Valendo {quiz.question.points} pontos</TextPoints>
          <TextQuestion>{quiz.question.description}</TextQuestion>
          <ContainerAnswers>
            {quiz.question.answers.map(a => <AnswerButton
              onClick={() => sendAnswer(a)}
              key={a.id}>{a.description}</AnswerButton>)}
          </ContainerAnswers>
        </div>
      }
      {quiz.status === QuizStatus.TIME_OVER && <TimeOver />}
      {quiz.status === QuizStatus.SENT && <Sent />}
      {quiz.status === QuizStatus.CORRECT && <Correct />}
      {quiz.status === QuizStatus.WRONG && <Wrong />}
      {quiz.status === QuizStatus.LOADING && <Loading />}
      {quiz.status === QuizStatus.ENDED && <Ended score={quiz.score} />}
    </Container >
  )
}

Quiz.propTypes = {
  match: PropTypes.object
}