import { ArrowLeft } from 'components'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { roomService } from 'services'
import { roomStarted } from 'store/actions'
import { ContainerListItem, ContainerOpenedRooms, ListItem, Title } from './styles'

export default function OpenedQuizLinkList() {

  const [show, setShow] = useState(false)

  const { onlineQuizList, user } = useSelector(state => state.appState)
  const dispatch = useDispatch()

  useEffect(() => {
    roomService.getAssociated().then(res => {
      const rooms = res.filter(p => p.startedAt && !p.endedAt)
      rooms.forEach(room => dispatch(roomStarted(room)))
    })
  }, [])

  return (
    <ContainerOpenedRooms show={user && show}>
      <Title>Quiz</Title>
      {onlineQuizList.map(p => (
        <ContainerListItem key={p.id}>
          <div onClick={() => setShow(false)}>
            <ListItem to={`/quiz/${p.id}`}>{`${p.id} - ${p.name}`}</ListItem>
          </div>
        </ContainerListItem>
      ))}
      <ArrowLeft />
    </ContainerOpenedRooms >
  )
}