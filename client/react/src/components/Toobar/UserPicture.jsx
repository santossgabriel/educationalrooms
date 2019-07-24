import React from 'react'
import PropTypes from 'prop-types'

import { Image, OnlineRipple } from './styles'

export const UserPicture = ({ image, online }) => (
  <div>
    <OnlineRipple online={online} />
    <Image src={image || '/api/image/user-image.png'} />
  </div>
)

UserPicture.propTypes = {
  image: PropTypes.string,
  online: PropTypes.bool
}