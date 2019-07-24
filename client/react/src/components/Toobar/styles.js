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