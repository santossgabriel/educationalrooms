import React from 'react'
import { Button } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { AppTexts } from '../../helpers'
import { ConfirmModal, CardMain } from '../../components'

class EditRoom extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      title: AppTexts.MainComponent.RoomTexts.NewEdit,
      id: Number(this.props.match.params.id.replace(':', ''))
    }
  }

  render() {
    return (
      <CardMain title={this.state.title[this.state.id > 0 ? 'Edit' : 'New'][this.props.language]}>

        <div style={{ textAlign: 'center', padding: '5px' }}>
          <Link to="edit-room/:88"
            style={{ textDecoration: 'none' }}>
            <Button color="primary" variant="raised">{AppTexts.Root.Save[this.props.language]}</Button>
          </Link>
        </div>

        <ConfirmModal open={!!this.state.removeQuestion}
          title={AppTexts.Question.ConfirmExclusionTitle[this.props.language]}
          text={this.state.removeQuestion ? this.state.removeQuestion.description : ''}
          onResult={confirm => this.onResultRemoveQuestion(confirm)}>
        </ConfirmModal>
      </CardMain>
    )
  }
}

const mapStateToProps = state => ({ language: state.appState.language })

export default connect(mapStateToProps)(EditRoom)