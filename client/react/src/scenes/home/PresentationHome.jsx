import React from 'react'
import { PresentationContainer } from './styles'
import { Zoom } from '@material-ui/core'

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
    title: 'Crie uma sala quiz',
    image: 'api/image/new-room-br.png'
  },
  {
    title: 'Visualize as salas que estão abertas no momento',
    image: 'api/image/opened-rooms-br.png'
  },
  {
    title: 'Confira sua pontuação ao fim de cada participação',
    image: 'api/image/end-score-br.png'
  },
  {
    title: 'Confira sua pontuação dos participantes nas salas que você criou',
    image: 'api/image/score-users.png'
  }
]

export function PresentationHome() {

  return (
    <>
      {containers.map((p, i) =>
        <Zoom in={true} key={'' + i}>
          <PresentationContainer>
            <h3>{p.title}</h3>
            <img src={p.image} />
          </PresentationContainer>
        </Zoom>
      )}
    </>
  )
}