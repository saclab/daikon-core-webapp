import React, { useState, useRef, useEffect, useContext } from "react";
import { Menu } from "primereact/menu";
import { Toast } from "primereact/toast";
import { observer } from "mobx-react-lite";
import GeneViewProtectedData from "./GeneViewProtectedData/GeneViewProtectedData";
import { RootStoreContext } from "../../../app/stores/rootStore";
import Loading from "../../../app/layout/Loading/Loading";
import GeneViewPublicData from "./GeneViewPublicData/GeneViewPublicData";
import NotFound from "../../../app/layout/NotFound/NotFound";
import Discussion from "../../../app/common/Discussion/Discussion";
import GenePromoteTargetSelectionWindow from "../GenomePromote/GenePromoteTargetSelectionWindow/GenePromoteTargetSelectionWindow";
import { Routes, Route, Navigate, useNavigate, useLocation, useParams } from "react-router-dom";
import GeneDiscusion from './GeneDiscussion/GeneDiscusion';

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

  useEffect(() => {
    console.log("EFFECT");
    console.log(params.id);
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

  /** Loading Overlay */
  if (displayLoading) {
    console.log("Loading.....");
    return <Loading />;
  }
  if (gene !== null) {
    console.log("Gene ID");
    console.log(gene.id);


    console.log(location.pathname)

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
              <Route path="public/" element={<GeneViewPublicData
                id={params.id}
                gene={gene}
                edit={() => editGene()}
                cancelEdit={() => cancelEditGene()}
                fetchGeneHistory={() => fetchGeneHistory()}
                historyDisplayLoading={historyDisplayLoading}
                geneHistory={geneHistory}
              />} />

              <Route path="protected" element={<GeneViewProtectedData
                id={params.id}
                gene={gene}
                edit={() => editGene()}
                cancelEdit={() => cancelEditGene()}
                fetchGeneHistory={() => fetchGeneHistory()}
                historyDisplayLoading={historyDisplayLoading}
                geneHistory={geneHistory}
              />} />

              <Route path="discussion" element={<GeneDiscusion
                gene={gene}
              />} />
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
