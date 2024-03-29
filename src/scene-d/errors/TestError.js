import axios from "axios";
import { Button } from "primereact/button";
import React, { useState } from "react";

const TestError = () => {
  //const baseUrl = process.env.REACT_APP_API_URL;
  const [errors, setErrors] = useState(null);
  function handleNotFound() {
    axios
      .get("/genomes")
      .then((resp) => console.error(resp.body))
      .catch((err) => console.error(err.response));
  }

  function handleBadRequest() {
    axios.get("buggy/bad-request").catch((err) => console.error(err.response));
  }

  function handleServerError() {
    axios.get("buggy/server-error").catch((err) => console.error(err.response));
  }

  function handleUnauthorised() {
    axios.get("buggy/unauthorised").catch((err) => console.error(err.response));
  }

  function handleBadGuid() {
    axios.get("activities/notaguid").catch((err) => console.error(err));
  }

  function handleValidationError() {
    axios.post("activities", {}).catch((err) => setErrors(err));
  }

  return (
    <div>
      <h1>Test Error Content</h1>
      <Button onClick={handleNotFound} label="Not Found" basic primary />
      <Button onClick={handleBadRequest} label="Bad Request" basic primary />
      <Button
        onClick={handleValidationError}
        label="Validation Error"
        basic
        primary
      />
      <Button onClick={handleServerError} label="Server Error" basic primary />
      <Button onClick={handleUnauthorised} label="Unauthorised" basic primary />
      <Button onClick={handleBadGuid} label="Bad Guid" basic primary />
    </div>
  );
};

export default TestError;
