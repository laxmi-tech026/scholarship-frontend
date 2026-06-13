import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API = "https://scholarship-backend-waaq.onrender.com";

function Dashboard() {
  const [application, setApplication] = useState(null);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    alert("Logout Successful");
    navigate("/login");
  };

  useEffect(() => {
    fetch(`${API}/my-application`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((res) => res.json())
      .then((data) => setApplication(data));
  }, []);

  const getStatusClass = (status) => {
    if (status === "approved") return "status-approved";
    if (status === "rejected") return "status-rejected";
    return "status-pending";
  };

  return (
    <div className="container">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "28px" }}>
        <h2 style={{ margin: 0 }}>Student Dashboard</h2>
        <button onClick={logout} style={{ background: "#c0392b", padding: "10px 20px" }}>
          Logout
        </button>
      </div>

      <hr />
      <h3>My Application</h3>

      {application ? (
        <div className="application-item">
          <p><strong>Name:</strong> {application.name}</p>
          <p><strong>Course:</strong> {application.course}</p>
          <p><strong>Income:</strong> ₹{application.income}</p>
          <p>
            <strong>Status:</strong>{" "}
            <span className={getStatusClass(application.status)}>{application.status}</span>
          </p>
          {application.document && (
            <p>
              <strong>Document:</strong>{" "}
              <a href={`${API}/uploads/${application.document}`} target="_blank" rel="noreferrer"
                style={{ color: "#1b6ca8", fontWeight: 600 }}>
                View Document
              </a>
            </p>
          )}
        </div>
      ) : (
        <p style={{ textAlign: "center", padding: "32px 0", color: "#94a3b8" }}>
          No application found. <a href="/home" style={{ color: "#1b6ca8" }}>Apply now →</a>
        </p>
      )}
    </div>
  );
}

export default Dashboard;