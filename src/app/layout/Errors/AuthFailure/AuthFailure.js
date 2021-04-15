import React from 'react';

class AuthFailure extends React.Component{
  render() {
    return (
      <div className="AuthFailure">
          <p>
              {this.props.errorMessage}
          </p>
      </div>
    );
  }
}

export default AuthFailure;