import "./Login.css";
import { Button } from "primereact/button";
import { Fragment } from "react";
import Footer from "../../app/layout/Footer/Footer";

// const Login = ({ loginButtonClicked }) => {
//   return (
//     <div className="BackgroundLogin" >
//       <div className="LandingLogin">
//         <div className="LandingWrap">
//           <div className="LandingLoginBox">
//             <h1>Target & Project Tracker</h1>
//             <h5>[LOGIN]</h5>
//             <p>Please login with your BMGF ID to continue</p>
//             <Button
//               label="Login with SSO"
//               onClick={() => loginButtonClicked()}
//             ></Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

const Login = ({ loginButtonClicked }) => {
  return (
    <Fragment>
      <div className="LoginSplit LoginLeft">
        <div className="centered"></div>
      </div>

      <div className="LoginSplit LoginRight">
        <div className="LoginCentered">
          <div className="LoginLanding">
            <div className="LoginWrap">
              <div className="LoginLoginBox" id="loginButton">
                <h2>Target & Project Tracker</h2>

                <h5>[LOGIN]</h5>
                <p>
                  This computer system and the data herein are available only
                  for authorized purposes by authorized users: use for any other
                  purpose is prohibited and may result in
                  administrative/ disciplinary actions or criminal prosecution
                  against the user. Usage may be subject to security testing and
                  monitoring to ensure compliance with the policies of the
                  Organization. There is no expectation of privacy on this
                  system except as otherwise provided by applicable privacy
                  laws. Users should refer to Rules for Responsible Computing,
                  for guidance on the appropriate use of the Organization's
                  information resources.
                </p>
                <br />
                <Button
                  label="Login with SSO"
                  onClick={() => loginButtonClicked()}
                ></Button>
                <Footer />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Login;
