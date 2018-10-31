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
      TransitionComponent={Zoom}
    >
      <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {props.text}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => props.onClose()} color="primary" variant="raised" autoFocus>ok</Button>
      </DialogActions>
    </Dialog>
  )
}

// export const ConfirmModal = props => {
//   return (
//     <Dialog
//       open={this.state.showSwAl}
//       onClose={() => this.setState({ showSwAl: false })}
//       aria-labelledby="alert-dialog-title"
//       aria-describedby="alert-dialog-description"
//       transitionDuration={200}
//       TransitionComponent={Zoom}
//     >
//       <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
//       <DialogContent>
//         <DialogContentText id="alert-dialog-description">
//           {props.text}
//         </DialogContentText>
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={() => this.setState({ showSwAl: false })}
//           variant="outlined"
//           color="primary">Disagree</Button>
//         <Button onClick={() => this.setState({ showSwAl: false })}
//           color="primary"
//           variant="raised" autoFocus>ok</Button>
//       </DialogActions>
//     </Dialog>
//   )
// }