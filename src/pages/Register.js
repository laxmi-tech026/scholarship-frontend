import { useState } from "react";

function Register() {
  const [user, setUser] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    const data = await response.text();
    alert(data);
  };

  return (
    <div className="container">
      <h2>Create Account</h2>
      <div className="auth-form">
        <form onSubmit={handleSubmit}>
          <label>Full Name</label>
          <input type="text" name="name" placeholder="Enter your name" onChange={handleChange} />

          <label>Email Address</label>
          <input type="email" name="email" placeholder="Enter your email" onChange={handleChange} />

          <label>Password</label>
          <input type="password" name="password" placeholder="Create a password" onChange={handleChange} />

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
