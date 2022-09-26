import "./Login.css";
import { Button } from "primereact/button";
import EmbededHelp from "../../app/common/EmbededHelp/EmbededHelp";
import App from '../../app/layout/App';


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
    <div className="BackgroundLogin">
      {/* <div className="LoginLeft">
        <div className="centered"></div>
      </div> */}

      <div className="LoginRight">
        <div className="LoginCentered">
          <div className="LoginLanding">
            <div >
              <div className="LoginLoginBox" id="loginButton">
                <h1>D A I K O N</h1>

                <h5>[LOGIN]</h5>
                <p>
                  This computer system and the data herein are available only
                  for authorized purposes by authorized users: use for any other
                  purpose is prohibited and may result in
                  administrative/ disciplinary actions or criminal prosecution
                  against the user. Usage may be subject to security testing and
                  monitoring.
                </p>
                <EmbededHelp>
                This is an demo implementation of Daikon framework, data inside the App
                might not be accurate.
                </EmbededHelp>
                <br />
                <Button
                  label="Login with SSO"
                  onClick={() => loginButtonClicked()}
                ></Button>
                
                {/* <Footer /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
