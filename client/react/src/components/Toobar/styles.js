import IconButton from '@material-ui/core/IconButton'
import styled from 'styled-components'
import { Link as LinkRouter } from 'react-router-dom'
import { Toolbar as ToolbarApp } from '@material-ui/core'

export const Container = styled.div`
  height: 64px;
  width: 100%;
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: #000A;
`

export const Toolbar = styled(ToolbarApp)`
  color: white;
  margin: 0;
  padding: 0;
  boxShadow: 2px 2px 2px black;
`

export const Title = styled.div`
  text-transform: 'uppercase';
  margin: 0;
  padding-left: 20px;
  font-family: Arial;
  text-transform: uppercase;
`

export const OnlineRipple = styled.div`
  background-color: ${({ online }) => online ? '#0F0' : '#ccc'};
  border: solid #fff 1px;
  border-radius: 50%;
  width: 8px;
  height: 8px;
  position: absolute;
  margin-top: 28px;
`

export const Image = styled.img`
  height: 40px;
  width: 40px;
  border-radius: 50%;
`

export const MenuIconButton = styled(IconButton)`
  margin-left: -12px;
  margin-right: 20px;
`

export const UserName = styled.div`
  font-family: 'Roboto Helvetica Arial sans-serif';
  color: #777;
  font-size: 24px;
`

export const UserEmail = styled.div`
  font-family: 'Roboto Helvetica Arial sans-serif';
  color: #777;
`

export const MenuFooter = styled.div`
  padding: 10px;
  text-align: end;
  background-color: #afafaf;
`

export const Link = styled.a`
  color: #666;
  font-size: 12px;
  margin-right: 10px;
  margin-left: 10px;
  font-weight: bold;
  font-family: Arial, Helvetica, sans-serif;
  cursor: pointer;
`

export const NotificationTitle = styled.div`
  text-transform: uppercase;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: bold;
  text-align: center;
  color: #666;
`

export const NotificationContainer = styled.div`
  font-size: 12px; 
  font-family: Arial, Helvetica, sans-serif;
  color: #666;
  border-bottom: 1px solid #666;
`

export const LinkMenu = styled(LinkRouter)`
  text-decoration: none;
`

export const AppMenu = styled.ul`
  list-style: none;
  flex-grow: 1;
  font-size: 14px;
  font-family: Arial;
  text-transform: uppercase;
  > li {
    float: left;
    margin-left: 20px;
    padding-bottom: 3px;

     > label {
      border-bottom: 1px solid transparent;
      transition: 300ms;
      &:hover {
        cursor: pointer;
        color: #26a469;
        box-shadow: 0px 2px #26a469;
      }
    }

    &:hover {
      ul {
        height: 120px;
      }
    }

    ul {
      display: flex;
      height: 0;
      overflow-y: hidden;
      flex: 1;
      flex-direction: column;
      position: absolute;    
      padding: 0;
      padding-top: 26px;
      transition: 300ms;
      li {
        background-color: #000D;
        display: block;
        color: white;
        padding: 10px;
        cursor: pointer;
        transition: 200ms;
        &:hover {
          color: #26a469;
          box-shadow: 0px 3px #26a469;
          text-shadow: 0 0 1px;
        }
      }
    }
  }
`