// server.js
import express from "express";
import mysql from "mysql2/promise";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// DB connection pool
const db = await mysql.createPool({
  host: "localhost",
  user: "root",        // replace with your MySQL user
  password: "mukeshrawat",// replace with your password
  database: "fullstackformapp"
});

// Insert form data
app.post("/api/form", async (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) return res.status(400).json({ error: "Missing fields" });

  const [result] = await db.execute(
    "INSERT INTO form_data (name, email) VALUES (?, ?)",
    [name, email]
  );
  res.json({ id: result.insertId, name, email });
});

// Fetch all data
app.get("/api/form", async (req, res) => {
  const [rows] = await db.execute("SELECT * FROM form_data ORDER BY created_at DESC");
  res.json(rows);
});

app.listen(5000, () => console.log("Server running on port 5000"));



/*
  // server.js
import express from "express";
import mysql from "mysql2/promise";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// DB connection pool
const db = await mysql.createPool({
  host: "localhost",
  user: "root",
  password: "password",
  database: "form_app"
});

// CREATE
app.post("/api/form", async (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) return res.status(400).json({ error: "Missing fields" });

  const [result] = await db.execute(
    "INSERT INTO form_data (name, email) VALUES (?, ?)",
    [name, email]
  );
  res.json({ id: result.insertId, name, email });
});

// READ
app.get("/api/form", async (req, res) => {
  const [rows] = await db.execute("SELECT * FROM form_data ORDER BY created_at DESC");
  res.json(rows);
});

// UPDATE
app.put("/api/form/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  const [result] = await db.execute(
    "UPDATE form_data SET name=?, email=? WHERE id=?",
    [name, email, id]
  );
  if (result.affectedRows === 0) return res.status(404).json({ error: "Not found" });
  res.json({ id, name, email });
});

// DELETE
app.delete("/api/form/:id", async (req, res) => {
  const { id } = req.params;
  const [result] = await db.execute("DELETE FROM form_data WHERE id=?", [id]);
  if (result.affectedRows === 0) return res.status(404).json({ error: "Not found" });
  res.json({ success: true });
});

app.listen(5000, () => console.log("Server running on 5000"));

 
 */