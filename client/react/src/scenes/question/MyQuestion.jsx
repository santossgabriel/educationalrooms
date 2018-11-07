import React from 'react'

import { questionService } from '../../services'
import {
  TableBody,
  TableRow,
  Table,
  TableCell,
  Checkbox,
  TablePagination,
  Paper,
  Button
} from '@material-ui/core'

import Stars from '../../components/question/Stars'
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
      question: question ? Object.assign({}, question) : {},
      editModalOpen: true
    })
  }

  saveQuestion(question) {
    console.log(question)
  }

  render() {
    const { questions } = this.state
    return (
      <div>
        <h2>Minhas Questões</h2>
        <br />
        <Paper style={{ marginLeft: '20px', marginRight: '20px' }}>
          <div>
            <Table aria-labelledby="tableTitle">
              <TableBody>
                {questions
                  .map(n => (
                    <TableRow
                      hover
                      onClick={(e) => this.openEditQuestion(n)}
                      role="checkbox"
                      aria-checked={true}
                      tabIndex={-1}
                      key={n.id}
                      selected={true}>
                      <TableCell padding="checkbox">
                        <Checkbox checked={true} />
                      </TableCell>
                      <TableCell component="th" scope="row" padding="none">
                        {n.area}
                      </TableCell>
                      <TableCell>
                        <Stars filled={4} />
                      </TableCell>
                      <TableCell style={{ textAlign: 'center' }} numeric>{n.description}</TableCell>
                      <TableCell numeric>{n.answers.length}</TableCell>
                    </TableRow>
                  ))}
                {this.state.emptyRows > 0 && (
                  <TableRow style={{ height: 49 * this.state.emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <TablePagination
            component="div"
            count={this.state.questions.length}
            rowsPerPage={this.state.rowsPerPage}
            page={this.state.page}
            backIconButtonProps={{
              'aria-label': 'Previous Page',
            }}
            nextIconButtonProps={{
              'aria-label': 'Next Page',
            }}
            onChangePage={(e, p) => this.setState({ page: p })}
            onChangeRowsPerPage={e => this.setState({ rowsPerPage: e.target.value })}
          />
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <Button
              onClick={() => this.openEditQuestion()}
              color="primary" variant="raised">Criar questão</Button>
          </div>
        </Paper>
        <EditQuestionModal
          cancel={() => this.setState({ editModalOpen: false })}
          ok={(question) => this.saveQuestion(question)}
          question={this.state.question}
          open={this.state.editModalOpen} />
      </div>
    )
  }
}