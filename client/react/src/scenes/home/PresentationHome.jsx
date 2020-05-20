import { Zoom } from '@material-ui/core'
import React, { useState } from 'react'
import { PresentationContainer, PresentationTitle, ImageContainer } from './styles'

const containers = [
  {
    title: 'Crie questões para serem incluídas no quiz',
    image: 'api/image/new-question-br.png'
  },
  {
    title: 'Visualize suas questões compartilhadas',
    image: 'api/image/shared-questions-br.png'
  },
  {
    title: 'Crie uma sala e inclua suas questões nela',
    image: 'api/image/new-room-br.png'
  },
  {
    title: 'Visualize as salas que estão abertas no momento',
    image: 'api/image/opened-rooms-br.png'
  },
  {
    title: 'Participe da sala do quiz',
    image: 'api/image/quiz.png'
  },
  {
    title: 'Confira sua pontuação ao fim de cada participação',
    image: 'api/image/end-score-br.png'
  },
  {
    title: 'Confira a pontuação dos participantes nas salas que você criou',
    image: 'api/image/score-users.png'
  }
]

export function PresentationHome() {

  const [index, setIndex] = useState(0)

  return (
    <Zoom in={true}>
      <PresentationContainer>
        <div>
          <i className="arrow left lg"
            onClick={() => setIndex(index ? index - 1 : 0)}></i>
        </div>
        <PresentationTitle>{containers[index].title}</PresentationTitle>
        <ImageContainer src={containers[index].image} />
        <div>
          <i className="arrow right lg"
            onClick={() => setIndex(index === containers.length - 1 ? index : index + 1)}></i>
        </div>
      </PresentationContainer>
    </Zoom >
  )
}