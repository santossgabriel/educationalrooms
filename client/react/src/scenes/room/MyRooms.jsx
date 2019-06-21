import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import * as Icons from '@material-ui/icons'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'
import {
  TableBody,
  TableRow,
  TableFooter,
  Table,
  TableCell,
  TablePagination,
  Button,
  TableHead,
  Paper,
  IconButton,
  Tooltip,
  LinearProgress
} from '@material-ui/core'

import { roomService } from '../../services'
import CardMain from '../../components/main/CardMain'
import { AppTexts, RoomStatus } from '../../helpers'
import { ConfirmModal } from '../../components/main/Modal'
import { showError, showSuccess } from '../../actions'

import { CellHead, NoContentMessage, Container, CellRow } from './styles'

const styles = {
  tableHeader: {
    color: '#AAA',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  tableRow: {
    textAlign: 'center',
    color: '#666',
    marginTop: '50px'
  },
  tableActions: {
    textAlign: 'center',
    minWidth: '150px',
    color: '#666'
  }
}

const StatusButton = (props) => {
  if (props.status === RoomStatus.CLOSED) {
    return (
      <Tooltip title={AppTexts.Room.OpenRoom[props.language]} placement="bottom">
        <IconButton color="primary"
          aria-label="Menu"
          onClick={props.onClick ? () => props.onClick(props.status) : null}>
          <Icons.CallMade />
        </IconButton>
      </Tooltip >
    )
  } else if (props.status === RoomStatus.OPENED) {
    return (
      <Tooltip title={AppTexts.Room.StartRoom[props.language]} placement="bottom">
        <IconButton color="primary"
          aria-label="Menu"
          onClick={props.onClick ? () => props.onClick(props.status) : null}>
          <Icons.PlayArrow />
        </IconButton>
      </Tooltip >
    )
  } else if (props.status === RoomStatus.STARTED) {
    return (
      <Tooltip title={AppTexts.Room.EndRoom[props.language]} placement="bottom">
        <IconButton color="primary"
          aria-label="Menu"
          onClick={props.onClick ? () => props.onClick(props.status) : null}>
          <Icons.PowerSettingsNew />
        </IconButton>
      </Tooltip >
    )
  } else
    return null
}

const StatusDate = ({ date, label }) => date ? (
  <div style={{ lineHeight: '18px', fontSize: 12, fontFamily: 'Arial, Helvetica, sans-serif', color: '#666' }}>
    <span>{label}</span>
    <span>
      <Moment format="DD/MM/YY HH:mm">
        {date}
      </Moment>
    </span>
  </div>
) : null

StatusDate.propTypes = {
  date: PropTypes.string,
  label: PropTypes.string
}

export default function MyRooms() {

  const [rooms, setRooms] = useState([])
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [page, setPage] = useState(0)
  const [question, setQuestion] = useState({})
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [removeRoom, setRemoveRoom] = useState(null)
  const [emptyRows, setEmptyRows] = useState(0)
  const language = useSelector(state => state.appState.language)
  const dispatch = useDispatch()

  useEffect(() => {
    refresh()
  }, [])

  useEffect(() => {
    const emptyRows = rowsPerPage - (rooms.length - (page * rowsPerPage))
    setEmptyRows(emptyRows)
  }, [rooms, page, rowsPerPage])

  // constructor(props) {
  //   super(props)
  //   this.state = {
  //     emptyRows: 0,
  //     rowsPerPage: 5,
  //     page: 5,
  //     editModalOpen: false,
  //     question: {},
  //     removeRoom: null,
  //     rooms: []
  //   }
  // }

  async function refresh() {
    const rooms = roomService.getMy()
    setRooms(rooms)
  }

  async function changeRoomStatus(room) {
    let newStatus = null
    switch (room.status) {
      case RoomStatus.CLOSED:
        newStatus = RoomStatus.OPENED
        break
      case RoomStatus.OPENED:
        newStatus = RoomStatus.STARTED
        break
      case RoomStatus.STARTED:
        newStatus = RoomStatus.ENDED
        break
    }
    try {
      const res = await roomService.changeStatus(room.id, newStatus)
      this.refresh()
      dispatch(showSuccess(res.message))
    } catch (ex) {
      dispatch(showError(ex.message))
    }
  }

  async function onResultRemoveRoom(confirm) {
    if (confirm) {
      try {
        const res = roomService.remove(this.state.removeRoom.id)
        this.refresh()
        dispatch(showSuccess(res.message))
      } catch (ex) {
        dispatch(showError(ex.message))
      }
    }
    setRemoveRoom(null)
  }

  return (
    <CardMain title={AppTexts.MainComponent.RoomTexts.My[language]}>
      {rooms.length ?
        <Paper>
          <Table aria-labelledby="tableTitle">
            <TableHead>
              <TableRow>
                <TableCell style={styles.tableHeader}>N°</TableCell>
                <TableCell padding="none" style={styles.tableHeader}>{AppTexts.MyRoomsTable.Name[language]}</TableCell>
                <TableCell padding="none" style={styles.tableHeader}>{AppTexts.MyRoomsTable.Status[language]}</TableCell>
                <TableCell padding="none" style={styles.tableHeader}>{AppTexts.MyRoomsTable.Users[language]}</TableCell>
                <TableCell padding="none" style={styles.tableHeader}>{AppTexts.MyRoomsTable.Questions[language]}</TableCell>
                <TableCell padding="none" style={styles.tableHeader}>{AppTexts.MyRoomsTable.Duration[language]}</TableCell>
                <TableCell padding="none" style={styles.tableActions}>{AppTexts.Root.Actions[language]}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rooms
                .map(n => (
                  <TableRow
                    key={n.id}>
                    <TableCell style={styles.tableRow}>{n.id}</TableCell>
                    <TableCell padding="none" style={styles.tableRow}>{n.name}</TableCell>
                    <TableCell padding="none" style={{ paddingTop: 5, ...styles.tableRow }}>
                      <span>{AppTexts.Room.Status[n.status][language]}</span>
                      <StatusDate date={n.createdAt} label={AppTexts.Room.CreatedAt[language]} />
                      <StatusDate date={n.openedAt} label={AppTexts.Room.OpenedAt[language]} />
                      <StatusDate date={n.startedAt} label={AppTexts.Room.StartedAt[language]} />
                      <StatusDate date={n.endedAt} label={AppTexts.Room.EndedAt[language]} />
                      {
                        n.startedAt && !n.endedAt ?
                          <LinearProgress variant="indeterminate" style={{ marginBottom: 10 }} />
                          : null
                      }
                    </TableCell>
                    <TableCell padding="none" style={styles.tableRow}>{n.users.length}</TableCell>
                    <TableCell padding="none" style={styles.tableRow}>{n.questions.length}</TableCell>
                    <TableCell padding="none" style={styles.tableRow}>{`${n.time}s`}</TableCell>
                    <TableCell padding="none" style={styles.tableRow}>
                      <StatusButton
                        language={language}
                        status={n.status}
                        onClick={() => changeRoomStatus(n)} />
                      {n.status === RoomStatus.OPENED || n.status === RoomStatus.CLOSED ?
                        <span>
                          <Link to={`edit-room/:${n.id}`}
                            style={{ textDecoration: 'none' }}>
                            <Tooltip title={AppTexts.Root.Edit[language]} placement="bottom">
                              <IconButton color="primary"
                                aria-label="Menu"
                                onClick={event => {
                                  event.stopPropagation()
                                  setRemoveRoom(n)
                                }}>
                                <Icons.Edit />
                              </IconButton>
                            </Tooltip>
                          </Link>
                          <Tooltip title={AppTexts.Root.Remove[language]} placement="bottom">
                            <IconButton color="secondary"
                              aria-label="Menu"
                              onClick={event => {
                                event.stopPropagation()
                                setRemoveRoom(n)
                              }}>
                              <Icons.Delete />
                            </IconButton>
                          </Tooltip>
                        </span>
                        : null}
                    </TableCell>
                  </TableRow>
                ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  component="div"
                  count={rooms.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
                  labelRowsPerPage="itens por página"
                  backIconButtonProps={{
                    'aria-label': 'Previous Page',
                  }}
                  nextIconButtonProps={{
                    'aria-label': 'Next Page',
                  }}
                  onChangePage={(e, p) => setPage(p)}
                  onChangeRowsPerPage={e => setRowsPerPage(e.target.value)}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </Paper>
        : <NoContentMessage>Você ainda não criou salas.</NoContentMessage>
      }

      <div style={{ textAlign: 'center', padding: '5px' }}>
        <Link to="edit-room/:0"
          style={{ textDecoration: 'none' }}>
          <Button
            color="primary" variant="contained">{AppTexts.MyRoomsTable.CreateRoom[language]}</Button>
        </Link>
      </div>

      <ConfirmModal open={!!removeRoom}
        title={AppTexts.Question.ConfirmExclusionTitle[language]}
        text={removeRoom ? removeRoom.description : ''}
        onResult={confirm => onResultRemoveRoom(confirm)}>
      </ConfirmModal>
    </CardMain>
  )
}