export const toolbarBtnStyle = (active, color) => ({
  padding: "4px 8px",
  border: active ? "1px solid " + color : "1px solid transparent",
  borderRadius: 4,
  background: active ? "#DEEBFF" : "none",
  cursor: "pointer",
  fontSize: 13,
  fontWeight: 700,
  color: active ? color : "#172B4D",
  fontFamily: "Inter, sans-serif",
  transition: "all 0.1s",
});