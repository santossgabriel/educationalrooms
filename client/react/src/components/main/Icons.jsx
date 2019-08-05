import React from 'react'
import styled from 'styled-components'

export const SuccessAnimatedIcon = () => (
  <div className="check_mark">
    <div className="sa-icon sa-success animate">
      <span className="sa-line sa-tip animateSuccessTip"></span>
      <span className="sa-line sa-long animateSuccessLong"></span>
      <div className="sa-placeholder"></div>
      <div className="sa-fix"></div>
    </div>
  </div>
)

export const ErrorAnimatedIcon = () => (
  <div className="error_mark">
    <div className="sa-icon sa-error animate">
      <span className="sa-line sa-tip animateErrorDown"></span>
      <span className="sa-line sa-long animateErrorUp"></span>
      <div className="sa-placeholder"></div>
      <div className="sa-fix"></div>
    </div>
  </div>
)

export const Arrow = styled.i`
  border: solid #777;
  border-width: 0 3px 3px 0;
  display: inline-block;
  padding: 3px;
`

export const ArrowRight = styled(Arrow)`
  transform: rotate(-45deg);
  -webkit-transform: rotate(-45deg);
`

export const ArrowLeft = styled(Arrow)`
  transform: rotate(135deg);
  -webkit-transform: rotate(135deg);
`

export const ArrowUp = styled(Arrow)`
  transform: rotate(-135deg);
  -webkit-transform: rotate(-135deg);
`

export const ArrowDown = styled(Arrow)`
  transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
`