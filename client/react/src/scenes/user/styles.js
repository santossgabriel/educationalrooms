import styled from 'styled-components'

export const FormContainer = styled.form`
  transition: 200ms;
  height: ${({ expanded }) => expanded ? '410px' : '215px'};
  overflow-y: hidden;
`