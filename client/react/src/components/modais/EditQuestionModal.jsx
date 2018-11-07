import React from 'react'
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Zoom
} from '@material-ui/core'

export default class EditQuestionModal extends React.Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <Dialog
        open={this.props.open}
        onClose={() => this.props.cancel()}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        transitionDuration={300}
        TransitionComponent={Zoom}>
        <DialogTitle id="alert-dialog-title">
          {this.props.question.id > 0 ? 'Edição da questão' : 'Nova Questão'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {this.props.question.description}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => this.props.cancel()} color="primary" variant="raised" autoFocus>ok</Button>
        </DialogActions>
      </Dialog>
    )
  }
}