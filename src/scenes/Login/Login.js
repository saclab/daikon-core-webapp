import React, { useContext } from "react";
import { Button } from "primereact/button";
import { Form as FinalForm, Field } from "react-final-form";
import { Tag } from "primereact/tag";
import "./Login.css";
import { RootStoreContext } from "../../app/stores/rootStore";
import { FORM_ERROR } from "final-form";
import { combineValidators, isRequired } from "revalidate";

const Login = () => {
  const rootStore = useContext(RootStoreContext);
  const { login } = rootStore.userStore;

  const validate = combineValidators({
    email: isRequired("email"),
    password: isRequired("password"),
  });

  return (
    <div className="LandingLogin">
      <div className="LandingWrap">
        <div className="LandingLoginBox">
          <h4>Target & Project Tracker Login</h4>
          <h5>[Temporary Sign in Form. To be replaced by SSO]</h5>
          <FinalForm
            id="formElem"
            validate={validate}
            onSubmit={(values) =>
              login(values).catch((error) => ({
                [FORM_ERROR]: error,
              }))
            }
            render={({
              handleSubmit,
              pristine,
              invalid,
              submitError,
              dirtySinceLastSubmit,
            }) => (
              <form onSubmit={handleSubmit}>
                <div className="p-field p-grid">
                  <label
                    htmlFor="username"
                    className="p-col-fixed"
                    style={{ width: "100px" }}
                  >
                    Email
                  </label>
                  <div className="p-col">
                    <Field name="email" component="input" />
                  </div>
                </div>
                <div className="p-field p-grid">
                  <label
                    htmlFor="password"
                    className="p-col-fixed"
                    style={{ width: "100px" }}
                  >
                    Password
                  </label>
                  <div className="p-col">
                    <Field name="password" component="input" type="password" />
                  </div>
                </div>
                <div className="p-field p-grid">
                  <div className="p-col">
                    <Button
                      disabled={(invalid && !dirtySinceLastSubmit) || pristine}
                      type="submit"
                      label="Login"
                    />
                    <br />
                    <br />
                    {submitError && !dirtySinceLastSubmit && (
                      <Tag severity="danger" value={submitError.statusText} />
                    )}
                  </div>
                </div>
              </form>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
