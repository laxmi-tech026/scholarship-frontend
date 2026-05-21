import { useState } from "react";
import { useLocation } from "react-router-dom";

function Apply() {
  const location = useLocation();
  const [form, setForm] = useState({
    name: "",
    email: "",
    course: location.state?.course || "",
    income: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const response = await fetch("https://scholarship-backend-waaq.onrender.com/apply", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });
    const data = await response.text();
    alert(data);
  };

  return (
    <div className="container">
      <h2>Apply for Scholarship</h2>
      <div className="auth-form" style={{ maxWidth: "520px" }}>
        <form onSubmit={handleSubmit}>
          <label>Full Name</label>
          <input type="text" name="name" placeholder="Enter your full name" onChange={handleChange} />

          <label>Email Address</label>
          <input type="email" name="email" placeholder="Enter your email" onChange={handleChange} />

          <label>Course Applied For</label>
          <input type="text" name="course" value={form.course} readOnly />

          <label>Annual Family Income (₹)</label>
          <input type="number" name="income" placeholder="Enter annual income" onChange={handleChange} />

          <button type="submit" style={{ width: "100%", marginTop: "24px", padding: "13px", background: "#f5a623" }}>
            Submit Application
          </button>
        </form>
      </div>
    </div>
  );
}

export default Apply;
