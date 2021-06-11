export function _helper_extractPdbCrossReference(fetchedPdbCrossReference) {
  let fetchedPdbCrossReferenceArray = [];
  /*
    Uniprot handled 
    1. fetchedPdbCrossReference.uniprot.entry returns an object or an array
        so we are checking both the cases, if array we are looping over all the entries
    2. !EXCEPTION : entry.accession sometimes is returned as an array. There is absolutely NO way to 
        link this to the corresponding chains to from the href, we are always defaulting to the
        first element in the array. Links might break.
           */
  // 1 check if entry is array

  if (Array.isArray(fetchedPdbCrossReference.uniprot.entry)) {
    fetchedPdbCrossReference.uniprot.entry.forEach((entry) => {
      entry.dbReference.forEach((obj) => {
        if (obj._attributes.type === "PDB") {
          let nobj = {
            id: null,
            method: null,
            resolution: null,
            chains: null,
            accession: null,
            ligands: [],
          };
          nobj.id = obj._attributes.id;
          nobj.accession = Array.isArray(entry.accession)
            ? entry.accession[0]._text
            : entry.accession._text;
          obj.property.forEach((subObj) => {
            if (subObj._attributes.type === "method")
              nobj.method = subObj._attributes.value;
            if (subObj._attributes.type === "resolution")
              nobj.resolution = subObj._attributes.value;
            if (subObj._attributes.type === "chains")
              nobj.chains = subObj._attributes.value;
          });

          fetchedPdbCrossReferenceArray.push(nobj);
        }
      });
    });
  } else {
    fetchedPdbCrossReference.uniprot.entry.dbReference.forEach((obj) => {
      if (obj._attributes.type === "PDB") {
        let nobj = {
          id: null,
          method: null,
          resolution: null,
          chains: null,
          accession: null,
          ligands: [],
        };
        nobj.id = obj._attributes.id;
        nobj.accession = Array.isArray(
          fetchedPdbCrossReference.uniprot.entry.accession
        )
          ? fetchedPdbCrossReference.uniprot.entry.accession[0]._text
          : fetchedPdbCrossReference.uniprot.entry.accession._text;
        obj.property.forEach((subObj) => {
          if (subObj._attributes.type === "method")
            nobj.method = subObj._attributes.value;
          if (subObj._attributes.type === "resolution")
            nobj.resolution = subObj._attributes.value;
          if (subObj._attributes.type === "chains")
            nobj.chains = subObj._attributes.value;
        });

        fetchedPdbCrossReferenceArray.push(nobj);
      }
    });
  }

  return fetchedPdbCrossReferenceArray;
}

const arrToInstanceCountObj = arr => arr.reduce((obj, e) => {
  obj[e] = (obj[e] || 0) + 1;
  return obj;
}, {});





export function _helper_formatLigands(unformatedLigands) {
  
  let ligands = [];
  unformatedLigands[Object.keys(unformatedLigands)[0]].forEach((ligand) => {
    ligands.push(ligand.chem_comp_name);
  });
  
  let formatedLigands = arrToInstanceCountObj(ligands);

  
  return formatedLigands;
}



