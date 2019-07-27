import IconButton from '@material-ui/core/IconButton'
import styled from 'styled-components'

export const OnlineRipple = styled.div`
  background-color: ${({ online }) => online ? '#0F0' : '#ccc'};
  border: solid #fff 2px;
  border-radius: 50%;
  width: 15px;
  height: 15px;
  position: fixed;
  margin-top: 50px;
`

export const Image = styled.img`
  height: 70px;
  width: 70px;
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