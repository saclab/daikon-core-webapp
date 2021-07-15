import React from "react";
import { Tooltip } from "primereact/tooltip";

import "./TargetGrid.css";

const TargetGrid = () => {
  let questions = {
    q2a1: "Humans-Contributes to durable cure?",
    q2a1b: "Humans-Active in EBA?",
    q2a2: "NHP",
    q2a3a: "C3HeB/FeJ-Acute infection",
    q2a3b: "C3He/FeJ-Chronic infection",
    q2a4a: "C57BL/6 or BALB/c-Acute infection",
    q2a4b: "C57BL/6 or BALB/c-Chronic infection",
    q2a5: "Macrophage",
    q2b1: "Standard media",
    q2b2: "Gluconeogenic carbon source",
    q2b4: "Other",
    q2c1: "Multiple stress",
    q2c2: "Low pH",
    q2c3: "Caseum",
    q2c4: "Caseum surrogate",
    q2c5: "Other NR",
    q3a1: "Mutation in target causes resistance?",
    q3a2: "Overexpression of target increase MIC?",
    q3a3: "Underexpression of target increase MIC?",
    q3a4: "Impact on pathway",
    q3b1: "Compound binds purifed target",
    q3b2: "Compound inhibits purifed target",
    q4a1: "NHP",
    q4a2a: "C3HeB/FeJ-Acute infection",
    q4a2b: "C3He/FeJ-Chronic infection",
    q4a3a: "C57BL/6 or BALB/c-Acute infection",
    q4a3b: "C57BL/6 or BALB/c-Chronic infection",
    q4a4: "Macrophage",
    q4b1: "Standard media",
    q4b2: "Gluconeogenic carbon source",
    q4b4: "Other",
    q4c1: "Multiple stress",
    q4c2: "Low pH",
    q4c3: "Caseum",
    q4c4: "Caseum surrogate",
    q4c5: "Other NR",
    q5a1: "Target inhibition/activation can be neutralized by a suppliment (eg: a metabolite) or in specifc media",
    q5a2: "Concentration of supplement in human tissue is too low to neutralize inactivation",
    q5a3: "Does the Mtb genome contain functionally redundant genes",
    q5b1: "Have inhibitors with low cellular toxicity been isolated or does the protein contain an active or allosteric site that is diferent from the human counterpart",
    q6a1: "Have inhibitors/activators of the Mtb protein with on-target whole cell activity been identifed",
    q6a2: "Does the target belong to a druggable class of proteins?",
    q6a3: "Small-scale screens identifed inhibitors/activators of the Mtb protein but none have whole-cell activity",
    q6a4: "C3He/FeJ-Chronic infection",
    q6a5: "Does the human genome encode a structurally similar counterpart?",
    q6a6: "Large-scale screens for the MTb enzyme have already been performed and did not result in compounds with whole-cell activity.",
    q6a7: "",
    q6b1: "Structure of Mtb protein is available",
    q6b2: "Structure of homolog is available",
    q6b3: "",
    q6b4: "",
    q6b5: "",
    q6c1: "Mtb strain(s) that can confrm on target activity are available; strains can be (1) hypomorphs, (2) overexpressors, and/or (3) resistant mutants",
    q6c2: "Non-Mtb strain, which could be used to characterize compounds with broad spectrum activity are available.",
    q6c3: "",
    q6c4: "",
    q6c5: "",
    q6c6: "",
    q6d1: "Assay for Mtb protein has been established",
    q6d2: "Assay has been established for homolog from another species",
    q6d3: "",
    q6d4: "",
    q7a1: "Does inhibition/activation of the target synergize with current TB drugs or other drugs under development?",
    q7a2: "Does inhibition/activation of the target antagonize with current TB drugs or other drugs under development?",
    q7b1: "Does inhibition/activation of the targt synergize wtih current TB drugs or other drugs under development?",
    q7b2: "Does inhibition/activation of the target antagonize with current TB drugs or other drugs under development?",
    q7c1: "Does inhibition/activation of the targt synergize wtih current TB drugs or other drugs under development?",
    q7c2: "Does inhibition/activation of the target antagonize with current TB drugs or other drugs under development?",
    q7d1: "Does inhibition/activation of the targt synergize wtih current TB drugs or other drugs under development?",
    q7d2: "Does inhibition/activation of the target antagonize with current TB drugs or other drugs under development?",
  };

  let answers = {
    a2aPercentage: 0.85,
    a2a1: "greenCell",
    a2a1b: "greenCell",
    a2a2: "grayCell",
    a2a3a: "grayCell",
    a2a3b: "greenCell",
    a2a4a: "greenCell",
    a2a4b: "greenCell",
    a2a5: "greenCell",
    a2bPercentage: 1.0,
    a2b1: "greenCell",
    a2b2: "greenCell",
    a2b4: "greenCell",
    a2cPercentage: 1.0,
    a2c1: "greenCell",
    a2c2: "greenCell",
    a2c3: "greenCell",
    a2c4: "greenCell",
    a2c5: "greenCell",
    a3Percentage: 0.92,
    a3a1: "greenCell",
    a3a2: "greenCell",
    a3a3: "greenCell",
    a3a4: "greenCell",
    a3b1: "greenCell",
    a3b2: "greenCell",
    a4aPercentage: 0.01,
    a4a1: "grayCell",
    a4a2a: "grayCell",
    a4a2b: "grayCell",
    a4a3a: "grayCell",
    a4a3b: "grayCell",
    a4a4: "grayCell",
    a4bPercentage: 0.78,
    a4b1: "greenCell",
    a4b2: "greenCell",
    a4b4: "greenCell",
    a4cPercentage: 0.01,
    a4c1: "grayCell",
    a4c2: "grayCell",
    a4c3: "grayCell",
    a4c4: "grayCell",
    a4c5: "grayCell",
    a5Percentage: 1.0,
    a5a1: "greenCell",
    a5a2: "yellowCell",
    a5a3: "greenCell",
    a5b1: "greenCell",
    a6aPercentage: 0.6,
    a6a1: "greenCell",
    a6a2: "greenCell",
    a6a3: "greenCell",
    a6a4: "grayCell",
    a6a5: "grayCell",
    a6a6: "grayCell",
    a6a7: "greenCell",
    a6bPercentage: 0.6,
    a6b1: "redCell",
    a6b2: "greenCell",
    a6b3: "grayCell",
    a6b4: "grayCell",
    a6b5: "yellowCell",
    a6cPercentage: 1.0,
    a6c1: "greenCell",
    a6c2: "greenCell",
    a6c3: "grayCell",
    a6c4: "grayCell",
    a6c5: "grayCell",
    a6c6: "greenCell",
    a6dPercentage: 0.7,
    a6d1: "greenCell",
    a6d2: "grayCell",
    a6d3: "grayCell",
    a6d4: "greenCell",
    a7Percentage: "na",
    a7a1: "greenCell",
    a7a2: "grayCell",
    a7b1: "grayCell",
    a7b2: "grayCell",
    a7c1: "grayCell",
    a7c2: "grayCell",
    a7d1: "grayCell",
    a7d2: "grayCell",
  };

  return (
    <div className="targetGrid">
      <Tooltip target=".questionTooltip" mouseTrack mouseTrackLeft={10} />
      <table>
        <tbody>
          <tr>
            <td rowSpan="3" className="verticalText">
              <span>Impact of Chemical inhibition</span>
            </td>
            <td>During infections</td>
            <td>
              <b>2a</b>
            </td>
            <td>{answers.a2aPercentage}</td>

            <td
              className={"questionTooltip " + answers.a2a1}
              data-pr-tooltip={questions.q2a1}
              data-pr-position="left"
            >
              2a1
            </td>

            <td
              className={"questionTooltip " + answers.a2a1b}
              data-pr-tooltip={questions.q2a1b}
              data-pr-position="left"
            >
              2a1b
            </td>
            <td
              className={"questionTooltip " + answers.a2a2}
              data-pr-tooltip={questions.q2a2}
              data-pr-position="left"
            >
              2a2
            </td>
            <td
              className={"questionTooltip " + answers.a2a3a}
              data-pr-tooltip={questions.q2a3a}
              data-pr-position="left"
            >
              2a3a
            </td>
            <td
              className={"questionTooltip " + answers.a2a3b}
              data-pr-tooltip={questions.q2a3b}
              data-pr-position="left"
            >
              2a3b
            </td>
            <td
              className={"questionTooltip " + answers.a2a4a}
              data-pr-tooltip={questions.q2a4a}
              data-pr-position="left"
            >
              2a4a
            </td>
            <td
              className={"questionTooltip " + answers.a2a4b}
              data-pr-tooltip={questions.q2a4b}
              data-pr-position="left"
            >
              2a4b
            </td>
            <td
              className={"questionTooltip " + answers.a2a5}
              data-pr-tooltip={questions.q2a5}
              data-pr-position="left"
            >
              2a5
            </td>
          </tr>
          <tr>
            <td>On replicating Mtb in vitro</td>
            <td>
              <b>2b</b>
            </td>
            <td>{answers.a2bPercentage}</td>
            <td
              className={"questionTooltip " + answers.a2b1}
              data-pr-tooltip={questions.q2b1}
              data-pr-position="left"
            >
              2b1
            </td>
            <td
              className={"questionTooltip " + answers.a2b2}
              data-pr-tooltip={questions.q2b2}
              data-pr-position="left"
            >
              2b2
            </td>
            <td
              className={"questionTooltip " + answers.a2b4}
              data-pr-tooltip={questions.q2b4}
              data-pr-position="left"
            >
              2b4
            </td>
            <td colSpan="5">&nbsp;</td>
          </tr>
          <tr>
            <td>On non replicating Mtb in vitro</td>
            <td>
              <b>2c</b>
            </td>
            <td>{answers.a2cPercentage}</td>
            <td
              className={"questionTooltip " + answers.a2c1}
              data-pr-tooltip={questions.q2c1}
              data-pr-position="left"
            >
              2c1
            </td>
            <td
              className={"questionTooltip " + answers.a2c2}
              data-pr-tooltip={questions.q2c2}
              data-pr-position="left"
            >
              2c2
            </td>
            <td
              className={"questionTooltip " + answers.a2c3}
              data-pr-tooltip={questions.q2c3}
              data-pr-position="left"
            >
              2c3
            </td>
            <td
              className={"questionTooltip " + answers.a2c4}
              data-pr-tooltip={questions.q2c4}
              data-pr-position="left"
            >
              2c4
            </td>
            <td
              className={"questionTooltip " + answers.a2c5}
              data-pr-tooltip={questions.q2c5}
              data-pr-position="left"
            >
              2c5
            </td>
            <td colSpan="3">&nbsp;</td>
          </tr>
          <tr>
            <td colSpan="2">
              Chemical inhibition-evidence for on target activity
            </td>

            <td>
              <b>3</b>
            </td>
            <td>{answers.a3Percentage}</td>
            <td
              className={"questionTooltip " + answers.a3a1}
              data-pr-tooltip={questions.q3a1}
              data-pr-position="left"
            >
              3a1
            </td>
            <td
              className={"questionTooltip " + answers.a3a2}
              data-pr-tooltip={questions.q3a2}
              data-pr-position="left"
            >
              3a2
            </td>
            <td
              className={"questionTooltip " + answers.a3a3}
              data-pr-tooltip={questions.q3a3}
              data-pr-position="left"
            >
              3a3
            </td>
            <td
              className={"questionTooltip " + answers.a3a4}
              data-pr-tooltip={questions.q3a4}
              data-pr-position="left"
            >
              3a4
            </td>
            <td
              className={"questionTooltip " + answers.a3b1}
              data-pr-tooltip={questions.q3b1}
              data-pr-position="left"
            >
              3b1
            </td>
            <td
              className={"questionTooltip " + answers.a3b2}
              data-pr-tooltip={questions.q3b2}
              data-pr-position="left"
            >
              3b2
            </td>
            <td colSpan="2">&nbsp;</td>
          </tr>
          <tr>
            <td rowSpan="3" className="verticalText">
              {" "}
              <span>Impact of Genetic inhibition</span>
            </td>
            <td>During infections</td>
            <td>
              <b>4a</b>
            </td>
            <td>{answers.a4aPercentage}</td>
            <td
              className={"questionTooltip " + answers.a4a1}
              data-pr-tooltip={questions.q4a1}
              data-pr-position="left"
            >
              4a1
            </td>
            <td
              className={"questionTooltip " + answers.a4a2a}
              data-pr-tooltip={questions.q4a2a}
              data-pr-position="left"
            >
              4a2a
            </td>
            <td
              className={"questionTooltip " + answers.a4a2b}
              data-pr-tooltip={questions.q4a2b}
              data-pr-position="left"
            >
              4a2b
            </td>
            <td
              className={"questionTooltip " + answers.a4a3a}
              data-pr-tooltip={questions.q4a3a}
              data-pr-position="left"
            >
              4a3a
            </td>
            <td
              className={"questionTooltip " + answers.a4a3b}
              data-pr-tooltip={questions.q4a3b}
              data-pr-position="left"
            >
              4a3b
            </td>
            <td
              className={"questionTooltip " + answers.a4a4}
              data-pr-tooltip={questions.q4a4}
              data-pr-position="left"
            >
              4a4
            </td>
            <td colSpan="2">&nbsp;</td>
          </tr>
          <tr>
            <td>On replicating Mtb in vitro</td>
            <td>
              <b>4b</b>
            </td>
            <td>{answers.a4bPercentage}</td>
            <td
              className={"questionTooltip " + answers.a4b1}
              data-pr-tooltip={questions.q4b1}
              data-pr-position="left"
            >
              4b1
            </td>
            <td
              className={"questionTooltip " + answers.a4b2}
              data-pr-tooltip={questions.q4b2}
              data-pr-position="left"
            >
              4b2
            </td>
            <td
              className={"questionTooltip " + answers.a4b4}
              data-pr-tooltip={questions.q4b4}
              data-pr-position="left"
            >
              4b4
            </td>
            <td colSpan="5">&nbsp;</td>
          </tr>
          <tr>
            <td>On non repliating Mtb in vitro</td>
            <td>
              <b>4c</b>
            </td>
            <td>{answers.a4cPercentage}</td>
            <td
              className={"questionTooltip " + answers.a4c1}
              data-pr-tooltip={questions.q4c1}
              data-pr-position="left"
            >
              4c1
            </td>
            <td
              className={"questionTooltip " + answers.a4c2}
              data-pr-tooltip={questions.q4c2}
              data-pr-position="left"
            >
              4c2
            </td>
            <td
              className={"questionTooltip " + answers.a4c3}
              data-pr-tooltip={questions.q4c3}
              data-pr-position="left"
            >
              4c3
            </td>
            <td
              className={"questionTooltip " + answers.a4c4}
              data-pr-tooltip={questions.q4c4}
              data-pr-position="left"
            >
              4c4
            </td>
            <td
              className={"questionTooltip " + answers.a4c5}
              data-pr-tooltip={questions.q4c5}
              data-pr-position="left"
            >
              4c5
            </td>
            <td colSpan="3">&nbsp;</td>
          </tr>
          <tr>
            <td colSpan="2">Liabilities</td>
            <td>
              <b>5</b>
            </td>
            <td>{answers.a5Percentage}</td>
            <td
              className={"questionTooltip " + answers.a5a1}
              data-pr-tooltip={questions.q5a1}
              data-pr-position="left"
            >
              5a1
            </td>
            <td
              className={"questionTooltip " + answers.a5a2}
              data-pr-tooltip={questions.q5a2}
              data-pr-position="left"
            >
              5a2
            </td>
            <td
              className={"questionTooltip " + answers.a5a3}
              data-pr-tooltip={questions.q5a3}
              data-pr-position="left"
            >
              5a3
            </td>
            <td
              className={"questionTooltip " + answers.a5b1}
              data-pr-tooltip={questions.q5b1}
              data-pr-position="left"
            >
              5b1
            </td>
            <td colSpan="4">&nbsp;</td>
          </tr>
          <tr>
            <td rowSpan="4" className="verticalText">
              <span>Likelihood of identifying an inhibitor or activator</span>
            </td>
            <td>High throughput screening</td>
            <td>
              <b>6a</b>
            </td>
            <td>{answers.a6aPercentage}</td>
            <td
              className={"questionTooltip " + answers.a6a1}
              data-pr-tooltip={questions.q6a1}
              data-pr-position="left"
            >
              6a1
            </td>
            <td
              className={"questionTooltip " + answers.a6a2}
              data-pr-tooltip={questions.q6a2}
              data-pr-position="left"
            >
              6a2
            </td>
            <td
              className={"questionTooltip " + answers.a6a3}
              data-pr-tooltip={questions.q6a3}
              data-pr-position="left"
            >
              6a3
            </td>
            <td
              className={"questionTooltip " + answers.a6a4}
              data-pr-tooltip={questions.q6a4}
              data-pr-position="left"
            >
              6a4
            </td>
            <td
              className={"questionTooltip " + answers.a6a5}
              data-pr-tooltip={questions.q6a5}
              data-pr-position="left"
            >
              6a5
            </td>
            <td
              className={"questionTooltip " + answers.a6a6}
              data-pr-tooltip={questions.q6a6}
              data-pr-position="left"
            >
              6a6
            </td>
            <td
              className={"questionTooltip " + answers.a6a7}
              data-pr-tooltip={questions.q6a7}
              data-pr-position="left"
            >
              6a7
            </td>
            <td colSpan="1">&nbsp;</td>
          </tr>
          <tr>
            <td>Structure based approaches</td>
            <td>
              <b>6b</b>
            </td>
            <td>{answers.a6bPercentage}</td>
            <td
              className={"questionTooltip " + answers.a6b1}
              data-pr-tooltip={questions.q6b1}
              data-pr-position="left"
            >
              6b1
            </td>
            <td
              className={"questionTooltip " + answers.a6b2}
              data-pr-tooltip={questions.q6b2}
              data-pr-position="left"
            >
              6b2
            </td>
            <td
              className={"questionTooltip " + answers.a6b3}
              data-pr-tooltip={questions.q6b3}
              data-pr-position="left"
            >
              6b3
            </td>
            <td
              className={"questionTooltip " + answers.a6b4}
              data-pr-tooltip={questions.q6b4}
              data-pr-position="left"
            >
              6b4
            </td>
            <td
              className={"questionTooltip " + answers.a6b5}
              data-pr-tooltip={questions.q6b5}
              data-pr-position="left"
            >
              6b5
            </td>
            <td colSpan="3">&nbsp;</td>
          </tr>
          <tr>
            <td>Ability to progress</td>
            <td>
              <b>6c</b>
            </td>
            <td>{answers.a6cPercentage}</td>
            <td
              className={"questionTooltip " + answers.a6c1}
              data-pr-tooltip={questions.q6c1}
              data-pr-position="left"
            >
              6c1
            </td>
            <td
              className={"questionTooltip " + answers.a6c2}
              data-pr-tooltip={questions.q6c2}
              data-pr-position="left"
            >
              6c2
            </td>
            <td
              className={"questionTooltip " + answers.a6c3}
              data-pr-tooltip={questions.q6c3}
              data-pr-position="left"
            >
              6c3
            </td>
            <td
              className={"questionTooltip " + answers.a6c4}
              data-pr-tooltip={questions.q6c4}
              data-pr-position="left"
            >
              6c4
            </td>
            <td
              className={"questionTooltip " + answers.a6c5}
              data-pr-tooltip={questions.q6c5}
              data-pr-position="left"
            >
              6c5
            </td>
            <td
              className={"questionTooltip " + answers.a6c6}
              data-pr-tooltip={questions.q6c6}
              data-pr-position="left"
            >
              6c6
            </td>
            <td colSpan="2">&nbsp;</td>
          </tr>
          <tr>
            <td>Safety considerations</td>
            <td>
              <b>6d</b>
            </td>
            <td>{answers.a6dPercentage}</td>
            <td
              className={"questionTooltip " + answers.a6d1}
              data-pr-tooltip={questions.q6d1}
              data-pr-position="left"
            >
              6d1
            </td>
            <td
              className={"questionTooltip " + answers.a6d2}
              data-pr-tooltip={questions.q6d2}
              data-pr-position="left"
            >
              6d2
            </td>
            <td
              className={"questionTooltip " + answers.a6d3}
              data-pr-tooltip={questions.q6d3}
              data-pr-position="left"
            >
              6d3
            </td>
            <td
              className={"questionTooltip " + answers.a6d4}
              data-pr-tooltip={questions.q6d4}
              data-pr-position="left"
            >
              6d4
            </td>
            <td colSpan="4">&nbsp;</td>
          </tr>
          <tr>
            <td colSpan="2">Interactions with other drugs/compounds</td>
            <td>
              <b>7</b>
            </td>
            <td>{answers.a7Percentage}</td>
            <td
              className={"questionTooltip " + answers.a7a1}
              data-pr-tooltip={questions.q7a1}
              data-pr-position="left"
            >
              7a1
            </td>
            <td
              className={"questionTooltip " + answers.a7a2}
              data-pr-tooltip={questions.q7a2}
              data-pr-position="left"
            >
              7a2
            </td>
            <td
              className={"questionTooltip " + answers.a7b1}
              data-pr-tooltip={questions.q7b1}
              data-pr-position="left"
            >
              7b1
            </td>
            <td
              className={"questionTooltip " + answers.a7b2}
              data-pr-tooltip={questions.q7b2}
              data-pr-position="left"
            >
              7b2
            </td>
            <td
              className={"questionTooltip " + answers.a7c1}
              data-pr-tooltip={questions.q7c1}
              data-pr-position="left"
            >
              7c1
            </td>
            <td
              className={"questionTooltip " + answers.a7c2}
              data-pr-tooltip={questions.q7c2}
              data-pr-position="left"
            >
              7c2
            </td>
            <td
              className={"questionTooltip " + answers.a7d1}
              data-pr-tooltip={questions.q7d1}
              data-pr-position="left"
            >
              7d1
            </td>
            <td
              className={"questionTooltip " + answers.a7d2}
              data-pr-tooltip={questions.q7d2}
              data-pr-position="left"
            >
              7d2
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TargetGrid;
