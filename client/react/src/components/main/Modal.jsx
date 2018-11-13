import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Zoom
} from '@material-ui/core'
import { SuccessAnimatedIcon, ErrorAnimatedIcon } from './Icons'

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
  }
}

export const AlertModal = props => {
  return (
    <Dialog
      open={props.show}
      onClose={props.onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      transitionDuration={250}
      TransitionComponent={Zoom}>
      <DialogTitle id="alert-dialog-title" style={{ textAlign: 'center' }}>
        <div style={styles[props.type]}>
          <div>
            {props.type === 'success' ? <SuccessAnimatedIcon /> : <ErrorAnimatedIcon />}
          </div>
          <span style={{ marginLeft: '10px' }}>
            {props.type === 'success' ? '' : 'Oops...'}
          </span>
        </div>
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <div style={{ textAlign: 'center' }}>
            {props.text}
          </div>
        </DialogContentText>
      </DialogContent>
      <div style={{ marginBottom: '20px', textAlign: 'center' }}>
        <Button size="large" color="primary" onClick={() => props.onClose()} variant="raised" autoFocus>ok</Button>
      </div>
    </Dialog >
  )
}