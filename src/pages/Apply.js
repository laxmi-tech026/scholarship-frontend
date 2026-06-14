import { useState } from "react";
import { useLocation } from "react-router-dom";

const API = "https://scholarship-backend-waaq.onrender.com";

function Apply() {
  const location = useLocation();
  const [form, setForm] = useState({
    name: "", email: "", phone: "",
    course: location.state?.course || "", income: "",
  });
  const [doc, setDoc] = useState(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.phone && !/^\d{10}$/.test(form.phone)) {
      alert("Phone number must be exactly 10 digits");
      return;
    }
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("email", form.email);
    formData.append("phone", form.phone);
    formData.append("course", form.course);
    formData.append("income", form.income);
    if (doc) formData.append("document", doc);

    const response = await fetch(`${API}/apply`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    const data = await response.json();
    alert(data.message);
  };

  return (
    <div className="container">
      <h2>Apply for Scholarship</h2>
      <div className="auth-form" style={{ maxWidth: "520px" }}>
        <form onSubmit={handleSubmit}>
          <label>Full Name</label>
          <input type="text" name="name" placeholder="Enter your full name" onChange={handleChange} required />

          <label>Email Address</label>
          <input type="email" name="email" placeholder="Enter your email" onChange={handleChange} required />

          <label>Phone Number</label>
          <input type="tel" name="phone" placeholder="10-digit phone number" onChange={handleChange} maxLength={10} required />

          <label>Course Applied For</label>
          <input type="text" name="course" value={form.course} readOnly />

          <label>Annual Family Income (₹)</label>
          <input type="number" name="income" placeholder="Enter annual income" onChange={handleChange} required />

          <label>Upload Document (PDF/Image)</label>
          <input type="file" accept=".pdf,.jpg,.jpeg,.png"
            onChange={(e) => setDoc(e.target.files[0])}
            style={{ background: "#fff", cursor: "pointer" }} />
          <p style={{ fontSize: "12px", color: "#94a3b8", marginTop: "4px" }}>
            Upload income certificate, marksheet, or any relevant document
          </p>

          <button type="submit" style={{ width: "100%", marginTop: "24px", padding: "13px", background: "#f5a623" }}>
            Submit Application
          </button>
        </form>
      </div>
    </div>
  );
}

export default Apply;