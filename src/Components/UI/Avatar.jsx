export const Avatar = ({ user, size = 32, style = {} }) => (
  <div title={user.name} style={{
    width: size, height: size, borderRadius: "50%",
    background: user.color, color: "#fff",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: size * 0.35, fontWeight: 700, flexShrink: 0,
    fontFamily: "'Inter', sans-serif", cursor: "default",
    ...style,
  }}>{user.initials}</div>
);