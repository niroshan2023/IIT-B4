const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

const db = new sqlite3.Database('contacts.db', err => {
  if (err) {
    console.error('Database connection error:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
    db.run(`
      CREATE TABLE IF NOT EXISTS contacts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        email TEXT
      )
    `);
  }
});

app.get('/contacts', (req, res) => {
  db.all('SELECT * FROM contacts', (err, rows) => {
    if (err) {
      console.error('Error retrieving contacts:', err.message);
      res.status(500).send('Server Error');
    } else {
      res.send(rows);
    }
  });
});

app.post('/add-contact', (req, res) => {
  const { name, email } = req.body;
  db.run('INSERT INTO contacts (name, email) VALUES (?, ?)', [name, email], err => {
    if (err) {
      console.error('Error adding contact:', err.message);
      res.status(500).send('Server Error');
    } else {
      res.redirect('/contacts');
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

