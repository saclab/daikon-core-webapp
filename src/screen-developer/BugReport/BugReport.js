import { Editor } from "primereact/editor";
import React, { useState } from "react";
import EmbededHelp from "../../app/common/EmbededHelp/EmbededHelp";

const BugReport = () => {
  const [description, setDescription] = useState("");

  const headerOfTextEditor = (
    <span className="ql-formats">
      <button className="ql-bold" aria-label="Bold"></button>
      <button className="ql-italic" aria-label="Italic"></button>
      <button className="ql-underline" aria-label="Underline"></button>
      <button className="ql-strike" aria-label="Strike"></button>
      <button className="ql-link" aria-label="Link"></button>
      <button className="ql-list" value="bullet" aria-label="Bullet"></button>
    </span>
  );

  return (
    <div className="flex w-full flex-column pl-6">
      <h2>Report a bug.</h2>
      <EmbededHelp>
        Bugs are maintained in github and are <b>&nbsp; public</b>. Make sure
        you <b>&nbsp; do not have any sensitive data &nbsp;</b> in the bug
        report.
      </EmbededHelp>
      <p>
        For your convinence we have pre filled basic information such as browser
        details, os etc. to the template. Please <b> add</b> the
        <b> bug description</b> and the <b>steps to reproduce</b>.
      </p>

      <Editor
        style={{ height: "25rem", width: "100%" }}
        headerTemplate={headerOfTextEditor}
        value={description}
        onTextChange={(e) => {
          setDescription(e.htmlValue);
        }}
      />
    </div>
  );
};

export default BugReport;
