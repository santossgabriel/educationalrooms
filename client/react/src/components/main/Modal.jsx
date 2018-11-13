import React from 'react'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Zoom
} from '@material-ui/core'

export const AlertModal = props => {
  return (
    <Dialog
      open={props.show}
      onClose={props.onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      transitionDuration={300}
      TransitionComponent={Zoom}>
      <DialogTitle id="alert-dialog-title" style={{ textAlign: 'center' }}>
        <span style={{ color: '#d62e2e', fontWeight: 'bold', fontSize: '30px' }} >
          {props.mode === 'success' ? 'Sucesso' : 'Oops!'}
        </span>
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {props.text}
        </DialogContentText>
      </DialogContent>
      <div style={{ marginBottom: '20px', textAlign: 'center' }}>
        <Button onClick={() => props.onClose()} variant="raised" autoFocus>ok</Button>
      </div>
    </Dialog>
  )
}