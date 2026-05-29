const express = require('express');
const { exec } = require('child_process');
const app = express();

app.use(express.json());

app.get('/api/users', (req, res) => {
    const userId = req.query.id;
    const query = `SELECT * FROM users WHERE id = '${userId}'`; 
    
    console.log(`Executing query: ${query}`);
    res.send(`Query executed for this user: ${query}`);
});

app.get('/api/ping', (req, res) => {
    const targetUrl = req.query.url;
    
    exec(`ping -c 1 ${targetUrl}`, (error, stdout, stderr) => {
        if (error) {
            return res.status(500).send(`Error: ${error.message}`);
        }
        res.send(`Results:\n${stdout}`);
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});