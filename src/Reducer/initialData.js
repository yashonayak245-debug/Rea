export const INITIAL_DOCS = [
  {
    id: "doc-1",
    title: "Getting Started",
    content: "<h1>Welcome to CollabDocs</h1><p>Start typing to edit this document...</p>",
    createdAt: Date.now() - 86400000,
    updatedAt: Date.now() - 3600000,
  },
  {
    id: "doc-2",
    title: "Meeting Notes",
    content: "<h1>Meeting Notes</h1><p>Add your meeting notes here...</p>",
    createdAt: Date.now() - 172800000,
    updatedAt: Date.now() - 7200000,
  },
  {
    id: "doc-3",
    title: "Project Plan",
    content: "<h1>Project Plan</h1><p>Outline your project here...</p>",
    createdAt: Date.now() - 259200000,
    updatedAt: Date.now() - 10800000,
  },
];

export const INITIAL_USERS = [
  { id: "U1", name: "Alex Johnson", color: "#0052CC", initials: "AJ" },
  { id: "U2", name: "Sara Mills",   color: "#00875A", initials: "SM" },
  { id: "U3", name: "Tom Parker",   color: "#FF5630", initials: "TP" },
  { id: "U4", name: "Nina Ross",    color: "#6554C0", initials: "NR" },
];

export const CURRENT_USER = INITIAL_USERS[0];

export const COLORS = {
  bg: "#F7F8F9",
  surface: "#FFFFFF",
  border: "#DFE1E6",
  blue: "#0052CC",
  blueLight: "#DEEBFF",
  blueMid: "#2684FF",
  text: "#172B4D",
  textMuted: "#6B778C",
  textHint: "#97A0AF",
  green: "#00875A",
  greenLight: "#E3FCEF",
  greenMid: "#36B37E",
  red: "#DE350B",
  redLight: "#FFEBE6",
  purple: "#6554C0",
  purpleLight: "#EAE6FF",
};