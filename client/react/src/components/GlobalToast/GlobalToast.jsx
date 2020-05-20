import { Check, Clear } from '@material-ui/icons'
import React from 'react'
import { useSelector } from 'react-redux'
import { ContainerContent, ContainerGlobalToast, ContainerText } from './styles'

const ErrorIcon = () => (
  <div style={{ borderRight: 'solid 1px #a88' }}>
    <Clear color="error" fontSize="large" />
  </div>
)

const SuccessIcon = () => (
  <div style={{ borderRight: 'solid 1px #8a8' }}>
    <Check color="primary" fontSize="large" />
  </div>
)

export default function GlobalToast() {

  const state = useSelector(state => state.toastState)

  return (
    <ContainerGlobalToast show={state.show} error={state.error} >
      <ContainerContent>
        {state.error ? <ErrorIcon /> : <SuccessIcon />}
        <ContainerText>
          <span>{state.message}</span>
        </ContainerText>
      </ContainerContent>
    </ContainerGlobalToast>
  )
}