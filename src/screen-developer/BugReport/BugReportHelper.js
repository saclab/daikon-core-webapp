export function _helper_detect_screensize() {
  var screenSize = "";
  if (screen.width) {
    width = screen.width ? screen.width : "";
    height = screen.height ? screen.height : "";
    screenSize += "" + width + " x " + height;
  }
  return screenSize;
}
