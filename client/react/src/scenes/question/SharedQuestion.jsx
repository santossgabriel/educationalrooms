import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { questionService } from '../../services'
import {
  TableBody,
  TableRow,
  Table,
  TableHead,
  TablePagination,
  TableFooter,
  Button
} from '@material-ui/core'

import IconDownload from '@material-ui/icons/Archive'

import Stars from '../../components/question/Stars'
import CardMain from '../../components/main/CardMain'
import { AppTexts } from '../../helpers/appTexts'
import { Container, CellHead, CellRow } from './styles'

export default function SharedQuestion() {

  const [questions, setQuestions] = useState([])
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [page, setPage] = useState(0)
  const language = useSelector(state => state.appState.language)


  useEffect(() => {
    async function fetchData() {
      const res = await questionService.getOthers()
      setQuestions(res)
    }
    fetchData()
  }, [])

  function getEmptyRows() { return Math.min(rowsPerPage, questions.length - (page * rowsPerPage)) }

  async function getShared(id) {
    await questionService.getShared(id)
    setQuestions(questions.filter(p => p.id !== id))
  }

  function handleChangePage(event, newPage) { setPage(newPage) }

  function handleChangeRowsPerPage(event) { setRowsPerPage(event.target.value) }

  return (
    <CardMain title={AppTexts.MainComponent.QuestionTexts.Shared[language]}>
      <Container>
        <Table aria-labelledby="tableTitle">
          <TableHead>
            <TableRow>
              <CellHead>Área</CellHead>
              <CellHead>Dificuldade</CellHead>
              <CellHead>Descrição</CellHead>
              <CellHead>Respostas</CellHead>
              <CellHead>Adquirir</CellHead>
            </TableRow>
          </TableHead>
          <TableBody>
            {questions.slice(page * rowsPerPage, (page * rowsPerPage) + rowsPerPage)
              .map(n => (
                <TableRow
                  tabIndex={-1}
                  key={n.id}>
                  <CellRow style={{ textAlign: 'center' }} component="th" scope="row" padding="none">
                    {n.area}
                  </CellRow>
                  <CellRow style={{ textAlign: 'center' }}>
                    <Stars filled={4} />
                  </CellRow>
                  <CellRow style={{ textAlign: 'center' }}>{n.description}</CellRow>
                  <CellRow style={{ textAlign: 'center' }}>{n.answers.length}</CellRow>
                  <CellRow style={{ textAlign: 'center' }}>
                    <Button onClick={() => getShared(n.id)} variant="text">
                      <IconDownload color="primary" />
                    </Button>
                  </CellRow>
                </TableRow>
              ))}
            {getEmptyRows() > 0 && (
              <TableRow style={{ height: 49 * getEmptyRows() }}>
                <CellRow colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, 50]}
                colSpan={3}
                count={questions.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={(e, p) => handleChangePage(e, p)}
                onChangeRowsPerPage={e => handleChangeRowsPerPage(e)}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </Container>
    </CardMain>
  )
}