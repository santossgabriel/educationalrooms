import { Paper } from '@material-ui/core'
import styled from 'styled-components'

export const CardMainContainer = styled(Paper)`
  margin-top: 50px;
  margin-left: 20px;
  margin-right: 20px;
  padding: 10px;
  fieldset {
    color: #666;
    border: inset 2px #ccc;
    font-size: 30px;
    font-family: 'Arial,Helvetica,sans-serif';
    text-transform: uppercase;
  }
  div {
    textTransform: initial;
    fontSize: 14px;
  }
`

export const FadeInContainer = styled.div`
  transition: opacity .5s;
`