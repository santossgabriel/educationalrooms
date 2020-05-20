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
`

export const CarouselContainer = styled.div`
  flex-direction: row;
  display: flex;
`

export const PresentationTitle = styled.div`
  padding: 20px;
  color: #4b7d47;
  font-size: 40px;
  font-weight: bold;
  margin: 0;
  flex: 1;
`

export const ImageContainer = styled.img`
  margin: 20px;
  height: 400px;
  max-width: 800px;
  flex: 5;
`

export const CarouselFooter = styled.div`
  display: flex;
  flexDirection: row;
  justifyContent: space-between;
  background-color: red;
  height: 5px;
`

export const CarouselFooterItem = styled.div`
  background-color: ${({ selected }) => selected ? '#4b7d47' : 'gray'};
  flex: 1;
  height: 5px;
`