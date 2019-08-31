import styled from 'styled-components'

import {
  TableCell,
  TableRow
} from '@material-ui/core'

export const TableHeadCell = styled(TableCell)`
  text-align: center !important;
  width: 80px !important;
  margin: 0 !important;
  padding: 10px !important;
  text-transform: uppercase;
`

export const TableBodyCell = styled(TableCell)`
  text-align: center !important;
  width: 80px !important;
  margin: 0 !important;
  padding: 0 !important;
`

export const TableRowBody = styled(TableRow)`
  transition: 100ms;
  background-color: ${({ itemSelected }) => itemSelected ? '#ccc' : 'transparent'};
  &:hover {
    background-color: #ccc;
    cursor: pointer;
  }
`

export const RippleOrder = styled.div`
  width: 35px;
  height: 35px;
  box-shadow: gray 0px 2px 5px;
  border-radius: 50%;
  font-size: 25px;
  text-align: center;
  background-color: #bbb;
  color: #333;
  font-family: Arial, Helvetica, sans-serif;
`