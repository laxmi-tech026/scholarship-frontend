import { useEffect, useState } from "react";

const API = "https://scholarship-backend-waaq.onrender.com";

function Profile() {
  const [appData, setAppData] = useState(null);
  const [userData, setUserData] = useState(null);
  const [photoFile, setPhotoFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [tab, setTab] = useState("info"); // "info" or "password"
  const [pwForm, setPwForm] = useState({ oldPassword: "", newPassword: "", confirmPassword: "" });
  const [pwError, setPwError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(`${API}/me`, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json()).then(r => setUserData(r));
    fetch(`${API}/my-application`, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json()).then(r => setAppData(r));
  }, []);

  const handlePhotoUpload = async () => {
    if (!photoFile) return alert("Please select a photo first");
    setUploading(true);
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("photo", photoFile);
    const res = await fetch(`${API}/upload-photo`, {
      method: "POST", headers: { Authorization: `Bearer ${token}` }, body: formData,
    });
    const data = await res.json();
    alert(data.message);
    setUploading(false);
    fetch(`${API}/me`, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json()).then(r => setUserData(r));
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setPwError("");
    if (pwForm.newPassword !== pwForm.confirmPassword) {
      setPwError("New passwords do not match"); return;
    }
    if (pwForm.newPassword.length < 6) {
      setPwError("New password must be at least 6 characters"); return;
    }
    const token = localStorage.getItem("token");
    const res = await fetch(`${API}/change-password`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ oldPassword: pwForm.oldPassword, newPassword: pwForm.newPassword }),
    });
    const data = await res.json();
    alert(data.message);
    setPwForm({ oldPassword: "", newPassword: "", confirmPassword: "" });
  };

  const getStatusClass = (status) => {
    if (status === "approved") return "status-approved";
    if (status === "rejected") return "status-rejected";
    return "status-pending";
  };

  const photoUrl = userData?.photo ? `${API}/uploads/${userData.photo}` : null;

  return (
    <div className="container">
      <h2>Student Profile</h2>

      {userData && (
        <div className="scholarship-card" style={{ marginBottom: "24px" }}>
          {/* Avatar */}
          <div style={{ textAlign: "center", marginBottom: "16px" }}>
            {photoUrl ? (
              <img src={photoUrl} alt="Profile" style={{
                width: "90px", height: "90px", borderRadius: "50%",
                objectFit: "cover", border: "3px solid #0f4c75",
                display: "block", margin: "0 auto 12px"
              }} />
            ) : (
              <div style={{
                width: "90px", height: "90px", borderRadius: "50%",
                background: "#0f4c75", color: "#fff", display: "flex",
                alignItems: "center", justifyContent: "center",
                fontSize: "36px", fontWeight: "700", margin: "0 auto 12px"
              }}>
                {userData.name?.charAt(0).toUpperCase()}
              </div>
            )}
            <span style={{
              display: "inline-block",
              background: userData.role === "admin" ? "#0f4c75" : "#e8f4fd",
              color: userData.role === "admin" ? "#fff" : "#1b6ca8",
              padding: "4px 14px", borderRadius: "20px",
              fontSize: "13px", fontWeight: "700", textTransform: "uppercase",
            }}>
              {userData.role === "admin" ? "👑 Admin" : "👤 User"}
            </span>
          </div>

          {/* Photo Upload */}
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <input type="file" accept="image/*"
              onChange={(e) => setPhotoFile(e.target.files[0])}
              style={{ display: "block", margin: "0 auto 10px", background: "#fff" }} />
            <button onClick={handlePhotoUpload} disabled={uploading}
              style={{ background: "#1b6ca8", padding: "9px 22px", fontSize: "14px" }}>
              {uploading ? "Uploading..." : "Upload Photo"}
            </button>
          </div>

          {/* Tabs */}
          <div style={{ display: "flex", gap: "8px", marginBottom: "20px" }}>
            <button onClick={() => setTab("info")}
              style={{ background: tab === "info" ? "#0f4c75" : "#e8f4fd", color: tab === "info" ? "#fff" : "#0f4c75", flex: 1 }}>
              User Info
            </button>
            <button onClick={() => setTab("password")}
              style={{ background: tab === "password" ? "#0f4c75" : "#e8f4fd", color: tab === "password" ? "#fff" : "#0f4c75", flex: 1 }}>
              Change Password
            </button>
          </div>

          {tab === "info" && (
            <div className="profile-info">
              <p><span>Name</span><span>{userData.name}</span></p>
              <p><span>Email</span><span>{userData.email}</span></p>
              <p><span>Role</span><span>{userData.role}</span></p>
            </div>
          )}

          {tab === "password" && (
            <form onSubmit={handlePasswordChange}>
              <label>Current Password</label>
              <input type="password" placeholder="Enter current password"
                value={pwForm.oldPassword}
                onChange={(e) => setPwForm({ ...pwForm, oldPassword: e.target.value })} required />
              <label>New Password</label>
              <input type="password" placeholder="Minimum 6 characters"
                value={pwForm.newPassword}
                onChange={(e) => setPwForm({ ...pwForm, newPassword: e.target.value })} required />
              <label>Confirm New Password</label>
              <input type="password" placeholder="Repeat new password"
                value={pwForm.confirmPassword}
                onChange={(e) => setPwForm({ ...pwForm, confirmPassword: e.target.value })} required />
              {pwError && <p style={{ color: "red", fontSize: "13px" }}>{pwError}</p>}
              <button type="submit" style={{ width: "100%", marginTop: "16px" }}>
                Update Password
              </button>
            </form>
          )}
        </div>
      )}

      {appData && (
        <div className="scholarship-card">
          <h3>My Application</h3>
          <div className="profile-info">
            <p><span>Course</span><span>{appData.course}</span></p>
            {appData.phone && <p><span>Phone</span><span>{appData.phone}</span></p>}
            <p><span>Annual Income</span><span>₹{appData.income}</span></p>
            <p><span>Status</span><span className={getStatusClass(appData.status)}>{appData.status}</span></p>
            {appData.document && (
              <p><span>Document</span>
                <a href={`${API}/uploads/${appData.document}`} target="_blank" rel="noreferrer"
                  style={{ color: "#1b6ca8", fontWeight: 600 }}>View Document</a>
              </p>
            )}
          </div>
        </div>
      )}

      {!userData && (
        <p style={{ textAlign: "center", padding: "40px 0", color: "#94a3b8" }}>Loading profile...</p>
      )}
    </div>
  );
}

export default Profile;