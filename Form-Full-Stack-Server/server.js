//todos:
//1. Error handling – All DB queries should be wrapped in try/catch. Right now if MySQL is down, server crashes, so implement it into each route.
//2. Validation – You only check if (!name || !email). Companies use validation libraries (joi(JS), zod(TS)) to enforce schema.
//3. folder structure – As your app grows, you’ll want to split routes, DB logic, and server setup into separate files.
//4. Timestamps – Your table uses created_at, but you didn’t show schema. In companies, migrations (Knex, Sequelize) handle table creation and changes, not manual SQL.
//5. Logging – Replace console.log with winston or pino for structured logs.
//6. Security – CORS should not be wide open in production. Use origin restrictions.
//7. Scalability – For large projects, REST is fine, but teams often shift to GraphQL or gRPC when services grow.


import dotenv from "dotenv";
import express from "express";
import mysql from "mysql2/promise";
import cors from "cors";


const app = express();
app.use(cors({ origin: "http://localhost:5173" }));
app.use(cors());
app.use(express.json());

// ✅ Enable CORS for your React frontend

// DB connection pool
dotenv.config();
const db = await mysql.createPool({
  // host: "localhost",
  // user: "root",        // replace with your MySQL user
  // password: "mukeshrawat",// replace with your password
  // database: "fullstackformapp"
 host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});


// CREATE -> Insert form data
app.post("/api/form", async (req, res) => {
  try {
    const { name, email } = req.body;
    if (!name || !email) return res.status(400).json({ error: "Missing fields" });

    const [result] = await db.execute(
      "INSERT INTO form_data (name, email) VALUES (?, ?)",
      [name, email]
    );
    res.json({ id: result.insertId, name, email });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
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


// Fetch all data
app.get("/api/form", async (req, res) => {
  const [rows] = await db.execute("SELECT * FROM form_data ORDER BY created_at DESC");
  res.json(rows);
});

app.listen(5000, () => console.log("Server running on port 5000"));
