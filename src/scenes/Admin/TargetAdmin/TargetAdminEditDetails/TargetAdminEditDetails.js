import React, { useEffect, useRef, useContext } from "react";
import { Menu } from "primereact/menu";
import { RootStoreContext } from "../../../../app/stores/rootStore";
import Loading from "../../../../app/layout/Loading/Loading";
import { BreadCrumb } from "primereact/breadcrumb";
import { Toast } from "primereact/toast";
import { TabView, TabPanel } from "primereact/tabview";
import SectionHeading from "../../../../app/common/SectionHeading/SectionHeading";
import NotFound from "../../../../app/layout/NotFound/NotFound";
import { observer } from "mobx-react-lite";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";

const TargetAdminEditDetails = ({ match, history }) => {
  const toast = useRef(null);
  const rootStore = useContext(RootStoreContext);
  const { fetchTargetAdmin, selectedTarget, editTargetAdmin, displayLoading } =
    rootStore.targetStoreAdmin;

  useEffect(() => {
    console.log("EFFECT");
    console.log(match.params.id);

    if (selectedTarget === null || selectedTarget.id !== match.params.id) {
      fetchTargetAdmin(match.params.id);
    }
  }, [match.params.id, selectedTarget, fetchTargetAdmin]);

  const items = [
    {
      label: "Sections",
      items: [
        {
          label: "Edit Target Properties",
          icon: "ri-git-repository-private-fill",
        },
        {
          label: "",
          icon: "",
        },
      ],
    },
  ];

  if (displayLoading) {
    console.log("Loading.....");
    return <Loading />;
  }

  if (selectedTarget !== null) {
    console.log("Target ID");
    console.log(selectedTarget.id);
    console.log(selectedTarget);
    const breadCrumbItems = [
      {
        label: "Target",
        command: () => {
          history.push("/admin/target/");
        },
      },
      { label: selectedTarget.name },
    ];

    return (
      <React.Fragment>
        <Toast ref={toast} />
        <br />
        <div className="p-d-flex">
          <div className="p-mr-2">
            <Menu model={items} />
          </div>
          <div className="p-mr-2">
            <div className="p-d-flex p-flex-column">
              <div className="p-mb-2">
                <BreadCrumb model={breadCrumbItems} />
              </div>
              <div className="p-mb-2">
                <SectionHeading
                  icon="icon icon-common icon-selectedTarget"
                  heading={selectedTarget.name}
                  style={{ width: "2000px" }}
                />
              </div>
              <div className="p-mb-2">
                <div className="p-field p-grid">
                  <label
                    htmlFor="score"
                    className="p-col-fixed"
                    style={{ width: "200px" }}
                  >
                    Score
                  </label>
                  <div className="p-col">
                    <InputNumber
                      id="score"
                      showButtons
                      buttonLayout="horizontal"
                      decrementButtonClassName="p-button-danger"
                      incrementButtonClassName="p-button-success"
                      incrementButtonIcon="pi pi-plus"
                      decrementButtonIcon="pi pi-minus"
                      step={0.25}
                      type="text"
                      style={{ width: "800px" }}
                      value={selectedTarget.score}
                      onValueChange={(e) =>
                        (selectedTarget.score = e.target.value)
                      }
                    />
                  </div>
                </div>

                <div className="p-field p-grid">
                  <label
                    htmlFor="htsfeasibility"
                    className="p-col-fixed"
                    style={{ width: "200px" }}
                  >
                    HTS Feasibility
                  </label>
                  <div className="p-col">
                    <InputNumber
                      id="htsfeasibility"
                      showButtons
                      buttonLayout="horizontal"
                      decrementButtonClassName="p-button-danger"
                      incrementButtonClassName="p-button-success"
                      incrementButtonIcon="pi pi-plus"
                      decrementButtonIcon="pi pi-minus"
                      step={0.25}
                      type="text"
                      style={{ width: "800px" }}
                      value={selectedTarget.htsFeasibility}
                      onValueChange={(e) =>
                        (selectedTarget.htsFeasibility = e.target.value)
                      }
                    />
                  </div>
                </div>

                <div className="p-field p-grid">
                  <label
                    htmlFor="sbdfeasibility"
                    className="p-col-fixed"
                    style={{ width: "200px" }}
                  >
                    SBD Feasibility
                  </label>
                  <div className="p-col">
                    <InputNumber
                      id="sbdfeasibility"
                      showButtons
                      buttonLayout="horizontal"
                      decrementButtonClassName="p-button-danger"
                      incrementButtonClassName="p-button-success"
                      incrementButtonIcon="pi pi-plus"
                      decrementButtonIcon="pi pi-minus"
                      step={0.25}
                      type="text"
                      style={{ width: "800px" }}
                      value={selectedTarget.sbdFeasibility}
                      onValueChange={(e) =>
                        (selectedTarget.sbdFeasibility = e.target.value)
                      }
                    />
                  </div>
                </div>

                <div className="p-field p-grid">
                  <label
                    htmlFor="progressibility"
                    className="p-col-fixed"
                    style={{ width: "200px" }}
                  >
                    Progressibility
                  </label>
                  <div className="p-col">
                    <InputNumber
                      id="progressibility"
                      showButtons
                      buttonLayout="horizontal"
                      decrementButtonClassName="p-button-danger"
                      incrementButtonClassName="p-button-success"
                      incrementButtonIcon="pi pi-plus"
                      decrementButtonIcon="pi pi-minus"
                      step={0.25}
                      type="text"
                      style={{ width: "800px" }}
                      value={selectedTarget.progressibility}
                      onValueChange={(e) =>
                        (selectedTarget.progressibility = e.target.value)
                      }
                    />
                  </div>
                </div>

                <div className="p-field p-grid">
                  <label
                    htmlFor="safety"
                    className="p-col-fixed"
                    style={{ width: "200px" }}
                  >
                    Safety
                  </label>
                  <div className="p-col">
                    <InputNumber
                      id="safety"
                      showButtons
                      buttonLayout="horizontal"
                      decrementButtonClassName="p-button-danger"
                      incrementButtonClassName="p-button-success"
                      incrementButtonIcon="pi pi-plus"
                      decrementButtonIcon="pi pi-minus"
                      step={0.25}
                      type="text"
                      style={{ width: "800px" }}
                      value={selectedTarget.safety}
                      onValueChange={(e) =>
                        (selectedTarget.safety = e.target.value)
                      }
                    />
                  </div>
                </div>

                <div className="p-d-flex p-jc-end">
                  <Button
                    label="Save changes"
                    className="p-button-primary"
                    icon="pi pi-check"
                    onClick={() => editTargetAdmin()}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
  return <NotFound />;
};

export default observer(TargetAdminEditDetails);
