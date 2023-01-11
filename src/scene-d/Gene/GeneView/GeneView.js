import { observer } from "mobx-react-lite";
import { Menu } from "primereact/menu";
import { Toast } from "primereact/toast";
import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import Loading from "../../../app/layout/Loading/Loading";
import NotFound from "../../../app/layout/NotFound/NotFound";
import { RootStoreContext } from "../../../app/stores/rootStore";
import GenePromoteTargetSelectionWindow from "../GenePromote/GenePromoteTargetSelectionWindow/GenePromoteTargetSelectionWindow";
import GeneDiscusion from "./GeneDiscussion/GeneDiscusion";
import GeneViewProtectedData from "./GeneViewProtectedData/GeneViewProtectedData";
import GeneViewPublicData from "./GeneViewPublicData/GeneViewPublicData";

const GeneView = () => {
  const params = useParams();
  const navigate = useNavigate();

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
  const { user } = rootStore.userStore;

  useEffect(() => {
    if (gene === null || gene.id !== params.id) {
      fetchGene(params.id);
    }
  }, [params.id, gene, fetchGene]);

  const location = useLocation();

  const items = [
    {
      label: "Sections",
      items: [
        {
          label: "Public Data",
          icon: "ri-book-open-line",
          command: () => {
            navigate(`public/`);
          },
        },

        {
          label: "TBDA Data",
          icon: "ri-git-repository-private-fill",
          command: () => {
            navigate(`protected/`);
          },
        },

        {
          label: "Discussion",
          icon: "ri-discuss-line",
          command: () => {
            navigate(`discussion/`);
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

  if (user.roles.includes("admin")) {
    const adminActions = {
      label: "Admin Section",
      items: [
        {
          label: "Gene Groups",
          icon: "icon icon-common icon-object-group",
          command: (event) => {
            navigate(`/d/gene/gene-group`);
          },
        },
        {
          label: "Promotion Requests",
          icon: "icon icon-common icon-angle-double-up",
          command: (event) => {
            navigate(`/d/gene/gene-promotion-requests`);
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
  if (gene !== null) {
    return (
      <React.Fragment>
        <Toast ref={toast} />

        <div className="flex gap-2 w-full">
          <div className="flex">
            <Menu model={items} />
          </div>

          <div className="flex w-full">
            <Routes>
              <Route index element={<Navigate replace to="public/" />} />
              <Route
                path="public/"
                element={
                  <GeneViewPublicData
                    id={params.id}
                    gene={gene}
                    edit={() => editGene()}
                    cancelEdit={() => cancelEditGene()}
                    fetchGeneHistory={() => fetchGeneHistory()}
                    historyDisplayLoading={historyDisplayLoading}
                    geneHistory={geneHistory}
                  />
                }
              />

              <Route
                path="protected"
                element={
                  <GeneViewProtectedData
                    id={params.id}
                    gene={gene}
                    edit={() => editGene()}
                    cancelEdit={() => cancelEditGene()}
                    fetchGeneHistory={() => fetchGeneHistory()}
                    historyDisplayLoading={historyDisplayLoading}
                    geneHistory={geneHistory}
                  />
                }
              />

              <Route
                path="discussion"
                element={<GeneDiscusion gene={gene} />}
              />
            </Routes>
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
