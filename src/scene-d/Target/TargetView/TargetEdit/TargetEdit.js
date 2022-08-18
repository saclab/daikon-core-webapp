import React, { useEffect, useRef, useContext } from "react";
import { Menu } from "primereact/menu";
import { RootStoreContext } from "../../../../app/stores/rootStore";
import Loading from "../../../../app/layout/Loading/Loading";
import { BreadCrumb } from "primereact/breadcrumb";
import { Toast } from "primereact/toast";
import SectionHeading from "../../../../app/common/SectionHeading/SectionHeading";
import NotFound from "../../../../app/layout/NotFound/NotFound";
import { observer } from "mobx-react-lite";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import { useNavigate } from 'react-router-dom';
import { appColors } from '../../../../colors';
import Unauthorized from "../../../../app/common/Unauthorized/Unauthorized";

const TargetEdit = ({ id }) => {
  const navigate = useNavigate();
  const toast = useRef(null);
  const rootStore = useContext(RootStoreContext);
  const { fetchTargetAdmin, selectedTarget, editTargetAdmin, displayLoading } =
    rootStore.targetStoreAdmin;
  

  useEffect(() => {
    console.log("EFFECT");

    if (selectedTarget === null || selectedTarget.id !== id) {
      fetchTargetAdmin(id);
    }
  }, [id, selectedTarget, fetchTargetAdmin]);

  const { user } = rootStore.userStore;
  if (!user.roles.includes("admin")){
    return <Unauthorized />
  }



  if (displayLoading) {
    console.log("Loading.....");
    return <Loading />;
  }

  if (selectedTarget !== null) {

    const breadCrumbItems = [
      {
        label: "Targets",
        command: () => {
          navigate("/d/target/");
        },
      },
      {
        label: selectedTarget.name,
        command: () => {
          navigate(`/d/target/${selectedTarget.id}`);
        }
      },
      { label: "Edit" },
    ];


    return (
      <React.Fragment>
        <Toast ref={toast} />

        <div className="flex flex-column w-full">

          <div className="flex w-full pb-2">
            <BreadCrumb model={breadCrumbItems} />
          </div>

          <div className="flex w-full pb-2">
            <SectionHeading
              icon="icon icon-common icon-target"
              heading={selectedTarget.name}
              targetName={selectedTarget.name}
              displayHorizon={true}
              color={appColors.sectionHeadingBg.target}
            />
          </div>
          <div className="flex ml-5">
            <div className="card w-full">
              <form className="p-fluid">
                <div className="field">
                  <label
                    htmlFor="score"
                    className="p-col-fixed"
                    style={{ width: "200px" }}
                  >
                    Score
                  </label>

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
                    style={{ width: "30rem" }}
                    value={selectedTarget.score}
                    onValueChange={(e) =>
                      (selectedTarget.score = e.target.value)
                    }
                  />

                </div>

                <div className="field">
                  <label
                    htmlFor="htsfeasibility"
                    className="p-col-fixed"
                    style={{ width: "200px" }}
                  >
                    HTS Feasibility
                  </label>

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
                    style={{ width: "30rem" }}
                    value={selectedTarget.htsFeasibility}
                    onValueChange={(e) =>
                      (selectedTarget.htsFeasibility = e.target.value)
                    }
                  />

                </div>

                <div className="field">
                  <label
                    htmlFor="sbdfeasibility"
                    className="p-col-fixed"
                    style={{ width: "200px" }}
                  >
                    SBD Feasibility
                  </label>

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
                    style={{ width: "30rem" }}
                    value={selectedTarget.sbdFeasibility}
                    onValueChange={(e) =>
                      (selectedTarget.sbdFeasibility = e.target.value)
                    }
                  />

                </div>

                <div className="field">
                  <label
                    htmlFor="progressibility"
                    className="p-col-fixed"
                    style={{ width: "200px" }}
                  >
                    Progressibility
                  </label>

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
                    style={{ width: "30rem" }}
                    value={selectedTarget.progressibility}
                    onValueChange={(e) =>
                      (selectedTarget.progressibility = e.target.value)
                    }
                  />

                </div>

                <div className="field">
                  <label
                    htmlFor="safety"
                    className="p-col-fixed"
                    style={{ width: "200px" }}
                  >
                    Safety
                  </label>

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
                    style={{ width: "30rem" }}
                    value={selectedTarget.safety}
                    onValueChange={(e) =>
                      (selectedTarget.safety = e.target.value)
                    }
                  />

                </div>

                <div className="field">
                  <Button
                    label="Save changes"
                    className="p-button-secondary"
                    style={{ width: "20rem" }}
                    loading={displayLoading}
                    icon="pi pi-check"
                    onClick={() => editTargetAdmin()}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </React.Fragment >
    );
  }
  return <NotFound />;
};

export default observer(TargetEdit);
