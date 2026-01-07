const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '.')));

// Database setup
const db = new sqlite3.Database('./database.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the SQLite database.');
});

// Helper function to check if premium is active
function isPremiumActive(user) {
  if (!user.premium || !user.premium_expiry) return false;
  const now = new Date();
  const expiry = new Date(user.premium_expiry);
  return now < expiry;
}

// Create tables
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT,
    questions_asked INTEGER DEFAULT 0,
    paid BOOLEAN DEFAULT 0,
    premium BOOLEAN DEFAULT 0,
    premium_expiry TEXT,
    ip TEXT,
    premium_renewals INTEGER DEFAULT 0,
    premium_type TEXT DEFAULT 'monthly'
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS questions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT,
    question TEXT,
    date TEXT
  )`);
});

// Routes
app.post('/register', (req, res) => {
  const { username, password } = req.body;
  const ip = req.ip || req.connection.remoteAddress;
  db.get(`SELECT COUNT(*) as count FROM users WHERE ip = ?`, [ip], (err, row) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    if (row.count >= 2) {
      return res.status(403).json({ error: 'Vous avez atteint la limite de 2 comptes par ordinateur. Pour des raisons de sécurité et d\'équité, un maximum de 2 comptes est autorisé par appareil.' });
    }
    db.run(`INSERT INTO users (username, password, ip) VALUES (?, ?, ?)`, [username, password, ip], function(err) {
      if (err) {
        return res.status(400).json({ error: 'Username already exists' });
      }
      res.json({ message: 'User registered successfully' });
    });
  });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  db.get(`SELECT * FROM users WHERE username = ? AND password = ?`, [username, password], (err, row) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    if (row) {
      res.json({ user: row });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  });
});

app.post('/question', (req, res) => {
  const { username, question } = req.body;
  db.get(`SELECT * FROM users WHERE username = ?`, [username], (err, user) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }
    const premiumActive = isPremiumActive(user);
    if (!premiumActive && user.questions_asked >= 2) {
      return res.status(403).json({ error: 'Payment required for additional questions' });
    }
    const date = new Date().toISOString();
    db.run(`INSERT INTO questions (username, question, date) VALUES (?, ?, ?)`, [username, question, date], function(err) {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
      db.run(`UPDATE users SET questions_asked = questions_asked + 1 WHERE username = ?`, [username]);
      res.json({ message: 'Question submitted successfully' });
    });
  });
});

app.post('/pay', (req, res) => {
  const { username } = req.body;
  db.run(`UPDATE users SET paid = 1 WHERE username = ?`, [username], function(err) {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.json({ message: 'Payment successful' });
  });
});

app.post('/pay-question', (req, res) => {
  const { username } = req.body;
  // Simulate payment, just allow the question
  res.json({ message: 'Payment for question successful' });
});

app.post('/premium', (req, res) => {
  const { username, type } = req.body; // type: 'monthly' or 'annual'
  db.get(`SELECT * FROM users WHERE username = ?`, [username], (err, user) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }
    let months = type === 'annual' ? 12 : 1;
    let renewals = user.premium_renewals;
    if (type === 'monthly') {
      renewals += 1;
      if (renewals % 12 === 0) {
        months += 1; // Free month after 12 paid months
      }
    }
    const expiry = new Date(user.premium_expiry || Date.now());
    if (new Date() > expiry) {
      expiry.setTime(Date.now()); // Reset if expired
    }
    expiry.setMonth(expiry.getMonth() + months);
    db.run(`UPDATE users SET premium = 1, premium_expiry = ?, premium_renewals = ?, premium_type = ? WHERE username = ?`, [expiry.toISOString(), renewals, type, username], function(err) {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
      res.json({ message: `Premium ${type} subscription successful`, expiry: expiry.toISOString() });
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});