import React, { useState, useEffect, useRef } from "react";
import { Dropdown } from "primereact/dropdown";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { useFormik } from "formik";

const TestMolView = () => {
  const [selectedCity1, setSelectedCity1] = useState(null);
  const [value1, setValue1] = useState("");

  

  const onCityChange = (e) => {
    if (setSelectedCity1(e.value) === "No") {
    }
  };

  const addText = (e) => {
    setValue1(e.value);
  };

  const cities = [
    { name: "New York", code: "NY" },
    { name: "Rome", code: "RM" },
    { name: "London", code: "LDN" },
    { name: "Istanbul", code: "IST" },
    { name: "Paris", code: "PRS" },
  ];

  return (
    <div>
      <div>
        <Dropdown
          value={selectedCity1}
          options={cities}
          onChange={onCityChange}
          optionLabel="name"
          placeholder="Select a City"
        />
      </div>

      <div>
        <InputTextarea value={value1} onChange={addText} rows={1} />
      </div>

      <Button type="submit" label="Submit"/>
    </div>
  );
};

export default TestMolView;
