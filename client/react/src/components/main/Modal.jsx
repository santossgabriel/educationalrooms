import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Button,
  Zoom
} from '@material-ui/core'
import PropTypes from 'prop-types'

import { SuccessAnimatedIcon, ErrorAnimatedIcon } from './Icons'
import { AppTexts } from '../../helpers/appTexts'
import storageService from '../../services/storageService'

const styles = {
  success: {
    minWidth: '300px',
    color: 'green',
    fontWeight: 'bold',
    fontSize: '30px'
  }, error: {
    minWidth: '300px',
    color: '#797979',
    fontWeight: 'bold',
    fontSize: '30px'
  }, message: {
    color: 'rgba(0, 0, 0, 0.54)',
    fontSize: '20px',
    fontWeight: 'bold',
    fontFamily: 'sans-serif',
    textAlign: 'center'
  }
}

const SuccessIcon = () => (
  <div style={styles.success}>
    <SuccessAnimatedIcon />
  </div>
)

const ErrorIcon = () => (
  <div style={styles.error}>
    <div>
      <ErrorAnimatedIcon />
    </div>
    <span style={{ marginLeft: '10px' }}>
      Oops...
      </span>
  </div>
)

export const AlertModal = props => (
  <Dialog
    open={props.show}
    onClose={props.onClose}
    transitionDuration={250}
    TransitionComponent={Zoom}>
    <DialogTitle style={{ textAlign: 'center' }}>
      {props.type === 'success' ? <SuccessIcon /> : <ErrorIcon />}
    </DialogTitle>
    <DialogContent>
      <div style={styles.message}>
        {props.text}
      </div>
    </DialogContent>
    <div style={{ marginBottom: '20px', textAlign: 'center' }}>
      <Button size="large" color="primary" onClick={() => props.onClose()} variant="contained" autoFocus>ok</Button>
    </div>
  </Dialog>
)

export const ConfirmModal = props => (
  <Dialog
    open={props.open}
    onClose={() => props.onResult()}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
    transitionDuration={250}
    TransitionComponent={Zoom}>
    <DialogTitle id="alert-dialog-title" style={{ textAlign: 'center' }}>
      <span>{props.title}</span>
    </DialogTitle>
    <DialogContent>
      <div style={styles.message}>
        {props.text}
      </div>
    </DialogContent>
    <div style={{
      margin: '20px',
      textAlign: 'center'
    }}>
      <Button size="large"
        color="primary"
        onClick={() => props.onResult(true)}
        variant="contained" autoFocus>{AppTexts.Root.Yes[storageService.getLanguage()]}</Button>
      <Button size="large" style={{ marginLeft: '20px' }}
        onClick={() => props.onResult()}
        variant="contained" autoFocus>{AppTexts.Root.No[storageService.getLanguage()]}</Button>
    </div>
  </Dialog>
)

ConfirmModal.propTypes = {
  open: PropTypes.bool.isRequired,
  title: PropTypes.string,
  text: PropTypes.string.isRequired,
  onResult: PropTypes.func.isRequired
}


AlertModal.propTypes = {
  show: PropTypes.bool,
  onClose: PropTypes.func,
  type: PropTypes.string,
  text: PropTypes.string,
}