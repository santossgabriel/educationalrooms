import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Button,
  Zoom,
  List,
  ListItem,
  ListItemText,
  Table,
  TableHead,
  TableRow,
  TableBody,
  Paper
} from '@material-ui/core'

import { scoreService } from 'services'
import { RippleOrder, TableBodyCell, TableHeadCell, TableRowBody } from './styles'

export default function RoomScoresModal({ room, onClose }) {

  const [scores, setScores] = useState()
  const [user, setUser] = useState()
  const [users, setUsers] = useState([])

  useEffect(() => {
    scoreService.getScore().then(res => setScores(res))
  }, [])

  function refresh() {
    if (scores) {
      const roomScores = scores.myRoomsScores.find(p => p.id === room.id)
      setUsers(roomScores.users)
    }
  }

  function showDetails(u) {
    setUser((user || {}).id === u.id ? null : u)
  }

  return (
    <Dialog
      open={!!room}
      onClose={onClose}
      onEnter={refresh}
      transitionDuration={250}
      maxWidth={false}
      TransitionComponent={Zoom}>
      <DialogTitle style={{ textAlign: 'center' }}>
        <span style={{ fontFamily: 'Arial', textTransform: 'uppercase', fontSize: '26px' }}>
          {(room || {}).name}
        </span>
      </DialogTitle>
      <DialogContent>

        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <Paper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableHeadCell>Avatar</TableHeadCell>
                  <TableHeadCell>Usuário</TableHeadCell>
                  <TableHeadCell>Pontuação</TableHeadCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((p, i) =>
                  <TableRowBody key={i + ''} onClick={() => showDetails(p)}
                    itemSelected={user && user.id === p.id}>
                    <TableBodyCell component="th" scope="row">
                      <img style={{ margin: '10px', borderRadius: '50%' }}
                        height="40"
                        width="40"
                        src={p.picture || 'api/image/user-image.png'} />
                    </TableBodyCell>
                    <TableBodyCell>{p.name}</TableBodyCell>
                    <TableBodyCell>{p.score}</TableBodyCell>
                  </TableRowBody>
                )}
              </TableBody>
            </Table>
          </Paper>

          {user &&
            <div style={{ marginLeft: '30px', width: '600px', textAlign: 'center' }}>
              <div>
                <img style={{ margin: '10px', borderRadius: '50%' }}
                  height="40"
                  width="40"
                  src={user.picture || 'api/image/user-image.png'} />
              </div>
              <span>{user.name}</span>
              <hr style={{ color: '#aaaa', width: '70%' }} />
              <List style={{ fontFamily: 'Arial,Helvetica,sans-serif' }}>
                {user.questions.map((p, i) =>
                  (
                    <ListItem key={i + ''}>
                      <ListItemText>
                        <RippleOrder>{p.order}</RippleOrder>
                      </ListItemText>
                      <ListItemText style={{ textAlign: 'center', width: '80%' }} primary={p.description} />
                      <ListItemText style={{ color: '#4b9372' }} primary={`${p.score}/${p.points}`} />
                    </ListItem>
                  ))}
              </List>
            </div>
          }
        </div>
      </DialogContent>
      <div style={{ margin: '20px', textAlign: 'end' }}>
        <Button size="large" onClick={onClose} variant="contained" autoFocus>fechar</Button>
      </div>
    </Dialog>
  )
}

RoomScoresModal.propTypes = {
  room: PropTypes.object,
  onClose: PropTypes.func.isRequired
}