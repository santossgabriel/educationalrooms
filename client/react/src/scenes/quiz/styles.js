import styled from 'styled-components'

export const Container = styled.div`
  border-radius: 6px;
  overflow: hidden;
  max-width: 700px;
  margin: 0 auto;
  margin-top: 50px;
  background-color: white;
  font-family: Arial,Helvetica,sans-serif;
`

// TIME_OVER = 'TIME_OVER'
//   ANSWER = 'ANSWER'
//   LOADING = 'LOADING'
//   CORRECT = 'CORRECT'
//   WRONG = 'WRONG'
//   SENT = 'SENT'
//   UNAVAILABLE = 'UNAVAILABLE'
//   ENDED = 'ENDED'
//   DISCONNECTED = 'DISCONNECTED'

export const Title = styled.div`
  background-color: #4b9372;
  padding: 10px;
  font-size: 30px;
  color: #ddd;
  font-weight: 700;
  border-bottom: inset;
  box-shadow: 5px 0 20px #666;
`

export const Feedback = styled.div`
  padding-top: 100px;
  margin: 0 auto;
  text-align: center;
  overflow: hidden;
  text-shadow: 0 0 2px #4b9372;
  padding-bottom: 50px;
  font-size: 120px;
  transition: opacity .5s;
  span {
    font-size: 50px;
    font-weight: bold;
    text-transform: uppercase;
  }
`

export const TextPoints = styled.div`
  margin-top: 10px;
  text-align: center;
  font-size: 20px;
  color: #4b9372;
`

export const TextQuestion = styled.div`
  padding: 10px;
  text-align: center;
  font-size: 30px;
  color: #4b9372;
  font-weight: 700;
`

export const ContainerAnswers = styled.div`
  text-align: center;
  padding: 20px 20px 40px;
  font-weight: 700;
  color: #ccc;
`

export const AnswerButton = styled.div`
  margin: 10px auto 0;
  background-color: #4b9372;
  min-width: 400px;
  max-width: 700px;
  border-radius: 5px;
  transition: .3s;
  display: inline-block;
  font-size: 20px;
  padding: 10px;
`