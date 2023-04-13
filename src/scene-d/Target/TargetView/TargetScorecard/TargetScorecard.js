import React, { useContext, useEffect, useRef } from "react";
//import _ from "lodash";
import { observer } from "mobx-react-lite";
import { BreadCrumb } from "primereact/breadcrumb";
import { Fieldset } from "primereact/fieldset";
import { Toast } from "primereact/toast";
import { useNavigate } from "react-router-dom";
import SectionHeading from "../../../../app/common/SectionHeading/SectionHeading";
import Loading from "../../../../app/layout/Loading/Loading";
import { RootStoreContext } from "../../../../app/stores/rootStore";
import { appColors } from "../../../../colors";
import TargetGrid from "./TargetGrid/TargetGrid";

const TargetScorecard = () => {
  const toast = useRef(null);

  const rootStore = useContext(RootStoreContext);
  const {
    selectedTarget,
    questionsLoading,
    questionsRegistry,
    fetchQuestions,
  } = rootStore.targetStore;

  // const [state, setstate] = useState(initialState);
  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  const navigate = useNavigate();

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
      },
    },
    { label: "Scorecard" },
  ];

  if (questionsLoading) {
    return <Loading />;
  }

  return (
    <React.Fragment>
      <Toast ref={toast} />
      <div className="flex flex-column w-full">
        <div className="flex w-full pb-2">
          <BreadCrumb model={breadCrumbItems} />
        </div>

        <div className="flex w-full">
          <SectionHeading
            icon="icon icon-common icon-target"
            heading={selectedTarget.name}
            strainName={selectedTarget?.strain?.name}
            targetName={selectedTarget.name}
            displayHorizon={true}
            color={appColors.sectionHeadingBg.target}
          />
        </div>

        <div className="flex flex-column gap-3 w-full">
          <div className="flex w-full">
            <Fieldset legend="Overview">
              <h3>
                <i className="ri-blaze-line"></i> Rank :{" "}
                <b>{selectedTarget.rank}</b>
              </h3>
              <div style={{ inlineSize: "900px", overflowWrap: "break-word" }}>
                <h4>
                  <i className="icon icon-conceptual icon-proteins"></i>{" "}
                  Associated Genes :{" "}
                  {selectedTarget.targetGenesAccesionNumbers.join(", ")}
                </h4>
              </div>
            </Fieldset>
          </div>

          <div className="flex w-full">
            <Fieldset legend="Scorecard">
              <TargetGrid
                questions={questionsRegistry}
                target={selectedTarget}
              />
            </Fieldset>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default observer(TargetScorecard);
