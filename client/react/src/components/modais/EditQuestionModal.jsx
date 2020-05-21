import {
  Button, Dialog, DialogActions, DialogContent,
  DialogTitle, FormControl, InputLabel, MenuItem, Select, Zoom
} from '@material-ui/core'
import { AppTexts } from 'helpers/appTexts'
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { questionService } from 'services'
import { showError, showSuccess } from 'store/actions'
import IconTextInput from '../main/IconTextInput'
import { EditQuestionAlternatives } from '../question/EditQuestionAlternatives'
import Stars from '../question/Stars'

const tutorialSteps = [
  {
    title: {
      ptbr: 'Questão',
      enus: 'Question'
    }
  }, {
    title: {
      ptbr: 'Alternativas',
      enus: 'Alternatives'
    }
  }
]

const OUTRAS = 'OUTRA...'

class EditQuestionModal extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      activeStep: 0,
      difficulty: 1,
      areas: [],
      areaSelected: OUTRAS,
      areaCustomName: '',
      question: {},
      description: '',
      showAlertModal: false
    }
    this.onEnter = this.onEnter.bind(this)
  }

  onEnter() {
    const { areas } = this.state
    const question = Object.assign({}, this.props.question)
    let selected = areas[0]

    if (question.area) {
      selected = question.area.toUpperCase()
      if (areas.indexOf(selected) === -1)
        areas.push(selected)
    }

    const alternatives = question.answers ? question.answers.map(p => Object.assign({}, p)) : []

    this.setState({
      alternativesValid: alternatives.length > 1 && alternatives.filter(p => !p.description).length === 0,
      alternatives: alternatives
    })

    this.setState({
      areas: areas,
      areaSelected: selected,
      difficulty: question.difficulty || 1,
      description: question.description || '',
      areaCustomName: '',
      activeStep: 0,
      alternatives: alternatives,
      question: question
    })
  }

  componentDidMount() {
    questionService.getAreas().then(res => {
      const areas = res.map(p => p.toUpperCase()).concat(this.state.areas)
      areas.push(OUTRAS)
      this.setState({ areas: areas })
    })
  }

  alternativeChanged(alternatives) {
    this.setState({
      alternativesValid: alternatives.filter(p => !p.description).length === 0,
      alternatives: alternatives
    })
  }

  save() {
    const { description, difficulty, areaCustomName, areaSelected, alternatives } = this.state
    const question = {
      description,
      difficulty,
      area: areaSelected === OUTRAS ? areaCustomName.toUpperCase() : areaSelected,
      answers: alternatives,
      id: this.props.question.id
    }

    const caller = (promise) => {
      promise.then(res => {
        this.props.showSuccess(res.message)
        this.props.close(true)
      }).catch(err => this.props.showError(err.message))
    }

    caller(question.id ? questionService.update(question) : questionService.create(question))
  }

  render() {
    const { activeStep, difficulty } = this.state
    return (
      <Dialog
        open={this.props.open}
        onClose={() => this.props.close()}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        transitionDuration={300}
        onEnter={this.onEnter}
        TransitionComponent={Zoom}
        maxWidth={false}>
        <DialogTitle id="alert-dialog-title">
          {
            this.props.question.id > 0 ?
              AppTexts.Root.Edition[this.props.language] :
              AppTexts.Root.New[this.props.language]
          }
        </DialogTitle>
        <DialogContent>
          <fieldset style={{
            color: '#666',
            border: 'solid 1px #ccc',
            fontSize: '20px',
            fontFamily: 'sans-serif',
            textTransform: 'uppercase',
            display: 'flex',
            flexDirection: 'row'
          }}>
            <legend>
              {tutorialSteps[activeStep].title[this.props.language]}
            </legend>
            <div>
              <FormControl>
                <InputLabel>{AppTexts.MyQuestionsTable.Area[this.props.language]}</InputLabel>
                <Select
                  style={{ width: '250px' }}
                  value={this.state.areaSelected}
                  onChange={(e) => this.setState({ areaSelected: e.target.value })}
                  displayEmpty>
                  {this.state.areas.map((p, i) => <MenuItem key={i} value={p}>{p}</MenuItem>)}
                </Select>
                <div hidden={this.state.areaSelected !== OUTRAS}>
                  <IconTextInput
                    value={this.state.areaCustomName}
                    defaultValue={this.state.areaCustomName}
                    minlength={2}
                    required
                    onChange={(e) => this.setState({ areaCustomName: e.value })}
                    label={AppTexts.MyQuestionsTable.Area[this.props.language]} />
                </div>
              </FormControl>
              <Stars style={{ marginTop: '20px' }}
                filled={difficulty}
                label={AppTexts.MyQuestionsTable.Difficulty[this.props.language]}
                onClick={(i) => this.setState({ difficulty: i })} />
              <IconTextInput
                style={{ marginTop: '20px' }}
                required
                multiline={true}
                rowsMax="3"
                name="teste"
                rows="3"
                maxlength={100}
                value={this.state.description}
                onChange={t => this.setState({ description: t.value, descriptionValid: t.valid })}
                label={AppTexts.MyQuestionsTable.Description[this.props.language]} />
            </div>
            <div style={{ width: '380px', marginLeft: '20px' }}>
              <EditQuestionAlternatives
                currentAlternatives={this.state.alternatives}
                onAlternativeChange={(e) => this.alternativeChanged(e)} />
            </div>
          </fieldset>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => this.props.close()}
            variant="contained"
            autoFocus>{AppTexts.Root.Cancel[this.props.language]}</Button>
          <Button
            disabled={!this.state.description
              || !this.state.alternativesValid
              || (this.state.areaSelected === OUTRAS && !this.state.areaCustomName)}
            onClick={() => this.save()}
            color="primary"
            variant="contained"
            autoFocus>{AppTexts.Root.Save[this.props.language]}</Button>
        </DialogActions>
      </Dialog>
    )
  }
}

EditQuestionModal.propTypes = {
  question: PropTypes.object,
  close: PropTypes.func,
  open: PropTypes.bool
}

const mapStateToProps = state => ({ language: state.appState.language })

const mapDispatchToProps = dispatch => bindActionCreators({ showError, showSuccess }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(EditQuestionModal)