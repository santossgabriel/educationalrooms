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

export const PresentationContainer = styled.div`
  margin: 30px;
  background-color: #ddd;
  padding: 20px;
  box-shadow: 5px 5px 20px black;
  > img {
    height: 400px;
    width: 800px;
  }
`