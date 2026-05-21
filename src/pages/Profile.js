import { useEffect, useState } from "react";

function Profile() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/my-application", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((res) => res.json())
      .then((result) => setData(result));
  }, []);

  const getStatusClass = (status) => {
    if (status === "approved") return "status-approved";
    if (status === "rejected") return "status-rejected";
    return "status-pending";
  };

  return (
    <div className="container">
      <h2>Student Profile</h2>

      {data ? (
        <div className="scholarship-card">
          <div
            style={{
              width: "64px",
              height: "64px",
              borderRadius: "50%",
              background: "#0f4c75",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "28px",
              fontWeight: "700",
              margin: "0 auto 24px",
              fontFamily: "'Playfair Display', serif",
            }}
          >
            {data.name?.charAt(0).toUpperCase()}
          </div>

          <div className="profile-info">
            <p><span>Name</span><span>{data.name}</span></p>
            <p><span>Email</span><span>{data.email}</span></p>
            <p><span>Course</span><span>{data.course}</span></p>
            <p><span>Annual Income</span><span>₹{data.income}</span></p>
            <p>
              <span>Status</span>
              <span className={getStatusClass(data.status)}>{data.status}</span>
            </p>
          </div>
        </div>
      ) : (
        <p style={{ textAlign: "center", padding: "40px 0", color: "#94a3b8" }}>
          No application data found.
        </p>
      )}
    </div>
  );
}

export default Profile;
