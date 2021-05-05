import React, { useState, useRef, useEffect, useContext } from "react";
import { TabView, TabPanel } from "primereact/tabview";
import { BreadCrumb } from "primereact/breadcrumb";
import { Menu } from "primereact/menu";
import { confirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";
import { observer } from "mobx-react-lite";
import GenomeViewNonPublicData from "./GenomeViewNonPublicData/GenomeViewNonPublicData";
import GenomeViewBackgroundInformation from "./GenomeViewBackgroundInformation/GenomeViewBackgroundInformation";
import { RootStoreContext } from "../../../app/stores/rootStore";
import Loading from "../../../app/layout/Loading/Loading";
import GeneViewMycobrowswer from "./GeneViewMycobrowswer/GeneViewMycobrowswer";
import NotFound from "../../../app/layout/NotFound/NotFound";

const GeneView = ({ match, history }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const toast = useRef(null);

  /* MobX Store */
  const rootStore = useContext(RootStoreContext);
  const { fetchGene, gene, displayLoading } = rootStore.geneStore;

  useEffect(() => {
    console.log("EFFECT");
    console.log(match.params.id);
    if (gene === null || gene.id !== match.params.id) {
      fetchGene(match.params.id);
    }
  }, [match.params.id, gene, fetchGene]);

  

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

  /** Loading Overlay */
  if (displayLoading) {
    console.log("Loading.....");
    return <Loading />;
  }
  if (gene !== null) {
    console.log("Gene ID");
    console.log(gene.id);
    const breadCrumbItems = [
      {
        label: "Genes",
        command: () => {
          history.push("/gene/");
        },
      },
      { label: gene.accessionNumber },
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
                <h2 className="heading">{gene.accessionNumber}</h2>
              </div>
              <div className="p-mb-2">
                <TabView
                  activeIndex={activeIndex}
                  onTabChange={(e) => setActiveIndex(e.index)}
                >
                  <TabPanel header="Header I" headerClassName="hide">
                    <GeneViewMycobrowswer
                      id={match.params.id}
                      gene={gene}
                    />
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
  }

  return <NotFound />;
};

export default observer(GeneView);
