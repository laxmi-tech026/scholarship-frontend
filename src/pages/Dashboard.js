import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [application, setApplication] = useState([]);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    alert("Logout Successful");
    navigate("/login");
  };

  useEffect(() => {
    fetch("https://scholarship-backend-waaq.onrender.com/application", {
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
        <button
          onClick={logout}
          style={{ background: "#c0392b", padding: "10px 20px" }}
        >
          Logout
        </button>
      </div>

      <hr />
      <h3>My Applications</h3>

      {application.length === 0 ? (
        <p style={{ textAlign: "center", padding: "32px 0", color: "#94a3b8" }}>
          No applications found.
        </p>
      ) : (
        application.map((item, index) => (
          <div className="application-item" key={index}>
            <p><strong>Name:</strong> {item.name}</p>
            <p><strong>Course:</strong> {item.course}</p>
            <p>
              <strong>Status:</strong>{" "}
              <span className={getStatusClass(item.status)}>{item.status}</span>
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default Dashboard;
