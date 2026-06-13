import { useState } from "react";

const API = "https://scholarship-backend-waaq.onrender.com";

function Register() {
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    const response = await fetch(`${API}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...user, role: "user" }),
    });
    const data = await response.json();
    alert(data.message);
  };

  return (
    <div className="container">
      <h2>Create Account</h2>
      <div className="auth-form">
        <form onSubmit={handleSubmit}>
          <label>Full Name</label>
          <input type="text" name="name" placeholder="Enter your name" onChange={handleChange} required />

          <label>Email Address</label>
          <input type="email" name="email" placeholder="Enter your email" onChange={handleChange} required />

          <label>Password (min 6 characters)</label>
          <input type="password" name="password" placeholder="Minimum 6 characters" onChange={handleChange} required />
          {error && <p style={{ color: "red", fontSize: "13px", margin: "2px 0" }}>{error}</p>}

          <button type="submit" style={{ width: "100%", marginTop: "24px", padding: "13px" }}>
            Register
          </button>
        </form>
        <p className="form-footer">Already have an account? <a href="/login" style={{ color: "#1b6ca8", fontWeight: 600 }}>Login</a></p>
      </div>
    </div>
  );
}

export default Register;