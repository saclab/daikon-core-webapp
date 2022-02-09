/* helpers */
export function _helper_associatedGenesAccessionNumbersToArray(target) {
  let accessionNos = [];
  accessionNos = [...target.targetGenes.map((gene) => gene.accessionNumber)];
  return accessionNos;
}
