import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Icons from '@material-ui/icons'
import { Link } from 'react-router-dom'
import {
  TableBody,
  TableRow,
  Table,
  TableCell,
  TablePagination,
  Button,
  TableHead,
  Paper,
  IconButton,
  Tooltip
} from '@material-ui/core'

import { roomService } from '../../services'
import CardMain from '../../components/main/CardMain'
import { AppTexts, RoomStatus } from '../../helpers'
import { ConfirmModal } from '../../components/main/Modal'
import { showError, showSuccess } from '../../actions'

const styles = {
  tableHeader: {
    color: '#AAA',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  tableRow: {
    textAlign: 'center'
  },
  tableActions: {
    textAlign: 'center',
    minWidth: '150px'
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

class MyRooms extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      emptyRows: 0,
      rowsPerPage: 5,
      page: 5,
      editModalOpen: false,
      question: {},
      removeQuestion: null,
      rooms: []
    }
  }

  componentDidMount() {
    this.refresh()
  }

  refresh() {
    roomService.getMy().then(res => this.setState({ rooms: res }))
  }

  changeRoomStatus(room) {
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
    roomService.changeStatus(room.id, newStatus).then(res => {
      this.refresh()
      this.props.showSuccess(res.message)
    }).catch(err => this.props.showError(err.message))
  }

  render() {
    const { rooms } = this.state
    return (
      <CardMain title={AppTexts.MainComponent.RoomTexts.My[this.props.language]}>
        <Paper>
          <Table aria-labelledby="tableTitle">
            <TableHead>
              <TableRow>
                <TableCell style={styles.tableHeader}>N°</TableCell>
                <TableCell style={styles.tableHeader}>{AppTexts.MyRoomsTable.Name[this.props.language]}</TableCell>
                <TableCell style={styles.tableHeader}>{AppTexts.MyRoomsTable.Status[this.props.language]}</TableCell>
                <TableCell style={styles.tableHeader}>{AppTexts.MyRoomsTable.Users[this.props.language]}</TableCell>
                <TableCell style={styles.tableHeader}>{AppTexts.MyRoomsTable.Questions[this.props.language]}</TableCell>
                <TableCell style={styles.tableHeader}>{AppTexts.MyRoomsTable.Duration[this.props.language]}</TableCell>
                <TableCell style={styles.tableActions}>{AppTexts.Root.Actions[this.props.language]}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rooms
                .map(n => (
                  <TableRow
                    key={n.id}>
                    <TableCell style={styles.tableRow}>{n.id}</TableCell>
                    <TableCell style={styles.tableRow}>{n.name}</TableCell>
                    <TableCell style={styles.tableRow}>{AppTexts.Room.Status[n.status][this.props.language]}</TableCell>
                    <TableCell style={styles.tableRow}>{n.users.length}</TableCell>
                    <TableCell style={styles.tableRow}>{n.questions.length}</TableCell>
                    <TableCell style={styles.tableRow}>{`${n.time}s`}</TableCell>
                    <TableCell style={styles.tableRow}>
                      <StatusButton
                        language={this.props.language}
                        status={n.status}
                        onClick={() => this.changeRoomStatus(n)} />
                      {n.status === RoomStatus.OPENED || n.status === RoomStatus.CLOSED ?
                        <span>
                          <Link to={`edit-room/:${n.id}`}
                            style={{ textDecoration: 'none' }}>
                            <Tooltip title={AppTexts.Root.Edit[this.props.language]} placement="bottom">
                              <IconButton color="primary"
                                aria-label="Menu"
                                onClick={event => {
                                  event.stopPropagation();
                                  this.setState({ removeQuestion: n })
                                }}>
                                <Icons.Edit />
                              </IconButton>
                            </Tooltip>
                          </Link>
                          <Tooltip title={AppTexts.Root.Remove[this.props.language]} placement="bottom">
                            <IconButton color="secondary"
                              aria-label="Menu"
                              onClick={event => {
                                event.stopPropagation();
                                this.setState({ removeQuestion: n })
                              }}>
                              <Icons.Delete />
                            </IconButton>
                          </Tooltip>
                        </span>
                        : null}
                    </TableCell>
                  </TableRow>
                ))}
              {this.state.emptyRows > 0 && (
                <TableRow style={{ height: 49 * this.state.emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Paper>
        <TablePagination
          component="div"
          count={this.state.rooms.length}
          rowsPerPage={this.state.rowsPerPage}
          page={this.state.page}
          labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
          labelRowsPerPage="itens por página"
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={(e, p) => this.setState({ page: p })}
          onChangeRowsPerPage={e => this.setState({ rowsPerPage: e.target.value })}
        />

        <div style={{ textAlign: 'center', padding: '5px' }}>
          <Link to="edit-room/:0"
            style={{ textDecoration: 'none' }}>
            <Button
              color="primary" variant="raised">{AppTexts.MyRoomsTable.CreateRoom[this.props.language]}</Button>
          </Link>
        </div>

        <ConfirmModal open={!!this.state.removeQuestion}
          title={AppTexts.Question.ConfirmExclusionTitle[this.props.language]}
          text={this.state.removeQuestion ? this.state.removeQuestion.description : ''}
          onResult={confirm => this.onResultRemoveQuestion(confirm)}>
        </ConfirmModal>
      </CardMain>
    )
  }
}

const mapStateToProps = state => ({ language: state.appState.language })
const mapDispatchToProps = dispatch => bindActionCreators({ showError, showSuccess }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(MyRooms)