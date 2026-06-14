import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [activeCategory, setActiveCategory] = useState("");

  const scholarshipData = {
    Government: [
      { title: "UPSC", amount: "50,000", marks: "75%", income: "Below 2 Lakh", duration: "12 Months", seats: "100" },
      { title: "SSC", amount: "40,000", marks: "70%", income: "Below 2 Lakh", duration: "10 Months", seats: "80" },
      { title: "MPSC", amount: "35,000", marks: "65%", income: "Below 2 Lakh", duration: "8 Months", seats: "60" },
      { title: "Railway (RRB)", amount: "30,000", marks: "60%", income: "Below 1.5 Lakh", duration: "6 Months", seats: "200" },
      { title: "Bank PO", amount: "45,000", marks: "70%", income: "Below 2 Lakh", duration: "12 Months", seats: "150" },
    ],
    Engineering: [
      { title: "B.Tech", amount: "80,000", marks: "80%", income: "Below 3 Lakh", duration: "4 years", seats: "120" },
      { title: "M.Tech", amount: "1,00,000", marks: "85%", income: "Below 4 Lakh", duration: "2 years", seats: "60" },
      { title: "Diploma", amount: "50,000", marks: "75%", income: "Below 2 Lakh", duration: "3 years", seats: "150" },
      { title: "B.E.", amount: "75,000", marks: "78%", income: "Below 3 Lakh", duration: "4 years", seats: "100" },
      { title: "Civil Engineering", amount: "70,000", marks: "75%", income: "Below 3 Lakh", duration: "4 years", seats: "80" },
    ],
    Medical: [
      { title: "MBBS", amount: "1,00,000", marks: "85%", income: "Below 4 Lakh", duration: "5 years", seats: "60" },
      { title: "Nursing", amount: "50,000", marks: "80%", income: "Below 4 Lakh", duration: "4 years", seats: "100" },
      { title: "Pharmacy", amount: "90,000", marks: "75%", income: "Below 3 Lakh", duration: "4 years", seats: "200" },
      { title: "BDS (Dental)", amount: "80,000", marks: "80%", income: "Below 3 Lakh", duration: "5 years", seats: "50" },
      { title: "Physiotherapy", amount: "60,000", marks: "75%", income: "Below 3 Lakh", duration: "4 years", seats: "80" },
      { title: "BAMS (Ayurveda)", amount: "55,000", marks: "70%", income: "Below 2.5 Lakh", duration: "5.5 years", seats: "60" },
    ],
    Computer: [
      { title: "MCA", amount: "50,000", marks: "75%", income: "Below 3 Lakh", duration: "2 years", seats: "150" },
      { title: "BCA", amount: "30,000", marks: "75%", income: "Below 2 Lakh", duration: "3 years", seats: "150" },
      { title: "BSc CS", amount: "40,000", marks: "75%", income: "Below 5 Lakh", duration: "3 years", seats: "150" },
      { title: "BSc IT", amount: "40,000", marks: "75%", income: "Below 4 Lakh", duration: "3 years", seats: "200" },
      { title: "Data Science", amount: "60,000", marks: "80%", income: "Below 3 Lakh", duration: "2 years", seats: "100" },
      { title: "Cyber Security", amount: "70,000", marks: "80%", income: "Below 4 Lakh", duration: "2 years", seats: "80" },
    ],
    Arts: [
      { title: "BA", amount: "20,000", marks: "60%", income: "Below 1.5 Lakh", duration: "3 years", seats: "200" },
      { title: "MA", amount: "30,000", marks: "65%", income: "Below 2 Lakh", duration: "2 years", seats: "100" },
      { title: "BFA (Fine Arts)", amount: "25,000", marks: "60%", income: "Below 1.5 Lakh", duration: "4 years", seats: "60" },
      { title: "Journalism", amount: "35,000", marks: "65%", income: "Below 2 Lakh", duration: "3 years", seats: "80" },
    ],
    Commerce: [
      { title: "BCom", amount: "25,000", marks: "65%", income: "Below 2 Lakh", duration: "3 years", seats: "200" },
      { title: "MCom", amount: "35,000", marks: "70%", income: "Below 2.5 Lakh", duration: "2 years", seats: "100" },
      { title: "CA (Foundation)", amount: "50,000", marks: "75%", income: "Below 3 Lakh", duration: "4 years", seats: "50" },
      { title: "MBA", amount: "80,000", marks: "75%", income: "Below 4 Lakh", duration: "2 years", seats: "80" },
    ],
  };

  const categoryIcons = {
    Government: "🏛️", Engineering: "⚙️", Medical: "🏥",
    Computer: "💻", Arts: "🎨", Commerce: "📈"
  };

  const showCourses = (category) => {
    setCourses(scholarshipData[category]);
    setActiveCategory(category);
  };

  const applyCourse = (course) => navigate("/apply", { state: { course } });

  return (
    <div className={darkMode ? "dark-container" : "container"}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
        <h2 style={{ margin: 0 }}>Scholarship Portal</h2>
        <button onClick={() => setDarkMode(!darkMode)}
          style={{ background: darkMode ? "#f5a623" : "#1e293b", padding: "9px 18px", fontSize: "14px" }}>
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>

      <p style={{ textAlign: "center", marginBottom: "24px" }}>
        Select a category to explore available scholarships
      </p>

      <div className="card-container">
        {Object.keys(scholarshipData).map((cat) => (
          <div key={cat} className="card" onClick={() => showCourses(cat)}
            style={activeCategory === cat ? { background: "#f5a623", transform: "translateY(-3px)" } : {}}>
            <div style={{ fontSize: "22px", marginBottom: "6px" }}>{categoryIcons[cat]}</div>
            {cat}
          </div>
        ))}
      </div>

      {courses.length > 0 && (
        <>
          <h3 style={{ marginTop: "32px" }}>Available Scholarships — {activeCategory}</h3>
          {courses.map((item, index) => (
            <div className="scholarship-card" key={index}>
              <h3>{item.title}</h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4px 16px", marginBottom: "14px" }}>
                <p>💰 Amount: <strong>₹{item.amount}</strong></p>
                <p>📊 Min. Marks: <strong>{item.marks}</strong></p>
                <p>🏠 Income Limit: <strong>{item.income}</strong></p>
                <p>📅 Duration: <strong>{item.duration}</strong></p>
                <p>🎓 Seats: <strong>{item.seats}</strong></p>
              </div>
              <button onClick={() => applyCourse(item.title)}>Apply Now →</button>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default Home;