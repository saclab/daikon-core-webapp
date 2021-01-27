import React from "react";

import "./KeyValueList.css";

const KeyValList = ({ data }) => {
  // console.log("KeyValList");
  // console.log(data);

  const res = Object.keys(data).map((key, value) => (
    <tr key={key}>
      <td>
        <b>{key}</b>
      </td>
      <td>{data[key]}</td>
    </tr>
  ));
  return (
    <table className="KeyValueListTable">
      <tbody>{res}</tbody>
    </table>
  );
};

export default KeyValList;
