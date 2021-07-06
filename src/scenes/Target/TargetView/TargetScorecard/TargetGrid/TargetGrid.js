import React from "react";
import { Tooltip } from "primereact/tooltip";

import "./TargetGrid.css";

const TargetGrid = () => {
  let questions = {
    q2a1: "Humans-Contributes to durable cure?",
    q2a1b: "Humans-Active in EBA?",
  };

  let answers = {
    a2aPercentage: 0.85,
    a2a1: "greenCell",
    a2a1b: "yellowCell",
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
            className={"questionTooltip "+answers.a2a1}
            data-pr-tooltip={questions.q2a1}
            data-pr-position="left"
          >
            2a1
          </td>

          <td
            className={"questionTooltip "+answers.a2a1b}
            data-pr-tooltip={questions.q2a1b}
            data-pr-position="left"
          >
            2a1b
          </td>
          <td className="redCell">2a2</td>
          <td className="grayCell">2a3a</td>
          <td>2a3b</td>
          <td>2a4a</td>
          <td>2a4b</td>
          <td>2a5</td>
        </tr>
        <tr>
          <td>On replicating Mtb in vitro</td>
          <td>
            <b>2b</b>
          </td>
          <td>1.00</td>
          <td>2b1</td>
          <td>2b2</td>
          <td>2b4</td>
          <td colspan="5">&nbsp;</td>
        </tr>
        <tr>
          <td>On non repliating Mtb in vitro</td>
          <td>
            <b>2c</b>
          </td>
          <td>1.00</td>
          <td>2c1</td>
          <td>2c2</td>
          <td>2c3</td>
          <td>2c4</td>
          <td>2c5</td>
          <td colspan="3">&nbsp;</td>
        </tr>
        <tr>
          <td colspan="2">
            Chemical inhibition-evidence for on target activity
          </td>

          <td>
            <b>3</b>
          </td>
          <td>0.92</td>
          <td>3a1</td>
          <td>3a2</td>
          <td>3a3</td>
          <td>3a4</td>
          <td>3b1</td>
          <td>3b2</td>
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
          <td>0.01</td>
          <td>4a1</td>
          <td>4a2a</td>
          <td>4a2b</td>
          <td>4a3a</td>
          <td>4a3b</td>
          <td>4a4</td>
          <td colspan="2">&nbsp;</td>
        </tr>
        <tr>
          <td>On replicating Mtb in vitro</td>
          <td>
            <b>4b</b>
          </td>
          <td>0.78</td>
          <td>4b1</td>
          <td>4b2</td>
          <td>4b4</td>
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
