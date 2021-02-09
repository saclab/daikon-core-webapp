import React from 'react'
import { NavLink } from 'react-router-dom'

const NotFound = () => {
  return (
    <div>
      <h1>404 Not Found : TPT</h1>
      <NavLink to="/home" >Return Home </NavLink>
    </div>
  )
}

export default NotFound
