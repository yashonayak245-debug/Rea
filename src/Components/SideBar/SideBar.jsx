import { COLORS } from "../../data/initialData";
import { VersionHistory } from "../History/VersionHistory";

const timeAgo = (ts) => {
  const diff = Date.now() - ts;
  if (diff < 60000) return "just now";
  if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
  if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
  return `${Math.floor(diff / 86400000)}d ago`;
};

const DocList = ({ docs, activeDocId, onSelect }) => (
  <div style={{ flex: 1, overflowY: "auto" }}>
    {docs.map((doc) => (
      <div
        key={doc.id}
        onClick={() => onSelect(doc.id)}
        style={{
          padding: "8px 12px",
          cursor: "pointer",
          borderLeft: doc.id === activeDocId ? "3px solid #0052CC" : "3px solid transparent",
          background: doc.id === activeDocId ? "#DEEBFF" : "none",
          transition: "background 0.1s",
        }}
      >
        <div style={{ fontSize: 13, fontWeight: 600, color: "#172B4D", fontFamily: "Inter, sans-serif", marginBottom: 2 }}>
          {doc.title}
        </div>
        <div style={{ fontSize: 11, color: "#6B778C", fontFamily: "Inter, sans-serif" }}>
          {timeAgo(doc.updatedAt)}
        </div>
      </div>
    ))}
  </div>
);

export const Sidebar = ({ docs, activeDocId, versions, onSelect, onNewDoc, onRestore }) => (
  <aside style={{
    width: 240,
    background: "#FFFFFF",
    borderRight: "1px solid #DFE1E6",
    display: "flex",
    flexDirection: "column",
    height: "100%",
    flexShrink: 0,
  }}>
    <div style={{ padding: "14px 12px 8px", borderBottom: "1px solid #DFE1E6" }}>
      <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.8, color: "#97A0AF", marginBottom: 8, fontFamily: "Inter, sans-serif" }}>
        Documents
      </div>
      <button onClick={onNewDoc} style={{
        width: "100%",
        padding: "7px 10px",
        background: "#0052CC",
        color: "#fff",
        border: "none",
        borderRadius: 5,
        fontSize: 12,
        fontWeight: 700,
        cursor: "pointer",
        fontFamily: "Inter, sans-serif",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
      }}>+ New Document</button>
    </div>

    <DocList docs={docs} activeDocId={activeDocId} onSelect={onSelect} />

    <div style={{ borderTop: "1px solid #DFE1E6", maxHeight: 220, overflowY: "auto" }}>
      <VersionHistory versions={versions} onRestore={onRestore} />
    </div>
  </aside>
);