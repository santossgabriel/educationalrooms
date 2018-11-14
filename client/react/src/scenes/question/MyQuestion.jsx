import React from 'react'

React.rea

import { questionService } from '../../services'
import {
  TableBody,
  TableRow,
  Table,
  TableCell,
  TablePagination,
  Button,
  TableHead,
  Paper
} from '@material-ui/core'

import Stars from '../../components/question/Stars'
import CardMain from '../../components/main/CardMain'
import EditQuestionModal from '../../components/modais/EditQuestionModal'

export default class MyQuestion extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      questions: [],
      emptyRows: 0,
      rowsPerPage: 5,
      page: 5,
      editModalOpen: false,
      question: {}
    }
  }

  componentDidMount() {
    questionService.getMy().then(res => this.setState({ questions: res }))
  }

  openEditQuestion(question) {
    this.setState({
      question: question || {},
      editModalOpen: true
    })
  }

  modalQuestionCallback(hasChanges) {
    this.setState({ editModalOpen: false })
    if (hasChanges)
      questionService.getMy().then(res => this.setState({ questions: res }))
  }

  render() {
    const { questions } = this.state
    return (
      <CardMain title="Minhas Questões">
        <Paper>
          <Table aria-labelledby="tableTitle">
            <TableHead>
              <TableRow>
                <TableCell style={{ color: '#AAA', fontWeight: 'bold', textAlign: 'center' }}>Área</TableCell>
                <TableCell style={{ textAlign: 'center' }}>Dificuldade</TableCell>
                <TableCell style={{ textAlign: 'center' }}>Descrição</TableCell>
                <TableCell style={{ textAlign: 'center' }}>Respostas</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {questions
                .map(n => (
                  <TableRow
                    hover
                    onClick={() => this.openEditQuestion(n)}
                    role="checkbox"
                    aria-checked={true}
                    tabIndex={-1}
                    key={n.id}>
                    <TableCell component="th" scope="row" padding="none" style={{ textAlign: 'center' }}>
                      {n.area}
                    </TableCell>
                    <TableCell style={{ textAlign: 'center' }}>
                      <Stars filled={n.difficulty || 0} />
                    </TableCell>
                    <TableCell style={{ textAlign: 'center' }} numeric>{n.description}</TableCell>
                    <TableCell style={{ textAlign: 'center' }} numeric>{n.answers.length}</TableCell>
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
          count={this.state.questions.length}
          rowsPerPage={this.state.rowsPerPage}
          title="teste"
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
          <Button
            onClick={() => this.openEditQuestion()}
            color="primary" variant="raised">Criar questão</Button>
        </div>
        <EditQuestionModal
          close={(hasChanges) => this.modalQuestionCallback(hasChanges)}
          question={this.state.question}
          open={this.state.editModalOpen} />
      </CardMain>
    )
  }
}