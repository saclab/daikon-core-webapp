import React from "react";
import { Divider } from "primereact/divider";
import { SplitButton } from "primereact/splitbutton";

const GenePromoteSummary = (props) => {
  const nextButtonItems = [
    {
      label: "Back",
      icon: "pi pi-arrow-left",
      command: () => {
        props.onFormSet(3);
      },
    },
    {
      label: "Save form data in browser",
      icon: "pi pi-cloud-download",
      command: () => {
        console.log("Save form data local");
      },
    },
    {
      label: "Reset",
      icon: "pi pi-refresh",
      command: () => {
        console.log("Reset Section");
      },
    },
  ];

  return (
    <div>
      <h2>Submit For Review</h2>
      <hr />
      <br />
      {/* {JSON.stringify(props.targetPromotionFormValue)} */}

      <div>
        <div className="card">
          <h5>Impact of chemical inhibition</h5>
          <p></p>

          <Divider />

          <p></p>

          <Divider />

          <p></p>

          <Divider />

          <p></p>
        </div>
      </div>

      <br />
      <SplitButton
        label="Submit"
        icon="pi pi-arrow-right"
        model={nextButtonItems}
        className="p-button-success p-button-sm"
        onClick={() => {
          props.onFormSubmit();
        }}
      />
    </div>
  );
};

export default GenePromoteSummary;
