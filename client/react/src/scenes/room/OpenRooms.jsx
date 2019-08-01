import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import {
  Button,
  TableBody,
  TableRow,
  Table,
  TableHead,
  Snackbar
} from '@material-ui/core'

import { roomService } from '../../services'
import CardMain from '../../components/main/CardMain'
import { AppTexts } from '../../helpers'

import { CellHead, NoContentMessage, Container, CellRow } from './styles'

const ENTER = AppTexts.OpenedRoomTable.Enter
const LEAVE = AppTexts.OpenedRoomTable.Leave

export default function OpenRooms() {

  const [rooms, setRooms] = useState([])
  const [messageSnackBar, setMessageSnackBar] = useState('')

  const language = useSelector(state => state.appState.language)

  useEffect(() => {
    roomService.getOpened().then(rooms => setRooms(rooms))
  }, [])

  async function associate(id, associate) {
    try {
      const res = await roomService.associate(id, associate)
      const room = rooms.find(p => p.id === id)
      room.associate = associate
      setRooms([...rooms])
      setMessageSnackBar(res.message)
    } catch (ex) {
      setMessageSnackBar(ex.message)
    }
  }

  return (
    <CardMain title={AppTexts.MainComponent.RoomTexts.Open[language]}>
      {rooms.length ?
        <Container>
          <Table aria-labelledby="tableTitle">
            <TableHead>
              <TableRow>
                <CellHead style={{ marginLeft: '5px' }}>N°</CellHead>
                <CellHead>{AppTexts.OpenedRoomTable.Owner[language]}</CellHead>
                <CellHead>{AppTexts.OpenedRoomTable.Name[language]}</CellHead>
                <CellHead>{AppTexts.OpenedRoomTable.Users[language]}</CellHead>
                <CellHead>{AppTexts.OpenedRoomTable.Questions[language]}</CellHead>
                <CellHead>{AppTexts.OpenedRoomTable.Duration[language]}</CellHead>
                <CellHead>{AppTexts.Root.Actions[language]}</CellHead>
              </TableRow>
            </TableHead>
            <TableBody>
              {rooms
                .map(n => (
                  <TableRow
                    key={n.id}>
                    <CellRow>{n.id}</CellRow>
                    <CellRow>{n.owner}</CellRow>
                    <CellRow>{n.name}</CellRow>
                    <CellRow>{n.users}</CellRow>
                    <CellRow>{n.questions}</CellRow>
                    <CellRow style={{ textTransform: 'lowercase' }}>{`${n.time * n.questions}s`}</CellRow>
                    <CellRow>
                      <Button color="primary"
                        variant={n.associate ? 'outlined' : 'contained'}
                        onClick={() => associate(n.id, !n.associate)}>
                        {n.associate ? LEAVE[language] : ENTER[language]}
                      </Button>
                    </CellRow>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </Container>
        : <NoContentMessage>{AppTexts.OpenedRoomTable.NoRooms[language]}</NoContentMessage>
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