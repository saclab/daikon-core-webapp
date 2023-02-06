import { observer } from "mobx-react-lite";
import { Menu } from "primereact/menu";
import { Sidebar } from "primereact/sidebar";
import { Toast } from "primereact/toast";
import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Navigate,
  Route,
  Routes,
  useNavigate,
  useParams,
} from "react-router-dom";
import EmbededHelp from "../../../app/common/EmbededHelp/EmbededHelp";
import Loading from "../../../app/layout/Loading/Loading";
import NotFound from "../../../app/layout/NotFound/NotFound";
import { RootStoreContext } from "../../../app/stores/rootStore";
import TargetCompass from "./TargetCompass/TargetCompass";
import TargetDiscussion from "./TargetDiscussion/TargetDiscussion";
import TargetEdit from "./TargetEdit/TargetEdit";
import TargetPromotionForm from "./TargetPromotionForm/TargetPromotionForm";
import TargetPromotionFormEdit from "./TargetPromotionForm/TargetPromotionFormEdit/TargetPromotionFormEdit";
import TargetScorecard from "./TargetScorecard/TargetScorecard";
import TargetScreenPromotionQuestionaire from "./TargetScreenPromotionQuestionaire/TargetScreenPromotionQuestionaire";

const TargetView = () => {
  const params = useParams();
  const navigate = useNavigate();

  const toast = useRef(null);

  /* MobX Store */
  const rootStore = useContext(RootStoreContext);
  const { fetchTarget, target, displayLoading } = rootStore.targetStore;
  const { user } = rootStore.userStore;

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
            navigate("scorecard/");
          },
        },
        {
          label: "Compass",
          icon: "icon icon-common icon-compass",
          command: () => {
            navigate("compass/");
          },
        },
        {
          label: "Promotion Info",
          icon: "icon icon-common icon-info",
          command: () => {
            navigate("promotion-info/");
          },
        },
        {
          label: "Discussion",
          icon: "ri-discuss-line",
          command: () => {
            navigate("discussion/");
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
            navigate("/d/screen/target-based/" + target.name);
          },
        },
      ],
    },
  ];

  if (user.roles.includes("admin")) {
    const adminActions = {
      label: "Admin Section",
      items: [
        {
          label: "Impact Values",
          icon: "icon icon-common icon-bolt",
          command: () => {
            navigate("edit/");
          },
        },
      ],
    };
    items.push(adminActions);
  }

  /** Loading Overlay */
  if (displayLoading) {
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
          onHide={() => setDisplayPromotionDialog(false)}
        >
          <div className="flex flex-column gap-3 pl-3  w-full">
            <div className="flex">
              <h2>
                <i className="icon icon-common icon-plus-circle"></i> Add a new
                Screen | {target.name}
              </h2>
            </div>
            <div className="flex">
              <EmbededHelp>
                This would create a new screening series. If you are intending
                to add screening information to an existing screening set please
                add it via the screening tab.
              </EmbededHelp>
            </div>
            <div className="flex w-full">
              <TargetScreenPromotionQuestionaire
                closeSidebar={() => setDisplayPromotionDialog(false)}
              />
            </div>
          </div>
        </Sidebar>

        <div className="flex gap-2 w-full">
          <div className="flex">
            <Menu model={items} />
          </div>
          <div className="flex w-full">
            <Routes>
              <Route index element={<Navigate replace to="scorecard/" />} />
              <Route
                path="scorecard/"
                element={
                  <TargetScorecard
                    data={target.targetScorecard.targetScoreCardValues}
                  />
                }
              />
              <Route path="compass/" element={<TargetCompass />} />
              <Route
                path="promotion-info/edit"
                element={
                  <TargetPromotionFormEdit
                    data={target.targetScorecard.targetScoreCardValues}
                    selectedTarget={target}
                  />
                }
              />
              <Route
                path="promotion-info/"
                element={
                  <TargetPromotionForm
                    data={target.targetScorecard.targetScoreCardValues}
                    selectedTarget={target}
                  />
                }
              />

              <Route
                path="discussion/"
                element={<TargetDiscussion selectedTarget={target} />}
              />
              <Route path="edit/" element={<TargetEdit id={params.id} />} />
            </Routes>
          </div>
        </div>
      </React.Fragment>
    );
  }

  return <NotFound />;
};

export default observer(TargetView);
