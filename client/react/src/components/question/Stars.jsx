import React from 'react'
import { StarBorderOutlined, Star } from '@material-ui/icons/'

const color = '#ffb950'

export default (props) => {

  return (
    <div>
      {[1, 2, 3, 4, 5].map(n => n <= props.filled ?
        <Star key={n} style={{ color: color }} />
        :
        <StarBorderOutlined key={n} style={{ color: color }} />)}
    </div>
  )
}