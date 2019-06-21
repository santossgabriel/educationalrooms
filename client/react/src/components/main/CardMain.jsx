import React from 'react'
import PropTypes from 'prop-types'

import { CardMainContainer } from './styles'

const CardMain = (props) => {
  return (
    <CardMainContainer>
      <fieldset>
        <legend>{props.title}</legend>
        <div>
          {props.children}
        </div>
      </fieldset>
    </CardMainContainer>
  )
}

CardMain.propTypes = {
  title: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}

export default CardMain