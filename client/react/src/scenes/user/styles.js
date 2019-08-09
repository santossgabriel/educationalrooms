import styled from 'styled-components'

export const FormContainer = styled.form`
  transition: 200ms;
  height: ${({ expanded }) => expanded ? '430px' : '220px'};
  overflow-y: hidden;
`