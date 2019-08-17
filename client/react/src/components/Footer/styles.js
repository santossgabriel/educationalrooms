import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const ContainerFooter = styled.div`
  background-color: #000;
  position: relative;
  width: 100%;
  height: 30px;
  margin-top: 20px;
  padding-top: 12px;
  color: #AAA;
  bottom: 0;
  font-family: Arial, Helvetica, sans-serif;
  text-align: center;
  z-index: 10;
`

export const ContainerOpenedRooms = styled.div`
  background-color: #DDD;
  border-radius: 4px;
  position: fixed;
  width: 15px;
  transition: 200ms;
  height: 200px;
  color: #888;
  right: 0;
  bottom: 150px;
  font-family: Arial, Helvetica, sans-serif;
  overflow: hidden;
  div {
    display: none;
  }

  i {
    margin-top: 90px;
    margin-left: 5px;
  }

  &:hover {
    width: 200px;
    div {
      display: block;
    }
    i {
      display: none;
    }
  }
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