const express = require("express");
const cors = require("cors");
const db = require("better-sqlite3")("database.db");
const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Create the table
const createTable = () => {
  const sql = `
        CREATE TABLE IF NOT EXISTS user 
        (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL
        )
        `;
  db.prepare(sql).run();
};
createTable();

// Insert a new user
app.post("/users", (req, res) => {
  const { name, email, password } = req.body;

  try {
    const sql = `
      INSERT INTO user (name, email, password)
      VALUES (?, ?, ?)
    `;
    const info = db.prepare(sql).run(name, email, password);
    const createdUser = db.prepare("SELECT * FROM user WHERE id = ?").get(info.lastInsertRowid);
    res.status(201).json(createdUser);
  } catch (error) {
    res.status(400).json({ error: "Error adding user. Email may already exist." });
  }
});

// Get all users
app.get("/users", (req, res) => {
  const sql = `SELECT * FROM user`;
  const rows = db.prepare(sql).all();
  res.json(rows);
});

// Get a user by ID
app.get("/users/:id", (req, res) => {
  const { id } = req.params;
  const sql = `
    SELECT * FROM user
    WHERE id = ?
  `;
  const row = db.prepare(sql).get(id);
  if (row) {
    res.json(row);
  } else {
    res.status(404).json({ error: "User not found" });
  }
});

// Update a user by ID
app.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;

  try {
    const sql = `
      UPDATE user
      SET name = ?, email = ?, password = ?
      WHERE id = ?
    `;
    const info = db.prepare(sql).run(name, email, password, id);

    if (info.changes > 0) {
      const updatedUser = db.prepare("SELECT * FROM user WHERE id = ?").get(id);
      res.json(updatedUser);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(400).json({ error: "Error updating user. Email may already exist." });
  }
});

// Delete a user by ID
app.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  const sql = `
    DELETE FROM user
    WHERE id = ?
  `;
  const info = db.prepare(sql).run(id);

  if (info.changes > 0) {
    res.json({ message: "User deleted successfully" });
  } else {
    res.status(404).json({ error: "User not found" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
