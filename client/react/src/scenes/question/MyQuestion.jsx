import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Icons from '@material-ui/icons'
import {
  TableBody,
  TableRow,
  Table,
  TableCell,
  TablePagination,
  Button,
  TableHead,
  Paper,
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

class MyQuestion extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      questions: [],
      emptyRows: 0,
      rowsPerPage: 5,
      page: 5,
      editModalOpen: false,
      question: {},
      removeQuestion: null
    }
  }

  componentDidMount() {
    this.refresh()
  }

  refresh() {
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

  changeShared(checked, id) {
    questionService.share(id, checked).then(() => {
      const questions = this.state.questions
      questions.forEach(p => { if (p.id === id) p.shared = checked })
      this.setState({ questions: questions })
    })
  }

  onResultRemoveQuestion(confirm) {
    const { id } = this.state.removeQuestion
    this.setState({ removeQuestion: null })
    if (confirm) {
      questionService.remove(id)
        .then(res => {
          this.props.showSuccess(res.message)
          this.refresh()
        }).catch(err => this.props.showError(err.message))
    }
  }

  render() {
    const { questions } = this.state
    return (
      <CardMain title={AppTexts.MainComponent.QuestionTexts.My[this.props.language]}>
        <Paper>
          <Table aria-labelledby="tableTitle">
            <TableHead>
              <TableRow>
                <TableCell style={{ color: '#AAA', fontWeight: 'bold', textAlign: 'center' }}>{AppTexts.MyQuestionsTable.Area[this.props.language]}</TableCell>
                <TableCell style={{ textAlign: 'center' }}>{AppTexts.MyQuestionsTable.Difficulty[this.props.language]}</TableCell>
                <TableCell style={{ textAlign: 'center' }}>{AppTexts.MyQuestionsTable.Description[this.props.language]}</TableCell>
                <TableCell style={{ textAlign: 'center' }}>{AppTexts.MyQuestionsTable.Answers[this.props.language]}</TableCell>
                <TableCell style={{ textAlign: 'center' }}>{AppTexts.MyQuestionsTable.Shared[this.props.language]}</TableCell>
                <TableCell style={{ textAlign: 'center' }}>{AppTexts.Root.Actions[this.props.language]}</TableCell>
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
                    <TableCell style={{ textAlign: 'center' }} numeric>
                      {
                        n.sharedQuestionId ?
                          <span>{AppTexts.Root.Acquired[this.props.language]}</span> :
                          <div onClick={(event) => { event.stopPropagation() }}>
                            <Checkbox
                              color="primary"
                              checked={n.shared}
                              onChange={(e, c) => this.changeShared(c, n.id)}
                            />
                          </div>
                      }
                    </TableCell>
                    <TableCell style={{ textAlign: 'center' }}>
                      {
                        n.sharedQuestionId ? null :
                          <IconButton color="secondary"
                            aria-label="Menu"
                            onClick={event => {
                              event.stopPropagation();
                              this.setState({ removeQuestion: n })
                            }}>
                            <Icons.Delete />
                          </IconButton>
                      }
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
            color="primary" variant="raised">{AppTexts.MyQuestionsTable.CreateQuestion[this.props.language]}</Button>
        </div>
        <EditQuestionModal
          close={(hasChanges) => this.modalQuestionCallback(hasChanges)}
          question={this.state.question}
          open={this.state.editModalOpen} />
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

export default connect(mapStateToProps, mapDispatchToProps)(MyQuestion)