import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {
  Button,
  TableBody,
  TableRow,
  Table,
  TableHead,
  Snackbar,
  LinearProgress
} from '@material-ui/core'

import { roomService } from '../../services'
import CardMain from '../../components/main/CardMain'
import { AppTexts, RoomStatus } from '../../helpers'

import { CellHead, NoContentMessage, Container, CellRow } from './styles'

export default function AssociatedRooms() {

  const [rooms, setRooms] = useState([])
  const [messageSnackBar, setMessageSnackBar] = useState('')

  const language = useSelector(state => state.appState.language)

  useEffect(() => {
    roomService.getAssociated().then(rooms => setRooms(rooms))
  }, [])

  function openScores() {

  }

  return (
    <CardMain title={AppTexts.MainComponent.RoomTexts.Associate[language]}>
      {rooms.length ?
        <Container>
          <Table aria-labelledby="tableTitle">
            <TableHead>
              <TableRow>
                <CellHead>{AppTexts.AssociatedRoomTable.Name[language]}</CellHead>
                <CellHead>{AppTexts.AssociatedRoomTable.Status[language]}</CellHead>
                <CellHead>{AppTexts.AssociatedRoomTable.Score[language]}</CellHead>
                <CellHead>{AppTexts.Root.Actions[language]}</CellHead>
              </TableRow>
            </TableHead>
            <TableBody>
              {rooms.map(n => (
                <TableRow key={n.id}>
                  <CellRow>{n.name}</CellRow>
                  <CellRow>
                    {(AppTexts.RoomStatus[n.status] || {})[language]}
                    {n.status === RoomStatus.STARTED && <LinearProgress />}
                  </CellRow>
                  <CellRow>{n.status === RoomStatus.ENDED ? (n.score || 0) : '???'}</CellRow>
                  <CellRow>
                    {n.status === RoomStatus.ENDED ? // ICON 'poll'
                      <Button color="primary"
                        variant="contained"
                        onClick={() => openScores(n)}>SCORES</Button> : null
                    }

                    {n.status === RoomStatus.STARTED ? // ICON 'trending_flat'
                      <Link to={`quiz/${n.id}`}
                        style={{ textDecoration: 'none' }}>
                        <Button color="primary"
                          variant="contained">Abrir QUIZ</Button>
                      </Link> : null
                    }

                  </CellRow>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Container>
        : <NoContentMessage>Você ainda não criou salas.</NoContentMessage>
      }
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        key="bottom,right"
        open={!!messageSnackBar}
        onClose={() => setMessageSnackBar('')}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">{messageSnackBar}</span>}
      />
    </CardMain>
  )
}