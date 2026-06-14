import { BrowserRouter, Routes, Route, Link, useLocation, useNavigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Apply from "./pages/Apply";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Profile from "./pages/Profile";

function Sidebar() {
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

  const linkStyle = (path) => ({
    display: "flex",
    alignItems: "center",
    gap: "10px",
    color: location.pathname === path ? "#fff" : "rgba(255,255,255,0.7)",
    textDecoration: "none",
    fontWeight: location.pathname === path ? "700" : "400",
    fontSize: "15px",
    padding: "11px 16px",
    borderRadius: "9px",
    background: location.pathname === path ? "rgba(255,255,255,0.15)" : "transparent",
    transition: "all 0.2s",
    marginBottom: "4px",
  });

  return (
    <div style={{
      width: "220px", minHeight: "100vh", background: "#0f4c75",
      position: "fixed", top: 0, left: 0, display: "flex",
      flexDirection: "column", padding: "24px 16px", zIndex: 100,
      boxShadow: "2px 0 12px rgba(15,76,117,0.18)"
    }}>
      <div style={{ textAlign: "center", marginBottom: "32px" }}>
        <div style={{ fontSize: "32px" }}>🎓</div>
        <div style={{ color: "#fff", fontWeight: "700", fontSize: "16px", marginTop: "8px" }}>
          Scholarship Portal
        </div>
      </div>

      {role === "user" && (
        <>
          <Link to="/home" style={linkStyle("/home")}>🏠 Home</Link>
          <Link to="/apply" style={linkStyle("/apply")}>📝 Apply</Link>
          <Link to="/dashboard" style={linkStyle("/dashboard")}>📊 Dashboard</Link>
          <Link to="/profile" style={linkStyle("/profile")}>👤 Profile</Link>
        </>
      )}
      {role === "admin" && (
        <Link to="/Admin" style={linkStyle("/Admin")}>⚙️ Admin Panel</Link>
      )}

      <div style={{ marginTop: "auto" }}>
        <button onClick={logout} style={{
          width: "100%", background: "#c0392b", color: "#fff",
          border: "none", padding: "11px", borderRadius: "9px",
          cursor: "pointer", fontWeight: "600", fontSize: "14px"
        }}>
          🚪 Logout
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
    <nav>
      <Link to="/" style={linkStyle("/")}>Register</Link>
      <Link to="/login" style={linkStyle("/login")}>Login</Link>
    </nav>
  );
}

function Layout({ children }) {
  const token = localStorage.getItem("token");
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ marginLeft: token ? "220px" : "0", flex: 1, minHeight: "100vh" }}>
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