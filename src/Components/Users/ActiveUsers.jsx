import { Avatar } from "../UI/Avatar";
import { COLORS } from "../../data/initialData";

export const ActiveUsers = ({ users, currentUser }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
    <span style={{ fontSize: 11, color: "rgba(255,255,255,0.7)", fontFamily: "'Inter', sans-serif" }}>
      {users.length + 1} editing
    </span>
    <div style={{ display: "flex" }}>
      <Avatar user={currentUser} size={30} style={{ border: "2px solid rgba(255,255,255,0.5)", marginLeft: 0 }} />
      {users.map((u, i) => (
        <Avatar key={u.id} user={u} size={30} style={{ border: "2px solid rgba(255,255,255,0.5)", marginLeft: -8 }} />
      ))}
    </div>
  </div>
);