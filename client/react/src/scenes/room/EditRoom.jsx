import React from 'react'
import { connect } from 'react-redux'
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

import { AppTexts, formValidator } from '../../helpers'
import {
  ConfirmModal,
  CardMain,
  IconTextInput,
  SelectQuestionModal
} from '../../components'
import { questionService } from '../../services'

const styles = {
  noQuestions: {
    textTransform: 'initial',
    textAlign: 'center',
    fontSize: 14,
    margin: 20
  }
}

class EditRoom extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      title: AppTexts.MainComponent.RoomTexts.NewEdit,
      id: Number(this.props.match.params.id.replace(':', '')),
      form: {},
      questions: [],
      idsQuestions: [],
      selectedQuestions: [],
      modalQuestions: false
    }
  }

  componentDidMount() {
    questionService.getMy().then(res => this.setState({ questions: res }))
  }

  fieldChanged(field) {
    this.setState({
      form: formValidator(this.state.form, field),
      roomName: field.value
    })
  }

  onSelectQuestions(ids) {
    this.setState({
      idsQuestions: ids,
      modalQuestions: false
    })
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

        {this.state.selectedQuestions.length ?
          <Table aria-labelledby="tableTitle">
            <TableHead>
              <TableRow>
                <TableCell style={{ color: '#AAA', fontWeight: 'bold', textAlign: 'center' }}>{AppTexts.MyQuestionsTable.Area[this.props.language]}</TableCell>
                <TableCell style={{ textAlign: 'center' }}>{AppTexts.MyQuestionsTable.Difficulty[this.props.language]}</TableCell>
                <TableCell style={{ textAlign: 'center' }}>{AppTexts.MyQuestionsTable.Description[this.props.language]}</TableCell>
                <TableCell style={{ textAlign: 'center' }}>{AppTexts.MyQuestionsTable.Answers[this.props.language]}</TableCell>
                <TableCell style={{ textAlign: 'center' }}></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.selectedQuestions.length
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
                    <TableCell style={{ textAlign: 'center' }} numeric>{n.description}</TableCell>
                    <TableCell style={{ textAlign: 'center' }} numeric>{n.answers.length}</TableCell>
                    <TableCell style={{ textAlign: 'center' }}>
                      <Checkbox
                        color="primary"
                        checked={this.state.idsQuestions[n.id]}
                        onChange={(_, v) => this.selectQuestion(v, n.id)}
                      />
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
          : <div style={styles.noQuestions}><span>{AppTexts.Room.NoQuestions[this.props.language]}</span></div>}

        <div style={{ textAlign: 'center', padding: '5px' }}>
          <Button style={{ marginRight: '30px' }} variant="raised">{AppTexts.Root.Cancel[this.props.language]}</Button>
          <Button onClick={() => this.setState({ modalQuestions: true })} style={{ marginRight: '30px' }} color="primary">{AppTexts.Question.AddQuestions[this.props.language]}</Button>
          <Button disabled={!this.state.form.valid} color="primary" variant="raised">{AppTexts.Root.Save[this.props.language]}</Button>
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

// Funcionalidades:
// Escolher nome da sala
// Adicionar e remover questões
// Escolher a pontuação de cada questão na sala
// Permitir ordenação das questões
// Não permitir que usuário salve sala com a ordem das questões incorretas
// Adicionar botão para que as questões possam ser ordenadas de forma automática
// Adicionar flechas para que usuário possa alterar a ordem das questões para cima e para baixo

const mapStateToProps = state => ({ language: state.appState.language })

export default connect(mapStateToProps)(EditRoom)