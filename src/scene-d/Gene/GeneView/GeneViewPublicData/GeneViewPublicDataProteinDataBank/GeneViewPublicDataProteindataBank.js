import { observer } from "mobx-react-lite";
import { Dialog } from "primereact/dialog";
import { Skeleton } from "primereact/skeleton";
import { SplitButton } from "primereact/splitbutton";
import React, { useContext, useEffect, useState } from "react";
import LiteMolView from "../../../../../app/common/LiteMolView/LiteMolView";
import { RootStoreContext } from "../../../../../app/stores/rootStore";

const GeneViewPublicDataProteindataBank = ({ accessionNumber }) => {
  /* MobX Store */
  const rootStore = useContext(RootStoreContext);
  const { uniprotDisplayLoading, pdbCrossReference, fetchPdbCrossReference } =
    rootStore.geneStore;

  const [displayMolViewContainer, setDisplayMolViewContainer] = useState(false);
  const [molViewId, setmolViewId] = useState("");
  const [molViewUrl, setmolViewUrl] = useState("");
  const [molViewFormat, setmolViewFormat] = useState("");

  useEffect(() => {
    if (
      pdbCrossReference === null ||
      pdbCrossReference.accessionNumber !== accessionNumber
    ) {
      fetchPdbCrossReference(accessionNumber);
    }
  }, [
    accessionNumber,
    pdbCrossReference,
    fetchPdbCrossReference,
    uniprotDisplayLoading,
  ]);

  let openMolView = (id) => {
    setmolViewId(id);
    setmolViewUrl(
      "https://www.ebi.ac.uk/pdbe/entry-files/download/pdb" +
        id.toLowerCase() +
        ".ent"
    );
    setmolViewFormat("pdb");
    setDisplayMolViewContainer(true);
  };

  let displayLigands = (ligands) => {
    return Object.keys(ligands).map((key) => {
      return (
        <p key={key} style={{ margin: "0px" }}>
          {ligands[key]} x {key}
        </p>
      );
    });
  };

  if (uniprotDisplayLoading) {
    return <Skeleton width="10rem" height="4rem"></Skeleton>;
  } else if (!uniprotDisplayLoading && pdbCrossReference !== null) {
    let generateData = pdbCrossReference.data.map((obj) => {
      return (
        <tr key={obj.id} style={{ verticalAlign: "top" }}>
          <td>
            <a
              href={"https://www.ebi.ac.uk/pdbe/entry/pdb/" + obj.id}
              target="_blank"
              rel="noreferrer"
            >
              {obj.id}
            </a>
          </td>
          <td>{obj.method}</td>
          <td>{obj.resolution}</td>
          <td>
            <a
              href={
                "https://www.uniprot.org/blast/?about=" +
                obj.accession +
                "%5B" +
                obj.chains +
                "%5D"
              }
              target="_blank"
              rel="noreferrer"
            >
              {obj.chains}
            </a>
          </td>
          <td>
            <div style={{ width: "10rem", fontSize: "small" }}>
              {displayLigands(obj.ligands)}
            </div>
          </td>
          <td>
            <SplitButton
              label="View Structure"
              icon="icon icon-common icon-cubes"
              onClick={() => openMolView(obj.id)}
              className="p-button-sm"
              model={[
                {
                  label: "Download PDB",
                  icon: "icon icon-common icon-download",
                  command: () => {
                    window.location.href =
                      "https://www.ebi.ac.uk/pdbe/entry-files/download/pdb" +
                      obj.id.toLowerCase() +
                      ".ent";
                  },
                },
                {
                  label: "PDB Report",
                  icon: "icon icon-fileformats icon-PDF",
                  command: () => {
                    window.location.href =
                      "https://www.ebi.ac.uk/pdbe/entry-files/download/" +
                      obj.id.toLowerCase() +
                      "_validation.pdf";
                  },
                },
              ]}
            />
          </td>
        </tr>
      );
    });

    return generateData.length !== 0 ? (
      <div>
        <Dialog
          header={"Structure View"}
          visible={displayMolViewContainer}
          style={{ width: "650px" }}
          onHide={() => setDisplayMolViewContainer(false)}
          draggable={true}
        >
          <LiteMolView id={molViewId} url={molViewUrl} format={molViewFormat} />
        </Dialog>

        <table
          style={{ width: "100%", textAlign: "left", borderSpacing: "1em" }}
        >
          <thead>
            <tr key="head">
              <th>PDB ID</th>
              <th>Method</th>
              <th>Resolution</th>
              <th>Chains</th>
              <th>Ligands</th>
              <th>Structure</th>
            </tr>
          </thead>
          <tbody>{generateData}</tbody>
        </table>
      </div>
    ) : (
      <h3>No Entries</h3>
    );
  } else {
    //return <Skeleton width="10rem" height="4rem"></Skeleton>;
    return <h3>No Entries</h3>;
  }
};

export default observer(GeneViewPublicDataProteindataBank);
