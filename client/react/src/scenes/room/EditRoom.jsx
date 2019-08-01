import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'

import { Button } from '@material-ui/core'

import { AppTexts } from 'helpers'
import {
  CardMain,
  IconTextInput,
  SelectQuestionModal
} from 'components'
import { questionService, roomService } from 'services'
import { showError, showSuccess } from 'store/actions'
import { NoContentMessage } from './styles'
import EditRoomQuestionsTable from './EditRoomQuestionsTable'

export default function EditRoom(props) {

  const id = Number(props.match.params.id.replace(':', ''))

  const [time, setTime] = useState('0')
  const [roomTime, setRoomTime] = useState(0)
  const [roomName, setRoomName] = useState('')
  const [questions, setQuestions] = useState([])
  const [selectedQuestions, setSelectedQuestions] = useState([])
  const [idsQuestions, setIdsQuestions] = useState([])
  const [formIsValid, setFormIsValid] = useState(false)
  const [showModalQuestions, setShowModalQuestions] = useState(false)
  const [order, setOrder] = useState({})
  const [points, setPoints] = useState({})
  const [sortedBy, setSortedBy] = useState('')

  const language = useSelector(state => state.appState.language)
  const dispatch = useDispatch()

  useEffect(() => {
    loadQuestions()
    if (id)
      loadRoom()
  }, [])

  useEffect(() => {
    setRoomTime(selectedQuestions.length * Number(time || 0))
  }, [selectedQuestions, time])

  useEffect(() => {
    setFormIsValid(roomName && time > 0 && selectedQuestions.length)
  }, [selectedQuestions, roomName, time])

  async function loadQuestions() {
    const questions = await questionService.getMy()
    setQuestions(questions)
  }

  async function loadRoom() {
    const room = await roomService.get(id)
    if (room) {
      setRoomName(room.name || '')
      setTime((room.time || 0) + '')
      ordenateQuestions(room.questions, 'order')
      setIdsQuestions(room.questions.map(p => p.id))
    }
  }

  function onSelectQuestions(ids) {
    const selQuestions = questions.filter(p => ids.includes(p.id))
    setIdsQuestions(ids)
    setShowModalQuestions(false)
    ordenateQuestions(selQuestions)
  }

  function changeOrder(dir, idx) {
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
    ordenateQuestions(result)
  }

  function ordenateQuestions(questions, prop) {
    let i = 1
    const order = {}
    questions.forEach(p => {
      order[p.id] = i++
      p.points = points[p.id] || 50
    })
    if (prop) {
      const desc = sortedBy === prop
      if (desc) {
        questions.sort((a, b) => a[prop] > b[prop] ? -1 : a[prop] < b[prop] ? 1 : 0)
        setSortedBy('')
      } else {
        questions.sort((a, b) => a[prop] > b[prop] ? 1 : a[prop] < b[prop] ? -1 : 0)
        setSortedBy(prop)
      }
    }
    setSelectedQuestions(questions)
    setOrder(order)
  }

  function removeQuestion(id) {
    const questions = selectedQuestions.filter(p => p.id !== id)
    setIdsQuestions(questions.map(p => p.id))
    ordenateQuestions(questions)
  }

  function changePoints(id, pts) {
    const newPoints = { ...points }
    if (!newPoints[id])
      newPoints[id] = 50 + pts
    else if ((newPoints[id] > 10 && pts < 0) || (newPoints[id] < 100 && pts > 0))
      newPoints[id] = newPoints[id] + pts
    setPoints(newPoints)
  }

  async function save() {
    const room = {
      time,
      name: roomName,
      id,
      questions: selectedQuestions.map(p => ({
        id: p.id,
        order: order[p.id],
        points: points[p.id] || 50
      }))
    }
    try {
      const result = await roomService.save(room)
      dispatch(showSuccess(result.message))
      window.location.hash = '#/my-rooms'
    } catch (ex) {
      dispatch(showError(ex.message))
    }
  }

  return (
    <CardMain title={AppTexts.MainComponent.RoomTexts.NewEdit[id > 0 ? 'Edit' : 'New'][language]}>

      <IconTextInput
        label={AppTexts.MainComponent.RoomTexts.RoomName[language]}
        required
        name="roomName"
        value={roomName}
        onChange={e => setRoomName(e.value)}
      />

      <IconTextInput
        style={{ marginLeft: 20 }}
        label={AppTexts.MainComponent.RoomTexts.QuestionTime[language]}
        required
        name="time"
        value={time}
        onChange={e => setTime(e.value)}
      />

      {selectedQuestions.length ?
        <div style={{ marginTop: '20px' }}>

          <EditRoomQuestionsTable
            changeOrder={(dir, idx) => changeOrder(dir, idx)}
            changePoints={(id, pts) => changePoints(id, pts)}
            ordenateQuestions={(prop) => ordenateQuestions(selectedQuestions, prop)}
            order={order}
            points={points}
            questions={selectedQuestions}
            removeQuestion={id => removeQuestion(id)}
            language={language}
          />

          <div style={{ fontSize: '14px', textAlign: 'center', margin: '20px' }}>
            <span>{AppTexts.Room.TotalTime[language].replace('{0}', roomTime)}</span>
          </div>
        </div>
        : <NoContentMessage>{AppTexts.Room.NoQuestions[language]}</NoContentMessage>}

      <div style={{ textAlign: 'center', padding: '5px' }}>
        <Button style={{ marginRight: '30px' }} variant="contained">{AppTexts.Root.Cancel[language]}</Button>
        <Button onClick={() => setShowModalQuestions(true)} style={{ marginRight: '30px' }} color="primary">{AppTexts.Question.AddQuestions[language]}</Button>
        <Button onClick={() => save()} disabled={!formIsValid} color="primary" variant="contained">{AppTexts.Root.Save[language]}</Button>
      </div>

      <SelectQuestionModal
        questions={questions}
        ids={idsQuestions}
        open={showModalQuestions}
        close={() => setShowModalQuestions(false)}
        onResult={ids => onSelectQuestions(ids)}
      />
    </CardMain>
  )
}

EditRoom.propTypes = {
  match: PropTypes.object
}