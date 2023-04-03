import { Button } from "primereact/button";
import { Sidebar } from "primereact/sidebar";
import React, { useState } from "react";

const GenomePromoteBucketScore = (props) => {
  const [visibleRight, setVisibleRight] = useState(true);

  return (
    <Sidebar
      visible={visibleRight}
      position="right"
      baseZIndex={1000000}
      onHide={() => setVisibleRight(false)
      }
      
      showCloseIcon={false}
      modal={true}
    >
      <h1 style={{ fontWeight: "normal" }}>Bucket Score</h1>
      <hr />
      <p>Calculated bucket score is 9</p>
      <Button
        type="button"
        onClick={() => setVisibleRight(false)}
        label="Continue"
        className="p-button-success"
        style={{ marginRight: ".25em" }}
      />
      
    </Sidebar>
  );
};

export default GenomePromoteBucketScore;
