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
      <Link to="/" style={linkStyle("/")}>Register</Link>
      <Link to="/login" style={linkStyle("/login")}>Login</Link>
      <Link to="/apply" style={linkStyle("/apply")}>Apply</Link>
      <Link to="/dashboard" style={linkStyle("/dashboard")}>Dashboard</Link>
      <Link to="/Admin" style={linkStyle("/Admin")}>Admin</Link>
      <Link to="/profile" style={linkStyle("/profile")}>Profile</Link>
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
        <Route path="/Admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
