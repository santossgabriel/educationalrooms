import React from 'react'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import {
  FormControl,
  TextField,
  FormHelperText
} from '@material-ui/core'

import { AppTexts } from 'helpers'

export default function InputHookForm({ register, validateProps, name, errors, label, type, email }) {
  const language = useSelector(state => state.appState.language)

  if (email)
    validateProps.pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return (
    <FormControl>
      <TextField error={!!errors[name]}
        inputRef={register(validateProps)}
        name={name}
        label={label}
        variant="outlined"
        style={{ padding: '2px', marginTop: '8px' }}
        type={type || 'text'} />
      <FormHelperText hidden={!errors[name]} error={!!errors[name]}>
        {errors[name] && errors[name].type === 'required' && AppTexts.FormErrors.RequiredField[language]}
        {errors[name] && errors[name].type === 'minLength'
          && AppTexts.FormErrors.MinLength(language, validateProps.minLength)}
        {errors[name] && errors[name].type === 'pattern' && email && 'Email inválido'}
      </FormHelperText>
    </FormControl>
  )
}

InputHookForm.propTypes = {
  register: PropTypes.func.isRequired,
  validateProps: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  type: PropTypes.string,
  email: PropTypes.bool
}