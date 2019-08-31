import { Card } from '@material-ui/core'
import styled from 'styled-components'

export const Title = styled.div`
  font-family: Arial, Helvetica, sans-serif;
  text-align: center;
  padding: 20px;
  color: #666;
  font-size: 20px;
`

export const SubTitle = styled(Title)`
  font-size: 14px;
  padding: 0;
`

export const Container = styled(Card)`
  width: 850px;
  margin: 0 auto;
  margin-top: 30px;
`