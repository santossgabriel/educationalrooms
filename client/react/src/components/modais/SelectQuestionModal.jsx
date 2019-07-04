import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  Zoom,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  Checkbox
} from '@material-ui/core'
import { useSelector } from 'react-redux'

import Stars from '../question/Stars'

import { AppTexts } from '../../helpers/appTexts'
const { MyQuestionsTable: { Area, Difficulty, Description, Answers } } = AppTexts

export default function SelectQuestionModal(props) {

  const language = useSelector(state => state.appState.language)
  const [questions, setQuestions] = useState([])
  const [selectedIds, setSelectedIds] = useState({})

  function onEnter() {
    const questions = props.questions || []
    questions.forEach(p => selectedIds[p.id] = (props.ids || []).indexOf(p.id) !== -1)
    setSelectedIds(selectedIds)
    setQuestions(questions)
  }

  function selectQuestion(selected, id) {
    const selIds = { ...selectedIds }
    selIds[id] = selected
    setSelectedIds(selIds)
  }

  function ok() {
    const ids = []
    for (let id in selectedIds)
      if (selectedIds[id])
        ids.push(Number(id))
    props.onResult(ids)
  }

  return (
    <Dialog
      open={props.open}
      onClose={props.close}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      transitionDuration={300}
      maxWidth={false}
      onEnter={() => onEnter()}
      TransitionComponent={Zoom}>
      <DialogContent>
        <Table aria-labelledby="tableTitle">
          <TableHead>
            <TableRow>
              <TableCell style={{ color: '#AAA', fontWeight: 'bold', textAlign: 'center' }}>{Area[language]}</TableCell>
              <TableCell style={{ textAlign: 'center' }}>{Difficulty[language]}</TableCell>
              <TableCell style={{ textAlign: 'center' }}>{Description[language]}</TableCell>
              <TableCell style={{ textAlign: 'center' }}>{Answers[language]}</TableCell>
              <TableCell style={{ textAlign: 'center' }}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {questions
              .map(n => (
                <TableRow
                  tabIndex={-1}
                  key={n.id}>
                  <TableCell component="th" scope="row" padding="none" style={{ textAlign: 'center' }}>
                    {n.area}
                  </TableCell>
                  <TableCell style={{ textAlign: 'center' }}>
                    <Stars filled={n.difficulty || 0} />
                  </TableCell>
                  <TableCell style={{ textAlign: 'center' }}>{n.description}</TableCell>
                  <TableCell style={{ textAlign: 'center' }}>{n.answers.length}</TableCell>
                  <TableCell style={{ textAlign: 'center' }}>
                    <Checkbox
                      color="primary"
                      checked={selectedIds[n.id]}
                      onChange={(_, v) => selectQuestion(v, n.id)}
                    />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => ok()} color="primary" variant="contained" autoFocus>ok</Button>
      </DialogActions>
    </Dialog>
  )
}

SelectQuestionModal.propTypes = {
  onResult: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
  open: PropTypes.bool,
  questions: PropTypes.array,
  ids: PropTypes.array
}