import { useEffect, useReducer, useState } from "react";
import { docReducer, initialState } from "./reducer/docReducer";
import { INITIAL_DOCS, CURRENT_USER, COLORS } from "./data/initialData";
import { useAutoSave } from "./hooks/useAutoSave";
import { useCollaborators } from "./hooks/useCollaborators";
import { useVersionHistory } from "./hooks/useVersionHistory";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { Editor } from "./components/Editor/Editor";
import { ActiveUsers } from "./components/Users/ActiveUsers";
import { Toast } from "./components/UI/Toast";
import { Login } from "./components/Login";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [state, dispatch] = useReducer(docReducer, initialState);
  const { docs, activeDocId, activeUsers, saveStatus, versions, toast } = state;

  const activeDoc = docs.find((d) => d.id === activeDocId);

  useEffect(() => {
    dispatch({ type: "INIT_DOCS", payload: INITIAL_DOCS });
  }, []);

  useAutoSave(dispatch, activeDocId, docs);
  useCollaborators(dispatch);
  const { restoreVersion } = useVersionHistory(dispatch);

  const saveStatusLabel = {
    saved: "✓ Saved",
    saving: "⟳ Saving...",
    unsaved: "● Unsaved",
  }[saveStatus];

  const saveStatusColor = {
    saved: COLORS.green,
    saving: COLORS.blue,
    unsaved: COLORS.textMuted,
  }[saveStatus];

  if (!loggedIn) return <Login onLogin={() => setLoggedIn(true)} />;

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column", fontFamily: "Inter, sans-serif", background: COLORS.bg }}>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />

      {/* Navbar */}
      <nav style={{
        height: 50, background: COLORS.blue,
        display: "flex", alignItems: "center",
        padding: "0 20px", gap: 16, flexShrink: 0, zIndex: 100,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{
            width: 28, height: 28, borderRadius: 6,
            background: "rgba(255,255,255,0.2)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontWeight: 800, color: "#fff", fontSize: 14,
          }}>C</div>
          <span style={{ color: "#fff", fontWeight: 800, fontSize: 16 }}>CollabDocs</span>
        </div>

        <div style={{ flex: 1 }} />

        <ActiveUsers users={activeUsers} currentUser={CURRENT_USER} />

        <span style={{
          fontSize: 12, fontWeight: 600, color: saveStatusColor,
          background: "rgba(255,255,255,0.15)",
          padding: "4px 10px", borderRadius: 4,
        }}>{saveStatusLabel}</span>

        <button
          onClick={() => setLoggedIn(false)}
          style={{
            background: "#fff", border: "none",
            borderRadius: 4, padding: "6px 16px",
            color: COLORS.blue, fontSize: 13,
            fontWeight: 700, cursor: "pointer",
          }}>Logout</button>
      </nav>

      {/* Body */}
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        <Sidebar
          docs={docs}
          activeDocId={activeDocId}
          versions={activeDocId ? (versions[activeDocId] || []) : []}
          onSelect={(id) => dispatch({ type: "SET_ACTIVE_DOC", payload: id })}
          onNewDoc={() => dispatch({ type: "ADD_DOC" })}
          onRestore={(v) => restoreVersion(activeDocId, v)}
        />

        {activeDoc ? (
          <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
            <Editor
              doc={activeDoc}
              onContentChange={(content) =>
                dispatch({ type: "UPDATE_CONTENT", payload: { id: activeDocId, content } })
              }
              onTitleChange={(title) =>
                dispatch({ type: "UPDATE_TITLE", payload: { id: activeDocId, title } })
              }
            />
            <div style={{
              height: 32, background: COLORS.surface,
              borderTop: "1px solid #DFE1E6",
              display: "flex", alignItems: "center",
              padding: "0 20px", gap: 16,
            }}>
              <span style={{ fontSize: 11, color: COLORS.textMuted }}>
                {activeUsers.length + 1} user{activeUsers.length > 0 ? "s" : ""} editing
              </span>
              <span style={{ fontSize: 11, color: saveStatusColor, fontWeight: 600 }}>
                {saveStatusLabel}
              </span>
            </div>
          </div>
        ) : (
          <div style={{
            flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
            color: COLORS.textMuted, fontSize: 15,
          }}>Select or create a document</div>
        )}
      </div>

      <Toast toast={toast} />
    </div>
  );
}