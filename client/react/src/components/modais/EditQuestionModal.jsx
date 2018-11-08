import React from 'react'
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Zoom,
  MobileStepper

} from '@material-ui/core'
import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons'
import ComboTextInput from '../main/ComboTextInput'
import IconTextInput from '../main/IconTextInput'
import Stars from '../question/Stars'

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

const areas = ['Matemática', 'Física', 'Informática']

export default class EditQuestionModal extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      activeStep: 0,
      area: areas[0],
      difficulty: 1
    }
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
                <ComboTextInput
                  onChange={t => this.setState({ area: t, areaValid: t.length > 1 })}
                  minlength={2}
                  selected={this.state.area}
                  width="250px"
                  label="Área"
                  options={areas} />
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
              : <div>
                PASSO 1
                </div>
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