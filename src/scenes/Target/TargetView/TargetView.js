import React, { useState, useEffect, useRef, useContext } from "react";
import { Menu } from "primereact/menu";
import { Sidebar } from "primereact/sidebar";
import { Message } from "primereact/message";
import { Routes, Route, Navigate, useNavigate, useParams } from "react-router-dom";
import TargetPromotionForm from "./TargetPromotionForm/TargetPromotionForm";
import TargetScorecard from "./TargetScorecard/TargetScorecard";
import { RootStoreContext } from "../../../app/stores/rootStore";
import { Toast } from "primereact/toast";
import NotFound from "../../../app/layout/NotFound/NotFound";
import Loading from "../../../app/layout/Loading/Loading";
import { observer } from "mobx-react-lite";
import TargetScreenPromotionQuestionaire from "./TargetScreenPromotionQuestionaire/TargetScreenPromotionQuestionaire";
import TargetSummary from "./TargetSummary/TargetSummary";

const TargetView = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [activeIndex, setActiveIndex] = useState(0);
  const toast = useRef(null);

  /* MobX Store */
  const rootStore = useContext(RootStoreContext);
  const { fetchTarget, target, displayLoading } = rootStore.targetStore;

  useEffect(() => {
    if (target === null || target.id !== params.id) {
      fetchTarget(params.id);
    }
  }, [params.id, target, fetchTarget]);

  const [displayPromotionDialog, setDisplayPromotionDialog] = useState(false);

  const items = [
    {
      label: "Sections",
      items: [
        {
          label: "Scorecard",
          icon: "icon icon-common icon-flag-checkered",
          command: () => {
            navigate('scorecard/');
          },
        },
        {
          label: "Summary",
          icon: "icon icon-common icon-compass",
          command: () => {
            navigate('summary/');
          },
        },
        {
          label: "Promotion Info",
          icon: "pi pi-table",
          command: () => {
            navigate('promotion-info/');
          },
        },
        {
          label: "Discussion",
          icon: "ri-discuss-line",
          command: () => {
            navigate('discussion/');
          },
        },
      ],
    },
    {
      label: "Actions",
      items: [
        {
          label: "Add a Screen",
          icon: "icon icon-common icon-database-submit",
          command: (event) => {
            setDisplayPromotionDialog(true);
          },
        },
        {
          label: "View Screens",
          icon: "pi pi-external-link",
          command: (event) => {
            navigate("/d/screen/" + target.name);
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
  if (target !== null) {
   
    return (
      <React.Fragment>
        <Toast ref={toast} />
        <Sidebar
          visible={displayPromotionDialog}
          position="right"
          style={{ width: "30em", overflowX: "auto" }}
          blockScroll={true}
          onHide={() => setDisplayPromotionDialog(false)}
        >
          <h3>{target.name}</h3>
          <i className="icon icon-common icon-plus-circle"></i> &nbsp; Add a{" "}
          <b>New</b> Screen
          <hr />
          <Message
            severity="info"
            text={
              "This would create a new screening series. If you are intending to add screening information to an existing screening set please add it via the screening tab."
            }
          />
          <br />
          <br />
          <TargetScreenPromotionQuestionaire
            closeSidebar={() => setDisplayPromotionDialog(false)}
          />
        </Sidebar>
        <br />


        <div className="flex gap-2 w-full">
          <div className="flex">
            <Menu model={items} />
          </div>
          <div className="flex w-full">
            <Routes>
              <Route index element={<Navigate replace to="scorecard/" />} />
              <Route path="scorecard/" element={<TargetScorecard
                data={target.targetScorecard.targetScoreCardValues}
              />} />
              <Route path="summary/" element={<TargetSummary />} />
              <Route path="promotion-info/" element={<TargetPromotionForm
                data={target.targetScorecard.targetScoreCardValues}
              />} />
              <Route path="discussion/" element={<TargetScorecard
                data={target.targetScorecard.targetScoreCardValues}
              />} />


            </Routes>
          </div>
        </div>
      </React.Fragment>
    );
  }

  return <NotFound />;
};

export default observer(TargetView);
