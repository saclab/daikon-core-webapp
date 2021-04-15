import "./NoAccess.css";
import { Button } from "primereact/button";

const NoAccess = () => {
  return (
    <div className="LandingNoAccess">
      <div className="LandingNoAccessWrap">
        <div className="LandingNoAccessBox">
          <h4>Target & Project Tracker Login</h4>
          <h5>[Access Error]</h5>
          <p>
            Although your authenication with BMGF SSO succeeded, we could not
            find an account for you in the TPT App. Plese contact the app
            administrator to set up your account.
          </p>
          <Button
            label="Logout from SSO"
            // onClick={() => authContext.logOut()}
          ></Button>
        </div>
      </div>
    </div>
  );
};

export default NoAccess;
