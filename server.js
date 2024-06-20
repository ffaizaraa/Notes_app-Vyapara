const express = require('express');
const bodyParser = require('body-parser');
const connection = require('./db/connection');

const app = express();
const port = process.env.APP_PORT || 3000;

app.use(bodyParser.json());

// Buat note baru
app.post('/notes', (req, res) => {
    const { title, datetime, note } = req.body;
    const sql = 'INSERT INTO notes (title, datetime, note) VALUES (?, ?, ?)';
    connection.query(sql, [title, datetime, note], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(201).send({ id: results.insertId });
    });
});

// Tampilkan semua notes
app.get('/notes', (req, res) => {
    const sql = 'SELECT * FROM notes';
    connection.query(sql, (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send(results);
    });
});

// Tampilkan satu note
app.get('/notes/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM notes WHERE id = ?';
    connection.query(sql, [id], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (results.length === 0) {
            return res.status(404).send({ message: 'Note not found' });
        }
        res.send(results[0]);
    });
});

// Ubah note
app.put('/notes/:id', (req, res) => {
    const { id } = req.params;
    const { title, datetime, note } = req.body;
    const sql = 'UPDATE notes SET title = ?, datetime = ?, note = ? WHERE id = ?';
    connection.query(sql, [title, datetime, note, id], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (results.affectedRows === 0) {
            return res.status(404).send({ message: 'Note not found' });
        }
        res.send({ message: 'Note updated' });
    });
});

// Hapus note
app.delete('/notes/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM notes WHERE id = ?';
    connection.query(sql, [id], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (results.affectedRows === 0) {
            return res.status(404).send({ message: 'Note not found' });
        }
        res.send({ message: 'Note deleted' });
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
