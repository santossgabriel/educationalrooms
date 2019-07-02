import styled from 'styled-components'
import { Paper, TableCell } from '@material-ui/core'

export const Container = styled(Paper)`
  marginLeft: 20px; 
  marginRight: 20px;
`

export const CellHead = styled(TableCell)`
  color: #888 !important;
  font-weight: bold !important;
  text-align: center !important;
  font-size: 16px !important;
  padding-left: 0 !important;
  padding-right: 0 !important;
`

export const CellRow = styled(TableCell)`
  text-align: center !important;
  color: #555 !important;
  font-weight: 100 !important;
  padding: 5px !important;
`

export const NoContentMessage = styled.span`
  font-size: 12px;
  color: #555;
  text-align: center;
  display: block;
  font-family: Arial, Helvetica, sans-serif;
  margin: 12px;
`