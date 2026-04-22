import { useRef, useEffect } from "react";
import { Toolbar } from "./Toolbar";
import { COLORS } from "../../data/initialData";

export const Editor = ({ doc, onContentChange, onTitleChange }) => {
  const editorRef = useRef(null);

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== doc.content) {
      editorRef.current.innerHTML = doc.content;
    }
  }, [doc.id]);

  const handleInput = () => {
    if (editorRef.current) {
      onContentChange(editorRef.current.innerHTML);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", flex: 1, overflow: "hidden" }}>
      <Toolbar />
      <div style={{ flex: 1, overflowY: "auto", padding: "32px 60px", background: COLORS.bg }}>
        {/* Title */}
        <input
          value={doc.title}
          onChange={(e) => onTitleChange(e.target.value)}
          placeholder="Untitled Document"
          style={{
            width: "100%", border: "none", outline: "none",
            fontSize: 32, fontWeight: 800, color: COLORS.text,
            background: "transparent", marginBottom: 24,
            fontFamily: "'Inter', sans-serif",
            borderBottom: `2px solid transparent`,
          }}
          onFocus={e => e.target.style.borderBottomColor = COLORS.border}
          onBlur={e => e.target.style.borderBottomColor = "transparent"}
        />

        {/* Editor canvas */}
        <div
          ref={editorRef}
          contentEditable
          suppressContentEditableWarning
          onInput={handleInput}
          style={{
            minHeight: 400, outline: "none",
            fontSize: 15, lineHeight: 1.8,
            color: COLORS.text, fontFamily: "'Inter', sans-serif",
            caretColor: COLORS.blue,
          }}
        />
      </div>
    </div>
  );
};