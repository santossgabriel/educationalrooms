import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import { FadeInContainer } from './styles'

export default function container({ children, style }) {

  const [opacity, setOpacity] = useState(0)

  useEffect(() => setOpacity(1), [])

  return (
    <FadeInContainer style={{ ...style, opacity: opacity }}>{children}</FadeInContainer>
  )
}

container.propTypes = {
  children: PropTypes.node,
  style: PropTypes.object
}