// CRUD operations for the student table in the school database
const express = require("express");
const mysql = require("mysql2");
const app = express();

app.use(express.json());
app.use(express.static("public"));

// Connect to the school database
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "tejaswi",
    database: "school"
});

db.connect((err) => {
    if (err) {
        console.error("MySQL connection failed:", err.message);
        process.exit(1);
    }
    console.log("Connected to MySQL");
});

// List all students
app.get("/students", (req, res) => {
    db.query("SELECT sno, Name, Total FROM student", (err, result) => {
        if (err) return res.status(500).send(err.message);
        res.json(result);
    });
});

// Get one student by sno
app.get("/students/:sno", (req, res) => {
    db.query(
        "SELECT sno, Name, Total FROM student WHERE sno = ?",
        [req.params.sno],
        (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(result);
        }
    );
});

// Insert a student
app.post("/students", (req, res) => {
    const { sno, name, total } = req.body;

    if (sno === undefined || !name || total === undefined || name.trim() === "") {
        return res.status(400).send("Please fill all fields");
    }

    db.query(
        "INSERT INTO student (sno, Name, Total) VALUES (?, ?, ?)",
        [sno, name.trim(), total],
        (err) => {
            if (err) return res.status(500).send(err.message);
            res.send("Student Inserted");
        }
    );
});

// Update a student
app.put("/students/:sno", (req, res) => {
    const { name, total } = req.body;

    if (!name || total === undefined || name.trim() === "") {
        return res.status(400).send("Please fill all fields");
    }

    db.query(
        "UPDATE student SET Name = ?, Total = ? WHERE sno = ?",
        [name.trim(), total, req.params.sno],
        (err, result) => {
            if (err) return res.status(500).send(err.message);
            if (result.affectedRows === 0) return res.status(404).send("Student NOT found");
            res.send("Student Updated");
        }
    );
});

// Delete a student
app.delete("/students/:sno", (req, res) => {
    db.query(
        "DELETE FROM student WHERE sno = ?",
        [req.params.sno],
        (err, result) => {
            if (err) return res.status(500).send(err.message);
            if (result.affectedRows === 0) return res.status(404).send("Student NOT found to delete");
            res.send("Student Deleted");
        }
    );
});

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});
