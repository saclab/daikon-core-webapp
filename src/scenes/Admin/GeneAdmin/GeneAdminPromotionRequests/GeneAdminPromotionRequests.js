import React, { useEffect, useState, useContext } from "react";
import { observer } from "mobx-react-lite";
import { BreadCrumb } from "primereact/breadcrumb";
import { TabView, TabPanel } from "primereact/tabview";
import SectionHeading from "../../../../app/common/SectionHeading/SectionHeading";
import history from "../../../../history";
import { RootStoreContext } from "../../../../app/stores/rootStore";
import Loading from "../../../../app/layout/Loading/Loading";
import GeneAdminPromotionRequest from "./GeneAdminPromotionRequest/GeneAdminPromotionRequest";
const GeneAdminPromotionRequests = () => {
  const rootStore = useContext(RootStoreContext);

  const { fetchGenePromotionList, displayLoading, genePromotionRegistry } =
    rootStore.geneStoreAdmin;

  const geneStore = rootStore.geneStore;
  //promotionQuestionsDisplayLoading,
  //getPromotionQuestions,
  //promotionQuestionsRegistry,

  useEffect(() => {
    if (geneStore.genes.length === 0) {
      geneStore.fetchGeneList();
    }
    if (geneStore.promotionQuestionsRegistry.size === 0) {
      geneStore.getPromotionQuestions();
    }

    fetchGenePromotionList();
    return () => {
      //cleanup
    };
  }, [
    geneStore,
    genePromotionRegistry,
    fetchGenePromotionList,
    geneStore.genes,
    geneStore.fetchGeneList,
    geneStore.promotionQuestionsDisplayLoading,
    geneStore.getPromotionQuestions,
    geneStore.promotionQuestionsRegistry,
  ]);

  const breadCrumbItems = [
    {
      label: "Genes Admin",
      command: () => {
        history.push("/admin/gene/");
      },
    },
    { label: "Promotion Requests" },
  ];
  const [activeIndex, setActiveIndex] = useState(0);

  if (geneStore.displayLoading || displayLoading) {
    return <Loading />;
  }

  console.log(genePromotionRegistry.size);

  if (genePromotionRegistry.size === 0) {
    return <h2>No Requests</h2>;
  }

  if (genePromotionRegistry.size > 0) {
    let tabs = [];
    genePromotionRegistry.forEach((value) => {
      console.log(value);
      let heading = geneStore.geneRegistry.get(value.geneID).accessionNumber;
      tabs.push(
        <TabPanel header={heading} key={heading}>
          <div className="p-field p-grid">
            <GeneAdminPromotionRequest
              GeneID={value.geneID}
              AnswerRegistry={genePromotionRegistry}
              QuestionsRegistry={geneStore.promotionQuestionsRegistry}
            />
          </div>
        </TabPanel>
      );
    });

    return (
      <div>
        <div className="p-mb-2" style={{ minWidth: "1000px" }}>
          <BreadCrumb model={breadCrumbItems} />
        </div>
        <div className="p-mb-2">
          <SectionHeading
            icon="icon icon-conceptual icon-dna"
            color="#EE1E40"
            heading={"Requests to promote genes to targets"}
          />
        </div>
        <TabView
          activeIndex={activeIndex}
          onTabChange={(e) => setActiveIndex(e.index)}
        >
          {tabs}
        </TabView>
      </div>
    );
  }
};

export default observer(GeneAdminPromotionRequests);
