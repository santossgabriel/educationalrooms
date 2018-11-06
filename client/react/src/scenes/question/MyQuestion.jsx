import React from 'react'
import { Link } from 'react-router-dom'

export default class ListQuestion extends React.Component {
  render() {
    return (
      <div>
        <h2>Questions</h2>
        <br />
        <Link to="/">Home</Link>
      </div>
    )
  }
}