export function _command_contextMenuCopyCommand(selectedId, toast) {
  // Check if selection is empty, then copy whole block
  // else copy default browser selection
  if (
    document
      .getSelection()
      .anchorNode.data.slice(
        document.getSelection().anchorOffset,
        document.getSelection().focusOffset
      ) === ""
  ) {
    var range = document.createRange();
    try {
      range.selectNode(document.getElementById(selectedId));
      window.getSelection().removeAllRanges(); // clear current selection
      window.getSelection().addRange(range); // to select text
      document.execCommand("copy");
      window.getSelection().removeAllRanges(); // to deselect
      toast.current.show({
        severity: "success",
        summary: "Copied to clipboard",
        life: 3000,
      });
    } catch {
      //console.log("cannot copy object");
      toast.current.show({
        severity: "error",
        summary: "Cannot copy objects without underlying text.",
        life: 3000,
      });
    }
  } else {
    document.execCommand("copy");
    toast.current.show({
      severity: "success",
      summary: "Copied to clipboard",
      life: 3000,
    });
  }
}

export function _command_contextMenuFetchHistoryCommand(
  fetchHistory,
  setDisplayHistorySideBar
) {
  fetchHistory();
  setDisplayHistorySideBar(true);
}

export function _command_contextMenuHilightAllChangesCommand(
  fetchHistory,
  setHilightRecentChanges,
  setHilightAllChanges
) {
  fetchHistory();
  setHilightRecentChanges(false);
  setHilightAllChanges(true);
  // localStorage.setItem("_local_HilightRecentChanges", false)
  // localStorage.setItem("_local_HilightAllChanges", true)
}

export function _command_contextMenuHilightRecentChangesCommand(
  fetchHistory,
  setHilightRecentChanges,
  setHilightAllChanges
) {
  fetchHistory();
  setHilightAllChanges(false);
  setHilightRecentChanges(true);
  // localStorage.setItem("_local_HilightRecentChanges", true)
  // localStorage.setItem("_local_HilightAllChanges", false)
}

export function _command_contextMenuClearHilightsCommand(
  setHilightAllChanges,
  setHilightRecentChanges
) {
  setHilightAllChanges(false);
  setHilightRecentChanges(false);
  localStorage.removeItem("_local_HilightRecentChanges");
  localStorage.removeItem("_local_HilightAllChanges");
}

export function _command_contextMenuEditCommand(setDisplayEditContainer) {
  setDisplayEditContainer(true);
}
