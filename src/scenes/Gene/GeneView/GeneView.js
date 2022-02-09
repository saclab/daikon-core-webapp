import React, { useState, useRef, useEffect, useContext } from "react";
import { TabView, TabPanel } from "primereact/tabview";
import { BreadCrumb } from "primereact/breadcrumb";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { RadioButton } from "primereact/radiobutton";
import { SelectButton } from "primereact/selectbutton";
import { Menu } from "primereact/menu";
import { confirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";
import { observer } from "mobx-react-lite";
import GenomeViewNonPublicData from "./GenomeViewNonPublicData/GenomeViewNonPublicData";
import { RootStoreContext } from "../../../app/stores/rootStore";
import Loading from "../../../app/layout/Loading/Loading";
import GeneViewPublicData from "./GeneViewPublicData/GeneViewPublicData";
import NotFound from "../../../app/layout/NotFound/NotFound";
import SectionHeading from "../../../app/common/SectionHeading/SectionHeading";
import Discussion from "../../../app/common/Discussion/Discussion";
import GenePromoteTargetSelectionWindow from "../GenomePromote/GenePromoteTargetSelectionWindow/GenePromoteTargetSelectionWindow";

const GeneView = ({ match, history }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [displayPromotionDialog, setDisplayPromotionDialog] = useState(false);

  const toast = useRef(null);

  /* MobX Store */
  const rootStore = useContext(RootStoreContext);
  const {
    fetchGene,
    gene,
    displayLoading,
    editGene,
    cancelEditGene,
    fetchGeneHistory,
    historyDisplayLoading,
    geneHistory,
  } = rootStore.geneStore;

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
          label: "Public Data",
          icon: "ri-book-open-line",
          command: () => {
            setActiveIndex(0);
          },
        },

        {
          label: "TBDA Data",
          icon: "ri-git-repository-private-fill",
          command: () => {
            setActiveIndex(1);
          },
        },

        {
          label: "Discussion",
          icon: "ri-discuss-line",
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
            setDisplayPromotionDialog(true);
          },
        },
      ],
    },
  ];

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
        <div>
          <Toast ref={toast} />
          <br />
          <div className="p-d-flex">
            <div className="p-mr-2">
              <Menu model={items} />
            </div>
            <div className="p-mr-2" style={{ width: "100vw" }}>
              <div className="p-d-flex p-flex-column">
                <div className="p-mb-2">
                  <BreadCrumb model={breadCrumbItems} />
                </div>
                <div className="p-mb-2">
                  <SectionHeading
                    icon="icon icon-conceptual icon-dna"
                    heading={gene.accessionNumber}
                    accessionNumber={gene.accessionNumber}
                    displayHorizon={true}
                  />
                </div>
                <div className="p-mb-2">
                  <TabView
                    activeIndex={activeIndex}
                    onTabChange={(e) => setActiveIndex(e.index)}
                  >
                    <TabPanel header="Header I" headerClassName="hide">
                      <GeneViewPublicData
                        id={match.params.id}
                        gene={gene}
                        edit={() => editGene()}
                        cancelEdit={() => cancelEditGene()}
                        fetchGeneHistory={() => fetchGeneHistory()}
                        historyDisplayLoading={historyDisplayLoading}
                        geneHistory={geneHistory}
                      />
                    </TabPanel>

                    <TabPanel header="Header II" headerClassName="hide">
                      <GenomeViewNonPublicData
                        id={match.params.id}
                        gene={gene}
                        edit={() => editGene()}
                        cancelEdit={() => cancelEditGene()}
                        fetchGeneHistory={() => fetchGeneHistory()}
                        historyDisplayLoading={historyDisplayLoading}
                        geneHistory={geneHistory}
                      />
                    </TabPanel>

                    <TabPanel header="Discussion" headerClassName="hide">
                      <Discussion
                        reference={gene.accessionNumber}
                        section={"Gene"}
                      />
                    </TabPanel>
                  </TabView>
                </div>
              </div>
            </div>
          </div>
        </div>

        <GenePromoteTargetSelectionWindow
          setDisplayPromotionDialog={setDisplayPromotionDialog}
          displayPromotionDialog={displayPromotionDialog}
        />
      </React.Fragment>
    );
  }

  return <NotFound />;
};

export default observer(GeneView);
