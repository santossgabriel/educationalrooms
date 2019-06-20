import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  Button,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  IconButton
} from '@material-ui/core'
import { Delete } from '@material-ui/icons'
import { Route } from 'react-router-dom'

import { AppTexts, formValidator } from '../../helpers'
import {
  ConfirmModal,
  CardMain,
  IconTextInput,
  SelectQuestionModal,
  Stars
} from '../../components'
import { questionService, roomService } from '../../services'
import { showError, showSuccess } from '../../actions'

const styles = {
  noQuestions: {
    textTransform: 'initial',
    textAlign: 'center',
    fontSize: 14,
    margin: 20
  },
  up: {
    border: 'solid #666',
    borderWidth: '0 3px 3px 0',
    display: 'inlineBlock',
    padding: '3px',
    cursor: 'pointer',
    margin: '3px',
    transform: 'rotate(-135deg)'
  },
  down: {
    border: 'solid #666',
    borderWidth: '0 3px 3px 0',
    display: 'inlineBlock',
    padding: '3px',
    cursor: 'pointer',
    margin: '3px',
    transform: 'rotate(0deg)',
    ['font-size']: '6px'
  }
}

class EditRoom extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      title: AppTexts.MainComponent.RoomTexts.NewEdit,
      id: Number(this.props.match.params.id.replace(':', '')),
      form: { roomName: false, time: false, questions: false },
      questions: [],
      idsQuestions: [],
      selectedQuestions: [],
      modalQuestions: false,
      order: {},
      points: {},
      roomName: '',
      time: '',
      totalTime: 0,
      sortedBy: ''
    }
  }

  componentDidMount() {
    questionService.getMy().then(res => this.setState({ questions: res }))
  }

  fieldChanged(field) {
    this.setState({
      form: formValidator(this.state.form, field),
      [field.name]: field.value
    })
  }

  onSelectQuestions(ids) {
    const questions = this.state.questions.filter(p => ids.includes(p.id))
    this.setState({
      idsQuestions: ids,
      modalQuestions: false
    })
    this.ordenateQuestions(questions)
  }

  changeOrder(dir, idx) {
    const { selectedQuestions } = this.state
    const left = selectedQuestions.slice(0, idx)
    const right = selectedQuestions.slice(idx + 1)
    const elem = selectedQuestions[idx]
    let result = []
    if (dir === -1) {
      if (!left.length)
        return
      const temp = left.pop()
      left.push(elem)
      if (temp)
        left.push(temp)
      result = left.concat(right)
    } else {
      if (!right.length)
        return
      const temp = right.shift()
      right.unshift(elem)
      if (temp)
        right.unshift(temp)
      result = left.concat(right)
    }
    this.ordenateQuestions(result)
  }

  ordenateQuestions(questions, prop) {
    let { sortedBy } = this.state
    let i = 1
    const order = {}
    questions.forEach(p => {
      order[p.id] = i++
      p.points = this.state.points[p.id] || 50
    })

    if (prop) {
      const desc = this.state.sortedBy === prop
      if (desc) {
        questions.sort((a, b) => a[prop] > b[prop] ? -1 : a[prop] < b[prop] ? 1 : 0)
        sortedBy = ''
      } else {
        questions.sort((a, b) => a[prop] > b[prop] ? 1 : a[prop] < b[prop] ? -1 : 0)
        sortedBy = prop
      }
    }

    this.setState({
      sortedBy,
      selectedQuestions: questions,
      order: order,
      form: formValidator(this.state.form, {
        name: 'questions',
        valid: !!questions.length
      }),
    })
  }

  removeQuestion(id) {
    const questions = this.state.selectedQuestions.filter(p => p.id !== id)
    this.setState({
      idsQuestions: questions.map(p => p.id),
    })
    this.ordenateQuestions(questions)
  }

  changePoints(id, pts) {
    const { points } = this.state
    if (!points[id])
      points[id] = 50 + pts
    else if ((points[id] > 10 && pts < 0) || (points[id] < 100 && pts > 0))
      points[id] = points[id] + pts
    this.setState({ points })
  }

  save() {
    const { time, roomName, selectedQuestions, id } = this.state
    const room = {
      time,
      name: roomName,
      id,
      questions: selectedQuestions.map(p => ({
        id: p.id,
        order: this.state.order[p.id],
        points: this.state.points[p.id] || 50
      }))
    }

    roomService.save(room)
      .then(res => {
        window.location.hash = '#/my-rooms'
      })
      .catch(err => this.props.showError(err.message))
  }

  roomTime() {
    const { selectedQuestions, time } = this.state
    if (selectedQuestions.length && time)
      return selectedQuestions.length * Number(time)
    else
      return 0
  }

  render() {
    return (
      <CardMain title={this.state.title[this.state.id > 0 ? 'Edit' : 'New'][this.props.language]}>

        <IconTextInput
          label={AppTexts.MainComponent.RoomTexts.RoomName[this.props.language]}
          required
          disabled={this.state.loading}
          name="roomName"
          onChange={val => this.fieldChanged(val)}
        />

        <IconTextInput
          style={{ marginLeft: 20 }}
          label={AppTexts.MainComponent.RoomTexts.QuestionTime[this.props.language]}
          required
          disabled={this.state.loading}
          name="time"
          onChange={val => this.fieldChanged(val)}
        />

        {this.state.selectedQuestions.length ?
          <div style={{ marginTop: '20px' }}>

            <span>{AppTexts.Room.OrderBy[this.props.language]}</span>
            <Button color="primary" onClick={() => this.ordenateQuestions(this.state.selectedQuestions, 'area')}>{AppTexts.MyQuestionsTable.Area[this.props.language]}</Button>
            <Button color="primary" onClick={() => this.ordenateQuestions(this.state.selectedQuestions, 'difficulty')}>{AppTexts.MyQuestionsTable.Difficulty[this.props.language]}</Button>
            <Button color="primary" onClick={() => this.ordenateQuestions(this.state.selectedQuestions, 'description')}>{AppTexts.MyQuestionsTable.Description[this.props.language]}</Button>
            <Button color="primary" onClick={() => this.ordenateQuestions(this.state.selectedQuestions, 'points')}>{AppTexts.MyQuestionsTable.Points[this.props.language]}</Button>

            <Table aria-labelledby="tableTitle">
              <TableHead>
                <TableRow>
                  <TableCell style={{ textAlign: 'center' }}>{AppTexts.MyQuestionsTable.Order[this.props.language]}</TableCell>
                  <TableCell style={{ color: '#AAA', fontWeight: 'bold', textAlign: 'center' }}>{AppTexts.MyQuestionsTable.Area[this.props.language]}</TableCell>
                  <TableCell style={{ textAlign: 'center' }}>{AppTexts.MyQuestionsTable.Difficulty[this.props.language]}</TableCell>
                  <TableCell style={{ textAlign: 'center' }}>{AppTexts.MyQuestionsTable.Description[this.props.language]}</TableCell>
                  <TableCell style={{ textAlign: 'center' }}>{AppTexts.MyQuestionsTable.Points[this.props.language]}</TableCell>
                  <TableCell style={{ textAlign: 'center' }}></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.selectedQuestions.map((n, idx) => (
                  <TableRow
                    tabIndex={-1}
                    key={n.id}>
                    <TableCell style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '14px', fontWeight: 'bold' }}>
                        <div>
                          <i onClick={() => this.changeOrder(-1, idx)} className="up arrow"></i>
                        </div>
                        {this.state.order[n.id]}
                        <div>
                          <i onClick={() => this.changeOrder(+1, idx)} className="down arrow"></i>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell component="th" scope="row" padding="none" style={{ textAlign: 'center' }}>
                      {n.area}
                    </TableCell>
                    <TableCell style={{ textAlign: 'center' }}>
                      <Stars filled={n.difficulty || 0} />
                    </TableCell>
                    <TableCell style={{ textAlign: 'center' }}>{n.description}</TableCell>
                    <TableCell style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '14px', fontWeight: 'bold' }}>
                        <div>
                          <i onClick={() => this.changePoints(n.id, 10)} className="up arrow"> </i>
                        </div>
                        {this.state.points[n.id] || 50}
                        <div>
                          <i onClick={() => this.changePoints(n.id, -10)} className="down arrow"> </i>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell style={{ textAlign: 'center' }}>
                      <IconButton
                        color="secondary"
                        aria-label="Menu"
                        onClick={() => this.removeQuestion(n.id)}>
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div style={{ fontSize: '14px', textAlign: 'center', margin: '20px' }}>
              <span>{AppTexts.Room.TotalTime[this.props.language].replace('{0}', this.roomTime())}</span>
            </div>
          </div>
          : <div style={styles.noQuestions}><span>{AppTexts.Room.NoQuestions[this.props.language]}</span></div>}

        <div style={{ textAlign: 'center', padding: '5px' }}>
          <Button style={{ marginRight: '30px' }} variant="raised">{AppTexts.Root.Cancel[this.props.language]}</Button>
          <Button onClick={() => this.setState({ modalQuestions: true })} style={{ marginRight: '30px' }} color="primary">{AppTexts.Question.AddQuestions[this.props.language]}</Button>
          <Button onClick={() => this.save()} disabled={!this.state.form.valid} color="primary" variant="raised">{AppTexts.Root.Save[this.props.language]}</Button>
        </div>

        <SelectQuestionModal
          questions={this.state.questions}
          ids={this.state.idsQuestions}
          open={this.state.modalQuestions}
          close={() => this.setState({ modalQuestions: false })}
          onResult={(ids) => this.onSelectQuestions(ids)}
        />

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

export default connect(mapStateToProps, mapDispatchToProps)(EditRoom)