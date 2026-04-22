import { useState } from "react";
import { COLORS } from "../data/initialData";

export const Login = ({ onLogin }) => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [showPw, setShowPw] = useState(false);
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const errs = {};
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email))
      errs.email = "Please enter a valid email address.";
    if (form.password.length < 6)
      errs.password = "Password must be at least 6 characters.";
    return errs;
  };

  const handleLogin = () => {
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setSuccess(true);
    setTimeout(() => onLogin(), 1000);
  };

  const inputStyle = {
    width: "100%", padding: "9px 12px",
    border: "1px solid #DFE1E6", borderRadius: 6,
    fontSize: 14, fontFamily: "Inter, sans-serif",
    color: COLORS.text, outline: "none",
    boxSizing: "border-box", background: "#fff",
  };

  return (
    <div style={{
      minHeight: "100vh", background: COLORS.bg,
      display: "flex", alignItems: "center",
      justifyContent: "center", padding: 16,
      fontFamily: "Inter, sans-serif",
    }}>
      <div style={{
        background: "#fff", borderRadius: 12,
        border: "1px solid #DFE1E6", padding: 32,
        width: "100%", maxWidth: 400,
        boxShadow: "0 4px 24px rgba(9,30,66,0.08)",
      }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 24 }}>
          <div style={{
            background: COLORS.blue, borderRadius: 8,
            width: 36, height: 36,
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#fff", fontWeight: 800, fontSize: 18,
          }}>C</div>
          <span style={{ fontWeight: 800, fontSize: 20, color: COLORS.text }}>CollabDocs</span>
        </div>

        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <div style={{ fontWeight: 700, fontSize: 18, color: COLORS.text, marginBottom: 4 }}>
            Log in to your account
          </div>
          <div style={{ fontSize: 13, color: COLORS.textMuted }}>
            Welcome back! Enter your details below.
          </div>
        </div>

        {success && (
          <div style={{
            background: COLORS.greenLight, color: COLORS.green,
            borderRadius: 6, padding: "10px 14px", marginBottom: 16,
            fontSize: 13, fontWeight: 600,
          }}>✓ Logged in! Redirecting...</div>
        )}

        {/* Email */}
        <div style={{ marginBottom: 14 }}>
          <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: COLORS.text, marginBottom: 5 }}>
            Email address
          </label>
          <input
            style={{ ...inputStyle, borderColor: errors.email ? COLORS.red : "#DFE1E6" }}
            type="email" placeholder="you@example.com"
            value={form.email}
            onChange={(e) => { setForm({ ...form, email: e.target.value }); setErrors({ ...errors, email: "" }); }}
          />
          {errors.email && <div style={{ fontSize: 11, color: COLORS.red, marginTop: 4 }}>{errors.email}</div>}
        </div>

        {/* Password */}
        <div style={{ marginBottom: 20 }}>
          <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: COLORS.text, marginBottom: 5 }}>
            Password
          </label>
          <div style={{ position: "relative" }}>
            <input
              style={{ ...inputStyle, paddingRight: 40, borderColor: errors.password ? COLORS.red : "#DFE1E6" }}
              type={showPw ? "text" : "password"}
              placeholder="Enter your password"
              value={form.password}
              onChange={(e) => { setForm({ ...form, password: e.target.value }); setErrors({ ...errors, password: "" }); }}
            />
            <button onClick={() => setShowPw(s => !s)} style={{
              position: "absolute", right: 10, top: "50%",
              transform: "translateY(-50%)",
              border: "none", background: "none",
              cursor: "pointer", color: COLORS.textMuted, fontSize: 14,
            }}>{showPw ? "🙈" : "👁"}</button>
          </div>
          {errors.password && <div style={{ fontSize: 11, color: COLORS.red, marginTop: 4 }}>{errors.password}</div>}
        </div>

        <button onClick={handleLogin} style={{
          width: "100%", padding: "10px",
          background: COLORS.blue, color: "#fff",
          border: "none", borderRadius: 6,
          fontSize: 14, fontWeight: 700,
          cursor: "pointer", fontFamily: "Inter, sans-serif",
        }}>Log in</button>

        <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "18px 0" }}>
          <div style={{ flex: 1, height: 1, background: COLORS.border }} />
          <span style={{ fontSize: 12, color: COLORS.textMuted }}>or</span>
          <div style={{ flex: 1, height: 1, background: COLORS.border }} />
        </div>

        <button style={{
          width: "100%", padding: "9px",
          background: "#fff", border: "1px solid #DFE1E6",
          borderRadius: 6, fontSize: 14, cursor: "pointer",
          fontFamily: "Inter, sans-serif",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
        }}>
          <img src="https://www.google.com/favicon.ico" width={16} height={16} alt="G" />
          Continue with Google
        </button>

        <div style={{ textAlign: "center", marginTop: 18, fontSize: 13, color: COLORS.textMuted }}>
          Don't have an account?{" "}
          <span style={{ color: COLORS.blue, cursor: "pointer", fontWeight: 600 }}>Sign up free</span>
        </div>
      </div>
    </div>
  );
};