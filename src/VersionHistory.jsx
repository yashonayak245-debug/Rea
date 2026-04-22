import { COLORS } from "../../data/initialData";

const timeAgo = (ts) => {
  const diff = Date.now() - ts;
  if (diff < 60000) return "just now";
  if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
  if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
  return `${Math.floor(diff / 86400000)}d ago`;
};

export const VersionHistory = ({ versions = [], onRestore }) => (
  <div>
    <div style={{
      fontSize: 10, fontWeight: 700, textTransform: "uppercase",
      letterSpacing: 0.8, color: COLORS.textHint,
      padding: "12px 16px 6px", fontFamily: "'Inter', sans-serif",
    }}>Version History</div>

    {versions.length === 0 && (
      <div style={{ padding: "8px 16px", fontSize: 12, color: COLORS.textHint, fontFamily: "'Inter', sans-serif" }}>
        No versions yet
      </div>
    )}

    {versions.map((v, i) => (
      <div key={v.id} style={{
        padding: "8px 16px", cursor: "pointer",
        borderLeft: i === 0 ? `3px solid ${COLORS.blue}` : "3px solid transparent",
        background: i === 0 ? COLORS.blueLight : "none",
        transition: "background 0.1s",
      }}
        onMouseEnter={e => { if (i !== 0) e.currentTarget.style.background = COLORS.bg; }}
        onMouseLeave={e => { if (i !== 0) e.currentTarget.style.background = "none"; }}
        onClick={() => i !== 0 && onRestore(v)}
      >
        <div style={{ fontSize: 12, fontWeight: 600, color: COLORS.text, fontFamily: "'Inter', sans-serif" }}>
          {i === 0 ? "Current" : `Version ${versions.length - i}`}
        </div>
        <div style={{ fontSize: 11, color: COLORS.textMuted, fontFamily: "'Inter', sans-serif" }}>
          {timeAgo(v.savedAt)}
        </div>
      </div>
    ))}
  </div>
);