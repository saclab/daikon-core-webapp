import React from 'react'
import { NavLink } from 'react-router-dom'
import "./NotFound.css";

const NotFound = () => {
  return (
    <div>
      <div className="NotFound">
        <div className="NotFoundWrap">
          <div className="NotFoundBox">
            <h1>404 Not Found</h1>
            
            <h4>That didn't look good!</h4>
            <p>
              The page you are looking for could not be found. 
              <br />
              <br />
              <NavLink to="/">Return Home</NavLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotFound
