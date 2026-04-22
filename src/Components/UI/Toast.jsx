import { COLORS } from "../../data/initialData";

export const Toast = ({ toast }) => {
  if (!toast) return null;
  const bg = toast.type === "success" ? COLORS.greenLight
    : toast.type === "info" ? COLORS.blueLight
    : COLORS.redLight;
  const color = toast.type === "success" ? COLORS.green
    : toast.type === "info" ? COLORS.blue
    : COLORS.red;

  return (
    <div style={{
      position: "fixed", bottom: 24, right: 24,
      background: bg, color, border: `1px solid ${color}`,
      borderRadius: 8, padding: "10px 18px",
      fontSize: 13, fontWeight: 600,
      boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
      zIndex: 9999, fontFamily: "'Inter', sans-serif",
      animation: "fadeIn 0.2s ease",
    }}>{toast.message}</div>
  );
};