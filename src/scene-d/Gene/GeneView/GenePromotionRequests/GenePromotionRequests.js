import { observer } from "mobx-react-lite";
import { BreadCrumb } from "primereact/breadcrumb";
import { Card } from 'primereact/card';
import { TabPanel, TabView } from "primereact/tabview";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import SectionHeading from "../../../../app/common/SectionHeading/SectionHeading";
import Unauthorized from '../../../../app/common/Unauthorized/Unauthorized';
import Loading from "../../../../app/layout/Loading/Loading";
import { RootStoreContext } from "../../../../app/stores/rootStore";
import GeneAdminPromotionRequest from "./GenePromotionRequest/GenePromotionRequest";
const GenePromotionRequests = () => {

  const navigate = useNavigate();
  const rootStore = useContext(RootStoreContext);
  const { fetchGenePromotionList, displayLoading, genePromotionRegistry } =
    rootStore.geneStoreAdmin;
  const geneStore = rootStore.geneStore;
  const { user } = rootStore.userStore;

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

  const [activeIndex, setActiveIndex] = useState(0);


  if (!user.roles.includes("admin")) {
    return <Unauthorized />
  }

  const breadCrumbItems = [
    {
      label: "Genes",
      command: () => {
        navigate("/d/gene/");
      },
    },
    {
      label: "Admin Section",
    },
    { label: "Gene Promotion Requests" },
  ];



  if (geneStore.displayLoading || displayLoading) {
    return <Loading />;
  }

  console.log(genePromotionRegistry.size);
  let tabs = [];

  if (genePromotionRegistry.size > 0) {

    genePromotionRegistry.forEach((value) => {
      console.log(value);
      let heading = value.targetName;
      tabs.push(
        <TabPanel header={heading} key={heading}>
          <div className="p-field p-grid">
            <GeneAdminPromotionRequest
              GenePromotionRequest={value}
              TargetName={value.targetName}
              AnswerRegistry={genePromotionRegistry}
              QuestionsRegistry={geneStore.promotionQuestionsRegistry}
              GeneRegistry={geneStore.geneRegistry}
            />
          </div>
        </TabPanel>
      );
    });
  }

  return (
    <React.Fragment>

      <div className="flex flex-column w-full">
        <div className="flex w-full pb-2">
          <BreadCrumb model={breadCrumbItems} />
        </div>
        <div className="flex w-full">
          <SectionHeading
            icon="icon icon-common icon-angle-double-up"
            color="#1ABC9C"
            heading={"Gene Promotion Requests"}
          />
        </div>
        <div className="flex w-full">
          {genePromotionRegistry.size === 0 ?
            <Card title="No Pending Requests">
              All pending requests are taken care of.
              To raise a new request promote a gene from the Genes section to a target by completing
              the questionaire.
            </Card>
            :
            <TabView
              activeIndex={activeIndex}
              onTabChange={(e) => setActiveIndex(e.index)}
            >
              {tabs}
            </TabView>}

        </div>

      </div>



    </React.Fragment>
  );
}


export default observer(GenePromotionRequests);
