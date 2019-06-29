import React from 'react'
import PropTypes from 'prop-types'

import {
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  IconButton
} from '@material-ui/core'
import { Delete } from '@material-ui/icons'

import { AppTexts } from '../../helpers'
import { Stars } from '../../components'
import { CellHead } from './styles'


const EditRoomQuestionTable = ({ language, questions, points, order, removeQuestion, changeOrder, changePoints, ordenateQuestions }) => (
  <Table aria-labelledby="tableTitle">
    <TableHead>
      <TableRow>
        <CellHead>{AppTexts.MyQuestionsTable.Order[language]}</CellHead>
        <CellHead style={{ cursor: 'pointer' }} onClick={() => ordenateQuestions('area')}>{AppTexts.MyQuestionsTable.Area[language]}</CellHead>
        <CellHead style={{ cursor: 'pointer' }} onClick={() => ordenateQuestions('difficulty')}>{AppTexts.MyQuestionsTable.Difficulty[language]}</CellHead>
        <CellHead style={{ cursor: 'pointer' }} onClick={() => ordenateQuestions('description')}>{AppTexts.MyQuestionsTable.Description[language]}</CellHead>
        <CellHead style={{ cursor: 'pointer' }} onClick={() => ordenateQuestions('points')}>{AppTexts.MyQuestionsTable.Points[language]}</CellHead>
        <CellHead></CellHead>
      </TableRow>
    </TableHead>
    <TableBody>
      {questions.map((n, idx) => (
        <TableRow
          tabIndex={-1}
          key={n.id}>
          <TableCell style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '14px', fontWeight: 'bold' }}>
              <div>
                <i onClick={() => changeOrder(-1, idx)} className="up arrow"></i>
              </div>
              {order[n.id]}
              <div>
                <i onClick={() => changeOrder(+1, idx)} className="down arrow"></i>
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
                <i onClick={() => changePoints(n.id, 10)} className="up arrow"> </i>
              </div>
              {points[n.id] || 50}
              <div>
                <i onClick={() => changePoints(n.id, -10)} className="down arrow"> </i>
              </div>
            </div>
          </TableCell>
          <TableCell style={{ textAlign: 'center' }}>
            <IconButton
              color="secondary"
              aria-label="Menu"
              onClick={() => removeQuestion(n.id)}>
              <Delete />
            </IconButton>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
)

EditRoomQuestionTable.propTypes = {
  points: PropTypes.object.isRequired,
  order: PropTypes.object.isRequired,
  questions: PropTypes.array.isRequired,
  changePoints: PropTypes.func.isRequired,
  removeQuestion: PropTypes.func.isRequired,
  changeOrder: PropTypes.func.isRequired,
  ordenateQuestions: PropTypes.func.isRequired,
  language: PropTypes.string.isRequired
}

export default EditRoomQuestionTable