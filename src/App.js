import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Apply from "./pages/Apply";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Profile from "./pages/Profile";

function NavBar() {
  const location = useLocation();
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");

  const linkStyle = (path) => ({
    color: location.pathname === path ? "#fff" : "rgba(255,255,255,0.75)",
    textDecoration: "none",
    fontWeight: location.pathname === path ? "700" : "500",
    fontSize: "15px",
    padding: "8px 14px",
    borderRadius: "8px",
    background: location.pathname === path ? "rgba(255,255,255,0.15)" : "transparent",
    transition: "all 0.2s",
  });

  return (
    <nav>
      {!token && <Link to="/" style={linkStyle("/")}>Register</Link>}
      {!token && <Link to="/login" style={linkStyle("/login")}>Login</Link>}
      {token && role === "user" && <Link to="/home" style={linkStyle("/home")}>Home</Link>}
      {token && role === "user" && <Link to="/apply" style={linkStyle("/apply")}>Apply</Link>}
      {token && role === "user" && <Link to="/dashboard" style={linkStyle("/dashboard")}>Dashboard</Link>}
      {token && role === "user" && <Link to="/profile" style={linkStyle("/profile")}>Profile</Link>}
      {token && role === "admin" && <Link to="/Admin" style={linkStyle("/Admin")}>Admin Panel</Link>}
    </nav>
  );
}

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/apply" element={<ProtectedRoute><Apply /></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/Admin" element={<ProtectedRoute adminOnly={true}><Admin /></ProtectedRoute>} />
        <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
