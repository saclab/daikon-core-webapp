import "./Login.css";
import { Button } from "primereact/button";

const Login = ({loginButtonClicked}) => {
  return (
    <div className="LandingLogin">
      <div className="LandingWrap">
        <div className="LandingLoginBox">
          <h4>Target & Project Tracker Login</h4>
          <h5>[LOGIN]</h5>
          <p>
            Please login with your BMGF ID to continue
          </p>
          <Button
            label="Login with SSO"
            onClick={() => loginButtonClicked()}
          ></Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
