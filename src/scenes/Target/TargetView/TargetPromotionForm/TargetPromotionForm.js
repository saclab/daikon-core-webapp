import React, { useState } from "react";
import { Accordion, AccordionTab } from "primereact/accordion";
import KeyValList from "../../../../app/common/KeyValList/KeyValList";
import { Button } from "primereact/button";

const TargetPromotionForm = ({
  id,
  target,
  edit,
  cancelEdit,
  fetchHistory,
  historyDisplayLoading,
  history,
}) => {
  const [activeIndex, setActiveIndex] = useState([0]);

  console.log("From target Promotion Form");
  console.log(target);
  let openAll = () => {
    console.log(activeIndex);
    setActiveIndex([0, 1, 2, 3, 4, 5, 6]);
  };
  return (
    <div className="p-d-flex p-flex-column" style={{ minWidth: "900px" }}>
      <div className="p-mb-2 p-as-end">
        <Button
          label="Expand All"
          icon="pi pi-plus"
          onClick={openAll}
          className="p-button-text p-button-plain"
        />
      </div>
      <div className="p-mb-2">
        <Accordion
          multiple
          activeIndex={activeIndex}
          onTabChange={(e) => setActiveIndex(e.index)}
        >
          <AccordionTab header="Target">
            <KeyValList
              data={target.targetPromotionForm.target}
              editFunc={() => edit()}
              cancelEdit={() => cancelEdit()}
              fetchHistory={() => fetchHistory()}
              historyDisplayLoading={historyDisplayLoading}
              history={history}
            />
          </AccordionTab>
          <AccordionTab header="Impact of chemical inhibition">
            <KeyValList
              data={target.targetPromotionForm.impactOfChemicalInhibition}
              editFunc={() => edit()}
              cancelEdit={() => cancelEdit()}
              fetchHistory={() => fetchHistory()}
              historyDisplayLoading={historyDisplayLoading}
              history={history}
            />
          </AccordionTab>
          <AccordionTab header="Chemical inhibition">
            <KeyValList
              data={target.targetPromotionForm.chemicalInhibition}
              editFunc={() => edit()}
              cancelEdit={() => cancelEdit()}
              fetchHistory={() => fetchHistory()}
              historyDisplayLoading={historyDisplayLoading}
              history={history}
            />
          </AccordionTab>
          <AccordionTab header="Impact of genetic inhibition">
            <KeyValList
              data={target.targetPromotionForm.impactOfGeneticInhibition}
              editFunc={() => edit()}
              cancelEdit={() => cancelEdit()}
              fetchHistory={() => fetchHistory()}
              historyDisplayLoading={historyDisplayLoading}
              history={history}
            />
          </AccordionTab>
          <AccordionTab header="Liabilities">
            <KeyValList
              data={target.targetPromotionForm.liabilities}
              editFunc={() => edit()}
              cancelEdit={() => cancelEdit()}
              fetchHistory={() => fetchHistory()}
              historyDisplayLoading={historyDisplayLoading}
              history={history}
            />
          </AccordionTab>
          <AccordionTab header="Tractability">
            <KeyValList
              data={target.targetPromotionForm.tractability}
              editFunc={() => edit()}
              cancelEdit={() => cancelEdit()}
              fetchHistory={() => fetchHistory()}
              historyDisplayLoading={historyDisplayLoading}
              history={history}
            />
          </AccordionTab>
          <AccordionTab header="Interactions">
            <KeyValList
              data={target.targetPromotionForm.interactions}
              editFunc={() => edit()}
              cancelEdit={() => cancelEdit()}
              fetchHistory={() => fetchHistory()}
              historyDisplayLoading={historyDisplayLoading}
              history={history}
            />
          </AccordionTab>
        </Accordion>
      </div>
    </div>
  );
};

export default TargetPromotionForm;
