export const initialState = {
  docs: [],
  activeDocId: null,
  activeUsers: [],
  saveStatus: "saved", // "saved" | "saving" | "unsaved"
  versions: {},        // { docId: [{ id, content, savedAt }] }
  toast: null,
};

export function docReducer(state, action) {
  switch (action.type) {

    case "INIT_DOCS":
      return {
        ...state,
        docs: action.payload,
        activeDocId: action.payload[0]?.id || null,
        versions: action.payload.reduce((acc, doc) => {
          acc[doc.id] = [{
            id: `v-${Date.now()}`,
            content: doc.content,
            title: doc.title,
            savedAt: doc.updatedAt,
          }];
          return acc;
        }, {}),
      };

    case "SET_ACTIVE_DOC":
      return { ...state, activeDocId: action.payload };

    case "UPDATE_CONTENT":
      return {
        ...state,
        saveStatus: "unsaved",
        docs: state.docs.map((d) =>
          d.id === action.payload.id
            ? { ...d, content: action.payload.content, updatedAt: Date.now() }
            : d
        ),
      };

    case "UPDATE_TITLE":
      return {
        ...state,
        saveStatus: "unsaved",
        docs: state.docs.map((d) =>
          d.id === action.payload.id
            ? { ...d, title: action.payload.title, updatedAt: Date.now() }
            : d
        ),
      };

    case "SAVE_DOC": {
      const doc = state.docs.find((d) => d.id === action.payload);
      if (!doc) return state;
      const prevVersions = state.versions[doc.id] || [];
      const newVersion = {
        id: `v-${Date.now()}`,
        content: doc.content,
        title: doc.title,
        savedAt: Date.now(),
      };
      return {
        ...state,
        saveStatus: "saved",
        versions: {
          ...state.versions,
          [doc.id]: [newVersion, ...prevVersions].slice(0, 20),
        },
      };
    }

    case "SET_SAVE_STATUS":
      return { ...state, saveStatus: action.payload };

    case "RESTORE_VERSION":
      return {
        ...state,
        saveStatus: "unsaved",
        docs: state.docs.map((d) =>
          d.id === action.payload.docId
            ? { ...d, content: action.payload.content, title: action.payload.title, updatedAt: Date.now() }
            : d
        ),
      };

    case "ADD_DOC": {
      const newDoc = {
        id: `doc-${Date.now()}`,
        title: "Untitled Document",
        content: "<p>Start typing...</p>",
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };
      return {
        ...state,
        docs: [newDoc, ...state.docs],
        activeDocId: newDoc.id,
        versions: { ...state.versions, [newDoc.id]: [] },
      };
    }

    case "DELETE_DOC": {
      const remaining = state.docs.filter((d) => d.id !== action.payload);
      return {
        ...state,
        docs: remaining,
        activeDocId: remaining[0]?.id || null,
      };
    }

    case "SET_ACTIVE_USERS":
      return { ...state, activeUsers: action.payload };

    case "SHOW_TOAST":
      return { ...state, toast: action.payload };

    case "HIDE_TOAST":
      return { ...state, toast: null };

    default:
      return state;
  }
}