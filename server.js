const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt");

// Initialize Express
const app = express();
app.use(cors());
app.use(express.static("public"));
app.use(bodyParser.json());

// MySQL connection setup
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "admin@321",
  database: "event_fiesta"
});

db.connect((err) => {
  if (err) {
    console.error("❌ MySQL Connection Failed:", err);
  } else {
    console.log("✅ Connected to MySQL Database");
  }
});

// Secure Registration API
app.post("/register", async (req, res) => {
  const { fullname, email, password, gender, session, phone} = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const sql = "INSERT INTO users (fullname, email, password, gender, session_pref, phone) VALUES (?, ?, ?, ?, ?, ?)";
    db.query(sql, [fullname, email, hashedPassword, gender, session, phone], (err) => {
      if (err) {
        console.error("Registration Error:", err);
        return res.json({ message: "Registration failed. Try again." });
      }
      res.json({ message: "Registration successful!" });
    });
  } catch (err) {
    console.error("Hashing Error:", err);
    res.json({ message: "Server error." });
  }
});
// Secure Login API
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const sql = "SELECT * FROM users WHERE email = ?";
  
  db.query(sql, [email], async (err, results) => {
    if (err) {
      console.error("Login Error:", err);
      return res.json({ success: false, message: "Login failed. Try again." });
    }

    if (results.length === 0) {
      return res.json({ success: false, message: "Invalid email or password." });
    }

    const user = results[0];
    const match = await bcrypt.compare(password, user.password);

    if (match) {
      return res.json({
        success: true,
        message: `Welcome back, ${user.fullname}!`
      });
    } else {
      return res.json({ success: false, message: "Invalid email or password." });
    }
  });
});


// Review API
app.post("/review", (req, res) => {
  const { reviewName, rating, feedback } = req.body;
  const sql = "INSERT INTO reviews (name, rating, feedback) VALUES (?, ?, ?)";
  db.query(sql, [reviewName, rating, feedback], (err) => {
    if (err) {
      console.error("Review Error:", err);
      res.json({ message: "Could not submit review." });
    } else {
      res.json({ message: "Thank you for your feedback!" });
    }
  });
});

// Start server
app.listen(5000, () => {
  console.log("✅ Server running on http://localhost:5000");
});
