import { COLORS } from "../../data/initialData";

const btnStyle = {
  padding: "4px 8px",
  border: "1px solid transparent",
  borderRadius: 4,
  background: "none",
  cursor: "pointer",
  fontSize: 13,
  fontWeight: 700,
  color: "#172B4D",
  fontFamily: "Inter, sans-serif",
  transition: "all 0.1s",
};

const Btn = ({ label, cmd, arg, title }) => {
  const exec = () => document.execCommand(cmd, false, arg);
  return (
    <button
      onMouseDown={(e) => { e.preventDefault(); exec(); }}
      title={title || label}
      style={btnStyle}
      onMouseEnter={e => { e.currentTarget.style.background = COLORS.blueLight; }}
      onMouseLeave={e => { e.currentTarget.style.background = "none"; }}
    >{label}</button>
  );
};

export const Toolbar = () => (
  <div style={{
    display: "flex", alignItems: "center", gap: 2,
    padding: "6px 16px", borderBottom: "1px solid #DFE1E6",
    background: "#FFFFFF", flexWrap: "wrap",
  }}>
    <Btn label="B" cmd="bold" title="Bold" />
    <Btn label="I" cmd="italic" title="Italic" />
    <Btn label="U" cmd="underline" title="Underline" />
    <div style={{ width: 1, height: 20, background: "#DFE1E6", margin: "0 4px" }} />
    <Btn label="H1" cmd="formatBlock" arg="H1" title="Heading 1" />
    <Btn label="H2" cmd="formatBlock" arg="H2" title="Heading 2" />
    <Btn label="H3" cmd="formatBlock" arg="H3" title="Heading 3" />
    <div style={{ width: 1, height: 20, background: "#DFE1E6", margin: "0 4px" }} />
    <Btn label="• List" cmd="insertUnorderedList" title="Bullet List" />
    <Btn label="1. List" cmd="insertOrderedList" title="Numbered List" />
    <div style={{ width: 1, height: 20, background: "#DFE1E6", margin: "0 4px" }} />
    <Btn label="↩ Undo" cmd="undo" title="Undo" />
    <Btn label="↪ Redo" cmd="redo" title="Redo" />
  </div>
);