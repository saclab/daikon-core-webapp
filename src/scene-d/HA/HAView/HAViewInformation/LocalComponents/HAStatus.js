import { useFormik } from "formik";
import { Column } from "primereact/column";
import { ContextMenu } from "primereact/contextmenu";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import React, { useRef, useState } from "react";
import EmbededHelp from "../../../../../app/common/EmbededHelp/EmbededHelp";
import FDate from "../../../../../app/common/FDate/FDate";
import PredictedDateEditor from "../../../../../app/common/PredictedDateEditor/PredictedDateEditor";
import TagGeneral from "../../../../../app/common/TagGeneral/TagGeneral";

const HAStatus = ({ project }) => {
  const cm = useRef(null);
  const [displayEditContainer, setDisplayEditContainer] = useState(false);
  const op = useRef(null);

  const formik = useFormik({
    initialValues: {
      h2LPredictedStart: new Date(project.h2LPredictedStart),
    },
    validate: (data) => {
      let errors = {};
      if (project.h2LEnabled && !data.h2LPredictedStart) {
        errors.h2LPredictedStart = "This field is required";
      }
      return errors;
    },
    onSubmit: (data) => {
      var editedProject = { ...project };
      //editedProject.h2LPredictedStart = data.h2LPredictedStart;
      //editProject(editedProject)
    },
  });

  const isFormFieldValid = (name) =>
    !!(formik.touched[name] && formik.errors[name]);
  const getFormErrorMessage = (name) => {
    return (
      isFormFieldValid(name) && (
        <small className="p-error">{formik.errors[name]}</small>
      )
    );
  };

  const contextMenuItems = [
    {
      label: "Edit",
      icon: "pi pi-tablet",
      command: () => setDisplayEditContainer(true),
    },
  ];

  let headerEditDialog = () => (
    <React.Fragment>
      <i className="icon icon-common icon-database"></i> &nbsp; Editing H2L
      Predicted Start Date
    </React.Fragment>
  );

  let data = [
    {
      name: "HA Status",
      value: (
        <TagGeneral
          tag={project.currentStage === "HA" ? "Ongoing" : "Complete"}
        />
      ),
    },
    {
      name: "HA Start Date",
      value: <FDate timestamp={project.haStart} hideTime={true} />,
    },
  ];
  if (project.currentStage === "HA") {
    data.push({
      name: (
        <div onContextMenu={(e) => cm.current.show(e)}>H2L Predicted Start</div>
      ),
      value: (
        <div onContextMenu={(e) => cm.current.show(e)}>
          <FDate
            timestamp={project.h2LPredictedStart}
            hideTime={true}
            onClick={(e) => op.current.toggle(e)}
          />
        </div>
      ),
    });
  }

  return (
    <div className="flex flex-column flex-wrap card-container">
      <DataTable className="noDataTableHeader" value={data}>
        <Column field="name"></Column>
        <Column field="value"></Column>
      </DataTable>
      <ContextMenu model={contextMenuItems} ref={cm}></ContextMenu>
      <Dialog
        header={headerEditDialog}
        visible={displayEditContainer}
        closable={true}
        draggable={true}
        style={{ width: "50vw" }}
        onHide={() => setDisplayEditContainer(false)}
      >
        <EmbededHelp>
          Project's primary organization and participating organization can
          propose a new predicted start date for H2L.
        </EmbededHelp>
        <PredictedDateEditor
          project={project}
          postSave={() => setDisplayEditContainer(false)}
        />
      </Dialog>
    </div>
  );
};

export default HAStatus;
