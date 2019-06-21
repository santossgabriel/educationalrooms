import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import IconDelete from '@material-ui/icons/Delete'
import {
  TableBody,
  TableRow,
  TableFooter,
  Table,
  TablePagination,
  Button,
  TableHead,
  Checkbox,
  IconButton
} from '@material-ui/core'

import { questionService } from '../../services'
import Stars from '../../components/question/Stars'
import CardMain from '../../components/main/CardMain'
import EditQuestionModal from '../../components/modais/EditQuestionModal'
import { AppTexts } from '../../helpers/appTexts'
import { ConfirmModal } from '../../components/main/Modal'
import { showError, showSuccess } from '../../actions'

import { Container, CellHead, CellRow, NoContentMessage } from './styles'

export default function MyQuestion() {

  const [questions, setQuestions] = useState([])
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [page, setPage] = useState(0)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [question, setQuestion] = useState({})
  const [removeQuestion, setRemoveQuestion] = useState(null)
  const [emptyRows, setEmptyRows] = useState(0)
  const language = useSelector(state => state.appState.language)
  const dispatch = useDispatch()

  useEffect(() => {
    refresh()
  }, [])

  useEffect(() => {
    const emptyRows = rowsPerPage - (questions.length - (page * rowsPerPage))
    setEmptyRows(emptyRows)
  }, [questions, page, rowsPerPage])

  async function refresh() {
    const questions = await questionService.getMy()
    setQuestions(questions)
  }

  function openEditQuestion(question) {
    setQuestion(question || {})
    setEditModalOpen(true)
  }

  function modalQuestionCallback(hasChanges) {
    setEditModalOpen(false)
    if (hasChanges)
      refresh()
  }

  async function changeShared(checked, id) {
    await questionService.share(id, checked)
    const q = questions.find(p => p.id === id)
    if (q)
      q.shared = checked
    setQuestions(questions)
  }

  async function onResultRemoveQuestion(confirm) {
    const { id } = removeQuestion
    setRemoveQuestion(null)
    if (confirm) {
      try {
        const res = await questionService.remove(id)
        dispatch(showSuccess(res.message))
        this.refresh()
      } catch (err) {
        dispatch(showError(err.message))
      }
    }
  }

  return (
    <CardMain title={AppTexts.MainComponent.QuestionTexts.My[language]}>
      {questions.length ?
        <Container>
          <Table aria-labelledby="tableTitle">
            <TableHead>
              <TableRow>
                <CellHead>{AppTexts.MyQuestionsTable.Area[language]}</CellHead>
                <CellHead>{AppTexts.MyQuestionsTable.Difficulty[language]}</CellHead>
                <CellHead>{AppTexts.MyQuestionsTable.Description[language]}</CellHead>
                <CellHead>{AppTexts.MyQuestionsTable.Answers[language]}</CellHead>
                <CellHead>{AppTexts.MyQuestionsTable.Shared[language]}</CellHead>
                <CellHead>{AppTexts.Root.Actions[language]}</CellHead>
              </TableRow>
            </TableHead>
            <TableBody>
              {questions.slice(page * rowsPerPage, (page * rowsPerPage) + rowsPerPage)
                .map(n => (
                  <TableRow
                    jestid="trMyQuestions"
                    hover
                    onClick={() => openEditQuestion(n)}
                    role="checkbox"
                    aria-checked={true}
                    tabIndex={-1}
                    key={n.id}>
                    <CellRow component="th" scope="row" padding="none"> {n.area} </CellRow>
                    <CellRow>
                      <Stars filled={n.difficulty || 0} />
                    </CellRow>
                    <CellRow>{n.description}</CellRow>
                    <CellRow>{n.answers.length}</CellRow>
                    <CellRow>
                      {
                        n.sharedQuestionId ?
                          <span>{AppTexts.Root.Acquired[language]}</span> :
                          <div onClick={event => { event.stopPropagation() }}>
                            <Checkbox
                              color="primary"
                              checked={n.shared}
                              onChange={(e, c) => changeShared(c, n.id)}
                            />
                          </div>
                      }
                    </CellRow>
                    <CellRow>
                      {
                        n.sharedQuestionId ? null :
                          <IconButton color="secondary"
                            aria-label="Menu"
                            onClick={event => {
                              event.stopPropagation()
                              setRemoveQuestion(n)
                            }}>
                            <IconDelete />
                          </IconButton>
                      }
                    </CellRow>
                  </TableRow>
                ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <CellRow colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, 50]}
                  count={questions.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
                  // labelRowsPerPage="itens por página"
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
        </Container>
        : <NoContentMessage>Você ainda não criou questões.</NoContentMessage>
      }
      <div style={{ textAlign: 'center', padding: '5px' }}>
        <Button
          onClick={() => openEditQuestion()}
          color="primary">{AppTexts.MyQuestionsTable.CreateQuestion[language]}</Button>
      </div>
      <EditQuestionModal
        close={hasChanges => modalQuestionCallback(hasChanges)}
        question={question}
        open={editModalOpen} />
      <ConfirmModal open={!!removeQuestion}
        title={AppTexts.Question.ConfirmExclusionTitle[language]}
        text={removeQuestion ? removeQuestion.description : ''}
        onResult={confirm => onResultRemoveQuestion(confirm)} />
    </CardMain>
  )
}