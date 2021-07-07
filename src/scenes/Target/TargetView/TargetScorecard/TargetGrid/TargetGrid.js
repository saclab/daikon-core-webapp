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
  };

  return (
    <div className="targetGrid">
      <Tooltip target=".questionTooltip" mouseTrack mouseTrackLeft={10} />
      <table>
        <tr>
          <td rowspan="3" className="verticalText">
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
          <td colspan="5">&nbsp;</td>
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
          <td colspan="3">&nbsp;</td>
        </tr>
        <tr>
          <td colspan="2">
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
          <td colspan="2">&nbsp;</td>
        </tr>
        <tr>
          <td rowspan="3" className="verticalText">
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
          <td colspan="2">&nbsp;</td>
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
          <td colspan="5">&nbsp;</td>
        </tr>
        <tr>
          <td>On non repliating Mtb in vitro</td>
          <td>
            <b>4c</b>
          </td>
          <td>0.01</td>
          <td>4c1</td>
          <td>4c2</td>
          <td>4c3</td>
          <td>4c4</td>
          <td>4c5</td>
          <td colspan="3">&nbsp;</td>
        </tr>
        <tr>
          <td colspan="2">Liabilities</td>
          <td>
            <b>5</b>
          </td>
          <td>1.00</td>
          <td>5a1</td>
          <td>5a2</td>
          <td>5a3</td>
          <td>5b1</td>
          <td colspan="4">&nbsp;</td>
        </tr>
        <tr>
          <td rowspan="4" className="verticalText">
            <span>Likelihood of identifying an inhibitor or activator</span>
          </td>
          <td>High throughput screening</td>
          <td>
            <b>6a</b>
          </td>
          <td>0.6</td>
          <td>6a1</td>
          <td>6a2</td>
          <td>6a3</td>
          <td>6a4</td>
          <td>6a5</td>
          <td>6a6</td>
          <td>6a7</td>
          <td colspan="1">&nbsp;</td>
        </tr>
        <tr>
          <td>Structure based approaches</td>
          <td>
            <b>6b</b>
          </td>
          <td>0.60</td>
          <td>6b1</td>
          <td>6b2</td>
          <td>6b3</td>
          <td>6b4</td>
          <td>6b5</td>
          <td colspan="3">&nbsp;</td>
        </tr>
        <tr>
          <td>Ability to progress</td>
          <td>
            <b>6c</b>
          </td>
          <td>1.00</td>
          <td>6c1</td>
          <td>6c2</td>
          <td>6c3</td>
          <td>6c4</td>
          <td>6c5</td>
          <td>6c6</td>
          <td colspan="2">&nbsp;</td>
        </tr>
        <tr>
          <td>Safety considerations</td>
          <td>
            <b>6d</b>
          </td>
          <td>0.70</td>
          <td>6d1</td>
          <td>6d2</td>
          <td>6d3</td>
          <td>6d4</td>
          <td colspan="4">&nbsp;</td>
        </tr>
        <tr>
          <td colSpan="2">Interactions with other drugs/compounds</td>
          <td>
            <b>7</b>
          </td>
          <td>na</td>
          <td>7a1</td>
          <td>7a2</td>
          <td>7b1</td>
          <td>7b2</td>
          <td>7c1</td>
          <td>7c2</td>
          <td>7d1</td>
          <td>7d2</td>
        </tr>
      </table>
    </div>
  );
};

export default TargetGrid;
