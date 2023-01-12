import { Button } from "primereact/button";
import { Editor } from "primereact/editor";
import React, { useState } from "react";
import { toast } from "react-toastify";
import EmbededHelp from "../../app/common/EmbededHelp/EmbededHelp";
import { _helper_detect_browser_details } from "./BugReportHelper";

const BugReport = () => {
  let prefilledText =
    `<b>1. Bug Description</b><br /><br />
    [Enter bug description/details here]
    <br />
    <br />
    <b>2. Steps to reproduce</b><br /><br />
    [Enter the steps to reproduce the bug]
    <br />
    <br />
    <p>
      <b>3. Captured Browser Details</b>` +
    _helper_detect_browser_details() +
    `</p>
  `;
  const [description, setDescription] = useState(prefilledText);

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

  let copyTemplate = () => {
    navigator.clipboard.writeText(description);
    toast.success(
      "Copied text to clipboard. Now please visit GitHub to record the issue."
    );
  };

  return (
    <div className="flex w-full flex-column pl-6">
      <h2>Bug Report Template</h2>
      <EmbededHelp>
        Bugs are maintained in github and are <b>&nbsp; public</b>. Make sure
        you <b>&nbsp; do not have any sensitive data &nbsp;</b> in the bug
        report.
      </EmbededHelp>
      <p>
        - Please <b> fill</b> the <b> 'bug description'</b> and the{" "}
        <b>'steps to reproduce'</b> sections. <br />- click on 'COPY Text'
        button to copy the filled template.
        <br />- Click on 'Open GitHub Issues Page' give a title, paste the
        content to comments, and create an issue.
      </p>
      <div className="flex">
        <div className="flex pr-2 pb-2">
          <Button
            label="COPY Text"
            className="p-button-secondary"
            onClick={() => copyTemplate()}
          />
        </div>
        <div className="flex pr-2 pb-2">
          <Button
            label="Open GitHub Issues Page"
            className="p-button-secondary"
            onClick={() =>
              window.open(
                "https://github.com/saclab/daikon-core-webapp/issues/new",
                "_blank",
                "noreferrer"
              )
            }
          />
        </div>
      </div>
      <Editor
        style={{ height: "25rem", width: "100%" }}
        headerTemplate={headerOfTextEditor}
        value={description}
        onTextChange={(e) => {
          setDescription(e.htmlValue);
          console.log(e.htmlValue);
        }}
      />
    </div>
  );
};

export default BugReport;
