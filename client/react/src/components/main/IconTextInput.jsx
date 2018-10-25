import React from 'react'

import {
  TextField,
  InputAdornment,
  IconButton,
  FormControl,
  FormHelperText
} from '@material-ui/core'

const emailRegex = /^[a-zA-Z0-9!#$.%&*()]{3,20}@[a-zA-Z0-9]{1,20}[.][a-zA-Z0-9]{1,20}([.][a-zA-Z0-9]{1,20})?$/

export default class IconTextInput extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      hasError: this.props.required,
      errorMessage: 'This field is required.',
      lostFocus: false
    }
  }

  onChange(t) {
    let hasError = false
    let errorMessage = ''

    if (this.props.required && !t) {
      hasError = true
      errorMessage = 'This field is required.'
    } else if (this.props.minlength && t.length < this.props.minlength) {
      hasError = true
      errorMessage = `Enter at least ${this.props.minlength} characters.`
    } else if (this.props.email && !emailRegex.test(t)) {
      hasError = true
      errorMessage = 'Enter a valid email address'
    } else if (this.props.pattern && !RegExp(this.props.pattern).test(t)) {
      hasError = true
      errorMessage = this.props.patternMessage ? this.props.pattern : 'Check the value of this field.'
    }

    this.setState({
      text: t,
      hasError: hasError,
      errorMessage: errorMessage
    })
    if (this.props.onChange)
      this.props.onChange(t)

  }

  render() {
    return (
      <FormControl>
        <TextField error={this.state.hasError && this.state.lostFocus}
          style={{ marginTop: '10px' }}
          variant="outlined"
          label={this.props.label}
          type={this.props.type || 'text'}
          onChange={(e) => this.onChange(e.target.value)}
          onBlur={(e) => this.setState({ lostFocus: true })}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={this.props.iconClick}>
                  {this.props.Icon}
                </IconButton>
              </InputAdornment>
            )
          }}
        />
        <FormHelperText hidden={!this.state.lostFocus || !this.state.hasError} error={this.state.hasError}>
          {this.state.errorMessage}
        </FormHelperText>
      </FormControl>
    )
  }
}
