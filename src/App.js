import { BrowserRouter, Routes, Route, Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Apply from "./pages/Apply";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Profile from "./pages/Profile";

function Sidebar({ collapsed, setCollapsed }) {
  const location = useLocation();
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  if (!token) return null;

  const navItems = role === "admin"
    ? [{ path: "/Admin", label: "Admin Panel", icon: "⚙️" }]
    : [
        { path: "/home", label: "Home", icon: "🏠" },
        { path: "/apply", label: "Apply", icon: "📝" },
        { path: "/dashboard", label: "Dashboard", icon: "📊" },
        { path: "/profile", label: "Profile", icon: "👤" },
      ];

  return (
    <div style={{
      width: collapsed ? "64px" : "220px",
      minHeight: "100vh",
      background: "#0f4c75",
      position: "fixed", top: 0, left: 0,
      display: "flex", flexDirection: "column",
      padding: "16px 8px",
      zIndex: 100,
      boxShadow: "2px 0 12px rgba(15,76,117,0.2)",
      transition: "width 0.25s ease",
      overflow: "hidden",
    }}>
      {/* Toggle Button */}
      <button onClick={() => setCollapsed(!collapsed)} style={{
        background: "rgba(255,255,255,0.15)",
        border: "none", color: "#fff",
        borderRadius: "8px", cursor: "pointer",
        padding: "8px", fontSize: "18px",
        marginBottom: "16px", width: "100%",
        textAlign: collapsed ? "center" : "left",
      }}>
        {collapsed ? "☰" : "✕ Close"}
      </button>

      {/* Logo */}
      {!collapsed && (
        <div style={{ textAlign: "center", marginBottom: "24px" }}>
          <div style={{ fontSize: "28px" }}>🎓</div>
          <div style={{ color: "#fff", fontWeight: "700", fontSize: "14px", marginTop: "6px" }}>
            Scholarship Portal
          </div>
        </div>
      )}
      {collapsed && <div style={{ textAlign: "center", fontSize: "28px", marginBottom: "24px" }}>🎓</div>}

      {/* Nav Links */}
      {navItems.map((item) => (
        <Link key={item.path} to={item.path} style={{
          display: "flex", alignItems: "center",
          gap: collapsed ? "0" : "10px",
          justifyContent: collapsed ? "center" : "flex-start",
          color: location.pathname === item.path ? "#fff" : "rgba(255,255,255,0.7)",
          textDecoration: "none",
          fontWeight: location.pathname === item.path ? "700" : "400",
          fontSize: "15px",
          padding: "11px 12px",
          borderRadius: "9px",
          background: location.pathname === item.path ? "rgba(255,255,255,0.15)" : "transparent",
          transition: "all 0.2s",
          marginBottom: "4px",
          whiteSpace: "nowrap",
          overflow: "hidden",
        }}>
          <span style={{ fontSize: "18px" }}>{item.icon}</span>
          {!collapsed && item.label}
        </Link>
      ))}

      {/* Logout */}
      <div style={{ marginTop: "auto" }}>
        <button onClick={logout} style={{
          width: "100%", background: "#c0392b", color: "#fff",
          border: "none", padding: "11px", borderRadius: "9px",
          cursor: "pointer", fontWeight: "600", fontSize: collapsed ? "18px" : "14px",
          display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
        }}>
          🚪{!collapsed && " Logout"}
        </button>
      </div>
    </div>
  );
}

function TopNav() {
  const location = useLocation();
  const token = localStorage.getItem("token");
  if (token) return null;

  const linkStyle = (path) => ({
    color: location.pathname === path ? "#fff" : "rgba(255,255,255,0.75)",
    textDecoration: "none",
    fontWeight: location.pathname === path ? "700" : "500",
    fontSize: "15px",
    padding: "8px 14px",
    borderRadius: "8px",
    background: location.pathname === path ? "rgba(255,255,255,0.15)" : "transparent",
  });

  return (
    <nav style={{
      background: "#0f4c75", padding: "0 32px",
      height: "64px", display: "flex", alignItems: "center",
      gap: "8px", position: "sticky", top: 0, zIndex: 100,
      boxShadow: "0 2px 12px rgba(15,76,117,0.18)",
    }}>
      <span style={{ fontSize: "22px", marginRight: "12px" }}>🎓</span>
      <Link to="/" style={linkStyle("/")}>Register</Link>
      <Link to="/login" style={linkStyle("/login")}>Login</Link>
    </nav>
  );
}

function Layout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const token = localStorage.getItem("token");
  const sidebarWidth = token ? (collapsed ? 64 : 220) : 0;

  return (
    <div style={{ display: "flex" }}>
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <div style={{
        marginLeft: `${sidebarWidth}px`,
        flex: 1, minHeight: "100vh",
        transition: "margin-left 0.25s ease",
      }}>
        <TopNav />
        {children}
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/apply" element={<ProtectedRoute><Apply /></ProtectedRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/Admin" element={<ProtectedRoute adminOnly={true}><Admin /></ProtectedRoute>} />
          <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;