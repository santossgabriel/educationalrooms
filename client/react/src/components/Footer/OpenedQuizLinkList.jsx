import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { ArrowUp, ArrowDown } from 'components'

import { roomStarted } from 'store/actions'
import { ContainerOpenedRooms, Title, ListItem, ContainerListItem } from './styles'
import { roomService } from 'services'

export default function OpenedQuizLinkList() {

  const [show, setShow] = useState(false)

  const { onlineQuizList } = useSelector(state => state.appState)
  const dispatch = useDispatch()

  useEffect(() => {
    roomService.getAssociated().then(res => {
      const rooms = res.filter(p => p.startedAt && !p.endedAt)
      rooms.forEach(room => dispatch(roomStarted(room)))
    })
  }, [])

  return (
    <ContainerOpenedRooms show={show}>
      <Title onClick={() => setShow(!show)}>Quiz
        {show ? <ArrowDown style={{ marginLeft: '10px' }} /> : <ArrowUp style={{ marginLeft: '10px' }} />}
      </Title>
      {onlineQuizList.map(p => (
        <ContainerListItem key={p.id}>
          <div onClick={() => setShow(false)}>
            <ListItem to={`/quiz/${p.id}`}>{`${p.id} - ${p.name}`}</ListItem>
          </div>
        </ContainerListItem>
      ))}
    </ContainerOpenedRooms>
  )
}