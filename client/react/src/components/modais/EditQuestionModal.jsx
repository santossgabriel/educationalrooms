import React from 'react'
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Zoom,
  MobileStepper,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@material-ui/core'
import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons'

import IconTextInput from '../main/IconTextInput'
import Stars from '../question/Stars'
import EditQuestionAlternatives from '../question/EditQuestionAlternatives'
import { questionService } from '../../services'

const styles = {
  legend: {
    color: '#666',
    border: 'solid 1px #ccc',
    fontSize: '20px',
    fontFamily: 'sans-serif',
    textTransform: 'uppercase'
  }
}

const tutorialSteps = [
  { title: 'Questão', description: 'passo 1' },
  { title: 'Alternativas', description: 'passo 2' }
]

export default class EditQuestionModal extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      activeStep: 0,
      difficulty: 1,
      areas: ['OUTRA...'],
      areaSelected: 'OUTRA...',
      areaCustom: false,
      areaCustomName: ''
    }
  }

  componentDidMount() {
    questionService.getAreas().then(res => {
      this.setState({
        areas: res.map(p => p.toUpperCase()).concat(this.state.areas),
        areaSelected: res.length > 0 ? res[0] : this.state.areaSelected
      })
    })
  }

  render() {
    const { activeStep, difficulty } = this.state
    return (
      <Dialog
        open={this.props.open}
        onClose={() => this.props.cancel()}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        transitionDuration={300}
        TransitionComponent={Zoom}>
        <DialogTitle id="alert-dialog-title">
          {this.props.question.id > 0 ? 'Edição' : 'Nova'}</DialogTitle>
        <DialogContent>
          <fieldset style={styles.legend}>
            <legend>
              {tutorialSteps[activeStep].title}
            </legend>
            {activeStep === 0 ?
              <div>
                <FormControl>
                  <InputLabel>Área</InputLabel>
                  <Select
                    style={{ width: '250px' }}
                    value={this.state.areaSelected}
                    onChange={(e) => this.setState({ areaSelected: e.target.value, areaCustom: e.target.value === 'OUTRA...' })}
                    displayEmpty>
                    {this.state.areas.map((p, i) => <MenuItem key={i} value={p}>{p}</MenuItem>)}
                  </Select>
                  <div hidden={this.state.areaSelected !== 'OUTRA...'}>
                    <IconTextInput
                      value={this.state.areaCustomName}
                      minlength={2}
                      required
                      onChange={(e) => this.setState({ areaSelected: e.target.value, areaCustom: true })}
                      label="Área" />
                  </div>
                </FormControl>
                <Stars style={{ marginTop: '20px' }}
                  filled={difficulty}
                  label="Dificuldade"
                  onClick={(i) => this.setState({ difficulty: i })} />
                <IconTextInput
                  style={{ marginTop: '20px' }}
                  required
                  onChange={t => this.setState({ description: t.value, descriptionValid: t.valid })}
                  label="Descrição" />
              </div>
              : <EditQuestionAlternatives />
            }
          </fieldset>
          <MobileStepper
            steps={2}
            position="static"
            activeStep={activeStep}
            backButton={
              <Button size="small" color="primary"
                onClick={() => this.setState({ activeStep: 0 })}
                disabled={activeStep === 0}>
                {<KeyboardArrowLeft />}anterior</Button>
            }
            nextButton={
              <Button size="small" color="primary"
                onClick={() => this.setState({ activeStep: 1 })}
                disabled={activeStep === 1}>
                próximo{<KeyboardArrowRight />}
              </Button>
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => this.props.cancel()} variant="raised" autoFocus>cancelar</Button>
          <Button disabled={true} onClick={() => this.props.cancel()} color="primary" variant="raised" autoFocus>Salvar</Button>
        </DialogActions>
      </Dialog >
    )
  }
}