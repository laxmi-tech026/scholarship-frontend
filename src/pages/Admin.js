import { useEffect, useState } from "react";

const API = "https://scholarship-backend-waaq.onrender.com";

function Admin() {
  const [application, setApplication] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    fetch(`${API}/application`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setApplication(data);
      });
  }, []);

  const updateStatus = async (id, status) => {
    const response = await fetch(`${API}/update-status/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    const data = await response.json();
    alert(data.message);
    window.location.reload();
  };

  const getStatusClass = (status) => {
    if (status === "approved") return "status-approved";
    if (status === "rejected") return "status-rejected";
    return "status-pending";
  };

  const filtered = application
    .filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.course.toLowerCase().includes(search.toLowerCase())
    )
    .filter((item) => (filter === "" ? true : item.status === filter));

  return (
    <div className="container">
      <h2>Admin Panel</h2>

      <div style={{ display: "flex", gap: "14px", marginBottom: "24px", flexWrap: "wrap" }}>
        <input
          type="text"
          placeholder="🔍  Search by name or course"
          onChange={(e) => setSearch(e.target.value)}
          style={{ flex: 1, minWidth: "200px", margin: 0 }}
        />
        <select onChange={(e) => setFilter(e.target.value)} style={{ width: "160px", margin: 0 }}>
          <option value="">All Status</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
          <option value="pending">Pending</option>
        </select>
      </div>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Course</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filtered.length === 0 ? (
            <tr>
              <td colSpan="5" style={{ padding: "32px", color: "#94a3b8" }}>
                No applications found.
              </td>
            </tr>
          ) : (
            filtered.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.course}</td>
                <td>
                  <span className={getStatusClass(item.status)}>{item.status}</span>
                </td>
                <td>
                  <div className="action-btns">
                    <button onClick={() => updateStatus(item._id, "approved")}>Approve</button>
                    <button onClick={() => updateStatus(item._id, "rejected")}>Reject</button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Admin;