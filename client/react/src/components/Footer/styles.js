import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const ContainerFooter = styled.div`
  background-color: #000;
  position: fixed;
  width: 100%;
  height: 30px;
  padding-top: 12px;
  color: #AAA;
  bottom: 0;
  font-family: Arial, Helvetica, sans-serif;
  text-align: center;
  z-index: 10;
`

export const ContainerOpenedRooms = styled.div`
  background-color: #DDD;
  /* border: solid 1px #AAA; */
  border-radius: 4px;
  position: fixed;
  width: 200px;
  transition: 200ms;
  height: ${({ show }) => show ? '200px' : '30px'};
  color: #888;
  right: 16px;
  bottom: 42px;
  font-family: Arial, Helvetica, sans-serif;
`

export const Title = styled.div`
  font-size: 14px;
  text-transform: uppercase;
  text-align: center;
  margin: 2px;
  font-weight: bold;
  border-bottom: solid 2px #666;
  padding: 5px;
  background-color: #AAA;
  &:hover {
    cursor: pointer;
  }
`

export const ContainerListItem = styled.div`
  text-align: center;
`

export const ListItem = styled(Link)`
  text-align: center;
  text-transform: uppercase;
  text-decoration: none;
  font-size: 14px;
  color: #999;
  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`