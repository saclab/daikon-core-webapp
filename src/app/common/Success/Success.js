import React from 'react';
import { NavLink } from 'react-router-dom';
import "./Success.css";

const Success = ({message}) => {
  return (
    <div className='w-full'>
      <div className="Success">
        <div className="SuccessWrap">
          <div className="SuccessBox">
            <h1>Success</h1>
            
            <h4>{message}</h4>
            <p>
               
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

export default Success
