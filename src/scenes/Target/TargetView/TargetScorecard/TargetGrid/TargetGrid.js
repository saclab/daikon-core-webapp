import React from "react";
import { Tooltip } from "primereact/tooltip";

import "./TargetGrid.css";

const TargetGrid = ({ questions, target }) => {
  let answers = {};

  if (questions.size === 0 || target === null) {
    return <h2>Please wait..</h2>;
  }

  target.targetScorecard.targetScoreCardValues.forEach((ans) => {
    if (ans.answer === "Active" || ans.answer === "Yes") {
      answers[ans.questionIdentification] = "greenCell";
    }
    if (ans.answer === "Inactive" || ans.answer === "No") {
      answers[ans.questionIdentification] = "redCell";
    }
    if (ans.answer === "Unknown" || ans.answer === "n/a") {
      answers[ans.questionIdentification] = "grayCell";
    }
  });

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
            <td></td>

            <td
              className={"questionTooltip " + answers["2a1"]}
              data-pr-tooltip={questions.get("2a1").questionBody}
              data-pr-position="left"
            >
              2a1
            </td>

            <td
              className={"questionTooltip " + answers["2a1b"]}
              data-pr-tooltip={questions.get("2a1b").questionBody}
              data-pr-position="left"
            >
              2a1b
            </td>
            <td
              className={"questionTooltip " + answers["2a2"]}
              data-pr-tooltip={questions.get("2a2").questionBody}
              data-pr-position="left"
            >
              2a2
            </td>
            <td
              className={"questionTooltip " + answers["2a3a"]}
              data-pr-tooltip={questions.get("2a3a").questionBody}
              data-pr-position="left"
            >
              2a3a
            </td>
            <td
              className={"questionTooltip " + answers["2a3b"]}
              data-pr-tooltip={questions.get("2a3b").questionBody}
              data-pr-position="left"
            >
              2a3b
            </td>
            <td
              className={"questionTooltip " + answers["2a4a"]}
              data-pr-tooltip={questions.get("2a4a").questionBody}
              data-pr-position="left"
            >
              2a4a
            </td>
            <td
              className={"questionTooltip " + answers["2a4b"]}
              data-pr-tooltip={questions.get("2a4b").questionBody}
              data-pr-position="left"
            >
              2a4b
            </td>
            <td
              className={"questionTooltip " + answers["2a5"]}
              data-pr-tooltip={questions.get("2a5").questionBody}
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
            <td></td>
            <td
              className={"questionTooltip " + answers["2b1"]}
              data-pr-tooltip={questions.get("2b1").questionBody}
              data-pr-position="left"
            >
              2b1
            </td>
            <td
              className={"questionTooltip " + answers["2b2"]}
              data-pr-tooltip={questions.get("2b2").questionBody}
              data-pr-position="left"
            >
              2b2
            </td>
            <td
              className={"questionTooltip " + answers["2b4"]}
              data-pr-tooltip={questions.get("2b4").questionBody}
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
            <td></td>
            <td
              className={"questionTooltip " + answers["2c1"]}
              data-pr-tooltip={questions.get("2c1").questionBody}
              data-pr-position="left"
            >
              2c1
            </td>
            <td
              className={"questionTooltip " + answers["2c2"]}
              data-pr-tooltip={questions.get("2c2").questionBody}
              data-pr-position="left"
            >
              2c2
            </td>
            <td
              className={"questionTooltip " + answers["2c3"]}
              data-pr-tooltip={questions.get("2c3").questionBody}
              data-pr-position="left"
            >
              2c3
            </td>
            <td
              className={"questionTooltip " + answers["2c4"]}
              data-pr-tooltip={questions.get("2c4").questionBody}
              data-pr-position="left"
            >
              2c4
            </td>
            <td
              className={"questionTooltip " + answers["2c5"]}
              data-pr-tooltip={questions.get("2c5").questionBody}
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
            <td></td>
            <td
              className={"questionTooltip " + answers["3a1"]}
              data-pr-tooltip={questions.get("3a1").questionBody}
              data-pr-position="left"
            >
              3a1
            </td>
            <td
              className={"questionTooltip " + answers["3a2"]}
              data-pr-tooltip={questions.get("3a2").questionBody}
              data-pr-position="left"
            >
              3a2
            </td>
            <td
              className={"questionTooltip " + answers["3a3"]}
              data-pr-tooltip={questions.get("3a3").questionBody}
              data-pr-position="left"
            >
              3a3
            </td>
            <td
              className={"questionTooltip " + answers["3a4"]}
              data-pr-tooltip={questions.get("3a4").questionBody}
              data-pr-position="left"
            >
              3a4
            </td>
            <td
              className={"questionTooltip " + answers["3b1"]}
              data-pr-tooltip={questions.get("3b1").questionBody}
              data-pr-position="left"
            >
              3b1
            </td>
            <td
              className={"questionTooltip " + answers["3b2"]}
              data-pr-tooltip={questions.get("3b2").questionBody}
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
            <td></td>
            <td
              className={"questionTooltip " + answers["4a1"]}
              data-pr-tooltip={questions.get("4a1").questionBody}
              data-pr-position="left"
            >
              4a1
            </td>
            <td
              className={"questionTooltip " + answers["4a2a"]}
              data-pr-tooltip={questions.get("4a2a").questionBody}
              data-pr-position="left"
            >
              4a2a
            </td>
            <td
              className={"questionTooltip " + answers["4a2b"]}
              data-pr-tooltip={questions.get("4a2b").questionBody}
              data-pr-position="left"
            >
              4a2b
            </td>
            <td
              className={"questionTooltip " + answers["4a3a"]}
              data-pr-tooltip={questions.get("4a3a").questionBody}
              data-pr-position="left"
            >
              4a3a
            </td>
            <td
              className={"questionTooltip " + answers["4a3b"]}
              data-pr-tooltip={questions.get("4a3b").questionBody}
              data-pr-position="left"
            >
              4a3b
            </td>
            <td
              className={"questionTooltip " + answers["4a4"]}
              data-pr-tooltip={questions.get("4a4").questionBody}
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
            <td></td>
            <td
              className={"questionTooltip " + answers["4b1"]}
              data-pr-tooltip={questions.get("4b1").questionBody}
              data-pr-position="left"
            >
              4b1
            </td>
            <td
              className={"questionTooltip " + answers["4b2"]}
              data-pr-tooltip={questions.get("4b2").questionBody}
              data-pr-position="left"
            >
              4b2
            </td>
            <td
              className={"questionTooltip " + answers["4b3"]}
              data-pr-tooltip={questions.get("4b3").questionBody}
              data-pr-position="left"
            >
              4b3
            </td>
            <td colSpan="5">&nbsp;</td>
          </tr>
          <tr>
            <td>On non repliating Mtb in vitro</td>
            <td>
              <b>4c</b>
            </td>
            <td></td>
            <td
              className={"questionTooltip " + answers["4c1"]}
              data-pr-tooltip={questions.get("4c1").questionBody}
              data-pr-position="left"
            >
              4c1
            </td>
            <td
              className={"questionTooltip " + answers["4c2"]}
              data-pr-tooltip={questions.get("4c2").questionBody}
              data-pr-position="left"
            >
              4c2
            </td>
            <td
              className={"questionTooltip " + answers["4c3"]}
              data-pr-tooltip={questions.get("4c3").questionBody}
              data-pr-position="left"
            >
              4c3
            </td>
            <td
              className={"questionTooltip " + answers["4c4"]}
              data-pr-tooltip={questions.get("4c4").questionBody}
              data-pr-position="left"
            >
              4c4
            </td>
            <td
              className={"questionTooltip " + answers["4c5"]}
              data-pr-tooltip={questions.get("4c5").questionBody}
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
            <td></td>
            <td
              className={"questionTooltip " + answers["5a1"]}
              data-pr-tooltip={questions.get("5a1").questionBody}
              data-pr-position="left"
            >
              5a1
            </td>
            <td
              className={"questionTooltip " + answers["5a2"]}
              data-pr-tooltip={questions.get("5a2").questionBody}
              data-pr-position="left"
            >
              5a2
            </td>
            <td
              className={"questionTooltip " + answers["5a3"]}
              data-pr-tooltip={questions.get("5a3").questionBody}
              data-pr-position="left"
            >
              5a3
            </td>
            <td
              className={"questionTooltip " + answers["5b1"]}
              data-pr-tooltip={questions.get("5b1").questionBody}
              data-pr-position="left"
            >
              5b1
            </td>
            <td colSpan="4">&nbsp;</td>
          </tr>
          <tr>
            <td rowSpan="4" className="verticalText">
              {" "}
              <span>Tractability</span>
            </td>
            <td>High throughput screening feasibility</td>
            <td>
              <b>6a</b>
            </td>
            <td></td>
            <td
              className={"questionTooltip " + answers["6a1"]}
              data-pr-tooltip={questions.get("6a1").questionBody}
              data-pr-position="left"
            >
              6a1
            </td>
            <td
              className={"questionTooltip " + answers["6a2"]}
              data-pr-tooltip={questions.get("6a2").questionBody}
              data-pr-position="left"
            >
              6a2
            </td>
            <td
              className={"questionTooltip " + answers["6a3"]}
              data-pr-tooltip={questions.get("6a3").questionBody}
              data-pr-position="left"
            >
              6a3
            </td>
            <td
              className={"questionTooltip " + answers["6a4"]}
              data-pr-tooltip={questions.get("6a4").questionBody}
              data-pr-position="left"
            >
              6a4
            </td>
            <td
              className={"questionTooltip " + answers["6a5"]}
              data-pr-tooltip={questions.get("6a5").questionBody}
              data-pr-position="left"
            >
              6a5
            </td>
            <td
              className={"questionTooltip " + answers["6a6"]}
              data-pr-tooltip={questions.get("6a6").questionBody}
              data-pr-position="left"
            >
              6a6
            </td>
            <td
              className={"questionTooltip " + answers["6a7"]}
              data-pr-tooltip={questions.get("6a7").questionBody}
              data-pr-position="left"
            >
              6a7
            </td>
            <td colSpan="1">&nbsp;</td>
          </tr>
          <tr>
            <td>Structure based feasibility</td>
            <td>
              <b>6b</b>
            </td>
            <td></td>
            <td
              className={"questionTooltip " + answers["6b1"]}
              data-pr-tooltip={questions.get("6b1").questionBody}
              data-pr-position="left"
            >
              6b1
            </td>
            <td
              className={"questionTooltip " + answers["6b2"]}
              data-pr-tooltip={questions.get("6b2").questionBody}
              data-pr-position="left"
            >
              6b2
            </td>
            <td
              className={"questionTooltip " + answers["6b3"]}
              data-pr-tooltip={questions.get("6b3").questionBody}
              data-pr-position="left"
            >
              6b3
            </td>
            <td
              className={"questionTooltip " + answers["6b4"]}
              data-pr-tooltip={questions.get("6b4").questionBody}
              data-pr-position="left"
            >
              6b4
            </td>
            <td
              className={"questionTooltip " + answers["6b5"]}
              data-pr-tooltip={questions.get("6b5").questionBody}
              data-pr-position="left"
            >
              6b5
            </td>
            <td colSpan="3">&nbsp;</td>
          </tr>
          <tr>
            <td>Progressibility considerations</td>
            <td>
              <b>6c</b>
            </td>
            <td></td>
            <td
              className={"questionTooltip " + answers["6c1"]}
              data-pr-tooltip={questions.get("6c1").questionBody}
              data-pr-position="left"
            >
              6c1
            </td>
            <td
              className={"questionTooltip " + answers["6c2"]}
              data-pr-tooltip={questions.get("6c2").questionBody}
              data-pr-position="left"
            >
              6c2
            </td>
            <td
              className={"questionTooltip " + answers["6c3"]}
              data-pr-tooltip={questions.get("6c3").questionBody}
              data-pr-position="left"
            >
              6c3
            </td>
            <td
              className={"questionTooltip " + answers["6c4"]}
              data-pr-tooltip={questions.get("6c4").questionBody}
              data-pr-position="left"
            >
              6c4
            </td>
            <td
              className={"questionTooltip " + answers["6c5"]}
              data-pr-tooltip={questions.get("6c5").questionBody}
              data-pr-position="left"
            >
              6c5
            </td>
            <td colSpan="3">&nbsp;</td>
          </tr>
          <tr>
            <td>Safety considerations</td>
            <td>
              <b>6d</b>
            </td>
            <td></td>
            <td
              className={"questionTooltip " + answers["6d1"]}
              data-pr-tooltip={questions.get("6d1").questionBody}
              data-pr-position="left"
            >
              6d1
            </td>
            <td
              className={"questionTooltip " + answers["6d2"]}
              data-pr-tooltip={questions.get("6d2").questionBody}
              data-pr-position="left"
            >
              6d2
            </td>
            <td
              className={"questionTooltip " + answers["6d3"]}
              data-pr-tooltip={questions.get("6d3").questionBody}
              data-pr-position="left"
            >
              6d3
            </td>
            <td
              className={"questionTooltip " + answers["6d4"]}
              data-pr-tooltip={questions.get("6d4").questionBody}
              data-pr-position="left"
            >
              6d4
            </td>
            <td colSpan="4">&nbsp;</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TargetGrid;
