import styled from 'styled-components'

export const FormContainer = styled.form`
  transition: 200ms;
  height: ${({ expanded }) => expanded ? '410px' : '215px'};
  overflow-y: hidden;
`

export const ChangePictureContainer = styled.div`
  font-family: Arial, Helvetica, sans-serif;
  margin-left: 50px;
  display: flex;
  flex-direction: column;
  img {
    height: 100px;
    width: 100px;
    border-radius: 10px;
  }
`

export const InputFileLabel = styled.div`
  background-color: #4b9372;
  transition: 200ms;
  font-size: 14px;
  color: white;
  text-align: center;
  padding-top: 4px;
  border-radius: 6px;
  padding-top: 10px;
  height: 30px;
  box-shadow: 0px 0px 1px black;
`

export const InputFile = styled.input`
  &, & + div {
    margin-top: 10px;
    width: 100px;
  }
  height: 40px;
	opacity: 0;
	position: absolute;
  cursor: pointer;
  &:hover + div {
    background-color: #33604b;
  }
`