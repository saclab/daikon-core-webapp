import React, { useContext, useState } from "react";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { Card } from "primereact/card";
import { RadioButton } from "primereact/radiobutton";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { RootStoreContext } from "../../../../app/stores/rootStore";
import { Inplace, InplaceDisplay, InplaceContent } from "primereact/inplace";
import { InputText } from "primereact/inputtext";
import _ from "lodash";
import { toast } from "react-toastify";
import EmbededHelp from "../../../../app/common/EmbededHelp/EmbededHelp";
import { ProgressBar } from "primereact/progressbar";

const GenePromoteTargetSelectionWindow = ({
  displayPromotionDialog,
  setDisplayPromotionDialog,
}) => {

  const navigate = useNavigate();
  const [activeScreen, setActiveScreen] = useState(
    "screenProteinTypeSelection"
  );
  const [proteinType, setProteinType] = useState("");
  const [proposedTargetName, setProposedTargetName] = useState("");
  const [callValidateTargetName, setCallValidateTargetName] = useState(false);
  const [disableContinue, setDisableContinue] = useState(false);

  const [calledSearchGeneGroup, setCalledSearchGeneGroup] = useState(false);
  const [selectedProteinComplexName, setSelectedProteinComplexName] =
    useState(null);
  const [selectedProteinComplexIds, setSelectedProteinComplexIds] = useState(
    []
  );

  /* MobX Store */
  const rootStore = useContext(RootStoreContext);
  const {
    gene,
    validateTargetName,
    validateTargetNameLoading,
    proposedTargetNameValidated,
    saveGenePromotionDataObj,
    // genePromotionDataObj,
    searchingGeneGroup,
    searchedGeneGroup,
    searchGeneGroup,
  } = rootStore.geneStore;

  let onExit = () => {
    setDisplayPromotionDialog(false);
    setActiveScreen("screenProteinTypeSelection");
    setProteinType("");
    setProposedTargetName("");
    setCallValidateTargetName(false);
    setDisableContinue(false);
    setCalledSearchGeneGroup(false);
    setSelectedProteinComplexName(null);
    setSelectedProteinComplexIds([]);
  };

  const renderDisplayPromotionDialogFooter = () => {
    return (
      <div>
        <Button
          label="Cancel"
          icon="pi pi-times"
          onClick={() => onExit()}
          className="p-button-text"
        />
        <Button
          label="Continue"
          icon="pi pi-check"
          onClick={() => screenSelectionClicked()}
          autoFocus
          disabled={disableContinue}
          loading={validateTargetNameLoading}
        />
      </div>
    );
  };

  let screenSelectionClicked = () => {
    console.log("Active Screen is " + activeScreen);
    if (activeScreen === "screenProteinTypeSelection") {
      if (proteinType === "simple-protein") {
        setProposedTargetName(_.upperFirst(gene.geneName));
        setActiveScreen("screenProposeSimpleProteinTargetName");
      }

      if (proteinType === "protein-complex")
        setActiveScreen("screenSelectProteinComplexTarget");
    }

    if (activeScreen === "screenProposeSimpleProteinTargetName") {
      if (proposedTargetName === "") {
        toast.error("Invalid Protein Name");
        setDisableContinue(true);
        return;
      } else {
        setCallValidateTargetName(true);
        setActiveScreen("screenValidateSimpleProteinTargetName");
      }
    }

    if (activeScreen === "screenSelectProteinComplexTarget") {
      if (selectedProteinComplexName === null) {
        toast.error("Invalid Protein Name");
        setDisableContinue(true);
        return;
      } else {
        setCallValidateTargetName(true);
        setActiveScreen("screenValidateProteinComplex");
      }
    }
  };

  let screenProteinTypeSelection = () => (
    <React.Fragment>
      <EmbededHelp>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </EmbededHelp>

      <h2> Promote as</h2>

      <Card subTitle={"Protein"}>
        <div className="field-radiobutton">
          <table>
            <tr>
              <td>
                <RadioButton
                  inputId="city4"
                  name="city"
                  value="simple-protein"
                  checked={proteinType === "simple-protein"}
                  onChange={(e) => setProteinType(e.value)}
                  style={{ marginRight: "10px" }}
                />
              </td>
              <td>
                Simple Proteins are large biomolecules and macromolecules that
                comprise one or more long chains of amino acid residues.
              </td>
            </tr>
          </table>
        </div>
      </Card>

      <br />
      <Card subTitle={"Protein Complex"}>
        {" "}
        <div className="field-radiobutton">
          <table>
            <tr>
              <td>
                <RadioButton
                  inputId="city4"
                  name="city"
                  value="protein-complex"
                  checked={proteinType === "protein-complex"}
                  onChange={(e) => setProteinType(e.value)}
                  style={{ marginRight: "10px" }}
                />
              </td>
              <td>
                A protein complex or multiprotein complex is a group of two or
                more associated polypeptide chains. Protein complexes are
                distinct from multienzyme complexes, in which multiple catalytic
                domains are found in a single polypeptide chain
              </td>
            </tr>
          </table>
        </div>
      </Card>
    </React.Fragment>
  );

  let screenProposeSimpleProteinTargetName = () => (
    <React.Fragment>
      <EmbededHelp>
        <h4>Nomenclature</h4>
        <p>
          Consistent protein nomenclature is indispensable for communication,
          literature searching and entry retrieval. A good protein name is one
          which is unique, unambiguous, can be attributed to orthologs from
          other species and follows official gene nomenclature where applicable.
          Please adhere to the{" "}
          <a
            href="https://www.ncbi.nlm.nih.gov/genome/doc/internatprot_nomenguide"
            target="_blank" rel="noreferrer"
          >
            International Protein Nomenclature Guidelines.
          </a>
        </p>
      </EmbededHelp>

      <h4>
        Proposed Protein Name{" "}
        <span style={{ color: "#696969", fontSize: "smaller" }}>
          (Click to edit)
        </span>
      </h4>

      <Inplace closable onOpen={() => setDisableContinue(false)}>
        <InplaceDisplay>{proposedTargetName || "Click to Edit"}</InplaceDisplay>
        <InplaceContent>
          <InputText
            value={proposedTargetName}
            onChange={(e) => setProposedTargetName(e.target.value)}
            autoFocus
          />
        </InplaceContent>
      </Inplace>
    </React.Fragment>
  );

  let onSelectProteinComplex = (e) => {
    setSelectedProteinComplexIds(e.value);
    setSelectedProteinComplexName(e.target.name);
    setCallValidateTargetName(false);
  };

  let screenSelectProteinComplexTarget = () => {
    if (!calledSearchGeneGroup) {
      setCalledSearchGeneGroup(true);
      searchGeneGroup(gene.id);
    }

    if (!searchingGeneGroup && calledSearchGeneGroup) {
      console.log(searchedGeneGroup);

      if (searchedGeneGroup?.length === 0) {
        return (
          <p>
            There are no Gene Groups associated with {gene.accessionNumber}.
            <br /> Please contact admin.
          </p>
        );
      } else {
        let options = searchedGeneGroup.map((geneGroup) => {
          let accessionNos = [
            ...geneGroup.genes.map((gene) => gene.accessionNumber),
          ];
          let geneIds = [
            ...geneGroup.genes.map((gene) => {
              return { GeneId: gene.geneId };
            }),
          ];
          return (
            <div className="field-radiobutton" style={{ marginTop: "10px" }}>
              <RadioButton
                id={geneGroup.name}
                inputId={geneGroup.name}
                name={geneGroup.name}
                value={geneIds}
                checked={selectedProteinComplexName === geneGroup.name}
                onChange={(e) => onSelectProteinComplex(e)}
                style={{ marginRight: "10px" }}
              />
              <label htmlFor={geneGroup.name}>
                {geneGroup.name} [{accessionNos.join(", ")}]
              </label>
            </div>
          );
        });
        return (
          <Card>
            <p>Select a protein complex.</p>
            {options}
          </Card>
        );
      }
    }

    return <p>Tetst</p>;
  };

  let screenValidateSimpleProteinTargetName = () => {
    console.log("Rendering screenValidateSimpleProteinTargetName");

    if (!validateTargetNameLoading && callValidateTargetName) {
      setCallValidateTargetName(false);
      validateTargetName(proposedTargetName);
    }

    if (validateTargetNameLoading) {
      return <ProgressBar mode="indeterminate" style={{ height: "6px" }} />;
    }
    if (!validateTargetNameLoading) {
      if (proposedTargetNameValidated === "Valid") {
        saveGenePromotionDataObj({
          targetName: proposedTargetName,
          targetType: "simple-protein",
          genePromtionRequestGenes: [{ GeneId: gene.id }],
        });

        navigate(`/d/gene/promote/${proposedTargetName}`);
      }
      if (proposedTargetNameValidated === "PromotionRequestExists") {
        if (disableContinue === false) setDisableContinue(true);
        return (
          <React.Fragment>
            <h2>
              <i className="pi pi-exclamation-triangle" /> Promotion Request
              Exists
            </h2>
            <p>
              A promost request is pending for {proposedTargetName}. Please
              contact an administrator for further details
            </p>
          </React.Fragment>
        );
      }
      if (proposedTargetNameValidated === "TargetExists") {
        if (disableContinue === false) setDisableContinue(true);
        return (
          <React.Fragment>
            <h2>The Target already exists</h2>
            <p>
              Target {proposedTargetName} is already promoted. Please view it in
              the Target's section.
            </p>
          </React.Fragment>
        );
      }
    }
  };

  let screenValidateProteinComplex = () => {
    console.log("Rendering screenValidateProteinComplex");

    if (!validateTargetNameLoading && callValidateTargetName) {
      setCallValidateTargetName(false);
      validateTargetName(selectedProteinComplexName);
    }

    if (validateTargetNameLoading) {
      return <ProgressBar mode="indeterminate" style={{ height: "6px" }} />;
    }
    if (!validateTargetNameLoading) {
      if (proposedTargetNameValidated === "Valid") {
        saveGenePromotionDataObj({
          targetName: selectedProteinComplexName,
          targetType: "protein-complex",
          genePromtionRequestGenes: selectedProteinComplexIds,
        });

        navigate(`/d/gene/promote/${selectedProteinComplexName}`);
      }
      if (proposedTargetNameValidated === "PromotionRequestExists") {
        if (disableContinue === false) setDisableContinue(true);
        return (
          <React.Fragment>
            <h2>
              <i className="pi pi-exclamation-triangle" /> Promotion Request
              Exists
            </h2>
            <p>
              A promost request is pending for {proposedTargetName}. Please
              contact an administrator for further details
            </p>
          </React.Fragment>
        );
      }
      if (proposedTargetNameValidated === "TargetExists") {
        if (disableContinue === false) setDisableContinue(true);
        return (
          <React.Fragment>
            <h2>The Target already exists</h2>
            <p>
              Target {selectedProteinComplexName} is already promoted. Please
              view it in the Target's section.
            </p>
          </React.Fragment>
        );
      }
    }
  };

  return (
    <Dialog
      header={`Identify this as a new Target`}
      visible={displayPromotionDialog}
      style={{ width: "50vw" }}
      footer={renderDisplayPromotionDialogFooter()}
      onHide={() => setDisplayPromotionDialog(false)}
    >
      {activeScreen === "screenProteinTypeSelection"
        ? screenProteinTypeSelection()
        : ""}
      {activeScreen === "screenProposeSimpleProteinTargetName"
        ? screenProposeSimpleProteinTargetName()
        : ""}
      {activeScreen === "screenValidateSimpleProteinTargetName"
        ? screenValidateSimpleProteinTargetName()
        : ""}
      {activeScreen === "screenSelectProteinComplexTarget"
        ? screenSelectProteinComplexTarget()
        : ""}
      {activeScreen === "screenValidateProteinComplex"
        ? screenValidateProteinComplex()
        : ""}

      {/* {proteinType !== "" ? <FailedLoading /> : ""} */}
    </Dialog>
  );
};

export default observer(GenePromoteTargetSelectionWindow);
