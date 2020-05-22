import {
  Button, Dialog, DialogActions, DialogContent,
  DialogTitle, FormControl, InputLabel, MenuItem, Select, Zoom
} from '@material-ui/core'
import { AppTexts } from 'helpers/appTexts'
import PropTypes from 'prop-types'
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { questionService } from 'services'
import { showError, showSuccess } from 'store/actions'
import IconTextInput from '../main/IconTextInput'
import { EditQuestionAlternatives } from '../question/EditQuestionAlternatives'
import Stars from '../question/Stars'

const OUTRAS = 'OUTRA...'

const defaultAlternatives = [
  { correct: true, classification: 'A' },
  { correct: false, classification: 'B' }
]

export function EditQuestionModal({ editQuestion, close, open }) {

  const [difficulty, setDifficulty] = useState(1)
  const [areas, setAreas] = useState([])
  const [selectedArea, setSelectedArea] = useState(OUTRAS)
  const [areaCustomName, setAreaCustomName] = useState('')
  const [description, setDescription] = useState('')
  const [alternativesIsValid, setAlternativesIsValid] = useState(false)
  const [alternatives, setAlternatives] = useState(null)

  const language = useSelector(state => state.appState.language)

  const dispatch = useDispatch()

  useEffect(() => {
    questionService.getAreas().then(res => {
      const arr = res.map(p => p.toUpperCase()).concat(areas)
      arr.push(OUTRAS)
      setAreas(arr)
    })
  }, [])

  function onEnter() {
    const q = Object.assign({}, editQuestion)
    let selected = areas[0]

    if (q.area) {
      selected = q.area.toUpperCase()
      if (areas.indexOf(selected) === -1)
        areas.push(selected)
    }

    let alts = q.answers && q.answers.length > 1 ? q.answers.map(p => Object.assign({}, p)) : defaultAlternatives

    setAlternatives(alts)

    setAlternativesIsValid(alts.length > 1 && alts.filter(p => !p.description).length === 0)

    setDifficulty(q.difficulty || 1)
    setAreas(areas)
    setSelectedArea(selected)
    setDescription(q.description || '')
    setAreaCustomName('')
  }

  function alternativeChanged(alts) {
    setAlternativesIsValid(alts.filter(p => !p.description).length === 0)
    setAlternatives(alts)
  }

  function save() {
    const q = {
      description,
      difficulty,
      area: selectedArea === OUTRAS ? areaCustomName.toUpperCase() : selectedArea,
      answers: alternatives,
      id: editQuestion.id
    }

    const caller = promise =>
      promise.then(res => {
        dispatch(showSuccess(res.message))
        setAlternatives(null)
        close(true)
      }).catch(err => dispatch(showError(err.message)))

    caller(q.id ? questionService.update(q) : questionService.create(q))
  }

  return (
    <Dialog
      open={open}
      onClose={() => { setAlternatives(null); close() }}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      transitionDuration={300}
      onEnter={() => onEnter()}
      TransitionComponent={Zoom}
      maxWidth={false}>
      <DialogTitle id="alert-dialog-title">
        {
          editQuestion.id > 0 ?
            AppTexts.Root.Edition[language] :
            AppTexts.Root.New[language]
        }
      </DialogTitle>
      <DialogContent>
        <div style={{
          color: '#666',
          fontSize: '20px',
          fontFamily: 'sans-serif',
          textTransform: 'uppercase',
          display: 'flex',
          flexDirection: 'row'
        }}>
          <div>
            <FormControl>
              <InputLabel>{AppTexts.MyQuestionsTable.Area[language]}</InputLabel>
              <Select
                style={{ width: '250px' }}
                value={selectedArea}
                onChange={(e) => setSelectedArea(e.target.value)}
                displayEmpty>
                {areas.map((p, i) => <MenuItem key={i} value={p}>{p}</MenuItem>)}
              </Select>
              <div hidden={selectedArea !== OUTRAS}>
                <IconTextInput
                  value={areaCustomName}
                  defaultValue={areaCustomName}
                  minlength={2}
                  required
                  onChange={(e) => setAreaCustomName(e.value)}
                  label={AppTexts.MyQuestionsTable.Area[language]} />
              </div>
            </FormControl>
            <Stars style={{ marginTop: '20px' }}
              filled={difficulty}
              label={AppTexts.MyQuestionsTable.Difficulty[language]}
              onClick={i => setDifficulty(i)} />
            <IconTextInput
              style={{ marginTop: '20px' }}
              required
              multiline={true}
              rowsMax="3"
              name="teste"
              rows="3"
              maxlength={100}
              value={description}
              onChange={t => setDescription(t.value)}
              label={AppTexts.MyQuestionsTable.Description[language]} />
          </div>
          <div style={{ width: '380px', marginLeft: '20px' }}>
            {
              alternatives ?
                <EditQuestionAlternatives defaultAlternatives={alternatives}
                  onAlternativeChange={e => alternativeChanged(e)} />
                : null
            }
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => { setAlternatives(null); close() }}
          variant="contained"
          autoFocus>{AppTexts.Root.Cancel[language]}</Button>
        <Button
          disabled={!description
            || !alternativesIsValid
            || (selectedArea === OUTRAS && !areaCustomName)}
          onClick={() => save()}
          color="primary"
          variant="contained"
          autoFocus>{AppTexts.Root.Save[language]}</Button>
      </DialogActions>
    </Dialog>
  )
}

EditQuestionModal.propTypes = {
  editQuestion: PropTypes.object,
  close: PropTypes.func,
  open: PropTypes.bool,
}