import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("https://scholarship-backend-waaq.onrender.com/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    const data = await response.json();
    alert(data.message);
    localStorage.setItem("token", data.token);
    navigate("/home");
  };

  return (
    <div className="container">
      <h2>Welcome Back</h2>
      <div className="auth-form">
        <form onSubmit={handleSubmit}>
          <label>Email Address</label>
          <input type="email" name="email" placeholder="Enter your email" onChange={handleChange} />

          <label>Password</label>
          <input type="password" name="password" placeholder="Enter your password" onChange={handleChange} />

          <button type="submit" style={{ width: "100%", marginTop: "24px", padding: "13px" }}>
            Login
          </button>
        </form>
        <p className="form-footer">Don't have an account? <a href="/" style={{ color: "#1b6ca8", fontWeight: 600 }}>Register</a></p>
      </div>
    </div>
  );
}

export default Login;
