import type { NodeExtend } from "./list";

export function getNodeStatusColor(
  status: NodeExtend["data"]["status"],
  isDarkMode = false
) {
  const lightColors = {
    new: "#d1e7dd", // Soft green
    conditional: "#fff3cd", // Soft yellow
    "must-do": "#f8d7da", // Soft red
    "if-time": "#dbe9f1", // Soft blue
    default: "#f0f0f0", // Neutral gray for undefined statuses
  };

  const darkColors = {
    new: "#4a7a63", // Darker green
    conditional: "#7a6a35", // Darker yellow
    "must-do": "#7a3d3d", // Darker red
    "if-time": "#4a6a7a", // Darker blue
    default: "#3a3a3a", // Darker gray for undefined statuses
  };

  const colors = isDarkMode ? darkColors : lightColors;
  return colors[status] || colors.default;
}
