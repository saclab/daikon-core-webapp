import React, { useState, useRef, useEffect } from "react";
import { TabView, TabPanel } from "primereact/tabview";
import { BreadCrumb } from "primereact/breadcrumb";
import { Menu } from "primereact/menu";
import { confirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";
import "./TabViewDemo.css";
import GenomeViewMycobrowswer from "./GenomeViewMycobrowswer/GenomeViewMycobrowswer";
import GenomeViewNonPublicData from "./GenomeViewNonPublicData/GenomeViewNonPublicData";
import GenomeViewBackgroundInformation from "./GenomeViewBackgroundInformation/GenomeViewBackgroundInformation";

const GenomeView = ({ match, history }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const toast = useRef(null);

  // useEffect(() => {
  //   console.log(match.params.id);
  // }, [match.params.id]);

  const breadCrumbItems = [
    {
      label: "Genome",
      command: () => {
        history.push("/genomes");
      },
    },
    { label: "Rv1297" },
  ];

  const items = [
    {
      label: "Sections",
      items: [
        {
          label: "Mycobrowser Information",
          icon: "pi pi-refresh",
          command: () => {
            setActiveIndex(0);
          },
        },
        {
          label: "Non-Public Data",
          icon: "pi pi-times",
          command: () => {
            setActiveIndex(1);
          },
        },
        {
          label: "Background Information",
          icon: "pi pi-times",
          command: () => {
            setActiveIndex(2);
          },
        },
      ],
    },
    {
      label: "Actions",
      items: [
        {
          label: "Promote to Target",
          icon: "pi pi-external-link",
          command: (event) => {
            confirmPromoteTarget(event);
          },
        },
      ],
    },
  ];

  const confirmPromoteTarget = (event) => {
    confirmDialog({
      header: "Confirmation",
      message:
        "This would promote the current gene to a target. You will be asked to record more information on the next screen. Continue? ",
      icon: "pi pi-question-circle",
      accept,
      reject,
    });
  };

  const accept = () => {
    history.push(`/genomes/${match.params.id}/promote`);
  };

  const reject = () => {
    toast.current.show({
      severity: "info",
      summary: "Rejected",
      detail: "You have rejected",
      life: 3000,
    });
  };

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
              <h2 className="heading">Rv1297</h2>
            </div>
            <div className="p-mb-2">
              <TabView
                activeIndex={activeIndex}
                onTabChange={(e) => setActiveIndex(e.index)}
              >
                <TabPanel header="Header I" headerClassName="hide">
                  <GenomeViewMycobrowswer />
                </TabPanel>
                <TabPanel header="Header II" headerClassName="hide">
                  <GenomeViewNonPublicData />
                </TabPanel>
                <TabPanel header="Header III" headerClassName="hide">
                  <GenomeViewBackgroundInformation />
                </TabPanel>
              </TabView>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default GenomeView;
