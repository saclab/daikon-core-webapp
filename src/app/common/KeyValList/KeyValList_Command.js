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

export function _command_contextMenuHighlightAllChangesCommand(
  fetchHistory,
  setHighlightRecentChanges,
  setHighlightAllChanges
) {
  fetchHistory();
  setHighlightRecentChanges(false);
  setHighlightAllChanges(true);
  // localStorage.setItem("_local_HighlightRecentChanges", false)
  // localStorage.setItem("_local_HighlightAllChanges", true)
}

export function _command_contextMenuHighlightRecentChangesCommand(
  fetchHistory,
  setHighlightRecentChanges,
  setHighlightAllChanges
) {
  fetchHistory();
  setHighlightAllChanges(false);
  setHighlightRecentChanges(true);
  // localStorage.setItem("_local_HighlightRecentChanges", true)
  // localStorage.setItem("_local_HighlightAllChanges", false)
}

export function _command_contextMenuClearHighlightsCommand(
  setHighlightAllChanges,
  setHighlightRecentChanges
) {
  setHighlightAllChanges(false);
  setHighlightRecentChanges(false);
  localStorage.removeItem("_local_HighlightRecentChanges");
  localStorage.removeItem("_local_HighlightAllChanges");
}

export function _command_contextMenuEditCommand(setDisplayEditContainer) {
  setDisplayEditContainer(true);
}
